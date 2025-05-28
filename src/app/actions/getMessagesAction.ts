"use server";

import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();

export default async function getMessagesAction(id: number) {
  const msgs = await prisma.message.findMany({
    where: {
      contactId: id,
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 5,
  });

  return msgs.map((msg) => ({
    id: msg.id,
    content: msg.content,
    timestamp: msg.timestamp.toISOString(),
    contactId: msg.contactId,
  }));
}
