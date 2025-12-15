import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

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
