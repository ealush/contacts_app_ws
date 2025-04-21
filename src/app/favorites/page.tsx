import { PrismaClient } from "../generated/prisma";
import Tabs from "../components/Tabs";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import styles from "../page.module.css";
import PageLayout, { Header, Content } from "../components/PageLayout";
import ContactList from "../components/ContactList";

const prisma = new PrismaClient();

export default async function Favorites() {
  const contacts = await getContacts();

  return (
    <PageLayout>
      <Header title="Favorites">
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

async function getContacts() {
  const contacts = await prisma.contact.findMany({
    where: {
      isFavorite: {
        isNot: null,
      },
    },
    include: {
      isFavorite: true, // Include the related favorite data
    },
    orderBy: {
      firstName: "asc",
    },
  });
  return contacts;
}
