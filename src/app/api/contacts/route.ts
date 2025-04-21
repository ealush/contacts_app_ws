import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();

  const contact = await prisma.contact.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      nickname: data.nickname,
      phoneNumber: data.phoneNumber,
      email: data.email,
      address: data.address,
      note: data.note,
      description: data.description,
    },
  });

  return NextResponse.json(contact);
}
