import { PrismaClient } from "@/app/generated/prisma";

import { FaTrash } from "react-icons/fa";
import styles from "./Contact.module.css";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export function ButtonRemoveContact({ id }: { id: number }) {
  return (
    <form>
      <button
        className={styles.actionButton}
        title="Remove Contact"
        formAction={async () => {
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
