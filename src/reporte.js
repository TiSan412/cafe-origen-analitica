const ventas = require("./datos.js");

const {
    totalVendido,
    unidadesVendidas,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analitica.js");

// Formato solicitado: pesos colombianos mediante toLocaleString("es-CO").
function formatoCOP(valor, decimales = 0) {
    if (valor === null || !Number.isFinite(valor)) {
        return "No disponible";
    }

    return "$" + valor.toLocaleString("es-CO", {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales
    });
}

function titulo(texto) {
    console.log("\n" + texto);
    console.log("=".repeat(58));
}

function imprimirTabla(datos, encabezadoIzquierdo, encabezadoDerecho, formatearValor) {
    const ancho = 38;
    console.log(
        encabezadoIzquierdo.padEnd(ancho) +
        encabezadoDerecho.padStart(20)
    );
    console.log("-".repeat(58));

    for (const [nombre, valor] of datos) {
        console.log(
            String(nombre).padEnd(ancho) +
            formatearValor(valor).padStart(20)
        );
    }
}

// RESUMEN GENERAL
console.log("             CAFÉ ORIGEN | REPORTE DE VENTAS");
console.log("             Periodo: 1 al 6 de septiembre de 2026");

titulo("1. RESUMEN GENERAL");
console.log("Registros analizados:       " + ventas.length);
console.log("Unidades vendidas:          " + unidadesVendidas(ventas));
console.log("Valor total vendido:        " + formatoCOP(totalVendido(ventas)));
console.log("Ticket promedio:            " + formatoCOP(ticketPromedio(ventas), 2));

// VENTAS POR CIUDAD
titulo("2. VENTAS POR CIUDAD");
const ciudades = Object.entries(totalPorCiudad(ventas))
    .sort((a, b) => b[1] - a[1])
    .map(([ciudad, total]) => [
        ciudad.charAt(0).toLocaleUpperCase("es-CO") + ciudad.slice(1),
        total
    ]);
imprimirTabla(ciudades, "Ciudad", "Valor vendido", formatoCOP);

// UNIDADES POR PRODUCTO
titulo("3. UNIDADES POR PRODUCTO");
const productos = Object.entries(unidadesPorProducto(ventas))
    .sort((a, b) => b[1] - a[1]);
imprimirTabla(productos, "Producto", "Unidades", (valor) => String(valor));

// TOP 3
titulo("4. TOP 3 DE PRODUCTOS POR VALOR");
const top3 = topProductosPorValor(ventas, 3)
    .map((item, indice) => [
        (indice + 1) + ". " + item.producto,
        item.total
    ]);
imprimirTabla(top3, "Producto", "Valor vendido", formatoCOP);

// RESUMEN DE UN DÍA CON VENTAS Y OTRO SIN VENTAS
titulo("5. CONSULTA POR DÍA");
const fechas = ["2026-09-01", "2026-09-07"];

for (const fecha of fechas) {
    const ventasDia = ventasDelDia(ventas, fecha);
    const promedio = ticketPromedio(ventasDia);

    console.log("\nFecha: " + fecha);
    console.log("Registros de venta: " + ventasDia.length);
    console.log("Unidades: " + unidadesVendidas(ventasDia));
    console.log("Total vendido: " + formatoCOP(totalVendido(ventasDia)));
    console.log("Ticket promedio: " + formatoCOP(promedio, 2));
}
