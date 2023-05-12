export const formatearPrecio = (cantidad) => {
    return cantidad.toLocaleString('es-Es', {
        style: 'currency',
        currency: 'EUR'
    })
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}