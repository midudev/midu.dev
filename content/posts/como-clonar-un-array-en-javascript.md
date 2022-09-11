---
title: >-
  Cómo clonar un Array en JavaScript de forma correcta y sin problemas
date: '2022-06-25'
description: >-
  Hacer una copia de un Array en JavaScript puede parecer algo sencillo pero lo cierto es que este tipo de datos esconde algunas trampas que hay que controlar. 
tags:
  - javascript
toc: true
---

Cuando tienes que **hacer una copia de un Array en JavaScript** tienes que tener bastantes cosas en cuenta para evitar tener problemas. Si quieres descubrir **por qué no puedes usar la asignación, cómo hacer copias superficiales y copias profundas de Array**, entonces sigue leyendo. 👇

## ¿Por qué no puedo usar simplemente la asignación = para copiar un Array? 😱

En JavaScript existen los tipos de datos primitivos (`String, Boolean, Number, null...`) y los `Object` (objetos, array, maps, sets...).

**Los datos primitivos son inmutables.** No puedes cambiarle el valor al string `Hola mundo`. Si quieres *modificarlo*, tienes que crear uno nuevo a partir de otro.

En cambio, las estructuras de datos basadas en `Object` son mutables. Puedes cambiar el valor de estas referencias. Por ejemplo:

```javascript
const dynos = ['🦖', '🦕', '🐉']
const fakeCopyDynos = dynos
// cambiamos el valor del primer elemento en fakeCopyDynos
fakeCopyDynos[0] = '🐓'

// mostramos el valor de fakeCopyDynos y vemos que tiene el cambio
console.log(fakeCopyDynos) // -> [ '🐓', '🦕', '🐉' ]

// pero si miramos también el contenido de dynos...
console.log(dynos) // -> [ '🐓', '🦕', '🐉' ]
// ¡sorpresa! nos han colado la 🐓
```

Como vemos, al cambiar el elemento 0 de la variable `fakeCopyDynos`... ¡también hemos cambiado la de `dynos`! Eso es porque lo que hemos guardado en la variable no es una copia del array, es una referencia hacia el mismo array.

Eso también se puede ver a la hora de comprobar la igualdad entre dos arrays, que también puede llevar a sorpresas:

```javascript
const dynos = ['🦖', '🦕', '🐉']
const fakeCopyDynos = dynos

console.log(dynos === fakeCopyDynos) // -> true

const arrayWithSameDynos = ['🦖', '🦕', '🐉']
console.log(dynos === arrayWithSameDynos) // -> false
```

La comparación con `===` compara la referencia entre ambos arrays y no sus valores, por lo que también hay que tener cuidado con esto.

## ¿Cómo hago una copia de un Array en JavaScript? 🤔

Para evitar el problema que hemos visto antes tenemos que hacer una copia del array original. Para ello tenemos diferentes técnicas y, también, algunos retos que iremos viendo.

Por ahora, la forma más sencilla sería utilizar el método `.concat` de JavaScript:

```javascript
const dynos = ['🦖', '🦕', '🐉']
const copyOfDynos = [].concat(dynos)
// cambiamos el valor del primer elemento en fakeCopyDynos
copyOfDynos[0] = '🐓'

// mostramos el valor de fakeCopyDynos y vemos que tiene el cambio
console.log(copyOfDynos) // -> [ '🐓', '🦕', '🐉' ]

// ahora dynos sigue teniendo el t-rex
console.log(dynos) // -> [ '🦖', '🦕', '🐉' ]
```

`concat` es un método de `Array` que concatena un array a otro. De esta forma estamos haciendo que concatene todos los elementos de `dynos` dentro de un array vacio.

Otra forma sería usar `.slice`. Normalmente este método se usa para recuperar una copia de una parte del array pero si se usa sin paramétros, nos devolverá una copia de todos los elementos del array.

```javascript
const dynos = ['🦖', '🦕', '🐉']
const copyOfDynos = dynos.slice()
```

