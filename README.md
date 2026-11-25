# Café Origen — Análisis de ventas

Proyecto de práctica en JavaScript (CommonJS) para analizar 12 registros de ventas de Café Origen. Incluye cálculos mediante ciclos, métodos de arreglos, agrupaciones y un reporte en consola.

## Requisitos

- Node.js instalado.
- No requiere dependencias externas.

## Cómo ejecutarlo

Desde la carpeta raíz del proyecto:

```bash
node src/reporte.js
```

Para ejecutar las pruebas de verificación:

```bash
node src/verificar.js
```

## ¿Qué preguntas responde?

- ¿Cuánto se vendió en total?
- ¿Cuántas unidades se vendieron?
- ¿Cuál fue el ticket promedio de las ventas válidas?
- ¿Cuánto se vendió en cada ciudad?
- ¿Cuántas unidades se vendieron por producto?
- ¿Cuáles son los tres productos con mayor valor vendido?
- ¿Qué ventas se registraron en una fecha determinada?
- ¿Qué resultado se obtiene cuando se consulta un día sin ventas?

## Decisiones de análisis

- Una venta es válida para el ticket promedio cuando `cantidad > 0`.
- El ticket promedio se calcula por registro de venta válido, no por unidad.
- Si no existen ventas válidas, `ticketPromedio()` devuelve `null`; el reporte muestra "No disponible" en lugar de `NaN`.
- Las ciudades se agrupan después de aplicar `trim()` y `toLowerCase()`, para unificar diferencias de espacios y mayúsculas.
- Los datos originales se conservan sin modificaciones.
- Los nombres de productos se agrupan por su texto después de quitar espacios sobrantes. Por eso "Origen Nariño" y "Origen Nariño 250g" permanecen como etiquetas distintas hasta confirmar si son el mismo producto.

## Estructura

- `src/datos.js`: registros originales.
- `src/analitica.js`: funciones reutilizables de cálculo y filtrado.
- `src/reporte.js`: informe general y consultas por día.
- `src/verificar.js`: pruebas y comprobaciones de resultados.
- `bitacora.md`: decisiones, casos borde y registro de errores.
