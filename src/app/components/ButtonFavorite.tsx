"use client";

import { FaRegStar, FaStar } from "react-icons/fa";
import { ContactWithFavorite } from "../types";
import styles from "./Contact.module.css";

type ContactProps = {
  contact: ContactWithFavorite;
};

export function ButtonFavorite({ contact }: ContactProps) {
  return (
    <button
      className={styles.actionButton}
      title={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {contact.isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
  );
}
