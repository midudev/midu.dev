---
title: Cómo usar async/await con el método .map de los Arrays
date: '2021-07-04'
description: >-
  Descubre cómo puedes usar el método map a la hora de iterar Arrays y funciones asíncronas fácilmente
toc: true
tags:
  - javascript
---

Si alguna vez has intentado usar los métodos de Array `.map` o `.forEach` con una función asíncrona habrás visto que no puedes esperar el resultado sin más en cada iteración.

```javascript
const usernames = ['midudev', 'd4nidev', 'codingwithdani']

const posts = usernames.map(async (username) => {
  return await fetchPostsFromTwitter(username)
})
```

Esto, que podría parecer que va a esperar cada llamada al método `fetchPostsFromTwitter` en cada iteración, en realidad no espera la llamada asíncrona y si miramos el valor que hay en `posts` nos encontraremos que tenemos una lista de promesas sin resolver.

```javascript
console.log(posts)
/*
[
  Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> }
]
*/
```

Llegado a este punto tienes dos opciones.

## Usando `Promise.all`

**La primera opción** sería utilizar un `Promise.all` para esperar que todas las promesas se resuelvan. Esto hará que todo el código asíncrono se resuelva en paralelo. Esto quiere decir que si tenemos un número N de funciones asíncronas, las N funciones se ejecutarán en paralelo y se irán resolviendo sin esperar entre ellas.

Dicho de otro modo, el tiempo que tardará en resolverse el `Promise.all` será el tiempo más lento de todas las N llamadas.

```javascript
const usernames = ['midudev', 'd4nidev', 'codingwithdani']

const posts = await Promise.all(
  usernames.map(async (username) => {
    return await fetchPostsFromTwitter(username)
  })
)

console.log(posts)
/*
[ 
  postsFromMidudev,
  postsFromD4nidev,
  postsFromCodingWithDani
]
*/
```

## Usando `for ... of`

**Otra opción sería ejecutar el código de forma secuencial**, de forma que puedas esperar cada una de las llamadas. Esto hará que cada iteración sea resuelta antes de continuar con la siguiente. Y esto lo conseguimos gracias a `for ... of`.

¿Qué significa esto? Que si hacemos N iteraciones y cada iteración tarda en resolverse 2 segundos... esto significa que en total tardaremos 6 segundos en terminar. Así que esta es la diferencia. Con el método anterior lo hacíamos en paralelo y en este lo hacemos secuencial (uno detrás de otro).

```javascript

const posts = []
for (const username of usernames) {
  const userPosts = await fetchPostsFromTwitter(username)
  posts.push(userPosts)
}

console.log(posts)
/*
[ 
  postsFromMidudev,
  postsFromD4nidev,
  postsFromCodingWithDani
]
*/
```

## ¿Qué opción es mejor?

Ahora... ¿cuál es mejor? No hay ninguna mejor que otra *per se*. Depende de cada caso de uso. A veces lo mejor, por tema de rendimiento, es ejecutarlo en paralelo con `Promise.all` y otras veces necesitamos hacerlo en secuencia con `for ... of`. Lo importante es que entiendas la diferencia, qué te ofrece cada uno y cómo usarlos.

## Un reto de JavaScript para ver si lo has entendido

Aquí te dejo un ejemplo dónde se ve claramente qué ocurre cuando mezclas funciones asíncronas con el método `.map`.

{{< youtube id="3s1OiNRd4ZQ" >}}
