import Image from "next/image";
import { formatearPrecio } from "../helpers";
import axios from 'axios';
import { toast } from 'react-toastify'
function Pedido({ orden }) {
    const { id, nombre, total, pedido } = orden;
    const completarPedido = async (id) => {
        try {
            const { data } = await axios.post(`/api/ordenes/${id}`)
            toast.success('Completado')
        } catch (error) {
            toast.error('Hubo un error')
        }
    }
   
    return (
        <div className="border p-10 space-y-5">
            <h3 className="text-2xl font-bold">Pedido: {id}</h3>
            <p className="text-lg font-bold">Cliente: {nombre}</p>

            {pedido.map((orden) => (
                <div key={orden.id} className="py-3 border-b flex last-of-type:border-0 items-center">
                    <div className="w-32">
                        <Image width={400} height={500} src={`/assets/img/${orden.imagen}.jpg`} alt="Imagen Orden" />
                    </div>
                    <div className="p-5 space-y-2">
                        <h4 className="text-xl font-bold text-amber-500">
                            {orden.nombre}
                        </h4>
                        <p className="text-lg font-bold">
                            Cantidad: {orden.cantidad}
                        </p>
                    </div>
                </div>
            ))}
            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-4xl text-amber-500">Total a Pagar {formatearPrecio(total)}</p>
                <button className="bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer text-white mt-5 md:mt-0 p-2 rounded-lg uppercase font-bold" type="button" onClick={() => completarPedido(id)}>
                    Completar
                </button>
            </div>
        </div>
    );
}

export default Pedido;