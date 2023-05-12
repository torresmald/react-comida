import Layout from "../layout/Layout";
import { useEffect, useCallback } from "react";
import useQuiosco from "../hooks/useQuiosco";
import { formatearPrecio } from "../helpers";
function Total() {
    const {pedido, handleNombre, nombre, enviarPedido, total} = useQuiosco()
    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3;
    }, [pedido, nombre]);
    useEffect(() => {
        comprobarPedido
    }, [pedido, comprobarPedido]);
    
    return (
        <Layout pagina={'Total'}>
            <h1 className="text-4xl font-black">Total</h1>
            <p className="text-2xl my-10">Confirma tu pedido</p>
            <form onSubmit={enviarPedido}>
                <div>
                    <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>
                    <input type="text" className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md" id="nombre" onChange={(event) => handleNombre(event.target.value)}/>
                </div>
                <div className="mt-10 ">
                    <p className="text-2xl">Total a Pagar: <span className="font-bold">{formatearPrecio(total)}</span></p>
                </div>
                <div className="mt-5">
                    <input value='Confirmar Pedido' className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white hover:cursor-pointer text-center`} type="submit" disabled={comprobarPedido()}/>
                </div>
            </form>
        </Layout>
    );
}

export default Total;