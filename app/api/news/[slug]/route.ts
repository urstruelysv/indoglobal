import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { newsItems } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [item] = await db.select().from(newsItems)
    .where(and(eq(newsItems.slug, slug), eq(newsItems.published, true)));
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}
