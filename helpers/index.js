export const formatearPrecio = (cantidad) => {
    return cantidad.toLocaleString('es-Es', {
        style: 'currency',
        currency: 'EUR'
    })
}