### La forma más moderna de hacer un copia de un Array 🚀

Sin embargo, hoy en día, puedes usar el operador `spread` que te permite expandir los elementos de un elemento iterable en otro lugar. En este ejemplo, los podemos expandir en un nuevo Array.

```javascript
const dynos = ['🦖', '🦕', '🐉']
const copyOfDynos = [...dynos]
```

Otra forma, todavía más moderna, sería utilizar el método `.from` de Array que además te permite crear array de estructuras de datos iterables:

```javascript
const dynos = ['🦖', '🦕', '🐉']
const copyOfDynos = Array.from(dynos)
```

## Copias superficiales vs. Copias profundas 🆚

Lo que hemos visto hasta el momento funciona correctamente pero tienen un problema. **Son copias superficiales** (o, en inglés, *shallow copy*). Esto quiere decir que sólo está haciendo una copia del primer nivel de los elementos del iterable.

Para ver mejor el problema vamos a darle una vuelta a nuestro Array y vamos a anidar un Array dentro de un Array.

```javascript
const dynosAndFriends = ['🦖', '🦕', ['🦎', '🐊']]
const copy = [...dynosAndFriends]

// En el primer elemento del Array anidado ponemos una 🐓
copy[2][0] = '🐓'

// En la copia todo está bien
console.log(copy) // -> [ '🦖', '🦕', [ '🐓', '🐊' ] ]

// ¡Pero en nuestro Array original se ha cambiado también!
console.log(dynosAndFriends) // -> [ '🦖', '🦕', [ '🐓', '🐊' ] ]
```

**¡Problemón 😱!** Esto no sólo pasa con el `spread operator`. También con el `.slice`, `.from` y el `.concat` tendríamos lo mismo: **una copia superficial del Array.** Dicho de otro modo, si tienes estructuras de datos como objetos o arrays anidados, estos conservarán la referencia en lugar de hacer una copia.

## ¿Cómo hacer una copia profunda de un Array en JavaScript? 🕵️‍♂️

Existe un truco sencillo para hacer una copia profunda de un Array siempre y cuando no intentes copiar datos no serializables (una instancia de una clase, una función, una fecha...). Para ello puedes usar los métodos `parse` y `stringify` de `JSON`:

```javascript
const dynosAndFriends = ['🦖', '🦕', ['🦎', '🐊']]
const dynosAndFriendsString = JSON.stringify(dynosAndFriends)
const copyOfDynosAndFriends = JSON.parse(dynosAndFriendsString)

// para one-liner-lovers 💛
const copyOfDynosAndFriends = JSON.parse(JSON.stringify(dynosAndFriends))
```

El truco es que convertirmos el array primero en un string y, luego, parseamos este String a JSON y como el Array es una estructura de datos compatible con JSON. **¡Copia realizada!**

Cosas a tener en cuenta:
- Los valores `undefined` se transforman en `null`.
- No puedes guardar funciones, instancias de clases, nodos del DOM... ¡cuidado con esto!
- Muchas instancias intentarán ejecutar el método `.toString` como por ejemplo una instancia de `new Date()` pasaría a ser un string con el ISODate.

### Otra opción con mejor rendimiento y usando recursividad

Si buscas algo con mejor rendimiento (clonar con JSON.parse no es gratis...) y escrito por ti en pocas líneas de código, siempre puedes echar un vistazo a la recursividad.

Gracias a ella, podemos escribir un método para recorrer un Array y copiar los elementos que tiene. Si uno de esos elementos es un Array, se llamará así mismo para volver a proceder a la misma operación. Así será hasta que encuentre un elemento que no es un array y extraerá ese valor.

Ten en cuenta que esta versión **sólo está pensado para tratar con Arrays por lo que no tiene en cuenta para hacer una copia profunda si el array tiene a su vez objetos** pero con unos pocos cambios lo podrías conseguir.

```javascript
const dynosAndFriends = ['🦖', '🦕', ['🦎', '🐊']]

const cloneArray = items =>
  items.map(item =>
    Array.isArray(item)
      ? cloneArray(item)
      : item
    )

const copyOfDynosAndFriends = cloneArray(dynosAndFriends)
```

