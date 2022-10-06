/*
  Warnings:

  - Added the required column `genre` to the `petz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `petz` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypePetz" AS ENUM ('dog', 'cat');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "petz" ADD COLUMN     "genre" "Genre" NOT NULL,
ADD COLUMN     "type" "TypePetz" NOT NULL;
