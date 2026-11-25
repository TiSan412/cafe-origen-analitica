const ventas = require("./datos.js");

const {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,

    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,

    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor

} = require("./analitica.js");



function verificar(nombre, resultadoCiclo, resultadoMetodo) {

    if (resultadoCiclo === resultadoMetodo) {

        console.log(nombre + ": OK");

    } else {

        console.log(nombre + ": DIFERENTE");

        console.log("Versión con ciclo:", resultadoCiclo);

        console.log("Versión con métodos:", resultadoMetodo);

    }

}



verificar(
    "Total vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

verificar(
    "Unidades vendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

verificar(
    "Ventas por Medellín",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);

console.log("\n===== TOTAL POR CIUDAD =====");

console.table(totalPorCiudad(ventas));


console.log("\n===== UNIDADES POR PRODUCTO =====");

console.table(unidadesPorProducto(ventas));


console.log("\n===== TOP 3 PRODUCTOS =====");

console.table(topProductosPorValor(ventas, 3));