### Tirar de dependencias como just o lodash 🔽

En el caso que estas soluciones sean insuficientes, **te recomiendo una pequeña dependencia** que te ayudaría a solucionar esto. Se llama [`just-clone` que apenas ocupa unos cientos de bytes.](https://www.npmjs.com/package/just-clone)

```javascript
import clone from 'just-clone'

let arr = [1, 2, 3]
let subObj = { aa: 1 }
let obj = { a: 3, b: 5, c: arr, d: subObj }
let objClone = clone(obj)

arr.push(4)
objClone.d.bb = 2
obj // {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1}}
objClone // {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1, bb: 2}}
```

**Si necesitas clonar arrays recursivos o tienes arrays MUY grandes** (cientos de miles de elementos), entonces lo mejor es que uses [lodash.cloneDeep](https://lodash.com/docs/#cloneDeep). No es la dependencia más liviana pero sí la más optimizada y que maneja mejor los *corner cases.*

### `structuredClone`, el método nativo para hacer una copia profunda de un Array

En las últimas versiones de los navegadores y de *runtimes* de JavaScript como *Deno* o *Node*, existe la posibilidad de utilizar el método `structuredClone`.

Este método crea una copia profunda usando un [algoritmo que está especificado](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) por lo que soluciona los problemas que hemos visto antes. Lo usaríamos así:

```javascript
const dynosAndFriends = ['🦖', '🦕', ['🦎', '🐊']]
const clone = structuredClone(dynosAndFriends)

// En el primer elemento del Array anidado ponemos una 🐓
clone[2][0] = '🐓'

// En el clon está todo bien...
console.log(clone) // -> [ '🦖', '🦕', [ '🐓', '🐊' ] ]

// ¡Y el original sigue estando inalterado!
console.log(dynosAndFriends) // -> [ '🦖', '🦕', [ '🦎', '🐊' ] ]
```

> Este método también se puede utilizar para clonar de forma profunda objetos y, además, también respeta los valores de `Date` o las `Regexp`. Ten en cuenta que este método NO es parte de JavaScript, si no de la Web API.

Entonces... teniendo en cuenta hace copias profundas, que no ocupa espacio, que además es la forma más rápida y nativa... **¿Por qué no usar siempre esta? [El soporte en navegadores de `structuredClone`](https://caniuse.com/mdn-api_structuredclone), a la hora de escribir el artículo, es del 83%.** Lo cuál no está mal, pero navegadores recientes como Chrome 97 o Safari 15.3 todavía no lo soportaban. Así que te recomiendo que, si lo usas, te asegures de cargar un *polyfill*.


## Conclusiones 🗒️

La mejor forma de hacer una copia de un Array, si tienes claro que sólo tiene un nivel y con una copia superficial te basta, sería usar el `spread operator` o `.concat` (a mi me gusta más que `slice` porque creo que es más legible).

```javascript
const dynos = ['🦖', '🦕', '🐉']
const copyOfDynos = [...dynos]
const anotherCopyOfDynos = [].concat(dynos)
```

Ahora, que necesitas soportar una copia profunda y necesitas un apaño pues con el truco del `JSON.parse` ya puedes tirar:

```javascript
const copyOfDynosAndFriends = JSON.parse(JSON.stringify(dynosAndFriends))
```

Si quieres curarte en salud seguramente lo mejor es que decidas tirar por una dependencia. Para usas más típicos tendrías `just-clone` y para casos más complejos, mejor tira de `lodash`.

Además, tienes que saber que ya tienes disponible un método nativo en la Web API para conseguirlo sin usar dependencias. Es el método `structuredClone`. Lo único que tienes que tener cuidado es con el soporte de los navegadores (aunque siempre puedes usar un *polyfill* mientras). Si eso no es un problema y lo tienes controlado entonces, **es la mejor opción de lejos.**
