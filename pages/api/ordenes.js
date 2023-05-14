import { PrismaClient } from 'prisma/prisma-client';

const handler = async (request, response) => {
    const prisma = new PrismaClient();
    if (request.method === 'GET') {
        const ordenes = await prisma.orden.findMany({
            where: {
                estado: false
            }
        })
        response.status(200).json(ordenes)
    }
    else if (request.method === 'POST') {
        try {
            const orden = await prisma.orden.create({
                data: {
                    nombre: request.body.nombre,
                    pedido: request.body.pedido,
                    fecha: request.body.fecha,
                    total: request.body.total,
                    estado: request.body.estado
                }
            })
            response.status(200).json(orden);
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: 'Error al crear la orden' })
        }
    }
}

export default handler;
