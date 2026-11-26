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


## 8. Clientes recurrentes y crecimiento del algoritmo (Día 3)

### Función y verificación con los datos originales
Se agregó `clientesRecurrentes(ventas)` a `src/analitica.js`. La función compara los clientes de cada venta con los clientes de las posiciones posteriores y agrega el identificador a `recurrentes` cuando encuentra otra compra, evitando agregarlo dos veces.

Con los 12 registros del Día 1 devuelve:
```js
["C01", "C02", "C03"]
```
La comprobación quedó incorporada en `src/verificar.js`.

### Traza manual con cinco ventas
Se usó este arreglo de clientes: `[C01, C02, C01, C03, C02]`.

| Posición i | Comparaciones con j | Resultado |
|---:|---|---|
| 0 (C01) | C01-C02, C01-C01, C01-C03, C01-C02 | Encuentra C01 |
| 1 (C02) | C02-C01, C02-C03, C02-C02 | Encuentra C02 |
| 2 (C01) | C01-C03, C01-C02 | No agrega duplicado |
| 3 (C03) | C03-C02 | No encuentra repetición |

Total: 4 + 3 + 2 + 1 = **10 comparaciones entre parejas**. La fórmula general del doble ciclo es:
`n(n-1)/2`.
Esta cantidad crece de forma cuadrática, O(n²).

### Medición con console.time
Se ejecutó `node src/medir_recurrentes.js` con Node.js v22.16.0. Se generaron los arreglos antes de iniciar cada cronómetro, de modo que el tiempo corresponde a la función y no al generador.

| n | Tiempo medido |
|---:|---:|
| 1.000 | 37,376 ms |
| 2.000 | 53,293 ms |
| 4.000 | 246,976 ms |
| 8.000 | 725,505 ms |
| 16.000 | 2.978 s |

Los tiempos pueden variar entre equipos y ejecuciones. Al duplicar n, el tiempo tiende a multiplicarse aproximadamente por cuatro, aunque los tamaños pequeños presentan variaciones por calentamiento del motor, planificación del sistema y aleatoriedad de los datos.

### Estimaciones y prueba de 100.000
Usando el último tiempo como referencia y suponiendo crecimiento cuadrático:
- 100.000 ventas: 2,978 s × (100.000 / 16.000)² ≈ **116,3 segundos**.
- 1.000.000 de ventas: 2,978 s × (1.000.000 / 16.000)² ≈ **11.632 segundos**, aproximadamente **3 horas y 14 minutos**.

Como la estimación inicial para 100.000 era menor a dos minutos, se intentó ejecutar ese tamaño. El proceso superó el límite de ejecución de 130 segundos y fue interrumpido; por tanto, no se obtuvo un tiempo final exacto. Esto muestra que la extrapolación basada en tamaños menores puede quedarse corta. No se intentó ejecutar 1.000.000 porque la estimación ya es de varias horas.

### Costo oculto de includes()
La expresión `recurrentes.includes(ventas[i].cliente)` no es una consulta instantánea: busca el cliente recorriendo el arreglo `recurrentes`. Si hay k clientes recurrentes acumulados, esa búsqueda puede revisar hasta k elementos.

Por tanto, el doble ciclo realiza O(n²) comparaciones de parejas, pero el costo adicional de `includes()` también debe sumarse. En un caso especialmente desfavorable, primero pueden acumularse muchos clientes recurrentes y después aparecer muchas parejas de otro cliente repetido. Cada coincidencia vuelve a recorrer una lista larga. Ese patrón puede elevar el peor caso de la implementación a **O(n³)**.

Con los datos aleatorios del generador, el tiempo observado se comporta aproximadamente como cuadrático; eso no elimina el peor caso cúbico de la implementación.

### Conclusión para la gerente
El reporte se vuelve lento porque, para saber quién ha comprado más de una vez, el programa compara muchas ventas entre sí. Cuando aumenta la cantidad de registros, la cantidad de revisiones crece mucho más rápido que las ventas. Además, cada vez que encuentra un posible cliente repetido, vuelve a buscarlo en la lista de clientes ya identificados. Con bases grandes, este trabajo adicional puede hacer que el reporte tarde varios minutos o incluso más. Conviene cambiar la estrategia de búsqueda antes de usarlo con volúmenes grandes.


## 9. Comparación de complejidad temporal y espacial (Día 4)

### Dos versiones para sumar por ciudad

Se agregaron dos funciones:

- `totalCiudadCadena(ventas, ciudad)`: normaliza los registros con `map`, selecciona la ciudad con `filter`, extrae los valores con otro `map` y suma con `reduce`.
- `totalCiudadUnaPasada(ventas, ciudad)`: normaliza la ciudad buscada una vez y recorre las ventas con un único `for...of`, acumulando el valor cuando coincide.

