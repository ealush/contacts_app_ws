import { create, test, enforce, only } from "vest";
import "vest/enforce/email";

export const contactFormSuite = create(
  "contactFormSuite",
  (data: FormData, fieldName?: string) => {
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const email = data.get("email") as string;

    only(fieldName);

    test("firstName", "First name is required", () => {
      enforce(firstName).isNotBlank();
    });

    test("firstName", "First name must be at least 2 characters", () => {
      enforce(firstName).longerThan(1);
    });

    test("lastName", "Last name is required", () => {
      enforce(lastName).isNotBlank();
    });

    test("lastName", "Last name must be at least 2 characters", () => {
      enforce(lastName).longerThan(1);
    });

    test("email", "Email is required", () => {
      enforce(email).isNotBlank();
    });

    test("email", "Email must be a valid email address", () => {
      enforce(email).isEmail();
    });
  }
);
