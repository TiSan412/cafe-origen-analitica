# Café Origen — Análisis de ventas

Proyecto de práctica en JavaScript (CommonJS) para analizar ventas de Café Origen, generar datos sintéticos y estudiar el crecimiento de las operaciones de distintos algoritmos.

## Requisitos
- Node.js instalado.
- No requiere dependencias externas.

## Cómo ejecutarlo

Desde la carpeta raíz:

```bash
node src/reporte.js
```

Generar ventas aleatorias y medir operaciones para n = 100, 1.000, 10.000 y 100.000:

```bash
node src/medir.js
```

Medir el tiempo de búsqueda de clientes recurrentes:

```bash
node src/medir_recurrentes.js
```

Ejecutar las pruebas:

```bash
node src/verificar.js
```

## ¿Qué preguntas responde?
- ¿Cuánto se vendió en total y por ciudad?
- ¿Cuántas unidades se vendieron por producto?
- ¿Cuál es el ticket promedio y qué sucede si no hay ventas?
- ¿Cuáles son los tres productos con mayor valor vendido?
- ¿Qué clientes realizaron más de una compra?\n- ¿Cómo comparar una solución encadenada con otra de una sola pasada en tiempo y espacio?
- ¿Cómo crece el número de operaciones y el tiempo cuando aumenta el tamaño del arreglo?

## Generación y medición
- `src/generador.js` exporta `generarVentas(n)`, que crea n ventas con la misma estructura de los datos originales.
- `src/analitica.js` contiene funciones de análisis, versiones instrumentadas, `clientesRecurrentes` y dos estrategias para sumar por ciudad.
- `src/medir.js` mide operaciones para cuatro tamaños.
- `src/medir_recurrentes.js` mide el tiempo de búsqueda de clientes recurrentes con `console.time`.
- `bitacora.md` contiene las trazas, predicciones, mediciones y análisis de complejidad temporal y espacial.

## Estructura
- `src/datos.js`: registros originales.
- `src/analitica.js`: funciones de análisis e instrumentación.
- `src/generador.js`: generación de datos de prueba.
- `src/reporte.js`: informe de ventas.
- `src/medir.js`: experimento de crecimiento de operaciones.
- `src/medir_recurrentes.js`: medición de tiempo de clientes recurrentes.
- `src/verificar.js`: pruebas y comprobaciones.
- `bitacora.md`: decisiones, errores y análisis de complejidad.
