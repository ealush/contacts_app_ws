import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contactId = parseInt(id);
  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
  });
  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }
  const existingFavorite = await prisma.favoriteContact.findUnique({
    where: { contactId },
  });
  if (existingFavorite) {
    await prisma.favoriteContact.delete({
      where: { contactId },
    });
    return NextResponse.json({ isFavorite: false });
  } else {
    await prisma.favoriteContact.create({
      data: { contactId },
    });
    return NextResponse.json({ isFavorite: true });
  }
}
