-- DropForeignKey
ALTER TABLE "petz" DROP CONSTRAINT "petz_userId_fkey";

-- DropForeignKey
ALTER TABLE "vaccines" DROP CONSTRAINT "vaccines_petId_fkey";

-- AddForeignKey
ALTER TABLE "petz" ADD CONSTRAINT "petz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vaccines" ADD CONSTRAINT "vaccines_petId_fkey" FOREIGN KEY ("petId") REFERENCES "petz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
