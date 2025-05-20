import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

interface SubscribeRequestBody {
  name: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body as SubscribeRequestBody;

    if (!name || !name.trim() || !email || !email.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format provided." },
        { status: 400 }
      );
    }

    const newSubscription = await prisma.newsletterSubscription.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
      },
    });

    return NextResponse.json(
      {
        message: "Successfully subscribed!",
        subscription: newSubscription,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API Route Error - /api/subscribe POST:", error);

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return NextResponse.json(
        { error: "This email address is already subscribed." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "An internal server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
