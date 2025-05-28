import { create, test, enforce } from "vest";

export const contactFormSuite = create("contactFormSuite", (data: FormData) => {
  const firstName = data.get("firstName") as string;
  const lastName = data.get("lastName") as string;
  const email = data.get("email") as string;

  test("firstName", "First name is required", () => {
    enforce(firstName).isNotBlank();
  });
  test("lastName", "Last name is required", () => {
    enforce(lastName).isNotBlank();
  });
  test("email", "Email is required", () => {
    enforce(email).isNotBlank();
  });
});
