// Genera ventas de prueba con la misma estructura que los datos del Día 1.
const productos = [
    { producto: "Origen Huila 500g", precio: 42000 },
    { producto: "Origen Nariño 250g", precio: 26000 },
    { producto: "Prensa francesa", precio: 95000 },
    { producto: "Origen Sierra 500g", precio: 45000 },
    { producto: "Molino manual", precio: 120000 }
];
const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];

function elegirAlAzar(lista) {
    const indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
}

function generarVentas(n) {
    if (!Number.isInteger(n) || n < 1) {
        throw new Error("n debe ser un entero mayor que cero");
    }

    const cantidadClientes = Math.max(1, Math.floor(n / 3));
    const clientes = Array.from(
        { length: cantidadClientes },
        (_, indice) => `C${String(indice + 1).padStart(3, "0")}`
    );
    const ventas = [];

    for (let i = 0; i < n; i++) {
        const productoElegido = elegirAlAzar(productos);
        ventas.push({
            id: i + 1,
            fecha: "2026-09-01",
            cliente: elegirAlAzar(clientes),
            producto: productoElegido.producto,
            ciudad: elegirAlAzar(ciudades),
            cantidad: Math.floor(Math.random() * 5) + 1,
            precio: productoElegido.precio
        });
    }
    return ventas;
}

module.exports = { generarVentas };
