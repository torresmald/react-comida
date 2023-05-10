import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
function Categoria({ categoria }) {
    const { nombre, icono, id } = categoria;
    const {categoriaActual, handleClickCategoriaActual} = useQuiosco();
    return (
        <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : '' } flex items-center gap-4 w-full border p-5 hover:bg-amber-400 rounded`}>
            <Image alt="Imagen Icono" src={`/assets/img/icono_${icono}.svg`} width={70} height={70} className="mr-5" />
            <button type="button" className="text-2xl font-bold hover:cursor-pointer" onClick={() => handleClickCategoriaActual(id)}>
                {nombre}
            </button>
        </div>
    );
}

export default Categoria;