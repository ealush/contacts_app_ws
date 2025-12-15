"use server";

import { redirect } from "next/navigation";
import { prisma } from "../db/prismaClient";
import { setTimeout } from "node:timers/promises";

export async function upsertContact(formData: FormData) {
  await setTimeout(1500);

  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    email: formData.get("email") as string,
  };

  await prisma.contact.upsert({
    where: {
      id: Number(formData.get("id")),
    },
    create: data,
    update: data,
  });

  redirect("/");
}
