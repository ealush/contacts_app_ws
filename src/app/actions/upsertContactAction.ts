"use server";
import { SuiteSerializer } from "vest/SuiteSerializer";

import { PrismaClient } from "@/app/generated/prisma";
import { redirect } from "next/navigation";
import { contactFormSuite } from "../validation/contactFormSuite";
const prisma = new PrismaClient();

export default async function upsertContactAction(formData: FormData) {
  const contactId = formData.get("contactId") as string;
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();
  const middleName = formData.get("middleName")?.toString();
  const nickname = formData.get("nickname")?.toString();
  const phoneNumber = formData.get("phoneNumber")?.toString();
  const email = formData.get("email")?.toString();
  const address = formData.get("address")?.toString();
  const note = formData.get("note")?.toString();
  const description = formData.get("description")?.toString();

  const result = await contactFormSuite.runStatic(formData);

  if (!result.isValid()) {
    return SuiteSerializer.serialize(result);
  }

  if (contactId === null || contactId === "") {
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
  } else {
    await prisma.contact.update({
      where: { id: parseInt(contactId) },
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
  }

  redirect("/");
}
