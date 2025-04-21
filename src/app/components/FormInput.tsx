import { ChangeEvent } from "react";
import styles from "./ContactForm.module.css";
import clsx from "clsx";

type FormInputProps = {
  label: string;
  value?: string;
  type?: string;
  name: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  defaultValue?: string;
  className?: string;
  message?: string;
};

export default function FormInput({
  label,
  value,
  type = "text",
  name,
  id,
  onChange,
  required = false,
  rows,
  defaultValue,
  className,
  message,
}: FormInputProps) {
  const isTextarea = type === "textarea";

  return (
    <div className={clsx(styles.formGroup, className)}>
      <div className={styles.labelContainer}>
        <label htmlFor={id}>{label}</label>
        {message ? <span>{message}</span> : null}
      </div>
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          defaultValue={defaultValue}
        />
      )}
    </div>
  );
}
