import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();

  const contact = await prisma.contact.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
    },
  });

  return NextResponse.json(contact);
}
