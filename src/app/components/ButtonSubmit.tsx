"use client";

import { useFormStatus } from "react-dom";
import styles from "./ContactForm.module.css";

export default function ButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" form="contact-form" className={styles.submitButton}>
      {pending ? "saving..." : "save"}
    </button>
  );
}
