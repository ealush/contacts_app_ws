"use server";

import { PrismaClient } from "@/app/generated/prisma";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function createContactAction(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const middleName = formData.get("middleName") as string;
  const nickname = formData.get("nickname") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const email = formData.get("email") as string;
  const address = formData.get("address") as string;
  const note = formData.get("note") as string;
  const description = formData.get("description") as string;

  await prisma.contact.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      nickname: nickname,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
      note: note,
      description: description,
    },
  });

  redirect("/");
}
