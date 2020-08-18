---
title: Declaraciones reactivas y fetching de datos con Svelte
date: '2020-03-02'
image: '/images/declaraciones-reactivas-fetching-con-svelte.jpg'
description: Domina completamente la reactividad en Svelte para ir más allá de las asignaciones y crear declaraciones y sentencias totalmente reactivas para poder hacer fetching de datos.

toc: true
tags:
- svelte
---

[Ya dominamos cómo crear componentes y gestionar el estado de los mismos](https://midu.dev/componentes-y-estado-en-svelte/) gracias a las asignaciones reactivas es el momento de ejecutar código cada vez que este estado cambie. Para ello, vamos a conocer **cómo crear declaraciones reactivas y, al final, conseguiremos hacer fetch de datos de una API**. Si no te gusta leer, **te dejo [**mi canal de Youtube**](https://www.youtube.com/watch?v=n3T_vbCJ1nY) 👇 donde he subido la misma explicación en vídeo.**

{{< youtube id="n3T_vbCJ1nY" >}}

## Reactividad en Svelte: los límites de inferir

Cuando hablamos de inferir, hablamos de cómo *Svelte*, a partir del código, **es capaz de detectar si una variable es un estado del componente**, tal y como habíamos visto en el [artículo anterior](https://midu.dev/componentes-y-estado-en-svelte/).

Ahora, **¿qué pasa si queremos utilizar ese estado para calcular una variable?** Por ejemplo, imaginemos que queremos utilizar un estado inferido de `counter` para crear una variable que nos muestre si el número es par o impar.

```html
<script>
 let counter = 2;
 let isEvenMessage = counter % 2 === 0 ? 'Is Even' : 'Is Odd'

 const handleClick = () => counter++
</script>

<button on:click={handleClick}>Incrementar</button>
<span>{counter}</span>
<span>{isEvenMessage}</span>
```

Como `counter` se inicia a `2`, al principio el mensaje es `Is Odd` pero... si hacemos click en el botón, el `counter` se incrementa en `3` pero, sin embargo, el mensaje que vemos todavía es `Is Even`, lo que significa que no está mostrando el mensaje correcto. **¿Por qué?**

**Lo que está ocurriendo es que la variable `isEvenMessage` sólo se está evaluando una vez.** A diferencia de la variable `counter` que *Svelte* sí está infiriendo que es un estado. Esto es un error muy común a la hora de trabajar con Svelte, ya que uno podría esperar que la variable `isEvenMessage` fuese a re-asignarse de forma automática cuando no es así.

Ahora que ya lo sabemos. **¿Cómo podemos arreglarlo?** Tenemos dos formas. La primera, **mover la evaluación al render**, en lugar de hacerlo dentro de las etiquetas `<script>`. Así, esto siempre se evaluará en cada renderizado y mostrará la información correcta.

```html
<script>
 let counter = 2;

 const handleClick = () => counter++
</script>

<button on:click={handleClick}>Incrementar</button>
<span>{counter}</span>
<span>{counter % 2 === 0 ? 'Is Even' : 'Is Odd'}</span>
```

Esta opción es bastante sencilla, pero ***Svelte* ofrece otra forma que nos desbloqueará un montón de posibilidades y es utilizar el símbolo especial `$`** para indicar que la declaración es reactiva:

```html
<script>
 let counter = 2;
 let isEvenMessage;
 // al usar $ le decimos que esta declaración
 // se tiene que ejecutar de forma reactiva
 $: isEvenMessage = counter % 2 === 0 ? 'Is Even' : 'Is Odd'

 const handleClick = () => counter++
</script>

<button on:click={handleClick}>Incrementar</button>
<span>{counter}</span>
<span>{isEvenMessage}</span>
```

Con esto, si usamos el botón Incrementar, veremos que muestra el mensaje correcto. Lo que hace **el símbolo `$` es avisar a *Svelte* que esta sentencia es reactiva** y el framework detectará dentro de esa declaración qué variables se están usando (en este caso `counter`) de forma que, cada vez que se actualice ese valor, pasará a ejecutar de nuevo la sentencia.

También es importante indicar que **la declaración reactiva se ejecutará también nada más montar el componente**, por eso vemos desde el principio un mensaje con la información.

Además, **podemos añadir tantas declaraciones reactivas como queramos.** Por ejemplo, vamos a añadir una que, lo que va a hacer, es no permitir que el `counter` pase de un valor máximo y, para ello, vamos a ver cómo conseguirlo añadiendo una declaración multilínea:

```html {hl_lines=["7-11"]}
<script>
 let counter = 2;

 $: isEvenMessage = counter % 2 === 0 ? 'Is Even' : 'Is Odd'

 // usando $, podemos añadir declaraciones completas si 
 $: {
   if (counter > 9) {
     counter = 9
   }
 }
 const handleClick = () => counter++
</script>

<button on:click={handleClick}>Incrementar</button>
<span>{counter}</span>
<span>{isEvenMessage}</span>
```

Las declaraciones reactivas pueden tener **cláusulas de entrada** por lo que podemos escribirlo de una manera todavía más limpia para conseguir el mismo resultado.

```javascript
 $: if (counter > 9) {
  counter = 9
 }
```

De esta forma, esta declaración reactiva sólo se ejecutará cuando el valor del counter sea mayor a nueve. Al ejecutarse, la declaración hará que el estado local `counter` no pueda nunca sobrepasar el valor de `9`.

{{< code id="crimson-fog-gb9gx" >}}

## Fetching de datos con Svelte

Ahora que ya dominamos las declaraciones reactivas, **es el momento de conseguir hacer un fetching de datos con este framework.** Para ello, vamos a crear un nuevo componente llamado `Input` que tendrá una caja de texto donde podremos añadir un texto a buscar.

```html
<script>
  // donde guardamos el valor de la caja de texto
  let value = ''
  // escuchamos el evento `input` y ejecutamos
  // este método para actualizar el estado
  const handleInput = (event) =>
    value = event.target.value
</script>

<input value={value} on:input={handleInput}>
```

Dos cosas a decir sobre este componente. Primero, que **en Svelte existe una mejor forma de realizar este tipo de actualizaciones** de estado al escuchar eventos input y **lo veremos más adelante**. Segundo, que **por ahora, este componente no es muy útil**, ya que lo único que podemos hacer es escribir texto en la caja y ya está.

Ahora, utilizando una declaración reactiva, podríamos hacer el fetching de datos con el texto a buscar. Lo vamos a hacer utilizando la **API de OMDB**, para buscar películas. [**Podéis conseguir una API KEY muy fácilmente desde su página web.**](https://www.omdbapi.com/apikey.aspx) El endpoint es este:

```javascript
`https://www.omdbapi.com/?s=${textoABuscar}&apikey=${apiKey}`
```

Así que vamos a añadir la declaración reactiva que se ejecutará cada vez que el valor de `value` cambie y lo que haremos es llamar al endpoint de OMDB utilizando el método `fetch` de la siguiente forma.

```html {hl_lines=["6-12"]}
<script>
  let value = ''

  const handleInput = (event) => value = event.target.value

  $: {
    fetch(`https://www.omdbapi.com/?s=${value}&apikey=422350ff`)
      .then(response => response.json())
      .then(apiResponse => {
        console.log(apiResponse)
      })
  }
</script>

<input value={value} on:input={handleInput}>
```

Ahora... esto no sólo se ejecuta cada vez que cambiamos el texto en la caja... Como habíamos visto anteriromente, también se ejecuta la primera vez que se monta el componente. **Para solucionar esto deberíamos ponerle alguna cláusula de entrada a la declaración reactiva.** La primera que se nos ocurre es la de **evitar que haga una llamada a la API con un string vacío.**

```javascript
$: if (value !== '') {
  fetch(`https://www.omdbapi.com/?s=${value}&apikey=422350ff`)
    .then(response => response.json())
    .then(apiResponse => {
      console.log(apiResponse)
    })
}
```

Pero esto también da problemas con las primeras letras, ya que hay demasiados resultados cuando intentas buscar una sola letra. Así que **vamos a hacer que sólo empiece a buscar a partir de tres carácteres** quedando todo nuestro código del componente así:

```html {hl_lines=["6"]}
<script>
  let value = ''
  let results = []

  const handleInput = (event) => value = event.target.value

  $: if (value.length > 2) {
    fetch('https://www.omdbapi.com/?s=${value}&apikey=422350ff')
      .then(response => response.json())
      .then(apiResponse => {
        results = apiResponse.Search
        console.log(results)
      })
  }
</script>

<input value={value} on:input={handleInput}>
```

{{< code id="hungry-thunder-n0if6" height="350" >}}

## Conclusiones

Con este artículo ya hemos visto **cómo podemos controlar del todo la reactividad en Svelte.** Aunque las declaraciones reactivas no son tan mágicas como el state, ya que hay que añadir un símbolo `$`, **Svelte sí que nos ayuda a detectar cuando estas declaraciones se tienen que ejecutar** ya que detecta qué dependencias se están usando dentro.

Además, hemos visto que **nos permite poder añadir condiciones de forma que sólo se ejecuten cuando sea necesario.** A mi personalmente me gusta mucho que la condición de entrada esté arriba del todo, lo que lo hace muy legible y entendible. Ya sabes que me encanta React pero en este caso el `useEffect` es más difícil de leer ya que las condiciones pueden ir en cualquier sitio y, además, las dependencias van en la última línea.

Con todo, al final, hemos hecho nuestra primera llamada fetch. **En la próxima clase vamos a ver cómo podemos listar los resultados, indicar si está cargando y muchas cosas más.** [¡Sigue la conversación en Twitter!](https://twitter.com/intent/tweet?text=%22Declaraciones%20reactivas%20y%20fetching%20de%20datos%20con%20Svelte%20por%20@midudev&url=https://midu.dev/componentes-y-estado-en-svelte/)