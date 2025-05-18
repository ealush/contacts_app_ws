import upsertContactAction from "../actions/upsertContactAction";
import styles from "./ContactForm.module.css";
import FormInput from "./FormInput";
import PageLayout, { Content, Header } from "./PageLayout";
import Link from "next/link";

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
          className={styles.form}
          id="contact-form"
          action={upsertContactAction}
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
              defaultValue={initialData?.firstName ?? ""}
            />

            <FormInput
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
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
