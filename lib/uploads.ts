import { randomUUID } from 'crypto';
import { createReadStream } from 'fs';
import { mkdir, stat, unlink, writeFile } from 'fs/promises';
import path from 'path';

export const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

const EXT_TO_MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
};

// UUID v4 + image extension. Defense-in-depth against path traversal.
export const FILENAME_PATTERN = /^[a-f0-9-]{36}\.(jpg|jpeg|png|webp|gif)$/i;

export function getUploadDir(): string {
  const configured = process.env.GALLERY_UPLOAD_DIR;
  if (configured && configured.trim().length > 0) {
    return path.resolve(configured);
  }
  return path.resolve(process.cwd(), 'gallery-uploads');
}

export async function ensureUploadDir(): Promise<string> {
  const dir = getUploadDir();
  await mkdir(dir, { recursive: true });
  return dir;
}

export async function saveUpload(
  buffer: Buffer,
  mimeType: string,
): Promise<string> {
  const ext = MIME_TO_EXT[mimeType];
  if (!ext) throw new Error(`Unsupported mime type: ${mimeType}`);
  const dir = await ensureUploadDir();
  const filename = `${randomUUID()}.${ext}`;
  await writeFile(path.join(dir, filename), buffer);
  return filename;
}

export async function deleteUpload(filename: string): Promise<void> {
  if (!FILENAME_PATTERN.test(filename)) return;
  const full = path.join(getUploadDir(), filename);
  try {
    await unlink(full);
  } catch (err: unknown) {
    const e = err as NodeJS.ErrnoException;
    if (e?.code !== 'ENOENT') throw err;
  }
}

export async function readUpload(filename: string): Promise<{
  stream: ReadableStream<Uint8Array>;
  size: number;
  mimeType: string;
} | null> {
  if (!FILENAME_PATTERN.test(filename)) return null;
  const full = path.join(getUploadDir(), filename);
  try {
    const info = await stat(full);
    const ext = filename.split('.').pop()!.toLowerCase();
    const mimeType = EXT_TO_MIME[ext] ?? 'application/octet-stream';
    const nodeStream = createReadStream(full);
    const webStream = new ReadableStream<Uint8Array>({
      start(controller) {
        nodeStream.on('data', (chunk) => {
          controller.enqueue(chunk instanceof Buffer ? new Uint8Array(chunk) : (chunk as Uint8Array));
        });
        nodeStream.on('end', () => controller.close());
        nodeStream.on('error', (err) => controller.error(err));
      },
      cancel() {
        nodeStream.destroy();
      },
    });
    return { stream: webStream, size: info.size, mimeType };
  } catch (err: unknown) {
    const e = err as NodeJS.ErrnoException;
    if (e?.code === 'ENOENT') return null;
    throw err;
  }
}
