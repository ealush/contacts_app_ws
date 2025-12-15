import PageLayout, { Content, Header } from "@/app/components/PageLayout";
import { PrismaClient } from "../../generated/prisma/client";
import styles from "../../page.module.css";
import Contact from "@/app/components/Contact";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import PagerContainer from "./PagerContainer";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";

const prisma = new PrismaClient();

export default async function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = await getContact(parseInt(id));

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <PageLayout>
      <Header
        title={[contact.firstName, contact.lastName].filter(Boolean).join(" ")}
        action={
          <Link href="/" className={styles.headerActionButton}>
            <FaTimes />
          </Link>
        }
      />
      <Content disableScroll>
        <Contact contact={contact} contactPage />
        <Suspense fallback={<Loading />}>
          <PagerContainer contactId={contact.id} />
        </Suspense>
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
