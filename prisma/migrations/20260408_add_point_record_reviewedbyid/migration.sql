-- Add reviewedById column for Prisma client
ALTER TABLE "PointRecord" ADD COLUMN IF NOT EXISTS "reviewedById" TEXT;