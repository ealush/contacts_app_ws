"use client";
import styles from "./ContactForm.module.css";

export function Submit({ label }: { label?: string }) {
  return (
    <button type="submit" form="contact-form" className={styles.submitButton}>
      {label || "Save"}
    </button>
  );
}
