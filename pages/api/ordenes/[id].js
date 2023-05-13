import { PrismaClient } from 'prisma/prisma-client';

const handler = async (request, response) => {
    const prisma = new PrismaClient();
    const { id } = request.query;
    if (request.method === 'POST') {
        const pedidoActualizado = await prisma.orden.update({
            where: {
                id: parseInt(id)
            },
            data: {
                estado: true
            }
        })
        response.status(200).json(pedidoActualizado)
    }
}

export default handler;