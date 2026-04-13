import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { contacts } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { rateLimit } from '@/lib/rate-limit';

const VALID_STATUSES = ['New', 'Called', 'Visited', 'Converted', 'Not Converted'];

function sanitize(str: string, maxLength: number): string {
  return str.trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    // Rate limit: 5 submissions per minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const { success } = rateLimit(`contact:${ip}`, { maxRequests: 5, windowMs: 60 * 1000 });
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 100);
    const phone = body.phone ? sanitize(body.phone, 20) : null;
    const subject = sanitize(body.subject, 200);
    const message = sanitize(body.message, 2000);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Phone validation if provided
    if (phone) {
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
      }
    }

    const [contact] = await db.insert(contacts).values({
      name,
      email,
      phone,
      subject,
      message,
    }).returning();

    return NextResponse.json(
      { message: 'Message sent successfully', id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact request:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

// Protected by middleware — admin only
export async function GET() {
  try {
    const db = getDb();
    const data = await db.query.contacts.findMany({
      orderBy: [desc(contacts.submittedAt)]
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
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

    await db.update(contacts)
      .set({ status })
      .where(eq(contacts.id, id));

    return NextResponse.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating contact status:', error);
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

    await db.delete(contacts).where(eq(contacts.id, id));

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
