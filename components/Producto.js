import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatearPrecio } from "../helpers";
function Producto({producto}) {
    const {handleClickProductoElegido, handleChangeModal} = useQuiosco();
    const {nombre, imagen, precio} = producto
    return (
        <div className="border p-3 rounded">
            <Image width={400} height={500} alt="Imagen Producto" src={`/assets/img/${imagen}.jpg`} className="rounded"/>
            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                {formatearPrecio(precio)}
                </p>
                <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white uppercase w-full p-3 mt-5 font-bold rounded" onClick={() => {handleClickProductoElegido(producto), handleChangeModal()}}>Añadir</button>
            </div>
        </div>
    );
}

export default Producto;