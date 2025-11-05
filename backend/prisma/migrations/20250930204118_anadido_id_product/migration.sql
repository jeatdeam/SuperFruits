/*
  Warnings:

  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_product` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `type_fruit` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "super_catalogo"."products" DROP CONSTRAINT "products_pkey",
ADD COLUMN     "type_fruit" TEXT NOT NULL,
DROP COLUMN "id_product",
ADD COLUMN     "id_product" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id_product");

-- CreateTable
CREATE TABLE "super_catalogo"."clientes" (
    "name" TEXT NOT NULL,
    "email" TEXT,
    "lastname" TEXT NOT NULL,
    "phoneone" TEXT NOT NULL,
    "phonetwo" TEXT DEFAULT '000000000',
    "departamento" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "courier" TEXT NOT NULL,
    "textarea" TEXT NOT NULL DEFAULT 'recojo en tienda',
    "products" TEXT[],
    "fecha" TIMESTAMPTZ(6),
    "allcheck" BOOLEAN NOT NULL,
    "id_client" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id_client")
);
