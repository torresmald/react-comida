import AdminLayout from "../layout/AdminLayout";
import Pedido from "../components/Pedido";
import axios from 'axios';
import useSwr from 'swr';
import useQuiosco from "../hooks/useQuiosco";
import { formatearPrecio, formatearFecha } from "../helpers";
import { useEffect, useState } from "react";
function Admin() {
    const [sumaDiaria, setSumaDiaria] = useState(0);

    const fetchTotal = () => axios('/api/total').then(datos => datos.data)
    const fetchOrdenes = () => axios('/api/ordenes').then(datos => datos.data)
    const { data: totalData, error: totalError, isLoading: totalIsLoading } = useSwr('/api/total', fetchTotal, { refreshInterval: 1000 })
    const { data: ordenesData, error: ordenesError, isLoading: ordenesIsLoading } = useSwr('/api/ordenes', fetchOrdenes, { refreshInterval: 1000 })

    useEffect(() => {
        const acumuladoDia = totalData?.reduce((acc, curr) => curr.total + acc, 0);
        setSumaDiaria(acumuladoDia);
    }, [totalData]);


    return (
        <AdminLayout pagina={'Admin'}>
            <h1 className="text-4xl font-black">Panel Admin</h1>
            <p className="text-2xl my-10">Administra los Pedidos</p>
            {ordenesData && ordenesData.length ? ordenesData.map((orden) => (
                <Pedido key={orden.id} orden={orden} />
            )) : <p>No hay pedidos</p>}
            <div className="mt-20">
                <p className="font-black text-3xl text-amber-500">{formatearFecha(Date.now())}</p>
                {sumaDiaria && <p className="font-black text-4xl text-red-500">Total Recaudado: {formatearPrecio(sumaDiaria)}</p>}
            </div>
        </AdminLayout>
    );
}

export default Admin;