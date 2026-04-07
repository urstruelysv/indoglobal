import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { admissions } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.parentName || !body.phone || !body.studentDOB || !body.classApplying) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Alt phone validation
    if (body.altPhone && !phoneRegex.test(body.altPhone)) {
      return NextResponse.json(
        { error: 'Invalid alternate phone number' },
        { status: 400 }
      );
    }

    // Email validation if provided
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }
    }

    // Insert into DB
    const [submission] = await db.insert(admissions).values({
      parentName: body.parentName,
      studentDOB: body.studentDOB,
      phone: body.phone,
      altPhone: body.altPhone || null,
      classApplying: body.classApplying,
      email: body.email || null,
    }).returning();

    return NextResponse.json(
      { message: 'Application submitted successfully', id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing admission request:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await db.query.admissions.findMany({
      orderBy: [desc(admissions.submittedAt)]
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading admissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admissions' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await db.delete(admissions).where(eq(admissions.id, parseInt(id)));

    return NextResponse.json({ message: 'Admission deleted successfully' });
  } catch (error) {
    console.error('Error deleting admission:', error);
    return NextResponse.json({ error: 'Failed to delete admission' }, { status: 500 });
  }
}
