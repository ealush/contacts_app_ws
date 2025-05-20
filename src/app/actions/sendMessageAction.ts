"use server";

import { PrismaClient } from "@/app/generated/prisma";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

const actionClient = createSafeActionClient();

const prisma = new PrismaClient();

const schema = z.object({
  id: z.number().int(),
  content: z.string().min(2),
});

export default actionClient
  .schema(schema)
  .action(async function sendMessage({ parsedInput: { id, content } }) {
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

    const isoString = msg.timestamp.toISOString();

    return {
      ...msg,
      timestamp: isoString,
    };
  });
