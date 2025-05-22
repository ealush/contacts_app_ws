"use client";

import { useActionState, useState } from "react";
import upsertContactAction from "../actions/upsertContactAction";
import ButtonSubmit from "./ButtonSubmit";
import styles from "./ContactForm.module.css";
import FormInput from "./FormInput";
import PageLayout, { Content, Header } from "./PageLayout";
import Link from "next/link";
import { SuiteSerializer } from "vest/SuiteSerializer";
import { contactFormSuite } from "../validation/contactFormSuite";
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

async function upsertContact(prevState: unknown, formData: FormData) {
  const result = await upsertContactAction(formData);

  SuiteSerializer.resume(contactFormSuite, result);
}

export default function ContactForm({ initialData, title }: ContactFormProps) {
  const [, formAction] = useActionState(upsertContact, null);
  const { onChange } = useVest();

  const cn = classnames(contactFormSuite.get(), {
    valid: styles.success,
    invalid: styles.error,
    warning: styles.warning,
  });

  return (
    <PageLayout>
      <Header title={title} />
      <Content>
        <form
          className={styles.form}
          id="contact-form"
          action={formAction}
          onChange={onChange}
        >
          <div className={styles.formContent}>
            {initialData?.id ? (
              <input
                type="hidden"
                name="contactId"
                value={initialData.id.toString()}
              />
            ) : null}
            <FormInput
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
              className={cn("firstName")}
              message={contactFormSuite.getMessage("firstName")}
              defaultValue={initialData?.firstName ?? ""}
            />

            <FormInput
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              className={cn("lastName")}
              message={contactFormSuite.getMessage("lastName")}
              defaultValue={initialData?.lastName ?? ""}
            />

            <FormInput
              label="Middle Name"
              type="text"
              id="middleName"
              name="middleName"
              defaultValue={initialData?.middleName ?? ""}
            />

            <FormInput
              label="Nickname"
              type="text"
              id="nickname"
              name="nickname"
              defaultValue={initialData?.nickname ?? ""}
            />

            <FormInput
              label="Phone Number"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={initialData?.phoneNumber ?? ""}
            />

            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              className={cn("email")}
              message={contactFormSuite.getMessage("email")}
              defaultValue={initialData?.email ?? ""}
            />

            <FormInput
              label="Address"
              type="text"
              id="address"
              name="address"
              defaultValue={initialData?.address ?? ""}
            />

            <FormInput
              label="Note"
              type="textarea"
              id="note"
              name="note"
              defaultValue={initialData?.note ?? ""}
              rows={3}
            />

            <FormInput
              label="Description"
              type="textarea"
              id="description"
              name="description"
              defaultValue={initialData?.description ?? ""}
              rows={3}
            />
          </div>
          <div className={styles.formActions}>
            <ButtonSubmit disabled={!contactFormSuite.isValid()} />
            <Link href="/" className={styles.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </Content>
    </PageLayout>
  );
}

function useVest() {
  const [, setVestState] = useState(contactFormSuite.get());

  return {
    onChange: handleChange,
  };

  function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    contactFormSuite(
      new FormData(e.target.form as HTMLFormElement),
      e.target.name
    ).done(() => {
      setVestState(contactFormSuite.get());
      console.log(contactFormSuite.get());
    });
  }
}
