const { generarVentas } = require("./generador.js");
const { clientesRecurrentes } = require("./analitica.js");

// El tiempo medido corresponde únicamente a clientesRecurrentes;
// la generación de datos ocurre antes de iniciar el cronómetro.
const tamanos = [1000, 2000, 4000, 8000, 16000];

for (const n of tamanos) {
    const ventas = generarVentas(n);
    const etiqueta = `clientesRecurrentes con n=${n}`;

    console.time(etiqueta);
    const recurrentes = clientesRecurrentes(ventas);
    console.timeEnd(etiqueta);

    console.log(`Clientes recurrentes encontrados: ${recurrentes.length}`);
}
