"use client";

import { FaRegStar, FaStar } from "react-icons/fa";
import { ContactWithFavorite } from "../types";
import styles from "./Contact.module.css";
import { useRouter } from "next/navigation";

type ContactProps = {
  contact: ContactWithFavorite;
};

export function ButtonFavorite({ contact }: ContactProps) {
  const router = useRouter();

  return (
    <button
      className={styles.actionButton}
      onClick={toggleFavorite}
      title={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {contact.isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
  );

  async function toggleFavorite() {
    await fetch(`/api/contacts/${contact.id}/favorite`, {
      method: "POST",
    });

    router.refresh();
  }
}
