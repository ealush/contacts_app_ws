"use client";

import { FaRegStar, FaStar } from "react-icons/fa";
import { ContactWithFavorite } from "../types";
import styles from "./Contact.module.css";
import { useState } from "react";

type ContactProps = {
  contact: ContactWithFavorite;
};

export function ButtonFavorite({ contact }: ContactProps) {
  const [isFavorite, setIsFavorite] = useState(contact.isFavorite);

  return (
    <button
      className={styles.actionButton}
      onClick={() => toggleFavorite(contact.id)}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
  );

  async function toggleFavorite(contactId: number) {
    await fetch(`/api/contacts/${contactId}/favorite`, {
      method: "POST",
    });
    setIsFavorite(!!isFavorite ? null : { contactId });
  }
}
