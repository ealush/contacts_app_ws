"use client";

import { useActionState } from "react";
import upsertContactAction from "../actions/upsertContactAction";
import ButtonSubmit from "./ButtonSubmit";
import styles from "./ContactForm.module.css";
import FormInput from "./FormInput";
import PageLayout, { Content, Header } from "./PageLayout";
import Link from "next/link";
import { SuiteSerializer } from "vest/SuiteSerializer";
import { contactFormSuite } from "../validations/contactFormSuite";
import classnames from "vest/classnames";

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

async function upsertContact(_: unknown, formData: FormData) {
  const result = await upsertContactAction(formData);

  SuiteSerializer.resume(contactFormSuite, result);
}

export default function ContactForm({ initialData, title }: ContactFormProps) {
  const [, formAction] = useActionState(upsertContact, null);

  const cn = classnames(contactFormSuite.get(), {
    valid: styles.success,
    invalid: styles.error,
    warning: styles.warning,
  });

  return (
    <PageLayout>
      <Header title={title} />
      <Content>
        <form action={formAction} className={styles.form} id="contact-form">
          <div className={styles.formContent}>
            {initialData ? (
              <input type="hidden" name="id" value={initialData?.id} />
            ) : null}
            <FormInput
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={initialData?.firstName}
              message={contactFormSuite.getMessage("firstName")}
              className={cn("firstName")}
            />

            <FormInput
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={initialData?.lastName}
              message={contactFormSuite.getMessage("lastName")}
              className={cn("lastName")}
            />

            <FormInput
              label="Middle Name"
              type="text"
              id="middleName"
              name="middleName"
              defaultValue={initialData?.middleName}
            />

            <FormInput
              label="Nickname"
              type="text"
              id="nickname"
              name="nickname"
              defaultValue={initialData?.nickname}
            />

            <FormInput
              label="Phone Number"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={initialData?.phoneNumber}
            />

            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              defaultValue={initialData?.email}
              message={contactFormSuite.getMessage("email")}
              className={cn("email")}
            />

            <FormInput
              label="Address"
              type="text"
              id="address"
              name="address"
              defaultValue={initialData?.address}
            />

            <FormInput
              label="Note"
              type="textarea"
              id="note"
              name="note"
              defaultValue={initialData?.note}
              rows={3}
            />

            <FormInput
              label="Description"
              type="textarea"
              id="description"
              name="description"
              defaultValue={initialData?.description}
              rows={3}
            />
          </div>
          <div className={styles.formActions}>
            <ButtonSubmit />
            <Link href="/" className={styles.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </Content>
    </PageLayout>
  );
}
