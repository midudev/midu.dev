---
title: ¿Por qué forEach es más rápido que for en JavaScript?
date: '2022-12-16'
description: Explicamos qué razón hace que forEach de JavaScript sea más rápido que el clásico for
topic: javascript

toc: true
tags:
- javascript
---

Mucha gente cree, **de forma equivocada**, que `for` es la forma más rápida de hacer bucles en JavaScript.

A favor de esa opinión hay que decir dos cosas:

- En algunos casos sigue siendo cierto, como veremos en el artículo.
- En algún momento del pasado sí fue verdad, porque los compiladores no contaban con las optimizaciones que hoy sí tienen.

## ¿Qué es el método `forEach` de Array?

`forEach` es un método de las arrays de JavaScript que se utiliza para iterar sobre los elementos de un array y ejecutar una función determinada en cada uno de ellos. A diferencia del bucle `for`, forEach no tiene un contador y no permite la interrupción o el salto de iteración.

```javascript
const array = [1, 2, 3, 4, 5]

array.forEach((element) => {
  console.log(element)
})
```

## ¿Por qué `forEach` puede ser más rápido que `for`?

En general, `forEach` puede ser más rápido que `for` debido a que es más simple y no requiere la gestión de un contador y la comprobación de condiciones.

Por ejemplo, el siguiente código el mismo código de antes con `for` se vería así:

```javascript
const array = [1, 2, 3, 4, 5]

for (let i = 0; i < array.length; i++) {
  console.log(array[i])
}
```

Además de que **la carga cognitiva del lector es mayor** (debe leer todas las condiciones del bucle), el compilador tiene que hacer más trabajo para optimizar el código. Esto se debe a que el compilador no puede asumir que el valor de `i` no cambia en cada iteración, por lo que debe comprobarlo en cada iteración.

Además, tiene que acceder al `length` cada vez que itera, incrementar el contador y comprobar la condición de parada. **Esto hace que el código pueda ser más lento.**

De hecho, vamos a crear un pequeño benchmark para comprobarlo. Imagina que tenemos un array de 1000 números y queremos crear un nuevo array con los números pares.

```javascript
// creamos un array de 1000 números
const array = Array.from({ length: 1000 }, (_, i) => i)

// creamos un nuevo array con los números pares
let newArray = []

// con for
for (let i = 0; i < array.length; i++) {
  if (array[i] % 2 === 0) {
    newArray.push(array[i])
  }
}

// con forEach
array.forEach((element) => {
  if (element % 2 === 0) {
    newArray.push(element)
  }
})

// con map y filter
newArray = array
  .map((element) => {
    if (element % 2 === 0) {
      return element
    }
  })
  .filter(Boolean)
```

Y los resultados del benchmark en operaciones por segundo (más es mejor):

- Con `forEach`: 31.290 ops/s
- Con `filter` y `map`: 22.170 ops/s
- Con `for`: 17.610 ops/s

Puedes revisar y ejecutar tu mismo el código en [este enlace](https://slug.vercel.app/s/for-bench).

A> ¿Cómo podrías mejorar la velocidad del for? Podrías guardar en una variable el valor de `array.length` para que no se tenga que acceder a él en cada iteración. También está demostrado que recorrer los arrays de atrás hacia delante es más rápido que de delante hacia atrás. Por lo tanto, podrías hacer algo como esto. Pero... ¿vale la pena?

## No siempre `forEach` es más rápido que `for`

Obviamente, no siempre `forEach` es más rápido que `for`. En algunos casos, el bucle `for` puede ser más rápido que `forEach` y más aconsejable.

Como hemos comentado antes, `forEach` no permite la interrupción o el salto de iteración. Esto puede ser un problema si queremos parar el bucle antes de que se acabe.

Por ejemplo, si queremos buscar un elemento en un array y parar el bucle cuando lo encontremos, no podemos hacerlo con `forEach`. En este caso, `for` es más rápido.

```javascript
const array = [1, 2, 3, 4, 5]

let found = false

for (let i = 0; i < array.length; i++) {
  if (array[i] === 3) {
    found = true
    break
  }
}
```

Sin embargo, recuerda que para esto tienes el método `.some` de *Array* que te permite parar el bucle cuando encuentras el elemento que buscas y, de hecho, suele ser más rápido que `for`:

```javascript
const array = [1, 2, 3, 4, 5]

const found = array.some((element) => element === 3)
```

Es más legible y más rápido que `for` y `forEach`. ¿Qué más se puede pedir?

Hay otras ocasiones en las que `for` puede ser más rápido que `forEach`. Por ejemplo, cuando estás iterando un número fijo un número de veces en lugar de un array. En este caso, `for` es más rápido que `forEach` porque no tiene que acceder al `length` del array y no tienes que crear un array para iterar, obviamente.

```javascript
// con for
for (let i = 0; i < 1000; i++) {
  console.log(i)
}

// con forEach
Array.from({ length: 1000 }).forEach((_, i) => {
  console.log(i)
})
```

## Conclusión: no sacrifiques la legibilidad por velocidad

Como hemos visto, `forEach` puede ser más rápido que `for` en algunos casos, pero no siempre. Y a veces hay otros métodos de Array que nos permite evitar el bucle `for` y hacer el código más legible... ¡y rápido!

Sea como sea, **hay que tener en cuenta que la legibilidad del código puede ser más importante que la velocidad**. Si el código es más legible, será más fácil de mantener y de depurar. Y si es más fácil de mantener y de depurar, será más fácil de mejorar y de optimizar. Y la diferencia de velocidad, en este caso, será insignificante.

En los casos que tengas que iterar un número n de veces, que no sea un array ya creado, entonces puede ser buena idea usar directamente un `for` que no te obliga a crear un array para iterar.
