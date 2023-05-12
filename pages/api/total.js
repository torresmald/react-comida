import { PrismaClient } from 'prisma/prisma-client';
import { formatearFecha } from '../../helpers';
const handler = async (request, response) => {
    const prisma = new PrismaClient();
    const total = await prisma.total.findMany()
    response.status(200).json(total)
    if (request.method === 'POST') {
        const fechaFormateada = formatearFecha(request.body.fecha)
        const total = await prisma.total.create({
            data: {
                fecha: fechaFormateada,
                total: request.body.total,
            }
        })
        response.status(200).json(total);
    }
}

export default handler;