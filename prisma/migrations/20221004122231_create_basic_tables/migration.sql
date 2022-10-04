-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "petz" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "petz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vaccines" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vaccines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "petz_name_userId_key" ON "petz"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "vaccines_name_petId_key" ON "vaccines"("name", "petId");

-- AddForeignKey
ALTER TABLE "petz" ADD CONSTRAINT "petz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vaccines" ADD CONSTRAINT "vaccines_petId_fkey" FOREIGN KEY ("petId") REFERENCES "petz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
