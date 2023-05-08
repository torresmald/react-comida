import {PrismaClient} from 'prisma/prisma-client';

export default  handler = async (request, response) => {

    const prisma = new PrismaClient();
    const categorias = await prisma.categoria.findMany();
    response.status(200).json(categorias);
}