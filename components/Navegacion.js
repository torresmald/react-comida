import { useRouter } from 'next/router';
const nav = [
    { paso: 1, nombre: 'Menú', url: '/' },
    { paso: 2, nombre: 'Resumen', url: '/resumen' },
    { paso: 3, nombre: 'Total', url: '/total' },
]

function Navegacion() {
    const router = useRouter();
    const calcularPorcentaje = () => {
        let valor;
        if(router.pathname === '/'){
            valor = 10
        } else if(router.pathname === '/resumen'){
            valor = 50
        } else {
            valor = 100
        }
        return valor
    }
    return (
        <>
            <div className="flex justify-between mb-4">
                {nav.map((paso) => (
                    <button key={paso.paso} className="text-2xl font-bold" onClick={() => {
                        router.push(paso.url)
                    }}>
                        {paso.nombre}
                    </button>
                ))}
            </div>
            <div className='bg-gray-100 mb-10'>
                <div className='rounded-full bg-amber-500 text-xs leading-none text-center text-white h-2' style={{width: `${calcularPorcentaje()}%`}}>
                </div>
            </div>
        </>

    );
}

export default Navegacion;