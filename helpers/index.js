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

export const obtenerHoraFormateada = () => {
    const date = new Date();
    const hora = date.getHours().toString().padStart(2, "0");
    const minutos = date.getMinutes().toString().padStart(2, "0");
    const segundos = date.getSeconds().toString().padStart(2, "0");
    return `${hora}:${minutos}:${segundos}`;
};