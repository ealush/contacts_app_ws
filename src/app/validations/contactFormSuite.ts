import { create, test, enforce, only } from "vest";
import doesEmailExist from "../db/doesEmailExist";

export const contactFormSuite = create(
  "contactFormSuite",
  (data: FormData, currentField: string) => {
    const id = data.get("id") as string;
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const email = data.get("email") as string;

    only(currentField);

    test("firstName", "First name is required", () => {
      enforce(firstName).isNotBlank();
    });
    test("lastName", "Last name is required", () => {
      enforce(lastName).isNotBlank();
    });
    test("email", "Email is required", () => {
      enforce(email).isNotBlank();
    });

    test.memo(
      "email",
      "email already exists",
      async () => {
        const exists = await doesEmailExist(
          email,
          id ? parseInt(id) : undefined
        );

        enforce(exists).isFalsy();
      },
      [email, id]
    );
  }
);
