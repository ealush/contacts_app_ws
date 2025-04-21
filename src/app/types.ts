import { Prisma } from "./generated/prisma";

export type ContactWithFavorite = Prisma.ContactGetPayload<{
  include: { isFavorite: true };
}>;
