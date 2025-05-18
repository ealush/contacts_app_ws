"use server";

import { PrismaClient } from "@/app/generated/prisma";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

export default async function createContactAction(formData: FormData) {
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();
  const middleName = formData.get("middleName")?.toString();
  const nickname = formData.get("nickname")?.toString();
  const phoneNumber = formData.get("phoneNumber")?.toString();
  const email = formData.get("email")?.toString();
  const address = formData.get("address")?.toString();
  const note = formData.get("note")?.toString();
  const description = formData.get("description")?.toString();

  await prisma.contact.create({
    data: {
      firstName,
      lastName,
      middleName,
      nickname,
      phoneNumber,
      email,
      address,
      note,
      description,
    },
  });

  redirect("/");
}
