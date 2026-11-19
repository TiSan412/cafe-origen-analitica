const ventas = require("./datos.js");

// Cantidad de registros
console.log("Cantidad de registros:", ventas.length);

// Primer registro
console.log("Primer registro:", ventas[0]);

// Último registro
console.log("Último registro:", ventas[ventas.length - 1]);

// Producto en la posición 4
console.log("Producto en la posición 4:", ventas[4].producto);

// Tabla completa
console.table(ventas);

const ventas = require("./datos.js");

const {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
} = require("./analitica.js");


// PRUEBAS CON TODAS LAS VENTAS

console.log("===== ARREGLO COMPLETO =====");

console.log("Valor primera venta:", valorVenta(ventas[0]));

console.log("Total vendido:", totalVendido(ventas));

console.log("Unidades vendidas:", unidadesVendidas(ventas));

console.log("Venta mayor:", ventaMayor(ventas));

console.log("Ticket promedio:", ticketPromedio(ventas));

console.log(
    "Ventas en Medellín:",
    ventasPorCiudad(ventas, "Medellín")
);


// PRUEBAS CON UNA SOLA VENTA

const unaVenta = [ventas[0]];

console.log("===== UNA SOLA VENTA =====");

console.log("Total vendido:", totalVendido(unaVenta));

console.log("Unidades vendidas:", unidadesVendidas(unaVenta));

console.log("Venta mayor:", ventaMayor(unaVenta));

console.log("Ticket promedio:", ticketPromedio(unaVenta));

console.log(
    "Ventas en Medellín:",
    ventasPorCiudad(unaVenta, "Medellín")
);


// PRUEBAS CON ARREGLO VACÍO

const ventasVacias = [];

console.log("===== ARREGLO VACÍO =====");

console.log("Total vendido:", totalVendido(ventasVacias));

console.log("Unidades vendidas:", unidadesVendidas(ventasVacias));

console.log("Venta mayor:", ventaMayor(ventasVacias));

console.log("Ticket promedio:", ticketPromedio(ventasVacias));

console.log(
    "Ventas en Medellín:",
    ventasPorCiudad(ventasVacias, "Medellín")
);
