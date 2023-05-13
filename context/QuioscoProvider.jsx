import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { formatearFecha } from '../helpers';
const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [productoElegido, setProductoElegido] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);
    // const [totalDia, setTotalDia] = useState({
    //     total: 0,
    //     fecha: formatearFecha(Date.now())
    // });

    const router = useRouter();

    const handleClickCategoriaActual = (id) => {
        const categoria = categorias.filter((category) => category.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    };
    const handleClickProductoElegido = (producto) => {
        setProductoElegido(producto);
    };
    const handleChangeModal = () => {
        setModal(!modal)
    };
    const handleAgregarPedido = (producto) => {
        if (pedido.some(productoState => productoState.id === producto.id)) {
            const pedidoActualizado = pedido.map((productoState) => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado);
            toast.success('Actualizado correctamente', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } else {
            setPedido([...pedido, producto])
            toast.success('Añadido correctamente', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
        setModal(false)
    };
    const handleEditarCantidad = (id) => {
        const productoActualizadoCantidad = pedido.filter((producto) => producto.id === id);
        setModal(!modal)
        setProductoElegido(productoActualizadoCantidad[0])
    };
    const handleEliminarProducto = (id) => {
        const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
        setPedido(pedidoActualizado);
    }
    const handleNombre = (nombre) => {
        setNombre(nombre);
    }
    const enviarPedido = async (event) => {
        event.preventDefault()
        try {
            const fechaFormateada = formatearFecha(Date.now());
            const { data } = await axios.post('/api/ordenes', {pedido, nombre, total, fecha: fechaFormateada});
            const {data : datosTotales} = await axios.post('/api/total', {fecha: Date.now(), total: total})
        } catch (error) {
            console.log(error);
        }
        setNombre('')
        setPedido([])
        setTotal(0)
        setCategoriaActual(categorias[0])
        toast.success('Pedido Realizado')
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }
    useEffect(() => {
        const totalActualizado = pedido.reduce((acc, current) => (current.precio * current.cantidad) + acc, 0);
        setTotal(totalActualizado)
    }, [pedido])
    useEffect(() => {
        const obtenerCategorias = async () => {
            const { data } = await axios('/api/categorias');
            setCategorias(data)
        }
        obtenerCategorias()
    }, []);
    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias]);

    return (
        <QuioscoContext.Provider value=
            {{
                categorias, categoriaActual, handleClickCategoriaActual, handleClickProductoElegido, productoElegido, handleChangeModal, modal, handleAgregarPedido, pedido, handleEditarCantidad, handleEliminarProducto, handleNombre, nombre, enviarPedido, total
            }}>
            {children}
        </QuioscoContext.Provider>
    )
}

export default QuioscoContext;

export { QuioscoProvider }