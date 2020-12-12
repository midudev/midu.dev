---
title: 'Resolviendo promesas en Svelte con {#await}'
date: '2020-12-12'
description: >-
  Aprende a usar las plantillas de Svelte para resolver tus promesas y mejorar
  tus componentes
tags:
  - svelte
image: /images/og/resolviendo-promesas-svelte-await.png
---

{{< youtube id="c1kvN5jqQ18" >}}

Como ya hemos visto en artículos anteriores, podemos fácilmente [crear un estado en Svelte y utilizarlo para guardar el fetching de datos](https://midu.dev/declaraciones-reactivas-fetching-de-datos-en-svelte/). Sin embargo, *Svelte* ofrece una **sintaxis especial** a la hora de trabajar con promesas y vamos a ver qué nos ofrece.

## Resolviendo promesas con declaraciones reactivas y condicionales

Cuando aprendemos **Svelte 🔶**, y ya conocemos otras bibliotecas como **React** ⚛️, **nos vemos tentados a guardar en el estado el resultado de la promesa.** Esto nos obliga a crear, como mínimo, dos estados: un `loading` para saber si la promesa se está resolviendo y otra para el valor de la promesa.

Por ejemplo, vamos a recuperar una imagen aleatoria de un zorro 🦊 de la API `randomfox`. Crearemos las declaraciones reactivas `loading` y `foxImage` y la sintaxis del condicional `{#if}` para saber cuando estamos cargando y cuando tenemos la imagen.

```html
<script>
	let loading = true
	let foxImage

  const fetchRandomFox = async () => {
    const response = await fetch('https://randomfox.ca/floof/')
    const data = await response.json()
    // actualizamos las declaraciones reactivas
		loading = false
		foxImage = data.image
  }
	
	fetchRandomFox()
</script>

{#if loading}
  <p>...cargando</p>
{:else if foxImage}
  <img src={foxImage} alt="Fox" />
{/if}
```

[**Enlace a la demo**](https://svelte.dev/repl/ca4ed7ab2b97404b8822a4182016e169?version=3.31.0)

Esto funcionar... funciona. Pero hemos tenido que crear una variable `loading` para manejar cuando la promessa estaba cargando y cuando no. Además, **si quisieramos manejar si hay un error en la promesa**, deberíamos crear una variable más y empieza a generar demasiado boilerplate para algo tan sencillo.

¡Y ya sabemos que **a Svelte no le gusta el boilerplate**! 😆
Así que vamos a aprender una forma de evitarlo. 👇

## Resolviendo promesas con la sintaxis #await

**Svelte** proporciona una sintaxis de plantilla llamada `{#await}` que te permite trabajar directamente con la promesa sin necesidad de preocuparte en guardar diferentes estados para trabajar con la promesa, lo que **simplifica mucho el código** 🤩.

La sintaxis funciona de esta manera:

```html
{#await promise}
	<p>...cargando promesa</p>
{:then data}
	<p>promesa resuelta con {data}</p>
{/await}
```

Para ver cómo nos podría ayudar, **vamos a reescribir nuestro ejemplo** de forma que haga uso de esta sintaxis:

```html {hl_lines=["4", "7", "10-14"]}
<script>
  const fetchRandomFox = async () => {
    const response = await fetch('https://randomfox.ca/floof/')
    return response.json() // devolvemos directamente la promesa
  }
  // guardamos la promesa directamente en una variable
	const foxImagePromise = fetchRandomFox()
</script>

{#await foxImagePromise}
  <p>...cargando</p>
{:then data}
  <img src={data.image} alt="Fox" />
{/await}
```

[**Enlace a la demo**](https://svelte.dev/repl/4b9c364fcf174fc2931c39442ded3e6e?version=3.31.0)

¡Ajá! **Menos líneas de código y menos variables que declarar.** Por si fuera poco, en la sintaxis también podemos hacer directamente un catch de los errores de forma que, si la promesa no resuelve correctamente podremos renderizar un contenido diferente.

```html {hl_lines=["14-16"]}
<script>
  const fetchRandomFox = async () => {
    const response = await fetch('https://randomfox.ca/floof/')
    return response.json() // devolvemos directamente la promesa
  }
  // guardamos la promesa directamente en una variable
	const foxImagePromise = fetchRandomFox()
</script>

{#await foxImagePromise}
  <p>...cargando</p>
{:then data}
  <img src={data.image} alt="Fox" />
{:catch error}
	<p>Algo no ha ido bien!</p>
{/await}
```

## Usando la forma corta de la sintaxis

En el caso que tu promesa siempre resuelva (por lo tanto nunca entraría en el `catch`) y, además, no quieres controlar si la promesa está cargando, puedes usar la sintaxis corta con la que puedes usar directamente el valor de la promesa:

```html
{#await promise then value}
	<p>El valor que devuelve la promesa es {value}</p>
{/await}
```

En nuestro ejemplo quedaría de la siguiente forma:

```html {hl_lines=["10-12"]}
<script>
  const fetchRandomFox = async () => {
    const response = await fetch('https://randomfox.ca/floof/')
    return response.json() // devolvemos directamente la promesa
  }
  // guardamos la promesa directamente en una variable
	const foxImagePromise = fetchRandomFox()
</script>

{#await foxImagePromise then data}
  <img src={data.image} alt="Fox" />
{/await}
```

[**Enlace a la demo**](https://svelte.dev/repl/458ba21ab528427e81cc06986d016fa3?version=3.31.0)


## Conclusiones

Teniendo en cuenta la cruzada contra el boilerplate que tiene Svelte en nuestros componentes y en **JavaScript** en general, no era ninguna sorpresa que tuviese expresiones en su plantilla preparadas para hacernos la vida más fácil con las promesas.

Además se parece mucho a la forma de trabajar con eventos asíncronos en **Javascript con la sintaxis de `await` que se añadió en el lenguaje en ES2017.**

Con eso, podemos esperar a las promesas a resolverse y definir diferentes partes de nuestra interfaz dependiendo de si nuestra promesa todavía no se ha resultado (*await*), si se ha resuelto (*resolve/then*) o si ha fallado (*reject/catch*).

Te dejo la clase en vídeo por si prefieres seguirla visualmente.

{{< youtube id="c1kvN5jqQ18" >}}
