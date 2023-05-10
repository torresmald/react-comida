import {PrismaClient} from 'prisma/prisma-client';

const handler = async (request, response) => {
    const prisma = new PrismaClient();
    const orden = await prisma.orden.create({
        data: {
            nombre: request.body.nombre,
            pedido: request.body.pedido,
            fecha: request.body.fecha,
            total: request.body.total
        }
    })
    response.status(200).json(orden);
}

export default handler;