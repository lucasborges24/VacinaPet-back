/*
  Warnings:

  - A unique constraint covering the columns `[name,userId,type]` on the table `petz` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "petz_name_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "petz_name_userId_type_key" ON "petz"("name", "userId", "type");
