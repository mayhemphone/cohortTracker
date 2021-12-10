/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToCohort` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Instructor" DROP CONSTRAINT "Instructor_classId_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToCohort" DROP CONSTRAINT "_ClassToCohort_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToCohort" DROP CONSTRAINT "_ClassToCohort_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToStudent" DROP CONSTRAINT "_ClassToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToStudent" DROP CONSTRAINT "_ClassToStudent_B_fkey";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "_ClassToCohort";

-- DropTable
DROP TABLE "_ClassToStudent";

-- CreateTable
CREATE TABLE "Workshop" (
    "id" SERIAL NOT NULL,
    "replayUrl" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CohortToWorkshop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_StudentToWorkshop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Workshop_lessonId_key" ON "Workshop"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "_CohortToWorkshop_AB_unique" ON "_CohortToWorkshop"("A", "B");

-- CreateIndex
CREATE INDEX "_CohortToWorkshop_B_index" ON "_CohortToWorkshop"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToWorkshop_AB_unique" ON "_StudentToWorkshop"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToWorkshop_B_index" ON "_StudentToWorkshop"("B");

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Workshop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workshop" ADD CONSTRAINT "Workshop_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CohortToWorkshop" ADD FOREIGN KEY ("A") REFERENCES "Cohort"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CohortToWorkshop" ADD FOREIGN KEY ("B") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToWorkshop" ADD FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToWorkshop" ADD FOREIGN KEY ("B") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
