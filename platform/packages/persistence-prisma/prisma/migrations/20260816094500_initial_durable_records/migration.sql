-- P4-S3 initial durable persistence migration.
-- Matches packages/persistence-prisma/prisma/schema.prisma.

CREATE TABLE IF NOT EXISTS "locker_records" (
  "id" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "locker_records_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "collection_records" (
  "id" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "collection_records_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "wishlist_records" (
  "id" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "wishlist_records_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "asset_records" (
  "id" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "asset_records_pkey" PRIMARY KEY ("id")
);
