import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { galleryImages } from '@/lib/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Magic bytes for image validation
const MAGIC_BYTES: Record<string, number[]> = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47],
  'image/webp': [0x52, 0x49, 0x46, 0x46], // RIFF header
};

function validateMagicBytes(buffer: Buffer, mimeType: string): boolean {
  const expected = MAGIC_BYTES[mimeType];
  if (!expected) return false;
  for (let i = 0; i < expected.length; i++) {
    if (buffer[i] !== expected[i]) return false;
  }
  return true;
}

// GET — fetch all gallery images (public)
export async function GET() {
  try {
    const db = getDb();
    const images = await db
      .select()
      .from(galleryImages)
      .orderBy(asc(galleryImages.sortOrder), desc(galleryImages.uploadedAt));

    return NextResponse.json(images);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

// POST — upload a new image (admin only)
export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const category = (formData.get('category') as string) || 'Campus';
    const caption = formData.get('caption') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // File size check
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    // MIME type check
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPEG, PNG, or WebP.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Magic byte verification — check actual file content, not just MIME header
    if (!validateMagicBytes(buffer, file.type)) {
      return NextResponse.json({ error: 'File content does not match declared type.' }, { status: 400 });
    }

    // Category whitelist
    const validCategories = ['Campus', 'Events', 'Sports', 'Academics'];
    const safeCategory = validCategories.includes(category) ? category : 'Campus';

    // Generate safe filename — no user input in the name
    const extMap: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
    const ext = extMap[file.type];
    const filename = `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Save file
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'gallery');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    // Save to database
    const [image] = await db
      .insert(galleryImages)
      .values({
        filename,
        originalName: file.name.slice(0, 200),
        category: safeCategory as "Campus" | "Events" | "Sports" | "Academics",
        caption: caption ? caption.slice(0, 300) : null,
      })
      .returning();

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

// DELETE — delete an image (admin only)
export async function DELETE(req: NextRequest) {
  const session = await getSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();
    const { id } = await req.json();

    if (typeof id !== 'number' || id <= 0) {
      return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 });
    }

    const [image] = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.id, id));

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Delete file from disk
    const filePath = path.join(process.cwd(), 'public', 'images', 'gallery', image.filename);
    try {
      await unlink(filePath);
    } catch {
      // File may already be deleted
    }

    await db.delete(galleryImages).where(eq(galleryImages.id, id));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
