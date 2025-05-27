"use server";

import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export default async function sendMessageAction(formData: FormData) {
  const content = formData.get("content") as string;
  const id = formData.get("id") as string;

  return await prisma.message.create({
    data: {
      content,
      contact: {
        connect: {
          id: parseInt(id),
        },
      },
    },
  });
}
