import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import ResumenProducto from "../components/ResumenProducto";
function resumen() {
    const { pedido } = useQuiosco()
    return (
        <Layout pagina={'Resumen'}>
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu pedido</p>
            {pedido.length === 0 ? (
                <p className="text-center text-2xl">Añade Productos</p>
            ) : (
                pedido.map((producto) => (
                    <ResumenProducto producto={producto} key={producto.id} />
                ))
            )}
        </Layout>
    );
}

export default resumen;