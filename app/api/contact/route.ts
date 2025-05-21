import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma'; // Ensure this path is correct

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactRequestBody;
    const { name, email, message } = body;
    console.log(name);
    console.log(email);
    console.log(message);

    if (!name || typeof name !== 'string' || name.trim() === "") {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || email.trim() === "") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim() === "") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const newContactMessage = await prisma.contactUsSchema.create({ // Ensure 'contactUsSchema' is your correct model name
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      },
    });

    return NextResponse.json(
      { message: "Message received successfully", data: newContactMessage },
      { status: 201 }
    );

  } catch (err: any) {
    console.error("API Error /api/contact:", err);
    if (err instanceof SyntaxError && err.message.includes("JSON")) {
        return NextResponse.json({ error: "Invalid JSON payload provided." }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to submit message. Please try again later." }, { status: 500 });
  }
}