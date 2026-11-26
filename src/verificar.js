const assert = require("node:assert/strict");
const { generarVentas } = require("./generador.js");
const ventas = require("./datos.js");
const {
    totalVendido,
    unidadesVendidas,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    ventasDelDia,
    clientesRecurrentes,
    totalCiudadCadena,
    totalCiudadUnaPasada
} = require("./analitica.js");

function verificar(nombre, resultado, esperado) {
    assert.deepStrictEqual(resultado, esperado);
    console.log(nombre + ": OK");
}

// Comparación entre implementaciones
verificar("Total vendido: ciclo y reduce", totalVendido(ventas), totalVendidoM(ventas));
verificar("Unidades: ciclo y reduce", unidadesVendidas(ventas), unidadesVendidasM(ventas));
verificar(
    "Ventas por Medellín: ciclo y métodos",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);

// Resultados generales esperados para los datos actuales
verificar("Total vendido esperado", totalVendido(ventas), 1080000);
verificar("Unidades esperadas", unidadesVendidas(ventas), 22);
verificar("Ticket promedio esperado", ticketPromedio(ventas), 1080000 / 11);

// Error reportado 1: nombres equivalentes de Bogotá deben formar un solo grupo.
const ventasBogotaPrueba = [
    { ciudad: "Bogotá", cantidad: 1, precio: 100 },
    { ciudad: " bogotá ", cantidad: 2, precio: 100 },
    { ciudad: "BOGOTÁ", cantidad: 1, precio: 100 }
];
const gruposBogota = totalPorCiudad(ventasBogotaPrueba);
verificar("Normalización de Bogotá: un solo grupo", Object.keys(gruposBogota), ["bogotá"]);
verificar("Total agrupado de Bogotá", gruposBogota["bogotá"], 400);

// Error reportado 2: un día sin ventas no debe producir NaN.
const diaConVentas = ventasDelDia(ventas, "2026-09-01");
const diaSinVentas = ventasDelDia(ventas, "2026-09-07");
verificar("Ventas del 2026-09-01", diaConVentas.length, 2);
verificar("Día sin ventas", diaSinVentas.length, 0);
verificar("Ticket de día sin ventas", ticketPromedio(diaSinVentas), null);
assert.equal(Number.isNaN(ticketPromedio(diaSinVentas)), false);
console.log("Ticket sin ventas nunca es NaN: OK");

// Verificación de claves y valores del reporte
const ciudades = totalPorCiudad(ventas);
verificar("Cantidad de grupos de ciudades", Object.keys(ciudades).length, 4);
assert.equal(Object.values(ciudades).every(Number.isFinite), true);
assert.equal(Object.values(ciudades).some(Number.isNaN), false);
console.log("Agrupaciones sin NaN ni claves duplicadas: OK");

// Día 3: clientes que realizaron más de una compra.
verificar("Clientes recurrentes de los 12 datos", clientesRecurrentes(ventas), ["C01", "C02", "C03"]);
const ventasRecurrentesPrueba = [
    { cliente: "C01" },
    { cliente: "C02" },
    { cliente: "C01" },
    { cliente: "C03" },
    { cliente: "C02" }
];
verificar("Clientes recurrentes en arreglo de 5 ventas", clientesRecurrentes(ventasRecurrentesPrueba), ["C01", "C02"]);


// Día 4: equivalencia de las dos estrategias para sumar por ciudad.
const ventasGeneradas = generarVentas(10000);
for (const ciudad of ["Medellín", "Bogotá", "Cali", "Pereira"]) {
    verificar(
        `Total de ${ciudad}: cadena y una pasada (10.000 ventas)`,
        totalCiudadCadena(ventasGeneradas, ciudad),
        totalCiudadUnaPasada(ventasGeneradas, ciudad)
    );
}
verificar(
    "Normalización de ciudad con espacios y mayúsculas",
    totalCiudadCadena(ventasGeneradas, " bogotá "),
    totalCiudadUnaPasada(ventasGeneradas, "BOGOTÁ")
);

console.log("\nTodas las pruebas finalizaron correctamente.");
