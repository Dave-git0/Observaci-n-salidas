# Bitacora de practica - Semana 10

## Nombre del estudiante

Juan David Rodriguez Garcia

## Objetivo del sistema evaluado

El objetivo del sistema es validar registros de producción rural, detectar errores o advertencias en los datos ingresados y mostrar mensajes claros para que el usuario pueda interpretar correctamente el resultado obtenido.

## Registro de acciones

| Nº | Accion realizada                   | Dato ingresado   | Resultado esperado              | Resultado obtenido                              | Interpretacion                                                    |
| -- | ---------------------------------- | ---------------- | ------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| 1  | Abrir el proyecto en VS Code       | No aplica        | Ver archivos organizados        | Proyecto abierto correctamente                  | La estructura del proyecto estaba completa y ordenada             |
| 2  | Ejecutar index.html                | No aplica        | Pagina cargada correctamente    | La pagina se mostro sin errores visuales        | El sistema pudo ejecutarse correctamente en el navegador          |
| 3  | Revisar consola                    | No aplica        | Sin errores en rojo             | Consola limpia y funcionando                    | No habia errores criticos que impidieran usar el sistema          |
| 4  | Probar dato valido                 | Leche, 12 litros | Mensaje de exito                | “Registro valido de Leche con 12 litros.”       | El sistema acepto correctamente los datos                         |
| 5  | Probar campo vacio                 | Producto vacio   | Error por campo obligatorio     | “Debe completar todos los campos obligatorios.” | El sistema detecto informacion faltante                           |
| 6  | Probar texto en cantidad           | abc              | Error por dato no numerico      | “La cantidad debe ser un numero valido.”        | El sistema rechazo texto en un campo numerico                     |
| 7  | Probar cantidad negativa           | -5               | Error por cantidad negativa     | “La cantidad no puede ser negativa.”            | El sistema valido correctamente cantidades invalidas              |
| 8  | Probar cantidad cero               | 0                | Advertencia                     | “La cantidad registrada es cero.”               | El sistema permitio continuar, pero advirtio el dato              |
| 9  | Probar cantidad muy alta           | 99999            | Advertencia                     | “La cantidad ingresada es inusualmente alta.”   | El sistema recomendo revisar el registro                          |
| 10 | Repetir pruebas despues de mejorar | Varios casos     | Mayor numero de casos cumplidos | Todos los casos guiados cumplieron              | Las mejoras hicieron que las salidas fueran mas claras y precisas |

## Mensajes interpretados

1. Mensaje observado:

   * “La cantidad debe ser un numero valido.”
   * Interpretacion: El sistema detecto que el usuario ingreso letras o caracteres invalidos en un campo que solo acepta numeros.

2. Mensaje observado:

   * “La cantidad ingresada es inusualmente alta.”
   * Interpretacion: El sistema permite registrar el dato, pero advierte que podria tratarse de un error y recomienda revisarlo.

## Validacion del objetivo

* ¿El sistema cumple su objetivo funcional? ¿Por que?

Sí. El sistema valida correctamente los datos ingresados y muestra mensajes claros de error, advertencia o exito segun el caso.

* ¿Que salida fue mas clara?

La salida de error por cantidad negativa fue la mas clara porque explica exactamente el problema detectado.

* ¿Que salida necesitaba mejora?

La salida inicial de exito necesitaba mejora porque era demasiado general y no mostraba suficiente informacion sobre el registro.

## Conclusion breve

Durante esta practica aprendi a observar cuidadosamente las salidas de un sistema y a interpretar los mensajes mostrados al usuario. Tambien entendi la importancia de comparar el resultado esperado con el resultado obtenido para validar si una aplicacion funciona correctamente. La consola del navegador fue util para identificar posibles errores tecnicos. Ademas, aprendi a mejorar mensajes para que sean mas claros y faciles de entender. Finalmente, comprendi que validar datos correctamente ayuda a evitar errores y mejora la experiencia del usuario.
