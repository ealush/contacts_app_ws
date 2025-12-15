"use client";
import { useFormStatus } from "react-dom";
import styles from "./ContactForm.module.css";

export function Submit({ label }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" form="contact-form" className={styles.submitButton}>
      {label || pending ? "Saving..." : "Save"}
    </button>
  );
}
