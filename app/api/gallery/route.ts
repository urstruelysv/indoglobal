import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { galleryImages } from '@/lib/schema';
import { eq, asc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import {
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  deleteUpload,
  saveUpload,
} from '@/lib/uploads';

async function requireAdmin(request: NextRequest) {
  const session = await getSession(request);
  if (!session || !session.admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === '1';

    const rows = await db.query.galleryImages.findMany({
      orderBy: [asc(galleryImages.displayOrder), asc(galleryImages.id)],
    });

    const visible = all ? rows : rows.filter((r) => r.active);
    return NextResponse.json(visible);
  } catch (error) {
    console.error('Error reading gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauth = await requireAdmin(request);
  if (unauth) return unauth;

  try {
    const form = await request.formData();
    const file = form.get('file');
    const title = String(form.get('title') ?? '').trim();
    const category = String(form.get('category') ?? '').trim();
    const displayOrderRaw = form.get('displayOrder');
    const activeRaw = form.get('active');

    if (!title || !category || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'title, category, and file are required' },
        { status: 400 },
      );
    }
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: 'File must be jpeg, png, webp, or gif' },
        { status: 400 },
      );
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: 'Image too large. Max 10 MB.' },
        { status: 413 },
      );
    }

    const displayOrder = Number.isFinite(Number(displayOrderRaw)) ? Number(displayOrderRaw) : 0;
    const active = activeRaw == null ? true : String(activeRaw) !== 'false';

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = await saveUpload(buffer, file.type);

    try {
      const [row] = await db
        .insert(galleryImages)
        .values({
          title,
          category,
          filename,
          mimeType: file.type,
          displayOrder,
          active,
        })
        .returning();

      return NextResponse.json({ message: 'Image uploaded', image: row }, { status: 201 });
    } catch (dbErr) {
      await deleteUpload(filename).catch(() => {});
      throw dbErr;
    }
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const unauth = await requireAdmin(request);
  if (unauth) return unauth;

  try {
    const contentType = request.headers.get('content-type') ?? '';
    const patch: Partial<typeof galleryImages.$inferInsert> = {};
    let id: number | null = null;
    let newFile: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const rawId = form.get('id');
      id = rawId != null ? Number(rawId) : null;
      const title = form.get('title');
      const category = form.get('category');
      const displayOrder = form.get('displayOrder');
      const active = form.get('active');
      const file = form.get('file');
      if (typeof title === 'string' && title) patch.title = title;
      if (typeof category === 'string' && category) patch.category = category;
      if (typeof displayOrder === 'string' && displayOrder !== '')
        patch.displayOrder = Number(displayOrder);
      if (typeof active === 'string') patch.active = active === 'true';
      if (file instanceof File) newFile = file;
    } else {
      const body = await request.json();
      id = body?.id != null ? Number(body.id) : null;
      if (typeof body.title === 'string') patch.title = body.title;
      if (typeof body.category === 'string') patch.category = body.category;
      if (typeof body.displayOrder === 'number') patch.displayOrder = body.displayOrder;
      if (typeof body.active === 'boolean') patch.active = body.active;
    }

    if (!id || !Number.isFinite(id)) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const [existing] = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.id, id));
    if (!existing) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    let savedFilename: string | null = null;
    if (newFile) {
      if (!ALLOWED_MIME_TYPES.has(newFile.type)) {
        return NextResponse.json(
          { error: 'File must be jpeg, png, webp, or gif' },
          { status: 400 },
        );
      }
      if (newFile.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json({ error: 'Image too large. Max 10 MB.' }, { status: 413 });
      }
      const buffer = Buffer.from(await newFile.arrayBuffer());
      savedFilename = await saveUpload(buffer, newFile.type);
      patch.filename = savedFilename;
      patch.mimeType = newFile.type;
    }

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: 'No updatable fields provided' }, { status: 400 });
    }

    try {
      await db.update(galleryImages).set(patch).where(eq(galleryImages.id, id));
    } catch (dbErr) {
      if (savedFilename) await deleteUpload(savedFilename).catch(() => {});
      throw dbErr;
    }

    if (savedFilename && existing.filename) {
      await deleteUpload(existing.filename).catch((e) =>
        console.warn('Failed to delete old upload:', e),
      );
    }

    return NextResponse.json({ message: 'Image updated' });
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const unauth = await requireAdmin(request);
  if (unauth) return unauth;

  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    const id = idParam ? parseInt(idParam, 10) : NaN;
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const [existing] = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.id, id));
    if (!existing) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    await db.delete(galleryImages).where(eq(galleryImages.id, id));

    if (existing.filename) {
      await deleteUpload(existing.filename).catch((e) =>
        console.warn('Failed to delete upload file:', e),
      );
    }

    return NextResponse.json({ message: 'Image deleted' });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
