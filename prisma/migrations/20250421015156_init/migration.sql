/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isFavorite` on the `favorite_contacts` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Contact";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT,
    "lastName" TEXT,
    "middleName" TEXT,
    "nickname" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "address" TEXT,
    "note" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mostRecentContactDate" DATETIME
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_favorite_contacts" (
    "contactId" INTEGER NOT NULL,
    CONSTRAINT "favorite_contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_favorite_contacts" ("contactId") SELECT "contactId" FROM "favorite_contacts";
DROP TABLE "favorite_contacts";
ALTER TABLE "new_favorite_contacts" RENAME TO "favorite_contacts";
CREATE UNIQUE INDEX "favorite_contacts_contactId_key" ON "favorite_contacts"("contactId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
