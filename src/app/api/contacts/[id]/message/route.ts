import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const messages = await prisma.message.findMany({
    where: {
      contactId: parseInt(id),
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 5,
  });

  return NextResponse.json(messages);
}
