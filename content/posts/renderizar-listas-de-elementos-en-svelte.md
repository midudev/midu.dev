---
title: Cómo renderizar una lista de elementos con Svelte
date: '2020-04-12'
description: >-
  Aprender a iterar una lista, como un array, y renderizar cada elemento en la
  interfaz del usuario utilizando el framework Svelte.

toc: true
tags:
  - svelte
image: /images/og/renderizar-listas-de-elementos-en-svelte.png
---

Nueva entrega en la serie de artículos sobre [Svelte](https://midu.dev/introducci%C3%B3n-a-svelte/). Hoy hablamos de cómo podemos iterar una lista de elementos y renderizarlos utilizando este novedoso framework.

Como siempre, si no te gusta leer, puedes ver [el vídeo de mi canal de Youtube](https://www.youtube.com/c/midudev?sub_confirmation=1). Te lo dejo aquí mismo. 👇

{{< youtube id="93CL7O4hNWU" >}}

### ¿Qué es el renderizado de listas?

Es la acción de iterar un Array y, para cada elemento, mostrar en la interfaz del usuario algo que represente ese elemento. Por ejemplo, podríamos iterar una lista de nombres de usuarios y, para cada elemento, mostrar en la interfaz el nombre de ese usuario.

### La sintaxis para renderizar una lista de elementos en Svelte

Como ya vimos en el artículo sobre [renderizado condicional](https://midu.dev/svelte-renderizado-condicional/), *Svelte* tiene una sintaxis propia para conseguir renderizar una lista de elementos.

Imaginemos que tenemos una lsita de películas en la constante `movies`. Cada película es un objeto y tiene las propiedades `Title` y `Year`:

```javascript
const movies = [
  {Title: "The Avengers", Year: 2012},
  {Title: "Avengers: Infinity War", Year: 2018},
  {Title: "Avengers: Age of Ultron", Year: 2015},
  {Title: "Avengers: Endgame", Year:2019}
] 
```

Para conseguir **renderizar esta lista de elementos en Svelte**, tenemos que utilizar la sintaxis de plantillas `#each` de la siguiente forma:

```
{#each lista as elemento}...{/each}
```

Así que para iterar la lista de películas que hemos visto antes, haríamos:

```html {hl_lines=["3-7"]}
<h1>Lista de películas</h1>
<ul>
	{#each movies as movie}
		<li>
      <strong>{movie.Title}</strong>
      <date>{movie.Year}</date>
    </li>
	{/each}
</ul>
```

> Puedes iterar cualquier tipo de lista. No hace falta que sea un Array. **Cualquier objeto iterable, que tenga una propiedad `.length` funcionaría.** Por ejemplo, prueba a iterar un string y verás como funciona.

A veces, cuando queremos renderizar una lista, es interesante poder tener el índice del elemento. Lo podemos lograr añadiendo a la sintaxis un segundo parámetro.

```
{#each lista as elemento, indice}...{/each}
```

Por lo que nuestro ejemplo, podría quedar así:

```html {hl_lines=["3-8"]}
<h1>Lista de películas</h1>
<ul>
	{#each movies as movie, index}
		<li>
      <span>#{index}</span>
      <strong>{movie.Title}</strong>
      <date>{movie.Year}</date>
    </li>
	{/each}
</ul>
```

### Desestructurando objetos al iterarlos

Ahora bien, es un poco molesto tener que utilizar las propiedades `Title` y `Year` desde el objeto `movie`. ¿Se podría mejorar de alguna forma para poder usar directamente las propiedades en nuestro código? Sí, usando **la desestructuración del objeto directamente en la sintaxis del `{#each}`**:

```html {hl_lines=["3"]}
<h1>Lista de películas</h1>
<ul>
	{#each movies as {Title, Year}, index}
		<li>
      <span>#{index}</span>
      <strong>{Title}</strong>
      <date>{Year}</date>
    </li>
	{/each}
</ul>
```

Siguiendo el ejemplo de la desestructuración, **podemos cambiarle el nombre a la variable al vuelo.** Sólo tenemos que definir el mismo nombre, de la misma forma que lo haríamos con la sintaxis de la desestructuración en Javascript:

```html {hl_lines=["3"]}
<h1>Lista de películas</h1>
<ul>
	{#each movies as {Title: movieTitle, Year: movieYear}, index}
		<li>
      <span>#{index}</span>
      <strong>{movieTitle}</strong>
      <date>{movieYear}</date>
    </li>
	{/each}
</ul>
```

> No solo puedes utilizar la desestructuración del objeto. Puedes utilizar también el operador `rest` y también desestructurar arrays, en el caso que sea eso lo que estás iterando. Simplemente, sigue la misma sintaxis que usas en Javascript.


### Renderizado condicional iterando elementos

Hasta ahora hemos visto [cómo podemos hacer un renderizado condicional de elementos en Svelte](https://midu.dev/svelte-renderizado-condicional/), esto es renderizar una cosa u otra dependiendo de una condición. Y ya sabemos cómo renderizar una lista de elementos. Ahora, podemos utilizar los dos conceptos para...

#### Renderizado condicional DENTRO de una iteración de elementos

Imaginemos que si la película fue lanzada hace menos de cinco años, queremos decir que la película es nueva. (Sé que no es muy real, pero nos servirá como ejemplo. 😜).

Para ello, podemos renderizar todos los elementos con `#each` y, dentro, [hacer un renderizado condicional como aprendimos recientemente.](https://www.youtube.com/watch?v=r2ZX_Awv3WU) para añadir el emoji 🆕 a las películas que cumplan esa condición.

```html {hl_lines=["8-10"]}
<h1>Lista de películas</h1>
<ul>
	{#each movies as {Title: movieTitle, Year: movieYear}, index}
		<li>
      <span>#{index}</span>
      <strong>{movieTitle}</strong>
      <date>{movieYear}</date>
			{#if (2020 - movieYear < 5)}
			  <span role="img">🆕</span>
			{/if}
  </li>
	{/each}
</ul>
```

[📝 ¡Prueba la demo!](https://svelte.dev/repl/70f796e68596411fb58e55960602a1d7?version=3.20.1)

#### Renderizado condicional FUERA de la iteración

También deberíamos **controlar cuando la lista de elementos es vacía**, de forma que le mostremos al usuario algún tipo de aviso para que lo sepa. Para ello, podríamos utilizar el renderizado condicional de la siguiente forma:

```html {hl_lines=["14-18"]}
<h1>Lista de películas</h1>
<ul>
	{#if movies.length > 0}
		{#each movies as {Title: movieTitle, Year: movieYear}, index}
			<li>
				<span>#{index}</span>
				<strong>{movieTitle}</strong>
				<date>{movieYear}</date>
				{#if (2020 - movieYear < 5)}
				  <span role="img">🆕</span>
				{/if}
		  </li>
		{/each}
  {:else}
		<p>
			No hay películas
	  </p>
  {/if}
</ul>
```

De esta forma, cuando `movies` sea una lista vacía, entonces mostrará al usuario que *no hay películas* y, si hay elementos, entonces los listaremos como le hemos indicado. Esto, funcionar funciona, pero **existe una forma mucho más sencilla de conseguir el mismo resultado utilizando sólo la sintaxis de `#each`**, lo podemos lograr fusionando las dos funcionalidades así:

```html {hl_lines=["12-16"]}
<h1>Lista de películas</h1>
<ul>
  {#each movies as {Title: movieTitle, Year: movieYear}, index}
    <li>
      <span>#{index}</span>
      <strong>{movieTitle}</strong>
      <date>{movieYear}</date>
      {#if (2020 - movieYear < 5)}
        <span role="img">🆕</span>
      {/if}
    </li>
  {:else}
    <p>
      No hay películas
    </p>
  {/each}
</ul>
```

Exactamente, **la sintaxis de `#each` también acepta una cláusula `:else`** que se ejecutará cuando la lista que queremos iterar esté vacía. De esta forma conseguimos controlar más fácilmente cuando ocurra, sin necesidad de tirar del `#if` para hacer un renderizado condicional y que facilitará mucho más el código de nuestros componentes en Svelte.

### Conclusiones

Recapitulando, hemos visto **cómo podemos renderizar listas de elementos con Svelte siguiendo la siguiente sintaxis**:

```javascript
// para iterar una lista para cada elemento 
{#each lista as elemento}...{/each}
// para añadir el indice de cada elemento de la lista
{#each lista as elemento, indice}...{/each}
// para desestructurar las propiedades del elemento si es un objeto
{#each lista as {propiedad1, propiedad2}...{/each}
// para usar el operador rest para guardar el resto de propiedades en una variable
{#each lista as {propiedad1, ...restoDePropiedades}...{/each}
// para controlar cuando la lista no tiene elementos y renderizar otra cosa
{#each lista as elemento}...{:else}...{/each}
```

De esta forma, **ya sabemos cómo podemos renderizar cada elemento de una lista iterable** (que puede ser un array, un string o cualquier tipo de objeto iterable de Javascript). Además, al final, hemos aprendido que no es necesario recurrir a la sintaxis de `#if` para ser capaces de controlar lo que debemos renderizar cuando no tengamos elementos en esa lista. 

**¡En la siguiente clase veremos cómo podemos mejorar el manejo de promesas utilizando la sintaxis `#await` de Svelte!**
