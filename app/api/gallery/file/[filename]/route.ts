import { NextRequest, NextResponse } from 'next/server';
import { FILENAME_PATTERN, readUpload } from '@/lib/uploads';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;

  if (!FILENAME_PATTERN.test(filename)) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  const file = await readUpload(filename);
  if (!file) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return new Response(file.stream, {
    headers: {
      'Content-Type': file.mimeType,
      'Content-Length': String(file.size),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
