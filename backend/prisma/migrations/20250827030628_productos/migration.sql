-- CreateEnum
CREATE TYPE "super_catalogo"."ProductStatus" AS ENUM ('DISPONIBLE', 'NO_DISPONIBLE', 'DESCONTINUADO');

-- CreateTable
CREATE TABLE "super_catalogo"."products" (
    "id_product" TEXT NOT NULL,
    "price_product" DECIMAL(65,30) NOT NULL,
    "stock_product" INTEGER NOT NULL DEFAULT 0,
    "status_product" "super_catalogo"."ProductStatus" NOT NULL,
    "name_product" TEXT NOT NULL,
    "title_product" TEXT NOT NULL,
    "tratamiento_product" TEXT[],
    "descuento_product" INTEGER NOT NULL,
    "img_product" TEXT[],
    "detalles_product" TEXT[],
    "caracteristicas_product" TEXT[],
    "calificacion_client" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id_product")
);
