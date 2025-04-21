"use client";

import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import styles from "./Contact.module.css";

export function ButtonRemoveContact({ id }: { id: number }) {
  const router = useRouter();

  return (
    <button
      className={styles.actionButton}
      onClick={() => removeContact(id)}
      title="Remove Contact"
    >
      <FaTrash />
    </button>
  );

  async function removeContact(contactId: number) {
    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the page to show updated contact list
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.error("Error removing contact:", error);
    }
  }
}
