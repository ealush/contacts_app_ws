"use client";

import { FaRegStar, FaStar } from "react-icons/fa";
import { ContactWithFavorite } from "../types";
import { useRouter } from "next/navigation";
import styles from "./Contact.module.css";

type ContactProps = {
  contact: ContactWithFavorite;
};

export function ButtonFavorite({ contact }: ContactProps) {
  const router = useRouter();

  return (
    <button
      className={styles.actionButton}
      onClick={() => toggleFavorite(contact.id)}
      title={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {contact.isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
  );

  async function toggleFavorite(contactId: number) {
    await fetch(`/api/contacts/${contactId}/favorite`, {
      method: "POST",
    });

    router.refresh();
  }
}
