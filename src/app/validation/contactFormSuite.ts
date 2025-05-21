import { create, test, enforce } from "vest";

export const contactFormSuite = create("contactFormSuite", (data: FormData) => {
  const firstName = data.get("firstName") as string;
  const lastName = data.get("lastName") as string;
  const email = data.get("email") as string;

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
    enforce(email).matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  });
});
