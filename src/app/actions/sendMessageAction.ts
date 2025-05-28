"use server";

import { PrismaClient } from "@/app/generated/prisma";
import { setTimeout } from "timers/promises";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

const actionClient = createSafeActionClient();

const schema = z.object({
  content: z.string().min(1).max(10),
  id: z.number(),
});

const prisma = new PrismaClient();

export default actionClient
  .schema(schema)
  .action(async ({ parsedInput: { content, id } }) => {
    const msg = await prisma.message.create({
      data: {
        content,
        contact: {
          connect: {
            id,
          },
        },
      },
    });

    return {
      ...msg,
      timeStamp: msg.timestamp.toLocaleDateString(),
    };
  });
