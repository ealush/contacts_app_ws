import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contactId = parseInt(id);
  const data = await request.json();

  const contact = await prisma.contact.update({
    where: { id: contactId },
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

// delete contact
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contactId = parseInt(id);

  await prisma.contact.delete({
    where: { id: contactId },
  });

  return NextResponse.json(
    { message: "Contact deleted successfully" },
    { status: 200 }
  );
}
