---
title: toReversed, toSpliced, toSorted y with. Nuevos métodos de Array en JavaScript explicados.
date: '2023-02-07'
description: Aprende a utilizar estos nuevos métodos de Array en JavaScript que te permiten obtener un nuevo array sin modificar el original.
toc: true
tags:
- javascript
---

¡Novedades en JavaScript! Llegan 4 nuevos métodos de Array:

- 🔹 toReversed()
- 🔹 toSorted()
- 🔹 toSpliced()
- 🔹 with()

Ahora bien, qué diferencia tienen estos nuevos métodos con los que ya conocemos como *reverse*, *sort* y *spliced*?

Pues que **devuelven un nuevo array y no modifican el original.**

Vamos a ver unos ejemplos para entenderlo mejor.

## toReversed()

El método `toReversed()` nos permite invertir el orden de un array. Devuelve un nuevo array con los elementos invertidos y no modifica el original.

```js
// Usando el nuevo método .toReversed()
const nums = [1, 2, 3];
nums.toReversed() // => [3, 2, 1] ¡Nuevo Array!
nums // => [1, 2, 3] ¡✅ No modificó el original!
```

Mira la diferencia con el actual método `reverse()`:

```js
// Usando el método .reverse() clásico
const nums = [1, 2, 3]
nums.reverse() // -> [3, 2, 1]
nums // => [3, 2, 1] ¡🛑 Modificó el original!
```

### toSorted()

El método `toSorted()` nos permite ordenar un array. Devuelve un nuevo array con los elementos ordenados y no modifica el original. Igual que el método `sort()` clásico, podemos pasarle una función de comparación para ordenar los elementos.

```js
// Usando el nuevo método .toSorted()
const nums = [3, 2, 1];
nums.toSorted() // => [1, 2, 3] ¡Nuevo Array!
nums // => [3, 2, 1] ¡✅ No modificó el original!
```

Mira la diferencia con el actual método `sort()`:

```js
// Usando el método .sort() clásico
const nums = [3, 2, 1]
nums.sort() // -> [1, 2, 3]
nums // => [1, 2, 3] ¡🛑 Modificó el original!
```

### toSpliced()

El método `toSpliced()` nos permite eliminar o reemplazar elementos de un array. Devuelve un nuevo array con los elementos eliminados/reemplazados y no modifica el original. Igual que el método `splice()` clásico, podemos pasarle un índice, un número de elementos a eliminar y, opcionalmente, los elementos a reemplazar.

```js
// Usando el nuevo método .toSpliced()
const nums = [1, 2, 3];
// elimina 1 elemento a partir del índice 1:
nums.toSpliced(1, 1) // => [1, 3] ¡Nuevo Array!
nums // => [1, 2, 3] ¡✅ No modificó el original!
```

Mira la diferencia con el actual método `splice()`:

```js
// Usando el método .splice() clásico
const nums = [1, 2, 3]
// Elimina 1 elemento a partir del índice 1:
nums.splice(1, 1) // -> [2]
nums // => [1, 3] ¡🛑 Modificó el original!
```

### with()

Este método es muy interesante ya que viene a sustituir la asignación de un índice de un array. Devuelve un nuevo array con el nuevo elemento asignado en la posición indicada y no modifica el original.

```js
const array = ['🐼', '🐻‍❄️', '🐻']
const indexToChange = 1

array.with(indexToChange, 'd') // => ['🐼', '🐶', '🐻']
array // => ['🐼', '🐻‍❄️', '🐻']
```

Mira la diferencia con la asignación de un índice de toda la vida:

```js
// asignación normal modifica el original
const array = ['🐼', '🐻‍❄️', '🐻']
array[1] = '🐶'
array // => ['🐼', '🐶', '🐻']
```

Muchas veces creamos una copia de un array para modificarlo y luego devolverlo. Con estos nuevos métodos podemos hacerlo de una forma más sencilla y sin tener que crear una copia del array.

## ¿Cómo puedo usarlos hoy?

Aunque a día de hoy estos métodos no están soportados por los navegadores (en Chrome llegará en la versión 110 y en Firefox están implementados pero detrás de un *flag*) puedes usar un Polyfill para poder usarlos hoy.

De hecho, [*core-js* ya los tiene soportados](https://github.com/zloirock/core-js#change-array-by-copy), por lo que si transpilas tu código JavaScript con Babel, ya debería añadir los *polyfills* necesarios para que tu código funcione correctamente según tu configuración de navegadores.

## Una mirada al futuro de JavaScript

Estos nuevos métodos son una muestra de lo que nos espera en el futuro de JavaScript. En la próxima especificación de ECMAScript tendremos estos nuevos métodos pero son sólo una antesala de lo que vendrá después.

Y es que estos nuevos métodos vienen a allanar el camino de la llegada de las *Records* y las *Tuplas*, dos nuevos tipos de datos primitivos en JavaScript que son inmutables y que nos permitirán trabajar con datos estructurados, similares a objetos y arrays, de una forma más sencilla y previsible.
