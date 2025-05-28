"use server";

import { PrismaClient } from "@/app/generated/prisma";
import { redirect } from "next/navigation";
import { contactFormSuite } from "../validations/contactFormSuite";
import { SuiteSerializer } from "vest/SuiteSerializer";

const prisma = new PrismaClient();

export default async function upsertContactAction(formData: FormData) {
  const id = formData.get("id") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const middleName = formData.get("middleName") as string;
  const nickname = formData.get("nickname") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const email = formData.get("email") as string;
  const address = formData.get("address") as string;
  const note = formData.get("note") as string;
  const description = formData.get("description") as string;

  const result = await contactFormSuite.runStatic(formData);

  if (!result.isValid()) {
    return SuiteSerializer.serialize(result);
  }

  if (id != null) {
    await prisma.contact.update({
      where: { id: parseInt(id) },
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
  } else {
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
  }

  redirect("/");
}
