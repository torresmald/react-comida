import AdminLayout from "../layout/AdminLayout";
import Pedido from "../components/Pedido";
import axios from 'axios';
import useSwr from 'swr';
function Admin() {

    const fetcher = () => axios('/api/ordenes').then(datos => datos.data);
    const {data, error, isLoading} = useSwr('/api/ordenes', fetcher, {refreshInterval: 300})
    
    return (
        <AdminLayout pagina={'Admin'}>
            <h1 className="text-4xl font-black">Panel Admin</h1>
            <p className="text-2xl my-10">Administra los Pedidos</p>
            {data && data.length ? data.map((orden) => (
                <Pedido key={orden.id} orden={orden} />
            )) : <p>No hay pedidos</p>}
        </AdminLayout>
    );
}

export default Admin;