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
      <Header
        title="Contacts"
        action={
          <Link href="/contacts/new" className={styles.headerActionButton}>
            <FaPlus />
          </Link>
        }
      >
        <Tabs
          allCount={contacts.length}
          favoriteCount={contacts.filter((c) => c.isFavorite).length}
        />
      </Header>
      <Content>
        <ContactList contacts={contacts} />
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
      createdAt: "desc",
    },
  });
  return contacts;
}
