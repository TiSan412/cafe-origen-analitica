// 1. Calcular el valor de una venta
function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}


// 2. Calcular el total vendido
function totalVendido(ventas) {

    let total = 0;

    for (const venta of ventas) {

        total += valorVenta(venta);

    }

    return total;
}


// 3. Calcular las unidades vendidas
function unidadesVendidas(ventas) {

    let unidades = 0;

    for (const venta of ventas) {

        unidades += venta.cantidad;

    }

    return unidades;
}


// 4. Encontrar la venta de mayor valor
function ventaMayor(ventas) {

    let mayor = null;

    for (const venta of ventas) {

        if (venta.cantidad > 0) {

            if (
                mayor === null ||
                valorVenta(venta) > valorVenta(mayor)
            ) {

                mayor = venta;

            }

        }

    }

    return mayor;
}


// 5. Calcular el ticket promedio
function ticketPromedio(ventas) {

    let total = 0;
    let cantidadVentas = 0;

    for (const venta of ventas) {

        if (venta.cantidad > 0) {

            total += valorVenta(venta);

            cantidadVentas++;

        }

    }

    if (cantidadVentas === 0) {
        return null;
    }

    return total / cantidadVentas;
}


// 6. Calcular las ventas por ciudad
function ventasPorCiudad(ventas, ciudad) {

    let total = 0;

    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {

        const ciudadActual = venta.ciudad.trim().toLowerCase();

        if (ciudadActual === ciudadBuscada) {

            total += valorVenta(venta);

        }

    }

    return total;
}


// Exportar las funciones
module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
};