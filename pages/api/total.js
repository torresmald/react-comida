import { PrismaClient } from 'prisma/prisma-client';
import { formatearFecha } from '../../helpers';
const handler = async (request, response) => {
    const prisma = new PrismaClient();
    const hoy = formatearFecha(Date.now());
    
    if (request.method === 'POST') {
        try {
            const fechaFormateada = formatearFecha(request.body.fecha)
            const total = await prisma.total.create({
                data: {
                    fecha: fechaFormateada,
                    total: request.body.total,
                }
            })
            response.status(200).json(total);

        } catch (error) {
            console.log(error);
        }
    } else {
        const totalHoy = await prisma.total.findMany({
            where: {
                fecha: hoy
            }
        })
        const totalHistorico = await prisma.total.findMany({})
        response.status(200).json({ totalHoy, totalHistorico })
    }
}

export default handler;
