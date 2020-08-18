---
title: Renderizado condicional con Svelte
date: '2020-03-26'
image: '/images/svelte-conditional-rendering.jpg'
description: Aprende a realizar un renderizado condicional, esto es, mostrar diferentes elementos o componentes de Svelte dependiendo de una condición

toc: true
tags:
- svelte
---

Seguimos con [Svelte](https://midu.dev/introducci%C3%B3n-a-svelte/) para hablar hoy de cómo poder crear renderizados condicionales con este framework. Si prefieres ver [el vídeo de mi canal de Youtube](https://www.youtube.com/c/midudev?sub_confirmation=1), como siempre, aquí te lo dejo. Si quieres texto... ¡sigue leyendo 👇!

{{< youtube id="r2ZX_Awv3WU" >}}

### ¿Qué es un renderizado condicional?

Un renderizado condicional es, simplemente, **renderizar diferentes elementos o componentes dependiendo de ciertas condiciones.** Dicho de otra forma: trasladar la funcionalidad de `if` al renderizado de nuestros componentes. Esto es muy típico en librerías como *React* o *Vue* y, por supuesto, Svelte no iba a ser una excepción.

### La sintaxis del renderizado condicional en Svelte

Como ya vimos en el artículo de *[Declaraciones reactivas y fetching de datos en Svelte](https://midu.dev/componentes-y-estado-en-svelte/)*, hay una forma muy sencilla de lograr renderizar algo diferente dependiendo de una condición: **evaluando una ternaria.**

```html {hl_lines=["7"]}
<script>
 let counter = 2;
 const handleClick = () => counter++
</script>

<button on:click={handleClick}>Incrementar</button>
<span>{counter % 2 === 0 ? 'Is Even' : 'Is Odd'}</span>
```

En ese caso, estaríamos cambiando el mensaje que se renderiza dependiendo de si `counter` es par o impar. Pero, **imaginemos que no sólo queremos cambiar el mensaje, si no que además queremos cambiar lo que renderiza.** Podríamos probar a hacer lo siguiente:

```html {hl_lines=["7-10"]}
// ❌ ESTE CÓDIGO ES INCORRECTO
<script>
 let counter = 2;
 const handleClick = () => counter++
</script>

<button on:click={handleClick}>Incrementar</button>
{counter % 2 === 0
  ? <strong>Is Even</strong>
  : <small>Is Odd</small>
}
```

**El código anterior no es correcto.** *Svelte* nos dice que existen tokens que no esperaba al intentar compilarlo y es que esta no es la forma correcta de conseguir un renderizado condicional. Para ello, debemos usar la sintaxis de plantillas de *Svelte*:

```html {hl_lines=["8-11"]}
<script>
 let counter = 2;
 const handleClick = () => counter++
</script>

<button on:click={handleClick}>Incrementar</button>

{#if counter % 2 === 0}
  <strong>Is Even</strong>
{/if}
```

También podemos controlar la condición contraria. Para ello, vamos a añadir a la plantilla la condición `:else` y dentro lo que queremos renderizar en el caso que el contador no sea par:

```html {hl_lines=["10-11"]}
<script>
 let counter = 2;
 const handleClick = () => counter++
</script>

<button on:click={handleClick}>Incrementar</button>

{#if counter % 2 === 0}
  <strong>Is Even</strong>
{:else}
  <small>Is Odd</small>
{/if}
```

Vamos a ver un ejemplo más complejo. En este caso **podemos [crear un estado en *Svelte*](https://midu.dev/componentes-y-estado-en-svelte/)** que nos indicará cuando estamos esperando la respuesta de una llamada a una API. De esta forma, podremos darle la información al usuario:

```html {hl_lines=["3", "10", "15", "26-28" ]}
<script>
  let value = ''
  let loading = false
  let response = []

  const handleInput = (event) =>
    value = event.target.value

  $: if (value.length > 2) {
    loading = true
    fetch(`https://www.omdbapi.com/?s=${value}&apikey=422350ff`)
      .then(res => res.json())
      .then(apiResponse => {
        response = apiResponse.Search || []
        loading = false
      })
  }
</script>

<input
  placeholder="Search movies..."
  value={value}
  on:input={handleInput}
/>

{#if loading}
  <strong>Loading...</strong>
{/if}
```

En este caso podríamos complicarlo un poco más y anidar condiciones para también el número de resultados que nos ha devuelto la llamada, una vez que termine. Para ello vamos a aprovecharnos que tenemos el estado `response` donde guardaremos el número de películas que nos ha devuelto la API.

```html {hl_lines=["4", "14", "29-33" ]}
<script>
  let value = ''
  let loading = false
  let response = []

  const handleInput = (event) =>
    value = event.target.value

  $: if (value.length > 2) {
    loading = true
    fetch(`https://www.omdbapi.com/?s=${value}&apikey=422350ff`)
      .then(res => res.json())
      .then(apiResponse => {
        response = apiResponse.Search || []
        loading = false
      })
  }
</script>

<input
  placeholder="Search movies..."
  value={value}
  on:input={handleInput}
/>

{#if loading}
  <strong>Loading...</strong>
{:else}
  {#if response.length > 0}
    <h4>Tenemos {response.length} películas</h4>
  {:else}
    <small>No hay resultados</small>
  {/if}
{/if}
```

Seguramente te lo estés preguntando, pero obviamente también permite utilizar una condición `else if` para simplificar el código. De esta forma, podríamos dejarlo de esta forma:

```html {hl_lines=["3-4" ]}
{#if loading}
  <strong>Loading...</strong>
{:else if response.length > 0}
  <h4>Tenemos {response.length} películas</h4>
{:else}
  <small>No hay resultados</small>
{/if}
```

### Conclusiones

Al final, **el renderizado condicional no es muy diferente a cómo trabajamos con las condiciones en nuestro código *Javascript*** pero, como hemos visto, *Svelte* tiene una sintaxis especial que necesitamos conocer para trabajar con este tipo de casos.

Personalmente no soy muy fan de usar sistemas de plantillas y me gusta más, por ejemplo, como *React* te permite decidir lo que renderiza nuestro componente basándose puramente en *Javascript*. Pero para desarrolladores sin tantos conocimientos del lenguaje, quizás este sistema de plantillas pueda ayudarles.

Dicho esto, dominar el renderizado condicional comienza a darle más sentido a los componentes de *Svelte* ya que hace que se puedan adaptar a los diferentes estados y props que le llegan. La clave para ser reutilizable.

**¡En la siguiente clase veremos cómo podemos renderizar listas de elementos! ¡No te lo pierdas!**