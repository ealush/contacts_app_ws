"use server";

import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export default async function doesEmailExist(email: string, id?: number) {
  const contact = await prisma.contact.findFirst({
    where: { email, id: id ? { not: id } : undefined },
  });

  return contact !== null;
}
