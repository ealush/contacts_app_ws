"use server";

import { setTimeout } from "timers/promises";
import { prisma } from "../db/prismaClient";

export async function getMessages(contactId: number) {
  await setTimeout(1500);
  const messages = await prisma.message.findMany({
    where: {
      contactId,
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
