Bitácora del proyecto: Análisis de ventas

1. Diccionario de datos

El conjunto de datos contiene 12 registros de ventas. Cada registro representa una transacción realizada por un cliente.

Propiedad/Tipo de dato/Significado/id/Number

Identificador único de cada registro de venta.

fecha

String

Fecha en la que se realizó la venta, representada en formato AAAA-MM-DD.

cliente

String

Código que identifica al cliente que realizó la compra.

producto

String

Nombre o descripción del producto vendido.

ciudad

String

Ciudad asociada a la venta.

cantidad

Number

Número de unidades registradas en la venta.

2. Casos borde detectados

Durante la exploración de los 12 registros se identificaron los siguientes casos que requieren atención:

Caso 1. Inconsistencia en el nombre de las ciudades

Problema: En el registro con ID 5 aparece la ciudad "medellín" con minúscula inicial, mientras que en los registros 1, 4 y 11 aparece como "Medellín".

Decisión: Se conservará el valor original en esta primera etapa para respetar la información de origen. Posteriormente, durante el proceso de limpieza, se unificarán los nombres de las ciudades utilizando un formato consistente.

Caso 2. Cantidad igual a cero

Problema: El registro con ID 8 presenta una cantidad de 0 unidades.

Decisión: Se conservará el registro sin modificarlo. Se considera un caso que requiere validación, ya que una venta con cero unidades podría representar un error de captura o una transacción sin unidades efectivamente vendidas. No se eliminará hasta conocer el significado del dato.

Caso 3. Clientes repetidos

Problema: Los códigos C01, C02 y C03 aparecen en diferentes registros de ventas.

Decisión: Se conservarán los registros repetidos porque un mismo cliente puede realizar varias compras en diferentes fechas. La repetición del código del cliente no representa necesariamente un error. No se eliminarán estos registros.

Caso 4. Identificadores de clientes representados como texto

Problema: Los identificadores de clientes utilizan códigos como "C01", "C02" y "C03", en lugar de números enteros.

Decisión: Se conservarán como String porque son identificadores alfanuméricos. No deben convertirse a Number, ya que perderían su formato original y su significado como códigos de identificación.

3. Observaciones generales

Se encontraron 12 registros de ventas.

Los identificadores de venta van del 1 al 12.

Se identificaron cuatro ciudades: Medellín, Bogotá, Cali y Pereira.

Las fechas están representadas mediante cadenas de texto.

Se conservarán los datos originales durante la etapa de exploración.

Las posibles correcciones se realizarán posteriormente mediante un proceso de limpieza de datos documentado.
---------------------------------------------------
# 4. Plan de análisis en pseudocódigo

Antes de implementar las funciones en JavaScript, se establece la lógica de cada indicador para definir los recorridos, condiciones, acumuladores y valores iniciales.

## 4.1. valorVenta(venta)

**Objetivo:** Calcular el valor monetario de una venta individual.

- Recorrido: No requiere recorrer arreglos.
- Condición: Ninguna.
- Operación: Multiplicar cantidad por precio.
- Acumulador: No utiliza.
- Valor inicial: No requiere.

```text
FUNCIÓN valorVenta(venta)

    Calcular cantidad × precio.

    Devolver el resultado.

FIN FUNCIÓN
```

## 4.2. totalVendido(ventas)

**Objetivo:** Calcular el valor monetario de todas las ventas.

- Recorrido: Todas las ventas del arreglo.
- Condición: Ninguna adicional.
- Acumulador: Suma del valor de cada venta.
- Valor inicial: 0.

```text
FUNCIÓN totalVendido(ventas)

    total = 0

    PARA CADA venta EN ventas:

        total = total + valorVenta(venta)

    DEVOLVER total.

FIN FUNCIÓN
```

## 4.3. unidadesVendidas(ventas)

**Objetivo:** Calcular el número total de unidades vendidas.

- Recorrido: Todas las ventas del arreglo.
- Condición: Ninguna adicional.
- Acumulador: Suma de las cantidades.
- Valor inicial: 0.

```text
FUNCIÓN unidadesVendidas(ventas)

    unidades = 0

    PARA CADA venta EN ventas:

        unidades = unidades + venta.cantidad

    DEVOLVER unidades.

FIN FUNCIÓN
```

## 4.4. ventaMayor(ventas)

**Objetivo:** Identificar y devolver el registro completo de la venta válida con mayor valor monetario.

- Recorrido: Todas las ventas.
- Condición: Cantidad mayor que 0 y valor superior al máximo encontrado.
- Acumulador: Referencia al objeto de la venta de mayor valor.
- Valor inicial: null.

```text
FUNCIÓN ventaMayor(ventas)

    mayor = null

    PARA CADA venta EN ventas:

        SI venta.cantidad > 0:

            SI mayor ES null O valorVenta(venta) > valorVenta(mayor):

                mayor = venta

    DEVOLVER mayor.

FIN FUNCIÓN
```

## 4.5. ticketPromedio(ventas)

**Objetivo:** Calcular el promedio monetario de las ventas válidas.

- Recorrido: Todas las ventas.
- Condición: Cantidad mayor que 0.
- Acumuladores:
  - Suma del valor de las ventas válidas.
  - Conteo de ventas válidas.
- Valores iniciales: 0 para ambos acumuladores.

