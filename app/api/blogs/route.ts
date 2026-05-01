import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { ALLOWED_MIME_TYPES, MAX_UPLOAD_BYTES, saveUpload, deleteUpload } from '@/lib/uploads';

async function requireAdmin(request: NextRequest) {
  const session = await getSession(request);
  if (!session || !session.admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === '1';

    if (all) {
      const unauth = await requireAdmin(request);
      if (unauth) return unauth;
      const rows = await db.query.blogPosts.findMany({
        orderBy: [desc(blogPosts.createdAt)],
      });
      return NextResponse.json(rows);
    }

    const rows = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauth = await requireAdmin(request);
  if (unauth) return unauth;

  try {
    const form = await request.formData();
    const title = String(form.get('title') ?? '').trim();
    const content = String(form.get('content') ?? '').trim();
    const excerpt = String(form.get('excerpt') ?? '').trim() || null;
    const author = String(form.get('author') ?? 'IGS Team').trim() || 'IGS Team';
    const publishedRaw = form.get('published');
    const published = publishedRaw === 'true' || publishedRaw === '1';
    let slug = String(form.get('slug') ?? '').trim();
    const file = form.get('file');

    if (!title || !content) {
      return NextResponse.json({ error: 'title and content are required' }, { status: 400 });
    }

    if (!slug) slug = toSlug(title);

    let coverImage: string | null = null;
    if (file instanceof File && file.size > 0) {
      if (!ALLOWED_MIME_TYPES.has(file.type)) {
        return NextResponse.json({ error: 'File must be jpeg, png, webp, or gif' }, { status: 400 });
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json({ error: 'Image too large. Max 10 MB.' }, { status: 413 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      coverImage = await saveUpload(buffer, file.type);
    }

    const [row] = await db
      .insert(blogPosts)
      .values({
        title,
        slug,
        excerpt,
        content,
        coverImage,
        author,
        published,
        publishedAt: published ? new Date() : null,
      })
      .returning();

    return NextResponse.json({ message: 'Blog post created', post: row }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const unauth = await requireAdmin(request);
  if (unauth) return unauth;

  try {
    const form = await request.formData();
    const idRaw = form.get('id');
    const id = idRaw != null ? Number(idRaw) : NaN;
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const patch: Partial<typeof blogPosts.$inferInsert> = {
      updatedAt: new Date(),
    };

    const title = form.get('title');
    const content = form.get('content');
    const excerpt = form.get('excerpt');
    const author = form.get('author');
    const slugRaw = form.get('slug');
    const publishedRaw = form.get('published');

    if (typeof title === 'string' && title.trim()) patch.title = title.trim();
    if (typeof content === 'string' && content.trim()) patch.content = content.trim();
    if (typeof excerpt === 'string') patch.excerpt = excerpt.trim() || null;
    if (typeof author === 'string' && author.trim()) patch.author = author.trim();
    if (typeof slugRaw === 'string' && slugRaw.trim()) patch.slug = slugRaw.trim();
    if (typeof publishedRaw === 'string') {
      const pub = publishedRaw === 'true' || publishedRaw === '1';
      patch.published = pub;
      if (pub && !existing.publishedAt) patch.publishedAt = new Date();
    }

    const file = form.get('file');
    let savedFilename: string | null = null;
    if (file instanceof File && file.size > 0) {
      if (!ALLOWED_MIME_TYPES.has(file.type)) {
        return NextResponse.json({ error: 'File must be jpeg, png, webp, or gif' }, { status: 400 });
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json({ error: 'Image too large. Max 10 MB.' }, { status: 413 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      savedFilename = await saveUpload(buffer, file.type);
      patch.coverImage = savedFilename;
    }

    await db.update(blogPosts).set(patch).where(eq(blogPosts.id, id));

    if (savedFilename && existing.coverImage) {
      await deleteUpload(existing.coverImage).catch((e) =>
        console.warn('Failed to delete old cover image:', e),
      );
    }

    return NextResponse.json({ message: 'Blog post updated' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
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

    const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await db.delete(blogPosts).where(eq(blogPosts.id, id));

    if (existing.coverImage) {
      await deleteUpload(existing.coverImage).catch((e) =>
        console.warn('Failed to delete cover image:', e),
      );
    }

    return NextResponse.json({ message: 'Blog post deleted' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
