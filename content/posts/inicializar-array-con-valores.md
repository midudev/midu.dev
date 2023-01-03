---
title: Cómo inicializar Array con valores en JavaScript
date: '2023-01-03'
description: 'Aprende a inicializar un Array con valores en JavaScript'
tags:
- javascript
---

En *JavaScript*, un *Array* es una **estructura de datos que nos permite almacenar una colección de elementos**. Estos elementos pueden ser de cualquier tipo, incluso pueden ser otros Arrays.

Normalmente los *Arrays* se inicializan de forma vacía y luego se van añadiendo elementos. Sin embargo, en ocasiones, puede ser útil inicializar un Array con valores.

En este artículo te voy a enseñar como inicializar un Array con valores en *JavaScript*.

## Inicializar Array con valores

Para inicializar un *Array* con valores, podemos usar la sintaxis de *Array* literal. En esta sintaxis, los valores se separan por comas y se encierran entre corchetes.

```javascript
const numbers = [1, 2, 3, 4, 5]
```

## Inicializar Array con valores repetidos

Si queremos inicializar un **Array con valores repetidos**, podemos usar la función `Array.from` y pasar como argumento el número de elementos que queremos que tenga el Array y una función que devuelva el valor que queremos que tenga cada elemento.

```javascript
const numbers = Array.from({ length: 5 }, () => 1)
```

En este caso el segundo parámetro sirve como `map`, una función que se ejecuta para cada elemento del Array. En este caso, como queremos que todos los elementos tengan el mismo valor, la función devuelve siempre devuelve `1` y es lo que guardará en cada posición.

Otra forma de inicializar un Array con valores repetidos es usando la función `fill`.

```javascript
const numbers = Array(5).fill(1)
```

Es algo más corta de escribir y se entiende mejor.

## Inicializar Array con valores consecutivos

Si queremos inicializar un Array con valores consecutivos, podemos usar la función `Array.from` y pasarle como argumento el número de elementos que queremos que tenga el Array y una función que devuelva el valor que queremos que tenga cada elemento.

```javascript
const numbers = Array.from({ length: 5 }, (_, index) => index + 1)
```

En este caso no podemos usar la función `fill` porque no podemos pasarle un valor inicial y un incremento. 

## Inicializar Array con valores aleatorios

Si queremos inicializar un Array con valores aleatorios, podemos usar la función `Array.from` y pasarle como argumento el número de elementos que queremos que tenga el Array y una función que devuelva el valor que queremos que tenga cada elemento.

```javascript
const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10))
```

## Inicializar Array con valores de otro Array

Si queremos inicializar un Array con valores de otro Array, podemos usar la función `Array.from` y pasarle como argumento el Array que queremos copiar.

```javascript
const numbers = Array.from([1, 2, 3, 4, 5])
```

Ten en cuenta que estaremos haciendo una copia superficial del *Array*, por lo que si el *Array* que queremos copiar contiene otros *Arrays*, no se copiarán esos valores, sino que se copiará la referencia al *Array* anidado. Lo mismo ocurrirá con los objetos.
