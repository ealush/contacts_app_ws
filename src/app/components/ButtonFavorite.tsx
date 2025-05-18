import { FaRegStar, FaStar } from "react-icons/fa";
import { ContactWithFavorite } from "../types";
import styles from "./Contact.module.css";
import { PrismaClient } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

type ContactProps = {
  contact: ContactWithFavorite;
};

export function ButtonFavorite({ contact }: ContactProps) {
  return (
    <form>
      <button
        className={styles.actionButton}
        title={
          contact.isFavorite ? "Remove from favorites" : "Add to favorites"
        }
        formAction={async function toggleFavorite() {
          "use server";

          if (contact.isFavorite) {
            await prisma.favoriteContact.delete({
              where: { contactId: contact.id },
            });
          } else {
            await prisma.favoriteContact.create({
              data: { contactId: contact.id },
            });
          }

          revalidatePath("/");
        }}
      >
        {contact.isFavorite ? <FaStar /> : <FaRegStar />}
      </button>
    </form>
  );
}
