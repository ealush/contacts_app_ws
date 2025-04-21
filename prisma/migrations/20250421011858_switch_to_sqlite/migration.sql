-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "nickname" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "note" TEXT,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "favorite_contacts" (
    "contactId" INTEGER NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "favorite_contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "favorite_contacts_contactId_key" ON "favorite_contacts"("contactId");
