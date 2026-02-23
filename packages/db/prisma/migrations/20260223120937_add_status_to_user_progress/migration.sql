-- CreateEnum
CREATE TYPE "StepStatus" AS ENUM ('NOT_STARTED', 'FAILED', 'PENDING', 'APPROVED');

-- AlterTable
ALTER TABLE "UserProgress" ADD COLUMN     "status" "StepStatus" NOT NULL DEFAULT 'NOT_STARTED';
