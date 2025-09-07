import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const productos = await prisma.products.findMany();
    console.log(productos);
}

main();
