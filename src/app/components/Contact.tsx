import { FaEdit } from "react-icons/fa";
import styles from "./Contact.module.css";
import { ContactWithFavorite } from "../types";
import Link from "next/link";
import { ButtonFavorite } from "./ButtonFavorite";
import { ButtonRemoveContact } from "./ButtonRemoveContact";

type ContactProps = {
  contact: ContactWithFavorite;
  contactPage?: boolean;
};

export default async function Contact({ contact, contactPage }: ContactProps) {
  return (
    <div className={styles.contactItem}>
      <div className={styles.contactHeader}>
        <div className={styles.contactName}>
          <Link href={`/contacts/${contact.id}`}>
            {contact.firstName} {contact.lastName}
          </Link>
        </div>
        <div className={styles.contactActions}>
          <ButtonFavorite contact={contact} />
          <Link
            href={`/contacts/${contact.id}/edit`}
            className={styles.actionButton}
            title="Edit contact"
          >
            <FaEdit />
          </Link>
          <ButtonRemoveContact id={contact.id} />
        </div>
      </div>
      <div className={styles.contactDetails}>
        {contact.nickname && <div>👤 {contact.nickname}</div>}
        {contact.phoneNumber && <div>📞 {contact.phoneNumber}</div>}
        {contact.email && <div>✉️ {contact.email}</div>}
        {contactPage ? (
          <>
            {contact.address && <div>📍 {contact.address}</div>}
            {contact.note && <div>📝 {contact.note}</div>}
            {contact.description && <div>ℹ️ {contact.description}</div>}
          </>
        ) : null}
      </div>
    </div>
  );
}
