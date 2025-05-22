"use client";

import { useFormStatus } from "react-dom";
import styles from "./ContactForm.module.css";

export default function ButtonSubmit({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      form="contact-form"
      className={styles.submitButton}
      disabled={pending || disabled}
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
