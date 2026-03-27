-- AlterTable
ALTER TABLE "acode_aqui"."users"
DROP COLUMN "username_normalized",
DROP COLUMN "username",
ALTER COLUMN "full_name" TYPE VARCHAR(255);
