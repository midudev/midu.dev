---
title: "Cómo resolver todas las promesas en JavaScript"
date: "2022-12-07"
description: "Cómo utilizar el método Promise.all() de JavaScript para esperar a que se resuelvan varias promesas de manera simultánea y obtener todos sus resultados."
toc: true
tags:
  - javascript
---

Si has trabajado con promesas en JavaScript, es posible que hayas encontrado una situación en la que necesitas esperar a que se resuelvan varias promesas de manera simultánea y obtener todos sus resultados. En este caso, puedes utilizar el método `Promise.all()` para resolver todas las promesas de una sola vez.

Por ejemplo, supongamos que queremos obtener los datos de varias APIs de manera asíncrona y mostrarlos en pantalla cuando todos estén disponibles. Podríamos utilizar el método `Promise.all()` de la siguiente manera:

```javascript
const url1 = 'https://api.example.com/data1'
const url2 = 'https://api.example.com/data2'
const url3 = 'https://api.example.com/data3'

const promise1 = fetch(url1).then(response => response.json())
const promise2 = fetch(url2).then(response => response.json())
const promise3 = fetch(url3).then(response => response.json())

Promise.all([promise1, promise2, promise3]).then(results => {
  // aquí obtenemos un array con los resultados de cada promesa
  const [result1, result2, result3] = results
  console.log(result1, result2, result3)
})
```

En el código anterior, utilizamos el método `fetch()` para obtener los datos de cada API y convertirlos a formato JSON. Luego, utilizamos el método `Promise.all()` para esperar a que se resuelvan todas las promesas y obtener los resultados en un array. Finalmente, imprimimos los resultados en la consola.

Si alguna de las promesas falla, el método `Promise.all()` devolverá un error. Por ejemplo, si la API `https://api.example.com/data2` no está disponible, el método `Promise.all()` devolverá un error:

```javascript
Promise.all([promise1, promise2, promise3]).then(results => {
  // aquí obtenemos un array con los resultados de cada promesa
  const [result1, result2, result3] = results
  console.log(result1, result2, result3)
}).catch(error => {
  console.log(error)
})
```

Esto a veces no es la mejor forma de resolver el problema. Si una de las promesas falla, es posible que quieras continuar con el resto de las promesas y obtener los resultados de las que se resolvieron correctamente. En este caso, puedes utilizar el método `Promise.allSettled()`:

```javascript
Promise.allSettled([promise1, promise2, promise3]).then(results => {
  // aquí obtenemos un array con los resultados de cada promesa
  const [result1, result2, result3] = results
  console.log(result1, result2, result3)
})
```

El método `Promise.allSettled()` devuelve un array con los resultados de cada promesa, incluso si alguna de ellas falla. Cada resultado es un objeto con dos propiedades: `status` y `value`. La propiedad `status` indica si la promesa se resolvió correctamente o falló. La propiedad `value` contiene el resultado de la promesa.

```javascript
Promise.allSettled([promise1, promise2, promise3]).then(results => {
  // aquí obtenemos un array con los resultados de cada promesa
  const [result1, result2, result3] = results
  console.log(result1, result2, result3)
}).catch(error => {
  console.log(error)
})
```

En el código anterior, la promesa `promise2` falló, pero el método `Promise.allSettled()` devolvió un array con los resultados de las otras dos promesas. La propiedad `status` de la promesa `promise2` es `rejected`, mientras que la propiedad `value` contiene el error.

## ¿Promise.all o Promise.allSettled?

El método `Promise.all()` es útil cuando quieres esperar a que se resuelvan todas las promesas y obtener los resultados de todas ellas. Si alguna de las promesas falla, `Promise.all()` devolverá un error.

El método `Promise.allSettled()` es útil cuando quieres obtener los resultados de todas las promesas, incluso si alguna de ellas falla. `Promise.allSettled()` devuelve un array con los resultados de cada promesa, incluso si alguna de ellas falla.
