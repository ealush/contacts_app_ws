"use server";

import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export default async function fetchMessagesAction(contactId: number) {
  const messages = await prisma.message.findMany({
    where: {
      contactId: contactId,
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 5,
  });

  return messages.map((msg) => ({
    ...msg,
    timestamp: msg.timestamp.toISOString(),
  }));
}
