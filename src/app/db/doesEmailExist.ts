"use server";

import { PrismaClient } from "@/app/generated/prisma";
import { setTimeout } from "node:timers/promises";

const prisma = new PrismaClient();

export default async function doesEmailExist(email: string, id?: number) {
  const contact = await prisma.contact.findFirst({
    where: { email, id: id ? { not: id } : undefined },
  });

  await setTimeout(3000);

  return contact !== null;
}
