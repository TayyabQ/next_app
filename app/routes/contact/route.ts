import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as ContactMessage;
    const newContactMessage = await prisma.contactUsSchema.create({
      data: {
        name: name,
        email: email,
        message: message,
      },
    });
    return NextResponse.json(
      {
        message: "Message Successfully sent!",
        contactMessage: newContactMessage,
      },
      { status: 201, statusText: "Message Successfully sent!" }
    );
  } catch (err) {
    console.log("sum ting wong", err);
    return NextResponse.json(
      {
        message: "Some thing wrong with the server!",
        contactMessage: "",
      },
      { status: 400, statusText: "Something wrong with the server!" }
    );
  }
}
