# Bitácora — Café Origen: análisis de ventas

## 1. Descripción de los datos

El conjunto contiene 12 registros. Cada registro incluye: `id`, `fecha`, `cliente`, `producto`, `ciudad`, `cantidad` y `precio`.

Se conserva el registro con cantidad 0 (ID 8) porque no se debe alterar el dato de origen sin confirmar su significado. Para el ticket promedio se excluyen los registros cuya cantidad no sea mayor que cero.

## 2. Casos borde y decisiones

- **Cantidad igual a cero:** se conserva el registro, pero no cuenta como venta válida para el ticket promedio.
- **Arreglo vacío:** los totales y unidades devuelven 0; `ventaMayor` y `ticketPromedio` devuelven `null`.
- **Ciudades:** se normalizan con `trim().toLowerCase()` antes de comparar o agrupar.
- **Productos:** se eliminan espacios sobrantes, pero no se fusionan etiquetas diferentes sin confirmación. En los datos existen "Origen Nariño" y "Origen Nariño 250g"; se mantienen separados.

## 3. Funciones implementadas

- `valorVenta(venta)`: multiplica cantidad por precio.
- `totalVendido(ventas)` y `totalVendidoM(ventas)`: total monetario con ciclo y reduce.
- `unidadesVendidas(ventas)` y `unidadesVendidasM(ventas)`: unidades con ciclo y reduce.
- `ventaMayor(ventas)`: venta válida de mayor valor; devuelve null si no hay.
- `ticketPromedio(ventas)`: promedio del valor por registro válido; devuelve null si no hay ventas válidas.
- `ventasPorCiudad()` y `ventasPorCiudadM()`: total de una ciudad con normalización.
- `totalPorCiudad()`: agrupa el valor vendido por ciudad normalizada.
- `unidadesPorProducto()`: agrupa unidades por nombre de producto.
- `topProductosPorValor()`: ordena los productos por valor vendido y devuelve los primeros K.
- `ventasDelDia(ventas, fecha)`: devuelve un arreglo con las ventas de la fecha exacta (AAAA-MM-DD).

## 4. Errores reportados por la gerente y su verificación

### Error 1. Bogotá aparecía dos veces

- **Síntoma:** el informe mostraba dos filas para Bogotá.
- **Entrada que lo produce:** nombres equivalentes con diferencias de formato, por ejemplo `"Bogotá"`, `" bogotá "` y `"BOGOTÁ"`.
- **Hipótesis:** la agrupación utilizaba el texto original como clave, por lo que cada variante se convertía en un grupo diferente.
- **Prueba realizada:** se creó un arreglo de prueba con esas tres variantes y se ejecutó `totalPorCiudad()`.
- **Causa:** no normalizar el nombre antes de utilizarlo como clave del acumulador produce grupos separados. En la versión actual la función sí normaliza con `trim().toLowerCase()`.
- **Corrección:** normalizar la ciudad antes de crear o actualizar su grupo. La prueba automatizada comprueba que exista una sola clave (`"bogotá"`) y que el total agrupado sea 400.

### Error 2. El ticket promedio daba NaN al filtrar un día sin ventas

- **Síntoma:** al consultar un día sin registros, el ticket promedio aparecía como `NaN`.
- **Entrada que lo produce:** `ventasDelDia(ventas, "2026-09-07")`, que devuelve un arreglo vacío con los datos actuales.
- **Hipótesis:** se estaba dividiendo el total entre cero ventas, o no se controlaba el resultado de una consulta vacía.
- **Prueba realizada:** se filtra el 7 de septiembre de 2026 y se pasa el arreglo resultante a `ticketPromedio()`.
- **Causa:** el promedio no está definido cuando no hay ventas válidas; una división entre cero puede producir `NaN`.
- **Corrección:** `ticketPromedio()` verifica si el contador de ventas válidas es cero y devuelve `null`. El reporte convierte ese valor en el texto "No disponible". La prueba automatizada verifica que el resultado sea null y que no sea NaN.

## 5. Resultados esperados con los 12 registros actuales

| Indicador | Resultado |
|---|---:|
| Registros | 12 |
| Ventas válidas (cantidad > 0) | 11 |
| Unidades | 22 |
| Total vendido | $1.080.000 |
| Ticket promedio | $98.181,82 |

### Total vendido por ciudad

| Ciudad | Total |
|---|---:|
| Medellín | $356.000 |
| Cali | $280.000 |
| Bogotá | $276.000 |
| Pereira | $168.000 |

### Unidades por producto

| Producto | Unidades |
|---|---:|
| Origen Huila 500g | 7 |
| Origen Sierra 500g | 5 |
| Origen Nariño 250g | 3 |
| Prensa francesa | 3 |
| Origen Nariño | 3 |
| Molino manual | 1 |

### Top 3 por valor vendido

1. Origen Huila 500g — $294.000.
2. Prensa francesa — $285.000.
3. Origen Sierra 500g — $225.000.

## 6. Pruebas y ejecución

Ejecutar desde la raíz:

```bash
node src/verificar.js
node src/reporte.js
```

Las pruebas cubren equivalencia entre ciclos y métodos, resultados generales, normalización de Bogotá, consulta de un día sin ventas y ausencia de NaN en las agrupaciones.

**Nota de control:** el contenido de esta bitácora describe las pruebas automatizadas incorporadas. La ejecución real debe confirmarse en un entorno con Node.js; no se debe marcar como ejecutada hasta correr los comandos.
