import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { galleryImages } from '@/lib/schema';
import { eq, asc } from 'drizzle-orm';

// Max accepted payload per image (base64 data URL). Keep DB sane.
const MAX_IMAGE_BYTES = 2_500_000; // ~2.5 MB of base64 text

function isValidDataUrl(s: unknown): s is string {
  if (typeof s !== 'string') return false;
  return /^data:image\/(jpeg|jpg|png|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(s);
}

// GET: public. Returns active images only, ordered for gallery display.
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

// POST: auth (proxy enforces). Create new gallery image.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, imageData, displayOrder, active } = body ?? {};

    if (!title || !category || !imageData) {
      return NextResponse.json(
        { error: 'title, category, imageData are required' },
        { status: 400 },
      );
    }

    if (!isValidDataUrl(imageData)) {
      return NextResponse.json(
        { error: 'imageData must be a base64 data URL (jpeg/png/webp/gif)' },
        { status: 400 },
      );
    }

    if (imageData.length > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: 'Image too large. Resize to under ~2 MB before uploading.' },
        { status: 413 },
      );
    }

    const [row] = await db
      .insert(galleryImages)
      .values({
        title: String(title),
        category: String(category),
        imageData,
        displayOrder: Number.isFinite(displayOrder) ? Number(displayOrder) : 0,
        active: active === false ? false : true,
      })
      .returning();

    return NextResponse.json({ message: 'Image uploaded', image: row }, { status: 201 });
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

// PATCH: auth. Update title, category, order, active, or replace imageData.
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body ?? {};

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const patch: Partial<typeof galleryImages.$inferInsert> = {};
    if (typeof body.title === 'string') patch.title = body.title;
    if (typeof body.category === 'string') patch.category = body.category;
    if (typeof body.displayOrder === 'number') patch.displayOrder = body.displayOrder;
    if (typeof body.active === 'boolean') patch.active = body.active;
    if (typeof body.imageData === 'string') {
      if (!isValidDataUrl(body.imageData)) {
        return NextResponse.json(
          { error: 'imageData must be a base64 data URL (jpeg/png/webp/gif)' },
          { status: 400 },
        );
      }
      if (body.imageData.length > MAX_IMAGE_BYTES) {
        return NextResponse.json(
          { error: 'Image too large. Resize to under ~2 MB before uploading.' },
          { status: 413 },
        );
      }
      patch.imageData = body.imageData;
    }

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: 'No updatable fields provided' }, { status: 400 });
    }

    await db.update(galleryImages).set(patch).where(eq(galleryImages.id, Number(id)));

    return NextResponse.json({ message: 'Image updated' });
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

// DELETE: auth. ?id=123
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    await db.delete(galleryImages).where(eq(galleryImages.id, parseInt(id, 10)));
    return NextResponse.json({ message: 'Image deleted' });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
