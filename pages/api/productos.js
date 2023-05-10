import {PrismaClient} from 'prisma/prisma-client';

const handler = async (request, response) => {

    const prisma = new PrismaClient();
    const productos = await prisma.producto.findMany();
    response.status(200).json(productos);
}

export default handler;