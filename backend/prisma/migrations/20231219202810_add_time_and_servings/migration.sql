/*
  Warnings:

  - Added the required column `servings` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "servings" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;
