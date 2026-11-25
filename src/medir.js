const { generarVentas } = require("./generador.js");
const {
    totalVendidoInstrumentado,
    ventaMayorInstrumentada,
    totalPorCiudadInstrumentado,
    primeraVentaInstrumentada
} = require("./analitica.js");

function nuevoContador() {
    return { visitas: 0, comparaciones: 0, operaciones: 0 };
}

const tamanos = [100, 1000, 10000, 100000];
const resultados = [];

for (const n of tamanos) {
    const ventas = generarVentas(n);
    const contadorTotal = nuevoContador();
    totalVendidoInstrumentado(ventas, contadorTotal);
    const contadorMayor = nuevoContador();
    ventaMayorInstrumentada(ventas, contadorMayor);
    const contadorCiudades = nuevoContador();
    totalPorCiudadInstrumentado(ventas, contadorCiudades);
    const contadorPrimera = nuevoContador();
    primeraVentaInstrumentada(ventas, contadorPrimera);

    resultados.push({
        n,
        totalVendido: contadorTotal.operaciones,
        ventaMayor: contadorMayor.operaciones,
        totalPorCiudad: contadorCiudades.operaciones,
        primeraVenta: contadorPrimera.operaciones
    });
}

console.log("Operaciones contadas = visitas + comparaciones explícitas.");
console.table(resultados);
