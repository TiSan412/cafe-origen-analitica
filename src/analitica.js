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

function totalVendidoM(ventas) {

    return ventas.reduce((total, venta) => {

        return total + valorVenta(venta);

    }, 0);

}


// 3. Calcular las unidades vendidas
function unidadesVendidas(ventas) {

    let unidades = 0;

    for (const venta of ventas) {

        unidades += venta.cantidad;

    }

    return unidades;
}

function unidadesVendidasM(ventas) {

    return ventas.reduce((total, venta) => {

        return total + venta.cantidad;

    }, 0);

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

function ventasPorCiudadM(ventas, ciudad) {

    return ventas
        .filter((venta) => {

            return venta.ciudad.trim().toLowerCase() ===
                ciudad.trim().toLowerCase();

        })
        .reduce((total, venta) => {

            return total + valorVenta(venta);

        }, 0);

}

function totalPorCiudad(ventas) {

    return ventas.reduce((acumulador, venta) => {

        const ciudad = venta.ciudad.trim().toLowerCase();

        if (!acumulador[ciudad]) {

            acumulador[ciudad] = 0;

        }

        acumulador[ciudad] += valorVenta(venta);

        return acumulador;

    }, {});

}

function unidadesPorProducto(ventas) {

    return ventas.reduce((acumulador, venta) => {

        const producto = venta.producto.trim();

        if (!acumulador[producto]) {

            acumulador[producto] = 0;

        }

        acumulador[producto] += venta.cantidad;

        return acumulador;

    }, {});

}

function topProductosPorValor(ventas, k) {

    const totales = ventas.reduce((acumulador, venta) => {

        const producto = venta.producto.trim();

        if (!acumulador[producto]) {

            acumulador[producto] = 0;

        }

        acumulador[producto] += valorVenta(venta);

        return acumulador;

    }, {});

    return Object.entries(totales)

        .sort((a, b) => b[1] - a[1])

        .slice(0, k)

        .map(([producto, total]) => {

            return {
                producto: producto,
                total: total
            };

        });

}

// Exportar las funciones
module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
};