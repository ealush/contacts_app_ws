"use server";

import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export default async function sendMessageAction(formData: FormData) {
  const id = formData.get("id") as string;
  const content = formData.get("content") as string;

  const msg = await prisma.message.create({
    data: {
      content,
      contact: {
        connect: {
          id: parseInt(id),
        },
      },
    },
  });

  const isoString = msg.timestamp.toISOString();

  return {
    ...msg,
    timestamp: isoString,
  };
}
