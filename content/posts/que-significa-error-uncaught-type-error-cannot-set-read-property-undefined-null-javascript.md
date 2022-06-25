---
title: "¿Qué significa el error “Uncaught TypeError: Cannot set/read property 'XXX' of undefined/null” y cómo solucionarlo?"
date: '2021-07-05'
description: Aprende a solucionar este típico error de JavaScript al intentar acceder a propiedades y atributos de un objeto
topic: javascript
toc: true
tags:
- javascript
---

A veces, cuando estamos trabajando con JavaScript, nos puede mostrar el error `Uncaught TypeError: Cannot set/read property 'XXX' of undefined/null`. Este error, además, puede hacer que nuestra aplicación o web deje de responder como es debido pero...

## ¿Qué significa el error?

Pues como el mensaje dice el problema es que estás intentando acceder (ya sea para leer o para escribir) a una propiedad de una variable que no existe. Esto probablemente signifique que el objeto o instancia al que intentas acceder es `undefined` o `null`.

Por ejemplo:

```javascript
const persona = { nombre: 'Miguel', twitch: 'https://twitch.tv/midudev' }

persona.nombre // ✅ 'Miguel'
persona.twitch // ✅ ''https://twitch.tv/midudev'

persona.youtube // ✅ undefined

persona.direccion.calle
// ❌ TypeError: Cannot read property 'calle' of undefined
```

`persona` en este ejemplo es un objeto con dos atributos: `nombre` y `twitch`.

Podemos acceder a esas propiedades y nos devuelve su valor.
Si intentamos acceder a una propiedad de ese objeto, y no existe, entonces tendremos un valor `undefined` pero no tendremos ningún error.

En cambio, si intentamos acceder a una propiedad que no existe (`undefined`) y de esta propiedad intentamos acceder a otra propiedad... entonces tendremos el error de `TypeError`.

¿Cómo podemos arreglarlo? Tienes diferentes opciones.

## Evita que el objeto sea null o undefined

Una forma de evitar el problema sería simplemente asegurarnos que la propiedad que vamos a acceder esté inicializada para que, al menos tenga un objeto. Esto es una posible solución si tenemos control sobre el objeto y además vamos a estar accediendo a esta propiedad continuamente y es requerida que sí esté formada con algún valor por defecto (como otro objeto vacio).

```js
const persona = {
  nombre: 'Miguel',
  twitch: 'https://twitch.tv/midudev',
  direccion: {}
}

// ahora el intentar acceder a `direccion` almenos ya no tenemos un error
persona.direccion.calle // ✅ undefined
```

## Usa el optional chaining (encadenamiento opcional)

Otra forma interesante de solucionar esto es usar el operador de encadenamiento opcional `?.`. De esta forma acceder de forma segura a propiedades que no sabemos si su referencia existe.

Esta solución es la recomendable y, especialmente, es ideal cuando no tenemos control sobre el objeto y no podemos saber si la propiedad que intentamos acceder está disponible.

```js
const persona = {
  nombre: 'Miguel',
  twitch: 'https://twitch.tv/midudev'
}

const calle = persona.direccion?.calle
console.log(calle) // ✅ undefined
```

Es interesante saber que esto mismo lo puedes hacer a la hora de intentar ejecutar métodos en un objeto anidado.

```js
persona.acciones?.enviarMail?.()
```

El operador `?.` es realmente potente y puede ayudarte a evitar el error de `Uncaught TypeError: Cannot set/read property 'XXX' of undefined/null`.