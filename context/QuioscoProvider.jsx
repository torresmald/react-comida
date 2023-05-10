import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [productoElegido, setProductoElegido] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);

    const handleClickCategoriaActual = (id) => {
        const categoria = categorias.filter((category) => category.id === id)
        setCategoriaActual(categoria[0])
    };
    const handleClickProductoElegido = (producto) => {
        setProductoElegido(producto);
    };
    const handleChangeModal = () => {
        setModal(!modal)
    };
    const handleAgregarPedido = (producto) => {
        if (pedido.some(productoState => productoState.id === producto.id)) {
            const pedidoActualizado = pedido.map((productoState) => productoState.id === producto.id ? producto : productoState )
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
        setProductoElegido(productoActualizadoCantidad)
    }
    useEffect(() => {
        const obtenerCategorias = async () => {
            const { data } = await axios('/api/categorias');
            setCategorias(data)
        }
        obtenerCategorias()
    }, []);
    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])
    return (
        <QuioscoContext.Provider value=
            {{
                categorias, categoriaActual, handleClickCategoriaActual, handleClickProductoElegido, productoElegido, handleChangeModal, modal, handleAgregarPedido, pedido, handleEditarCantidad
            }}>
            {children}
        </QuioscoContext.Provider>
    )
}

export default QuioscoContext;

export { QuioscoProvider }