---
title: Cómo cancelar una petición fetch
date: '2020-05-23'
description: >-
  Aprende a abortar peticiones fetch gracias al uso de AbortController y
  AbortSignal.

toc: true
tags:
  - javascript
image: /images/og/como-cancelar-una-peticion-fetch.png
---

Con la **API Fetch** podemos recuperar muy fácilmente recursos de la red y, además, con una conveniente interfaz basada en Promesas pero... ¿Qué ocurre cuando queremos **cancelar o abortar una petición que hemos iniciado**?

En ocasiones ocurre que, ya sea **porque el usuario no quiere descargar el recurso** o porque ha realizado una acción en la página que hace inútil esa petición o porque no queremos hacer esperar más al usuario, **queremos parar la petición**. Muchas veces la estrategia pasa por *ignorar* la respuesta que de fetch pero, al estar basado en Promesas, a veces esto puede ser problemático o, simplemente, es gastar recursos de forma inútil.

Imaginemos un ejemplo, vamos a usar fetch para hacer una llamada a una API y vamos a pintar su resultado en un elemento:

```javascript
// recuperamos una lista de películas e información sobre ellas
fetch('/movies.json')
// convertimos la respuesta a json
const movies = await moviesResponse.json()
// pintamos el número de películas que tenemos
document.getElementById('movies-results').innerHTML = movies.length
```

Al ser algo totalmente asíncrono, podría ocurrir que mientras el visitante espera la respuesta, navegue a otra página y entonces el elemento `movies-results` ya no exista y pueda producir un error en la aplicación. Para solucionar esto, vamos a **abortar la petición fetch** usar el controlador `AbortController` y una `AbortSignal` que le pasaremos como parámetro al método `fetch`.

```javascript
// creamos el AbortController
const controller = new AbortController()
// recuperamos su AbortSignal de este controlador
const {signal} = controller

// recuperamos una lista de películas e información sobre ellas
// ❗ Importante: a fetch, le pasamos la AbortSignal `signal`
const moviesResponse = await fetch('/movies.json', { signal })
const movies = await moviesResponse.json()
// pintamos el número de películas que tenemos
document.getElementById('movies-results').innerHTML = movies.length
```

## Abortando una petición fetch en React

Por poner un ejemplo de la utilidad de esto.
