"use server";

import { setTimeout } from "timers/promises";
import { prisma } from "../db/prismaClient";

export async function sendMessage(formData: FormData) {
  await setTimeout(1500);

  const id = formData.get("id") as string;
  const content = formData.get("content") as string;

  const message = await prisma.message.create({
    data: {
      content,
      contact: {
        connect: {
          id: parseInt(id),
        },
      },
    },
  });

  return {
    ...message,
    timestamp: message.timestamp.toISOString(),
  };
}
