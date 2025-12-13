import { PrismaClient } from "../generated/prisma";
import Tabs from "../components/Tabs";
import PageLayout, { Header, Content } from "../components/PageLayout";
import ContactList from "../components/ContactList";

const prisma = new PrismaClient();

export default async function Favorites() {
  const contacts = await getContacts();
  const allCount = await prisma.contact.count();

  return (
    <PageLayout>
      <Header title="Favorites">
        <Tabs allCount={allCount} favoriteCount={contacts.length} />
      </Header>
      <Content>
        <ContactList contacts={contacts} />
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
      createdAt: "desc",
    },
  });
  return contacts;
}
