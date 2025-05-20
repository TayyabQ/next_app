import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function POST(request:Request){
  try{
    const body = await request.json();
    const {name,email,message} = body;

    const newContactMessage = await prisma.contactUsSchema.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim()
      },
    });
    if(newContactMessage){
      console.log("success")
    } else{
      throw new Error("Nope")
    }
  } catch(err){
    console.log(err)
  }
}
