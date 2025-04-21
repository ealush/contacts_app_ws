import Contact from "./Contact";
import { ContactWithFavorite } from "../types";
import styles from "./Contact.module.css";

type ContactListProps = {
  contacts: ContactWithFavorite[];
};

export default async function ContactList({ contacts }: ContactListProps) {
  return (
    <div className={styles.contactList}>
      {contacts.map((contact) => (
        <Contact contact={contact} key={contact.id} />
      ))}
    </div>
  );
}
