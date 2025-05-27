import PageLayout, { Content, Header } from "@/app/components/PageLayout";
import { PrismaClient } from "../../generated/prisma/client";
import styles from "../../page.module.css";
import Contact from "@/app/components/Contact";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import Pager from "@/app/components/Pager";
import fetchMessagesAction from "@/app/actions/fetchMessagesAction";

const prisma = new PrismaClient();

export default async function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = await getContact(parseInt(id));
  const messages = await fetchMessagesAction(parseInt(id));

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <PageLayout>
      <Header
        title={[contact.firstName, contact.lastName].filter(Boolean).join(" ")}
      />
      <Content>
        <div>
          <Contact contact={contact} contactPage />
        </div>
        <Pager contactId={contact.id} messages={messages} />
        <Link href="/" className={styles.fab}>
          <FaTimes />
        </Link>
      </Content>
    </PageLayout>
  );
}

async function getContact(id: number) {
  const contact = await prisma.contact.findUnique({
    where: { id },
    include: {
      isFavorite: true,
      messages: true,
    },
  });
  return contact;
}
