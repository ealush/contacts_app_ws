import { FaTrash } from "react-icons/fa";
import styles from "./Contact.module.css";

import { PrismaClient } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export function ButtonRemoveContact({ id }: { id: number }) {
  return (
    <form>
      <button
        className={styles.actionButton}
        title="Remove Contact"
        formAction={async function removeContact() {
          "use server";

          await prisma.contact.delete({
            where: { id },
          });

          revalidatePath("/");
        }}
      >
        <FaTrash />
      </button>
    </form>
  );
}
