"use server";

import { PrismaClient } from "@/app/generated/prisma";
import { setTimeout } from "timers/promises";

const prisma = new PrismaClient();

export default async function sendMessageAction(formData: FormData) {
  const content = formData.get("content") as string;
  const id = formData.get("id") as string;

  await setTimeout(1000);

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

  return {
    ...msg,
    timeStamp: msg.timestamp.toLocaleDateString(),
  };
}
