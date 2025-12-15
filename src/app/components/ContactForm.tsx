import styles from "./ContactForm.module.css";
import FormInput from "./FormInput";
import PageLayout, { Content, Header } from "./PageLayout";
import Link from "next/link";
import { Submit } from "./Submit";
import { upsertContact } from "../actions/upsertContact";

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
  return (
    <PageLayout>
      <Header title={title} />
      <Content>
        <form className={styles.form} id="contact-form" action={upsertContact}>
          <input type="hidden" name="id" value={initialData?.id} />
          <div className={styles.formContent}>
            <FormInput
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={initialData?.firstName}
            />

            <FormInput
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={initialData?.lastName}
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
            />
          </div>
          <div className={styles.formActions}>
            <Submit />
            <Link href="/" className={styles.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </Content>
    </PageLayout>
  );
}
