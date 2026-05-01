import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { careerApplications } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { rateLimit } from '@/lib/rate-limit';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';

const MAX_RESUME_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const VALID_POSITION_TYPES = ['Teaching', 'Non-Teaching'];

function sanitize(str: string, maxLength: number): string {
  return str.trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const { success } = rateLimit(`career:${ip}`, { maxRequests: 3, windowMs: 60 * 1000 });
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const formData = await request.formData();

    const fullName = sanitize(formData.get('fullName') as string || '', 100);
    const email = sanitize(formData.get('email') as string || '', 100);
    const phone = sanitize(formData.get('phone') as string || '', 20);
    const positionType = formData.get('positionType') as string || '';
    const positionApplying = sanitize(formData.get('positionApplying') as string || '', 100);
    const qualification = sanitize(formData.get('qualification') as string || '', 200);
    const experience = sanitize(formData.get('experience') as string || '', 50);
    const message = formData.get('message') ? sanitize(formData.get('message') as string, 1000) : null;
    const resume = formData.get('resume') as File;

    // Required fields
    if (!fullName || !email || !phone || !positionType || !positionApplying || !qualification || !experience) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Phone validation
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    // Position type whitelist
    if (!VALID_POSITION_TYPES.includes(positionType)) {
      return NextResponse.json({ error: 'Invalid position type' }, { status: 400 });
    }

    // Resume validation
    if (!resume) {
      return NextResponse.json({ error: 'Resume is required' }, { status: 400 });
    }

    if (resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json({ error: 'Resume too large. Maximum 3MB.' }, { status: 400 });
    }

    if (!ALLOWED_RESUME_TYPES.includes(resume.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use PDF or DOC/DOCX.' }, { status: 400 });
    }

    // Save resume file
    const extMap: Record<string, string> = {
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    };
    const ext = extMap[resume.type] || 'pdf';
    const filename = `resume-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const uploadDir = path.join(process.cwd(), 'uploads', 'resumes');
    await mkdir(uploadDir, { recursive: true });

    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadDir, filename), buffer);

    // Save to database
    const [application] = await db.insert(careerApplications).values({
      fullName,
      email,
      phone,
      positionType: positionType as "Teaching" | "Non-Teaching",
      positionApplying,
      qualification,
      experience,
      resumeFilename: filename,
      resumeOriginalName: resume.name.slice(0, 200),
      message,
    }).returning();

    return NextResponse.json(
      { message: 'Application submitted successfully', id: application.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing career application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

// Protected by proxy — admin only
export async function GET() {
  try {
    const db = getDb();
    const data = await db.query.careerApplications.findMany({
      orderBy: [desc(careerApplications.submittedAt)]
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading career applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

// Protected by proxy — admin only
export async function PATCH(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const VALID_STATUSES = ['New', 'Called', 'Visited', 'Converted', 'Not Converted'];
    if (typeof id !== 'number' || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid ID or status value' }, { status: 400 });
    }

    await db.update(careerApplications)
      .set({ status })
      .where(eq(careerApplications.id, id));

    return NextResponse.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating career status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

// Protected by proxy — admin only
export async function DELETE(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');

    if (!idParam) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id) || id <= 0) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // Get application to delete resume file
    const apps = await db.select().from(careerApplications).where(eq(careerApplications.id, id));
    if (apps[0]) {
      const filePath = path.join(process.cwd(), 'uploads', 'resumes', apps[0].resumeFilename);
      try { await unlink(filePath); } catch { /* file may not exist */ }
    }

    await db.delete(careerApplications).where(eq(careerApplications.id, id));

    return NextResponse.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting career application:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
