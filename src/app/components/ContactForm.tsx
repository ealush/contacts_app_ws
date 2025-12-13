"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ContactForm.module.css";
import FormInput from "./FormInput";
import PageLayout, { Content, Header } from "./PageLayout";
import Link from "next/link";
import { Submit } from "./Submit";

type ContactFormProps = {
  initialData?: {
    id?: number;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    email: string | null;
  };
  title: string;
};

export default function ContactForm({ initialData, title }: ContactFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    phoneNumber: initialData?.phoneNumber || "",
    email: initialData?.email || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  return (
    <PageLayout>
      <Header title={title} />
      <Content>
        <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
          <div className={styles.formContent}>
            <FormInput
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <FormInput
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <FormInput
              label="Phone Number"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formActions}>
            <Submit label={isSaving ? "Saving..." : "Save"} />
            <Link href="/" className={styles.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </Content>
    </PageLayout>
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = initialData?.id
        ? `/api/contacts/${initialData.id}`
        : "/api/contacts";

      const method = initialData?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving contact:", error);
    } finally {
      setIsSaving(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
}
