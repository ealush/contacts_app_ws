"use client";

import { FaRegStar, FaStar } from "react-icons/fa";
import { ContactWithFavorite } from "../types";
import styles from "./Contact.module.css";
import { useState } from "react";

type ContactProps = {
  contact: ContactWithFavorite;
};

export function ButtonFavorite({ contact }: ContactProps) {
  const [isFavorite, setIsFavorite] = useState(!!contact.isFavorite);

  return (
    <button
      className={styles.actionButton}
      onClick={onClick}
      title={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
  );

  async function onClick() {
    const res = await fetch(`/api/contacts/${contact.id}/favorite`, {
      method: "PUT",
    });

    res.json().then((data) => setIsFavorite(!!data.isFavorite));
  }
}
