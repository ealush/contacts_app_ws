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
      phoneNumber: data.phoneNumber,
      email: data.email,
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
