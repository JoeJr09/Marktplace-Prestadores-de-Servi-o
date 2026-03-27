CREATE SCHEMA IF NOT EXISTS "acode_aqui";

-- CreateEnum
CREATE TYPE "acode_aqui"."UserRole" AS ENUM ('guest', 'customer', 'provider', 'admin');

-- CreateEnum
CREATE TYPE "acode_aqui"."UserAccountStatus" AS ENUM ('pending', 'active', 'inactive', 'suspended');

-- CreateTable
CREATE TABLE "acode_aqui"."users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "email_normalized" VARCHAR(320) NOT NULL,
    "username" VARCHAR(50),
    "username_normalized" VARCHAR(50),
    "full_name" VARCHAR(120) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "acode_aqui"."UserRole" NOT NULL DEFAULT 'customer',
    "status" "acode_aqui"."UserAccountStatus" NOT NULL DEFAULT 'pending',
    "is_seeded" BOOLEAN NOT NULL DEFAULT false,
    "last_login_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_by_user_id" UUID,
    "updated_by_user_id" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "acode_aqui"."users"
ADD CONSTRAINT "users_email_normalized_lowercase" CHECK ("email_normalized" = lower("email_normalized")),
ADD CONSTRAINT "users_username_normalized_lowercase" CHECK (
  "username_normalized" IS NULL OR "username_normalized" = lower("username_normalized")
),
ADD CONSTRAINT "users_full_name_not_blank" CHECK (length(trim("full_name")) > 0),
ADD CONSTRAINT "users_password_hash_not_blank" CHECK (length(trim("password_hash")) > 0),
ADD CONSTRAINT "users_username_pairing" CHECK (
  ("username" IS NULL AND "username_normalized" IS NULL)
  OR ("username" IS NOT NULL AND "username_normalized" IS NOT NULL)
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_normalized_unique_idx" ON "acode_aqui"."users"("email_normalized");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_normalized_unique_idx" ON "acode_aqui"."users"("username_normalized");

-- CreateIndex
CREATE INDEX "users_role_status_idx" ON "acode_aqui"."users"("role", "status");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "acode_aqui"."users"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "acode_aqui"."users" ADD CONSTRAINT "users_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "acode_aqui"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acode_aqui"."users" ADD CONSTRAINT "users_updated_by_user_id_fkey" FOREIGN KEY ("updated_by_user_id") REFERENCES "acode_aqui"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
