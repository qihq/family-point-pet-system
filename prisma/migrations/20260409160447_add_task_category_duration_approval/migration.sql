-- Manual migration created by Codex for Phase 6-A
-- Adds category, durationMin, needApproval to TaskPlan; category to TaskLog

ALTER TABLE "TaskPlan" ADD COLUMN IF NOT EXISTS "category" TEXT;
ALTER TABLE "TaskPlan" ADD COLUMN IF NOT EXISTS "durationMin" INTEGER;
ALTER TABLE "TaskPlan" ADD COLUMN IF NOT EXISTS "needApproval" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "TaskLog" ADD COLUMN IF NOT EXISTS "category" TEXT;
