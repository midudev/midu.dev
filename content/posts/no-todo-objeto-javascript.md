---
title: No todo es un objeto en JavaScript
date: '2022-07-22'
description: Existe la errónea creencia que en JavaScript todo es un objeto o hereda de Object. Te explico por qué.
topic: javascript
toc: true
tags:
- javascript
---

Decir que en JavaScript *"todo es un objeto"* es incorrecto... No *"todo hereda de Object"* en el lenguaje, aunque lo parezca. No sé de dónde salió esa idea pero... es un error pensar esto.

## Tipos de datos en JavaScript

[Según la especificación de ECMAScript](https://tc39.es/ecma262/#sec-type), **los tipos de datos disponibles en JavaScript se separan en dos grupos: primitivos y objetos.**

Los primitivos son:
`undefined`, `null` , `Boolean`, `Number`, `String`, `BigInt` y `Symbol`.

**Los primitivos representan un dato en la implementación más baja posible.**

Todo lo que no es un primitivo, es un objeto. No sólo el propio `Object`. También los `Array`, `Set`, `Map`, `Date`, `Regex`, `Promise` y todo lo que se te ocurra.

Las `Function` también son objetos. Con la particularidad que pueden ser invocados (ejecutados).

## `typeof` para salir *casi* de dudas

Para saber el tipo de dato en JavaScript podemos usar el operador `typeof`. De hecho, **este operador es el que justamente viene a desmentir que todo sea un objeto** aunque tiene algunas particularidades que luego comentaremos.

```javascript
typeof 2; // number
typeof true; // boolean
typeof "midu"; // string
typeof undefined; // undefined
typeof Symbol(); // symbol
typeof 2n; // bigint

typeof null; //object * (caso especial)

typeof {}; // object
typeof []; // object
typeof new Map(); // object
typeof new Set(); // object
typeof /abc/; // object
```

Como podemos ver, los tipos primitivos indican su tipo esperado... excepto `null`. En este caso, el tipo es `object`. **Esto es por un bug histórico en el lenguaje** que no se ha solucionado para no romper la retro compatibilidad con código ya existente. Lo correcto sería que el `typeof` diese `null`, ya que [se trata de un tipo primitivo, tal y como indica la especificación.](https://tc39.es/ecma262/#sec-ecmascript-overview).

Existe otro caso especial. Las funciones. Tienen su propio `typeof`, ya que son un caso especial de `object` ya que son *llamables* (ejecutables).

```javascript
typeof function () {} // function
```

> null por un error histórico tiene como typeof object. Pero no es que sea un object ni que herede de él. No se arregla el bug para evitar problemas de retrocompatibilidad. Es lo que tiene la web.

## Boxing de tipos primitivos

¿Dónde viene entonces la confusión de que todo es un objeto en JavaScript? La confusión viene porque los primitivos parecen tener propiedades y métodos.

Por ejemplo, puedes acceder a la longitud de un objeto o transformar un número en un string con decimales:

```javascript
"Esto es un primitivo".length // 20
"Esto también".toUpperCase() // 'ESTO TAMBIÉN'

(2).toString() // '2'
(2).toFixed(2) // '2.00'

true.toString() // 'true'
true.valueOf() // true
```

Lo que ocurre es que JavaScript envuelve el tipo primitivo automáticamente. Aunque en la especificación no habla de un término en concreto, se le conoce como *boxing* y sería, **según la especificación**, una [forma de coerción implicita para transformar el dato primitivo en objeto al vuelo](https://tc39.es/ecma262/#sec-requireobjectcoercible).

> Aunque creas que la coerción sólo es para transformar de un tipo a otro, grandes autores como Kyle Simpson consideran que este "boxing" también sería una coerción al ser una transformación automáticamente del lenguaje.

Así que la confusión **viene por pensar que el primitivo de string es lo mismo que la instancia de usar el objeto String** que nos da automáticamente JavaScript para facilitarnos la vida.

```javascript
const n = 2
typeof n // number
n instanceof Number // false

const n2 = new Number(2)
typeof n2 // number
n2 instanceof Number // true

n === n2 // false
```

Y no lo es. No son iguales, ni son del mismo tipo. Y, claro, el primero no hereda de `object` .

```javascript
"hola" === new String("hola") // false
2 === new Number(2) // false
true === new Boolean(true) // false
```

Ojo. No confundas usar el `new Boolean(true)` con simplemente usar `Boolean(true)`. El primero crea una instancia del objeto Boolean y el segundo sólo hace una conversión del parámetro al tipo primitivo `boolean`.

```javascript
true === Boolean(true) // true
true === Boolean(1) // true
true === Boolean(true) // true
```

**Los objetos son una parte MUY importante en JavaScript pero eso no significa que TODO sea un objeto.**

## Conclusiones

Por la coerción de datos, o el boxing que hemos visto, **puede parecer todo es un objeto**, ya que simula que podemos acceder a propiedades y métodos de un primitivo.

En realidad es **JavaScript simplificando su sintaxis para que no tengas que hacerlo tu mismo**. Es obvio que los tipos primitivos no son objetos, ya que, si lo fuesen, sus valores serían mutables también (y no lo son).

**Esto es en JavaScript...** hay que tener en cuenta que en otros lenguajes de programación esto puede ser diferente. ¡Tenlo en cuenta!
