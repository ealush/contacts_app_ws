import styles from "./page.module.css";
import { PrismaClient } from "./generated/prisma";
import Tabs from "./components/Tabs";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import PageLayout, { Header, Content } from "./components/PageLayout";
import ContactList from "./components/ContactList";

export default async function Home() {
  const contacts = await getContacts();

  return (
    <PageLayout>
      <Header title="Contacts">
        <Tabs />
      </Header>
      <Content>
        <ContactList contacts={contacts} />
        <Link href="/contacts/new" className={styles.fab}>
          <FaPlus />
        </Link>
      </Content>
    </PageLayout>
  );
}

const prisma = new PrismaClient();

async function getContacts() {
  const contacts = await prisma.contact.findMany({
    include: {
      isFavorite: true,
    },
    orderBy: {
      firstName: "asc",
    },
  });
  return contacts;
}
