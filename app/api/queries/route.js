import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Query from '@/models/Query';

// 1. GET Handler - Used by your Admin Panel to retrieve queries
export async function GET() {
  try {
    await dbConnect();

    // Fetch all queries sorted newest first
    const queries = await Query.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, queries },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching queries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch queries' },
      { status: 500 }
    );
  }
}

// 2. POST Handler - Used by your Contact Form to submit queries
export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    await dbConnect();

    const fullName = `${firstName} ${lastName || ''}`.trim();

    const newQuery = await Query.create({
      firstName: firstName.trim(),
      lastName: lastName ? lastName.trim() : '',
      name: fullName, // Saves both ways so q.name always works in the admin UI
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      subject: subject || 'Free Energy Audit Request',
      message: message.trim(),
      status: 'pending',
    });

    return NextResponse.json(
      { success: true, message: 'Query submitted successfully!', queryId: newQuery._id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST /api/queries:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}