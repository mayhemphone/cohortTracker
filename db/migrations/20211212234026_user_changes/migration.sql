/*
  Warnings:

  - You are about to drop the column `classId` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `slackHandle` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `slackHandle` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Instructor" DROP CONSTRAINT "Instructor_classId_fkey";

-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "instructorId" INTEGER;

-- AlterTable
ALTER TABLE "Homework" ADD COLUMN     "instructorId" INTEGER;

-- AlterTable
ALTER TABLE "Instructor" DROP COLUMN "classId",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "slackHandle";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "slackHandle";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT E'default',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT E'default',
ADD COLUMN     "slackHandle" TEXT NOT NULL DEFAULT E'default';

-- CreateTable
CREATE TABLE "_InstructorToWorkshop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InstructorToWorkshop_AB_unique" ON "_InstructorToWorkshop"("A", "B");

-- CreateIndex
CREATE INDEX "_InstructorToWorkshop_B_index" ON "_InstructorToWorkshop"("B");

-- AddForeignKey
ALTER TABLE "Homework" ADD CONSTRAINT "Homework_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorToWorkshop" ADD FOREIGN KEY ("A") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorToWorkshop" ADD FOREIGN KEY ("B") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
