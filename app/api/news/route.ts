import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { newsItems } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'igs-secret-key');

async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return false;
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function ensureUploadDir() {
  const dir = path.join(process.cwd(), 'gallery-uploads');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get('all');
  if (all === '1') {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const items = await db.select().from(newsItems).orderBy(desc(newsItems.createdAt));
    return NextResponse.json(items);
  }
  const items = await db.select().from(newsItems)
    .where(eq(newsItems.published, true))
    .orderBy(desc(newsItems.publishedAt));
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const title = (form.get('title') as string)?.trim();
  const content = (form.get('content') as string)?.trim();
  const excerpt = (form.get('excerpt') as string)?.trim() || null;
  const category = (form.get('category') as string)?.trim() || 'news';
  const author = (form.get('author') as string)?.trim() || 'IGS Team';
  const published = form.get('published') === 'true';
  const file = form.get('file') as File | null;

  if (!title || !content) return NextResponse.json({ error: 'Title and content required' }, { status: 400 });

  let slug = slugify(title);
  const existing = await db.select({ id: newsItems.id }).from(newsItems).where(eq(newsItems.slug, slug));
  if (existing.length > 0) slug = `${slug}-${Date.now()}`;

  let coverImage: string | null = null;
  if (file && file.size > 0) {
    const dir = ensureUploadDir();
    const ext = file.name.split('.').pop() ?? 'jpg';
    const filename = `news-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);
    coverImage = filename;
  }

  const [item] = await db.insert(newsItems).values({
    title, slug, excerpt, content, category, author, published,
    coverImage,
    publishedAt: published ? new Date() : null,
  }).returning();

  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const id = Number(form.get('id'));
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (form.has('title')) updates.title = (form.get('title') as string).trim();
  if (form.has('content')) updates.content = (form.get('content') as string).trim();
  if (form.has('excerpt')) updates.excerpt = (form.get('excerpt') as string).trim() || null;
  if (form.has('category')) updates.category = (form.get('category') as string).trim() || 'news';
  if (form.has('author')) updates.author = (form.get('author') as string).trim() || 'IGS Team';
  if (form.has('published')) {
    const pub = form.get('published') === 'true';
    updates.published = pub;
    if (pub) updates.publishedAt = new Date();
  }

  const file = form.get('file') as File | null;
  if (file && file.size > 0) {
    const dir = ensureUploadDir();
    const ext = file.name.split('.').pop() ?? 'jpg';
    const filename = `news-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);
    updates.coverImage = filename;
  }

  const [item] = await db.update(newsItems).set(updates).where(eq(newsItems.id, id)).returning();
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = Number(req.nextUrl.searchParams.get('id'));
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const [item] = await db.delete(newsItems).where(eq(newsItems.id, id)).returning();
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (item.coverImage) {
    try {
      await unlink(path.join(process.cwd(), 'gallery-uploads', item.coverImage));
    } catch {}
  }

  return NextResponse.json({ success: true });
}
