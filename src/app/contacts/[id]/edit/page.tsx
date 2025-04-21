import { PrismaClient } from "../../../generated/prisma/client";
import ContactForm from "@/app/components/ContactForm";

const prisma = new PrismaClient();

async function getContact(id: number) {
  const contact = await prisma.contact.findUnique({
    where: { id },
  });
  return contact;
}

export default async function EditContact({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = await getContact(parseInt(id));

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return <ContactForm initialData={contact} title="Edit Contact" />;
}
