# Bitácora — Café Origen: análisis de ventas

## 1. Descripción de los datos
El conjunto contiene 12 registros. Cada registro incluye: `id`, `fecha`, `cliente`, `producto`, `ciudad`, `cantidad` y `precio`.
Se conserva el registro con cantidad 0 (ID 8). Para el ticket promedio se excluyen los registros cuya cantidad no sea mayor que cero.

## 2. Casos borde y decisiones
- Cantidad igual a cero: se conserva el registro, pero no cuenta como venta válida para el ticket promedio.
- Arreglo vacío: los totales y unidades devuelven 0; `ventaMayor` y `ticketPromedio` devuelven `null`.
- Ciudades: se normalizan con `trim().toLowerCase()` antes de comparar o agrupar.
- Productos: se eliminan espacios sobrantes, pero no se fusionan etiquetas diferentes sin confirmación. "Origen Nariño" y "Origen Nariño 250g" se mantienen separados.

## 3. Funciones implementadas
- `valorVenta(venta)`: multiplica cantidad por precio.
- `totalVendido` y `totalVendidoM`: total monetario con ciclo y reduce.
- `unidadesVendidas` y `unidadesVendidasM`: unidades con ciclo y reduce.
- `ventaMayor`: venta válida de mayor valor; devuelve null si no hay.
- `ticketPromedio`: promedio del valor por registro válido; devuelve null si no hay ventas válidas.
- `ventasPorCiudad` y `ventasPorCiudadM`: total de una ciudad con normalización.
- `totalPorCiudad`: agrupa el valor vendido por ciudad normalizada.
- `unidadesPorProducto`, `topProductosPorValor` y `ventasDelDia`: análisis por producto y fecha.

## 4. Errores reportados por la gerente y su verificación

### Error 1. Bogotá aparecía dos veces
- **Síntoma:** el informe mostraba dos filas para Bogotá.
- **Entrada:** nombres equivalentes con diferencias de formato: `"Bogotá"`, `" bogotá "` y `"BOGOTÁ"`.
- **Hipótesis:** la agrupación utilizaba el texto original como clave.
- **Prueba:** arreglo de prueba con las tres variantes y ejecución de `totalPorCiudad()`.
- **Causa:** no normalizar el nombre antes de usarlo como clave produce grupos separados.
- **Corrección:** normalizar con `trim().toLowerCase()` antes de agrupar. La prueba automatizada verifica una sola clave y total 400.

### Error 2. El ticket promedio daba NaN al filtrar un día sin ventas
- **Síntoma:** al consultar un día sin registros, el ticket promedio aparecía como `NaN`.
- **Entrada:** `ventasDelDia(ventas, "2026-09-07")`, que devuelve un arreglo vacío.
- **Hipótesis:** se dividía el total entre cero ventas o no se controlaba el arreglo vacío.
- **Prueba:** filtrar el 7 de septiembre y pasar el resultado a `ticketPromedio()`.
- **Causa:** el promedio no está definido cuando no hay ventas válidas.
- **Corrección:** `ticketPromedio()` devuelve `null` cuando el contador es cero; el reporte muestra "No disponible".

## 5. Resultados esperados con los datos originales
| Indicador | Resultado |
|---|---:|
| Registros | 12 |
| Ventas válidas | 11 |
| Unidades | 22 |
| Total vendido | $1.080.000 |
| Ticket promedio | $98.181,82 |

## 6. Pruebas del reporte
```bash
node src/verificar.js
node src/reporte.js
```

## 7. Experimento de crecimiento y complejidad (Día 2)

### Predicción previa a la medición
Se contará una operación por cada elemento visitado y una por cada comparación explícita.
- `primeraVentaInstrumentada`: al multiplicar n por 10, las operaciones se mantienen constantes (O(1)); accede al índice 0.
- `totalVendidoInstrumentado`: las operaciones se multiplican por 10 (O(n)); recorre cada venta una vez.
- `ventaMayorInstrumentada`: las operaciones crecen aproximadamente 10 veces (O(n)); recorre cada venta y realiza comparaciones por registro.
- `totalPorCiudadInstrumentado`: las operaciones se multiplican por 10 (O(n)); recorre cada venta y comprueba si la ciudad ya existe en el acumulador.

### Criterio de conteo
Los contadores tienen tres propiedades: `visitas`, `comparaciones` y `operaciones`. `operaciones` es la suma de visitas y comparaciones explícitas. No se cuentan asignaciones, sumas, accesos a propiedades ni el trabajo interno de `trim()` o `toLowerCase()`.

### Resultados de la medición
Se ejecutó `node src/medir.js` con Node.js v22.16.0. La salida fue:

| n | totalVendido | ventaMayor | totalPorCiudad | primeraVenta |
|---:|---:|---:|---:|---:|
| 100 | 100 | 399 | 200 | 1 |
| 1.000 | 1.000 | 3.999 | 2.000 | 1 |
| 10.000 | 10.000 | 39.999 | 20.000 | 1 |
| 100.000 | 100.000 | 399.999 | 200.000 | 1 |

El generador aleatorio no cambia estos contadores: todas las cantidades están entre 1 y 5 y cada función instrumentada recorre el arreglo completo.

### Comparación y clasificación
La predicción coincide con los resultados. Al multiplicar n por 10, `totalVendido` y `totalPorCiudad` multiplican exactamente sus operaciones por 10. `ventaMayor` pasa de 399 a 3.999, luego a 39.999 y 399.999: crece aproximadamente 10 veces, con una diferencia constante por la primera venta. `primeraVenta` permanece en una operación.

Por su código y su crecimiento:
- `primeraVentaInstrumentada`: **O(1)**, acceso directo al primer elemento.
- `totalVendidoInstrumentado`: **O(n)**, un recorrido del arreglo.
- `ventaMayorInstrumentada`: **O(n)**, un recorrido y un número constante de comparaciones por elemento.
- `totalPorCiudadInstrumentado`: **O(n)**, un recorrido y una comprobación por elemento.

Ninguna tiene ciclos anidados ni compara cada venta con todas las demás; por eso no presentan crecimiento **O(n²)**.
