---
title: "ES2022 / ES13: novedades de la última versión de JavaScript"
date: "2021-08-07"
description: Descubre todas las novedades del lenguaje JavaScript con la especificación EcmaScript 2022, para sacarle el máximo partido al lenguaje.
toc: true
tags:
  - javascript
---

**JavaScript** no deja de evolucionar y todos los años se añaden nuevas funcionalidades para mejorar la productividad de los desarrolladores. Este año **2021 no iba a ser una excepción** y te explico las nuevas características que ya tienes disponible en la mayoría de navegadores.

## 1. Logical Assignment Operators (&&= ||= ??=)

Los operadores lógicos `&&`, `||` y `??` ahora también pueden usarse para asignar valores de una forma más sencilla y corta. Perfecto para asignar valores por defecto a variables.

```javascript
// Si x es falsy, se le asigna y
x ||= y
// Equivale a...
x || (x = y)

// Si x es truthy, se le asigna y
x &&= y
// Equivale a...
x && (x = y)

// Si x es null o undefined, se le asigna y
x ??= y
// Equivale a...
x ?? (x = y)
```

Hay que tener en cuenta que en estas asignaciones, además, entra el juego la evaluación *short-circui*t. Esto quiere decir que estas asignaciones lógicas se evaluan de izquierda a derecha. **Si una expresión lógica no se cumple, no se evalúa la siguiente.**

Esto es importante para no cometer errores:

```javascript
// este nuevo tipo de asignación con &&
x &&= y
// ✅ es equivalente a...
x && (x = y)
// ❌ NO es equivalente a...
x = x && y
// ya que la asignación ocurre siempre independientemente de la evaluación
```

## 2. Numeric Separator

Leer algunas cifras en JavaScript puede ser una tarea difícil. Para solucionar esto, el nuevo separador numérico `_` te permite identificar de manera más sencilla cualquier número.

```javascript
// Es difícil saber qué cifra representa
1000000000
19436871.42

// ¡Con Numeric Separator es más fácil!
1_000_000_000 // Ah, es mil millones
100_000_000 // Y esto es cien millones
19_436_871.42 // ¡De un vistazo!
```

## 3. Promise.any

¿Alguna vez has querido esperar una lista de promesas y que, al resolverse correctamente una cualquiera, continuar con la ejecución de tu código? Pues para eso se incorpora **Promise.any()**.

```javascript
const promises = [
  fetch('/from-external-api'),
  fetch('/from-memory'),
  fetch('/from-new-api'),
]

try {
  // espera a la primera respuesta correcta que termine
  const first = await Promise.any(promises)
  // La más rápida fue la de memoria
  console.log(first) // respuesta desde 'from-memory'
} catch (error) {
  // ¡Todas las promesas han fallado!
  console.assert(error instanceof AggregateError)
  // Log the rejection values:
  console.log(error.errors)
  // → [
  //     <TypeError: Failed to fetch /from-external-api>,
  //     <TypeError: Failed to fetch /from-memory>,
  //     <TypeError: Failed to fetch /from-new-api>
  //   ]
}
```

### AggregateError

Como has podido ver en el ejemplo anterior, ahora cuando la promesa falla, se devuelve una instancia de `AggregateError`. Este error es una instancia de `Error` y tiene una propiedad llamada `errors` que contiene una lista de errores para cada promesa que falló.

### La diferencia con `Promise.race`...

`Promise.race` y `Promise.any` son muy similares. La diferencia es que `Promise.race` se resuelve cuando cualquier promesa ha sido *resuelta* o *rechazada*. En cambio `Promise.any` ignora las promesas que son rechazadas y sólo se resuelve cuando se resuelve la primera... o se rechaza cuando todas las promesas se han rechazado.

### La tabla de diferencias de `Promise`

Para que lo veas más claro, he preparado una pequeña tabla para diferenciar los diferentes métodos de Promise a la hora de trabajar con un array de promesas, para que eligas la que más encaje con tu caso de uso.

```
+−−−−−−−−−−−−−−−−−−−−+−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−-−+−−−−−−−−−−−−−−−-−+
| Método             | Descripción                                      | Añadida en...   |
+−−−−−−−−−−−−−−−−−−−−+−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−-−+−−−−−−−−−−−−−−−−-+
| Promise.allSettled | Espera a todas las promesas se resuelvan o no    | ES2020          |
| Promise.all        | Se para cuando una promesa es rechazada          | ES2015          |
| Promise.race       | Se para cuando una promesa es rechaza o resuelta | ES2015          |
| Promise.any        | Se para cuando una promesa es resuelta           | ES2021          |
+−−−−−−−−−−−−−−−−−−−−+−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−-−−−+−−−−−−−−−−−−−−−-−+
```

## 4. replaceAll

Hasta ahora, reemplazar todas las *instancias* de una cadena de texto en una cadena de texto te obligaba a usar `Regex` ya que `replace`, si le pasabas un *string*, lo que hacía era sólo reemplazar la primera instancia encontrada.

```javascript
// ¡Quiero cambiar las manzanas por bananas!
'🍏🍏🍋🍋🍊🍊'.replace('🍏', '🍌')
// Pero qué...
// -> '🍌🍏🍋🍋🍊🍊'

// ¡Tienes que usar Regex para conseguirlo!
'🍏🍏🍋🍋🍊🍊'.replace(/🍏/g, '🍌')

// ¡Hasta ahora! ¡Hola replaceAll!
'🍏🍏🍋🍋🍊🍊'.replaceAll('🍏', '🍌')
```

`replaceAll` queda mucho más legible en nuestro código y hace justo lo que esperaba: cambiar todas las *instancias* de una cadena de texto en una cadena de texto.

## 5. WeakRef

`WeakRef` te permite crear una referencia débil a un objeto para no prevenir que se destruya por el *Garbage Collector* de JavaScript. ¿Por qué? Pues por qué cuando creamos un objeto, especialmente si son grandes, estos no son automáticamente destruidos por el *Garbage Collector* si existe una referencia a ellos.

Con el método `deref` de `WeakRef`, podemos acceder a la referencia del objeto. Si la referencia al objeto ha sido eliminada, se devuelve `undefined`.

```javascript
// Al crear un objeto...
let coords = { x: 13, y: 72 }
// Mientras tengas acceso a él directamente,
// el objeto no será liberado de memoria
// por el Garbage Collector

// Ahora podemos crear una referencia débil al objeto
const weakCoords = new WeakRef(coords)

// Recuperamos las propiedades del elemento
const ref = weakCoords.deref()
if (ref) {
  console.log('Todavía tenemos acceso a las coordenadas')
  ref.x // -> 13
} else {
  // ref es `undefined`
  console.log('La referencia ha sido eliminada')
}
```

> Una cosa que debes tener en cuenta con `WeakRef` es que... seguramente **es mejor si no lo usas**. Esta funcionalidad está pensado para casos muy específicos que, en general, acabarán en librerías y frameworks. **Está bien que conozcas su existencia pero los casos de uso son muy limitados.** La recolección de basura en JavaScript puede variar mucho dependiendo del navegador, entorno y especificaciones del sistema.
