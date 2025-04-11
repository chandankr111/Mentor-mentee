-- CreateEnum
CREATE TYPE "profession" AS ENUM ('Fullstack_Development', 'Backend_Development', 'Frontend_Development', 'Machine_Learning', 'Deep_Learning', 'DataBase_Management', 'Dsa', 'Trading', 'System_Design', 'Blockchain', 'Web3', 'Python');

-- CreateTable
CREATE TABLE "mentor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "about" VARCHAR(200) NOT NULL,
    "mentorship" "profession" NOT NULL,
    "qualification" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "experience" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "mentor_id_key" ON "mentor"("id");
