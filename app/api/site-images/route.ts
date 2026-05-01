import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { getSession } from '@/lib/auth';
import { ALLOWED_MIME_TYPES, MAX_UPLOAD_BYTES } from '@/lib/uploads';

const SLOTS = {
  hero_1: { label: 'Hero Image 1', publicPath: 'students-hero.webp' },
  hero_2: { label: 'Hero Image 2', publicPath: 'student-hero-3.webp' },
  chairman_photo: { label: 'Chairman Photo', publicPath: 'images/people/chairman.jpg' },
  about_building: { label: 'About - Building', publicPath: 'schoolbuilding.png' },
  campus_building: { label: 'Campus - Main Building', publicPath: 'images/campus/school-building-hd.jpg' },
  campus_lab: { label: 'Campus - Science Lab', publicPath: 'images/campus/science-lab.jpg' },
  campus_teachers: { label: 'Campus - Teachers', publicPath: 'images/campus/teacher-students.jpg' },
  campus_sports: { label: 'Campus - Sports', publicPath: 'images/campus/sports-arena.png' },
  campus_arts: { label: 'Campus - Performing Arts', publicPath: 'images/campus/performing-arts.jpg' },
  campus_transport: { label: 'Campus - Transportation', publicPath: 'images/campus/transportation.jpg' },
  campus_health: { label: 'Campus - Health & Hygiene', publicPath: 'images/campus/health-hygiene.jpg' },
} as const;

type SlotKey = keyof typeof SLOTS;

async function requireAdmin(request: NextRequest) {
  const session = await getSession(request);
  if (!session || !session.admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const unauth = await requireAdmin(request);
  if (unauth) return unauth;

  const slots = Object.entries(SLOTS).map(([key, val]) => ({
    key,
    label: val.label,
    publicPath: val.publicPath,
  }));

  return NextResponse.json(slots);
}

export async function POST(request: NextRequest) {
  const unauth = await requireAdmin(request);
  if (unauth) return unauth;

  try {
    const form = await request.formData();
    const slot = String(form.get('slot') ?? '').trim() as SlotKey;
    const file = form.get('file');

    if (!slot || !(slot in SLOTS)) {
      return NextResponse.json({ error: 'Invalid slot' }, { status: 400 });
    }
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 });
    }
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'File must be jpeg, png, webp, or gif' }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: 'Image too large. Max 10 MB.' }, { status: 413 });
    }

    const slotDef = SLOTS[slot];
    const destPath = path.join(process.cwd(), 'public', slotDef.publicPath);
    const destDir = path.dirname(destPath);

    await mkdir(destDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(destPath, buffer);

    return NextResponse.json({ message: 'Image updated', publicPath: slotDef.publicPath });
  } catch (error) {
    console.error('Error updating site image:', error);
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}
