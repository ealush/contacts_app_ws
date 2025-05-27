"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ContactForm.module.css";
import FormInput from "./FormInput";
import PageLayout, { Content, Header } from "./PageLayout";
import Link from "next/link";
import createContactAction from "../actions/createContactAction";

type ContactFormProps = {
  initialData?: {
    id?: number;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    nickname: string | null;
    phoneNumber: string | null;
    email: string | null;
    address: string | null;
    note: string | null;
    description: string | null;
  };
  title: string;
};

export default function ContactForm({ initialData, title }: ContactFormProps) {
  return (
    <PageLayout>
      <Header title={title} />
      <Content>
        <form
          action={createContactAction}
          className={styles.form}
          id="contact-form"
        >
          <div className={styles.formContent}>
            <FormInput
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
            />

            <FormInput
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
            />

            <FormInput
              label="Middle Name"
              type="text"
              id="middleName"
              name="middleName"
            />

            <FormInput
              label="Nickname"
              type="text"
              id="nickname"
              name="nickname"
            />

            <FormInput
              label="Phone Number"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
            />

            <FormInput label="Email" type="email" id="email" name="email" />

            <FormInput
              label="Address"
              type="text"
              id="address"
              name="address"
            />

            <FormInput
              label="Note"
              type="textarea"
              id="note"
              name="note"
              rows={3}
            />

            <FormInput
              label="Description"
              type="textarea"
              id="description"
              name="description"
              rows={3}
            />
          </div>
          <div className={styles.formActions}>
            <button
              type="submit"
              form="contact-form"
              className={styles.submitButton}
            >
              Save
            </button>
            <Link href="/" className={styles.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </Content>
    </PageLayout>
  );
}
