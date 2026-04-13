import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { admissions } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { rateLimit } from '@/lib/rate-limit';

const VALID_CLASSES = [
  'kindergarten', 'pp1', 'pp2',
  'grade1', 'grade2', 'grade3', 'grade4',
  'grade5', 'grade6', 'grade7',
];

const VALID_STATUSES = ['New', 'Called', 'Visited', 'Converted', 'Not Converted'];

function sanitize(str: string, maxLength: number): string {
  return str.trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    // Rate limit: 5 submissions per minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const { success } = rateLimit(`admission:${ip}`, { maxRequests: 5, windowMs: 60 * 1000 });
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();

    if (!body.parentName || !body.phone || !body.studentDOB || !body.classApplying) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const parentName = sanitize(body.parentName, 100);
    const studentDOB = sanitize(body.studentDOB, 20);
    const phone = sanitize(body.phone, 20);
    const altPhone = body.altPhone ? sanitize(body.altPhone, 20) : null;
    const classApplying = sanitize(body.classApplying, 50);
    const email = body.email ? sanitize(body.email, 100) : null;

    // Phone validation — must have at least 7 digits
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    if (altPhone) {
      const altDigits = altPhone.replace(/\D/g, '');
      if (altDigits.length < 7 || altDigits.length > 15) {
        return NextResponse.json({ error: 'Invalid alternate phone number' }, { status: 400 });
      }
    }

    // Class whitelist
    if (!VALID_CLASSES.includes(classApplying)) {
      return NextResponse.json({ error: 'Invalid class selection' }, { status: 400 });
    }

    // Email validation if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
      }
    }

    // DOB format check (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(studentDOB) || isNaN(Date.parse(studentDOB))) {
      return NextResponse.json({ error: 'Invalid date of birth format' }, { status: 400 });
    }

    const [submission] = await db.insert(admissions).values({
      parentName,
      studentDOB,
      phone,
      altPhone,
      classApplying,
      email,
    }).returning();

    return NextResponse.json(
      { message: 'Application submitted successfully', id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing admission request:', error);
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}

// Protected by middleware — admin only
export async function GET() {
  try {
    const db = getDb();
    const data = await db.query.admissions.findMany({
      orderBy: [desc(admissions.submittedAt)]
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading admissions:', error);
    return NextResponse.json({ error: 'Failed to fetch admissions' }, { status: 500 });
  }
}

// Protected by middleware — admin only
export async function PATCH(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    if (typeof id !== 'number' || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid ID or status value' }, { status: 400 });
    }

    await db.update(admissions)
      .set({ status })
      .where(eq(admissions.id, id));

    return NextResponse.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

// Protected by middleware — admin only
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

    await db.delete(admissions).where(eq(admissions.id, id));

    return NextResponse.json({ message: 'Admission deleted successfully' });
  } catch (error) {
    console.error('Error deleting admission:', error);
    return NextResponse.json({ error: 'Failed to delete admission' }, { status: 500 });
  }
}
