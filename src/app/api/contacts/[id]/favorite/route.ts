// import { NextResponse } from "next/server";
// import { PrismaClient } from "@/app/generated/prisma";

// const prisma = new PrismaClient();

// export async function POST(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   console.log("Toggling favorite status for contact");
//   const { id } = await params;
//   const contactId = parseInt(id);
//   const contact = await prisma.contact.findUnique({
//     where: { id: contactId },
//   });
//   console.log("Contact found:", contact);
//   if (!contact) {
//     console.log("Contact not found");
//     return NextResponse.json({ error: "Contact not found" }, { status: 404 });
//   }
//   console.log("Checking if contact is already a favorite");
//   const existingFavorite = await prisma.favoriteContact.findUnique({
//     where: { contactId },
//   });
//   console.log("Existing favorite:", existingFavorite);
//   if (existingFavorite) {
//     console.log("Removing contact from favorites");
//     await prisma.favoriteContact.delete({
//       where: { contactId },
//     });
//     console.log("Contact removed from favorites");
//     return NextResponse.json({ isFavorite: false });
//   } else {
//     console.log("Adding contact to favorites");
//     await prisma.favoriteContact.create({
//       data: { contactId },
//     });
//     console.log("Contact added to favorites");
//     return NextResponse.json({ isFavorite: true });
//   }
// }
