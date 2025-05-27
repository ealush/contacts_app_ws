"use server";

import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();

export default async function getMessagesAction(id: number) {
  return await prisma.message.findMany({
    where: {
      contactId: id,
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 5,
  });
}
