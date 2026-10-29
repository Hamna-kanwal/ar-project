import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Query from '@/models/Query';
import { sendQueryNotification } from '@/lib/mailer';

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
    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    await dbConnect();

    const cleanData = {
      firstName: firstName.trim(),
      lastName: lastName ? lastName.trim() : '',
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      message: message.trim(),
    };

    const newQuery = await Query.create({
      ...cleanData,
      status: 'pending',
    });

    // Send email notification (does not block or break the form if mail fails)
    try {
      await sendQueryNotification(cleanData);
    } catch (mailError) {
      console.error('Email notification failed:', mailError);
    }

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