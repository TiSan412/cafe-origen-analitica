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

Ejecutar las pruebas de análisis:

```bash
node src/verificar.js
```

## ¿Qué preguntas responde?
- ¿Cuánto se vendió en total y por ciudad?
- ¿Cuántas unidades se vendieron por producto?
- ¿Cuál es el ticket promedio y qué sucede si no hay ventas?
- ¿Cuáles son los tres productos con mayor valor vendido?
- ¿Cómo crece el número de operaciones cuando aumenta el tamaño del arreglo?
- ¿Qué diferencia hay entre una función O(1) y una O(n)?

## Generación y medición
- `src/generador.js` exporta `generarVentas(n)`, que crea n ventas con la misma estructura de los datos originales.
- Los productos, precios y ciudades se eligen de listas fijas; cliente, producto, ciudad y cantidad se seleccionan aleatoriamente.
- `src/analitica.js` incluye versiones instrumentadas que cuentan visitas y comparaciones.
- `src/medir.js` ejecuta las funciones para cuatro tamaños y muestra una tabla de operaciones.
- `bitacora.md` contiene la predicción previa, el criterio de conteo, los resultados y la clasificación de complejidad.

## Estructura
- `src/datos.js`: registros originales.
- `src/analitica.js`: funciones de análisis e instrumentación.
- `src/generador.js`: generación de datos de prueba.
- `src/reporte.js`: informe de ventas.
- `src/medir.js`: experimento de crecimiento de operaciones.
- `src/verificar.js`: pruebas y comprobaciones.
- `bitacora.md`: decisiones, errores y análisis de complejidad.
