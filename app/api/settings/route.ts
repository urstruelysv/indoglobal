import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { siteSettings } from '@/lib/schema';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const VALID_KEYS = ['scholarship_banner', 'scholarship_popup'] as const;

export async function GET(req: NextRequest) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rows = await db.select().from(siteSettings);
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value === 'true']));

  return NextResponse.json({
    scholarship_banner: map['scholarship_banner'] ?? true,
    scholarship_popup:  map['scholarship_popup']  ?? true,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { key, value } = body as { key: string; value: boolean };

  if (!VALID_KEYS.includes(key as typeof VALID_KEYS[number])) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
  }

  await db
    .insert(siteSettings)
    .values({ key, value: String(value) })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: String(value), updatedAt: new Date() },
    });

  revalidatePath('/', 'layout');

  return NextResponse.json({ success: true });
}