```text
FUNCIÓN ticketPromedio(ventas)

    total = 0
    cantidadVentas = 0

    PARA CADA venta EN ventas:

        SI venta.cantidad > 0:

            total = total + valorVenta(venta)

            cantidadVentas = cantidadVentas + 1

    SI cantidadVentas ES igual a 0:

        DEVOLVER null.

    DEVOLVER total / cantidadVentas.

FIN FUNCIÓN
```

## 4.6. ventasPorCiudad(ventas, ciudad)

**Objetivo:** Calcular el valor monetario de las ventas realizadas en una ciudad determinada.

- Recorrido: Todas las ventas.
- Condición: La ciudad del registro debe coincidir con la ciudad solicitada.
- Normalización: Convertir a minúsculas y eliminar espacios sobrantes.
- Acumulador: Suma del valor de las ventas de la ciudad.
- Valor inicial: 0.

```text
FUNCIÓN ventasPorCiudad(ventas, ciudad)

    total = 0

    ciudadBuscada = ciudad sin espacios sobrantes
                    y convertida a minúsculas.

    PARA CADA venta EN ventas:

        ciudadActual = venta.ciudad sin espacios sobrantes
                       y convertida a minúsculas.

        SI ciudadActual ES igual a ciudadBuscada:

            total = total + valorVenta(venta)

    DEVOLVER total.

FIN FUNCIÓN
```

## 4.7. Decisiones para arreglos vacíos

| Función | Resultado esperado con [] | Justificación |
|---|---:|---|
| valorVenta(venta) | No aplica | Recibe un objeto, no un arreglo. |
| totalVendido([]) | 0 | No existen valores que sumar. |
| unidadesVendidas([]) | 0 | No existen unidades que contar. |
| ventaMayor([]) | null | No existe un registro que devolver. |
| ticketPromedio([]) | null | No se puede calcular un promedio sin ventas válidas. |
| ventasPorCiudad([], ciudad) | 0 | No existen ventas para esa ciudad. |

## 4.8. Consideraciones

- Todas las funciones monetarias utilizarán `valorVenta()` para evitar repetir la multiplicación.
- Las ventas con cantidad igual a cero no se considerarán válidas para calcular el ticket promedio ni para identificar la venta mayor.
- Las ventas con cantidad cero se conservarán en los datos originales.
- La comparación de ciudades ignorará diferencias entre mayúsculas, minúsculas y espacios sobrantes.
- No se modificarán los datos originales durante los cálculos.
- Los resultados monetarios definitivos dependerán de incorporar los precios unitarios correspondientes a cada producto.
# 5. Verificación manual y pruebas

## 5.1. Traza de unidades vendidas

Se realizó una verificación manual del indicador `unidadesVendidas()` utilizando los 12 registros originales.

La variable acumuladora inicia en 0 y suma la cantidad de cada registro.

| ID | Cantidad | Acumulado |
|---:|---:|---:|
| 1 | 2 | 2 |
| 2 | 1 | 3 |
| 3 | 1 | 4 |
| 4 | 1 | 5 |
| 5 | 3 | 8 |
| 6 | 2 | 10 |
| 7 | 1 | 11 |
| 8 | 0 | 11 |
| 9 | 2 | 13 |
| 10 | 4 | 17 |
| 11 | 1 | 18 |
| 12 | 3 | 21 |

**Resultado manual:** 21 unidades.

**Resultado esperado en JavaScript:** 21 unidades.

Ambos resultados coinciden.

## 5.2. Traza del conteo de ventas válidas

Se verificó el contador utilizado en `ticketPromedio()`.

La condición aplicada es que la cantidad de la venta sea mayor que 0.

| ID | Cantidad | ¿Válida? | Contador |
|---:|---:|---|---:|
| 1 | 2 | Sí | 1 |
| 2 | 1 | Sí | 2 |
| 3 | 1 | Sí | 3 |
| 4 | 1 | Sí | 4 |
| 5 | 3 | Sí | 5 |
| 6 | 2 | Sí | 6 |
| 7 | 1 | Sí | 7 |
| 8 | 0 | No | 7 |
| 9 | 2 | Sí | 8 |
| 10 | 4 | Sí | 9 |
| 11 | 1 | Sí | 10 |
| 12 | 3 | Sí | 11 |

**Resultado manual:** 11 ventas válidas.

**Resultado esperado en JavaScript:** 11 ventas válidas.

Ambos resultados coinciden.

## 5.3. Pruebas de casos borde

Se establecieron tres escenarios para comprobar las funciones:

1. Arreglo completo: permite verificar el comportamiento con los 12 registros.
2. Arreglo de un elemento: permite comprobar el funcionamiento con una sola venta.
3. Arreglo vacío: permite verificar que las funciones devuelvan los valores definidos para la ausencia de registros.

| Función | Completo | Un elemento | Vacío |
|---|---|---|---|
| totalVendido | Valor monetario total | Valor de una venta | 0 |
| unidadesVendidas | 21 | Cantidad de la primera venta | 0 |
| ventaMayor | Objeto de mayor valor | Única venta | null |
| ticketPromedio | Promedio de ventas válidas | Valor de la única venta válida | null |
| ventasPorCiudad | Total de la ciudad consultada | Valor si coincide la ciudad | 0 |

**Observación:** Los indicadores monetarios quedan pendientes de verificación definitiva hasta incorporar los precios unitarios de los productos.

## 5.4. Conclusión

Se implementaron funciones reutilizables para calcular indicadores de ventas mediante ciclos `for...of`, condicionales y acumuladores.

También se estableció un comportamiento específico para los arreglos vacíos y se incorporó la normalización de ciudades para evitar diferencias causadas por mayúsculas y espacios sobrantes.