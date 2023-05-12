import {PrismaClient} from 'prisma/prisma-client';

const handler = async (request, response) => {
    const prisma = new PrismaClient();
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: false
        }
    })
    response.status(200).json(ordenes)
    if(request.method === 'POST'){
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
    }
    
}

export default handler;