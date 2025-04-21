import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();

  const { id, content } = data;

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

  return NextResponse.json(message);
}

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
