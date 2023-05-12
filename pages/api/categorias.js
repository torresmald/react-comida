import {PrismaClient} from 'prisma/prisma-client';
const handler = async (request, response) => {
    const prisma = new PrismaClient();
    const categorias = await prisma.categoria.findMany({
        include:{
            productos: true
        }
    });
    response.status(200).json(categorias);
}
export default handler;