Las dos se probaron con 10.000 ventas generadas. Los resultados coincidieron para Medellín, Bogotá, Cali y Pereira. También se comparó la normalización de `" bogotá "` con `"BOGOTÁ"`. La prueba se incorporó a `src/verificar.js`.

### Recorridos, arreglos creados y complejidad

| Versión | Recorridos completos | Arreglos nuevos | Tiempo | Espacio adicional |
|---|---:|---:|---|---|
| `totalCiudadCadena` | 4 en el peor caso: map, filter, map y reduce | 3 | O(n) | O(n) |
| `totalCiudadUnaPasada` | 1 | 0 | O(n) | O(1) |

En la versión encadenada se crean tres arreglos: el primero con ciudad normalizada y valor, el segundo con las ventas que coinciden y el tercero con los valores numéricos. El filtro puede conservar desde cero hasta n elementos.

En la versión de una pasada solo se mantienen variables como la ciudad buscada y el total acumulado. No se construyen arreglos auxiliares.

### Por qué ambas son O(n) en tiempo

En el peor caso, la versión encadenada realiza un trabajo proporcional a n en cada uno de sus cuatro métodos: O(n) + O(n) + O(n) + O(n) = O(4n). En Big O se eliminan los factores constantes, por lo que queda O(n). La versión de una pasada también visita las n ventas una vez: O(n).

La diferencia no está en la clase de crecimiento temporal, sino en la cantidad de trabajo constante y en la memoria auxiliar: la versión encadenada reserva arreglos adicionales; la versión de una pasada no.

### Complejidad espacial de las funciones del motor

Se considera memoria adicional, sin contar el arreglo de entrada. Las cantidades de ciudades o productos distintos se indican como d y p; en el peor caso pueden crecer hasta n.

| Función | Espacio adicional | Motivo |
|---|---|---|
| `valorVenta` | O(1) | Calcula y devuelve un número. |
| `totalVendido`, `totalVendidoM` | O(1) | Solo mantienen un acumulador. |
| `unidadesVendidas`, `unidadesVendidasM` | O(1) | Solo mantienen un acumulador. |
| `ventaMayor` | O(1) | Mantiene una referencia a la venta mayor. |
| `ticketPromedio` | O(1) | Mantiene total y contador. |
| `ventasPorCiudad` | O(1) | Mantiene ciudad buscada y total. |
| `ventasPorCiudadM` | O(n) | `filter` crea un arreglo con las coincidencias. |
| `totalPorCiudad` | O(d), peor O(n) | Crea un objeto con una entrada por ciudad distinta. |
| `unidadesPorProducto` | O(p), peor O(n) | Crea un objeto con una entrada por producto distinto. |
| `topProductosPorValor` | O(p), peor O(n) | Crea el objeto de totales, el arreglo de `Object.entries`, el resultado de `slice` y el arreglo final de `map`; `sort` también puede requerir memoria auxiliar. |
| `ventasDelDia` | O(n) | `filter` crea un arreglo de resultados. |
| `clientesRecurrentes` | O(n) | El arreglo de clientes recurrentes puede crecer hasta n. |
| `totalCiudadCadena` | O(n) | Crea tres arreglos intermedios. |
| `totalCiudadUnaPasada` | O(1) | Solo utiliza variables acumuladoras. |
| `totalVendidoInstrumentado` | O(1) | Mantiene el total y actualiza un contador externo. |
| `ventaMayorInstrumentada` | O(1) | Mantiene una referencia y actualiza un contador externo. |
| `totalPorCiudadInstrumentado` | O(d), peor O(n) | Construye un objeto acumulador por ciudad. |
| `primeraVentaInstrumentada` | O(1) | Accede al primer elemento y actualiza un contador externo. |

`totalPorCiudad` y `unidadesPorProducto` no guardan una copia de todas las ventas: guardan un resumen por cada clave distinta. Su espacio depende del número de ciudades o productos diferentes. `topProductosPorValor` también conserva estructuras proporcionales al número de productos distintos durante el cálculo y ordenamiento.

### Decisión para el motor

Se conserva `totalCiudadUnaPasada` como implementación principal por su menor consumo de memoria y porque evita crear arreglos intermedios. La versión encadenada queda disponible como ejemplo didáctico de composición de métodos y para comparar legibilidad.

Aunque la cadena expresa claramente los pasos de transformación, el motor debe priorizar el uso eficiente de recursos cuando procesa conjuntos grandes. Ambas versiones tienen tiempo O(n), pero la versión de una pasada tiene espacio adicional O(1), frente a O(n) de la versión encadenada.
