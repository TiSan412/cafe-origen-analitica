Bitácora del proyecto: Análisis de ventas

1. Diccionario de datos

El conjunto de datos contiene 12 registros de ventas. Cada registro representa una transacción realizada por un cliente.

Propiedad

Tipo de dato

Significado

id

Number

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
