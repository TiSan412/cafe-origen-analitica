// 1. Calcular el valor de una venta
function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}


// 2. Calcular el total vendido
function totalVendidoM(ventas) {

    return ventas.reduce((total, venta) => {

        return total + valorVenta(venta);

    }, 0);

}

// 3. Calcular las unidades vendidas
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
    ventasPorCiudad
};
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