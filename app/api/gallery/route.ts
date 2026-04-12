import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { galleryImages } from '@/lib/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';

// GET — fetch all gallery images (public)
export async function GET() {
  try {
    const images = await db
      .select()
      .from(galleryImages)
      .orderBy(asc(galleryImages.sortOrder), desc(galleryImages.uploadedAt));

    return NextResponse.json(images);
  } catch (error) {
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
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const category = (formData.get('category') as string) || 'Campus';
    const caption = formData.get('caption') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPEG, PNG, or WebP.' }, { status: 400 });
    }

    // Generate unique filename
    const ext = file.name.split('.').pop();
    const filename = `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Save file to public/images/gallery
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'gallery');
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadDir, filename), buffer);

    // Save to database
    const [image] = await db
      .insert(galleryImages)
      .values({
        filename,
        originalName: file.name,
        category: category as "Campus" | "Events" | "Sports" | "Academics",
        caption: caption || null,
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
    const { id } = await req.json();

    // Get image info first
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

    // Delete from database
    await db.delete(galleryImages).where(eq(galleryImages.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
