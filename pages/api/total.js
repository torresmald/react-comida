import { PrismaClient } from 'prisma/prisma-client';
import { formatearFecha } from '../../helpers';
const handler = async (request, response) => {
    const prisma = new PrismaClient();
    const hoy = formatearFecha(Date.now());
    const totalHoy = await prisma.total.findMany({
        where: {
            fecha: hoy
        }
    })
    const totalHistorico = await prisma.total.findMany({})
    response.status(200).json({ totalHoy, totalHistorico })
    if (request.method === 'POST') {
        try {
            const fechaFormateada = formatearFecha(request.body.fecha)
            const total = await prisma.total.create({
                data: {
                    fecha: fechaFormateada,
                    total: request.body.total,
                }
            })
        } catch (error) {
            console.log(error);
        }

        response.status(200).json(total);
    }
}

export default handler;

