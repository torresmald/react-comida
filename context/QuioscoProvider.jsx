import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [productoElegido, setProductoElegido] = useState({});
    const [modal, setModal] = useState(false);

    const handleClickCategoriaActual = (id) => {
        const categoria = categorias.filter((category) => category.id === id)
        setCategoriaActual(categoria[0])
    };
    const handleClickProductoElegido = (producto) => {
        setProductoElegido(producto);
    };
    const handleChangeModal = () => {
        setModal(!modal)
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
                categorias, categoriaActual, handleClickCategoriaActual, handleClickProductoElegido, productoElegido, handleChangeModal, modal
            }}>
            {children}
        </QuioscoContext.Provider>
    )
}

export default QuioscoContext;

export { QuioscoProvider }