---
title: Cómo crear componentes y gestionar el estado en Svelte
date: '2020-02-02'
image: '/images/componentes-y-estado-con-svelte.jpg'
description: Aprende a crear componentes en Svelte para reutilizar trozos de tu interfaz y a gestionar el estado de los mismos para tener reactividad.

toc: true
tags:
- svelte
---

Hoy vamos a ver cómo podemos **crear componentes en Svelte** y cómo podemos **añadirle un estado** a estos componentes para dotarlos de reactividad. Si te gustaría ver este contenido en vídeo aquí tienes el que he subido a [**mi canal de Youtube**](https://www.youtube.com/watch?v=B4obfRtW4ho) 👇.

{{< youtube id="B4obfRtW4ho" >}}

## Reactividad en Svelte: Estado inferido

Una de las funcionalidades más interesantes de Svelte es que, según palabras del creador, es un framework **"realmente reactivo"**. ¿Que quiere decir esto? Pues que en lugar de tener que, explicitamente, indicar los estados de nuestro componente, Svelte es capaz de detectarlo por nosotros.

Pongamos este ejemplo, donde tenemos una prop llamada `name`, unos estilos para la etiqueta h1 y, finalmente, renderizamos un `<h1>` con un mensaje y la prop.

```html
<script>
	export let name;
</script>

<style>
	h1 { color: #09f; }
</style>

<h1>Hello {name}!</h1>
```

Esto siempre mostrará el `name` que le pasemos como prop. Ahora nos gustaría que, al hacer clic en un botón, el nombre cambie por `Pepito` en lugar del que le habíamos pasado anteriormente.

Así que vamos a añadir un `<button>` y vamos a añadir la función que llamaremos cada vez que se haga clic en ese elemento, para cambiar el nombre:

```html {hl_lines=["3-5",12]}
<script>
	export let name;
  function handleClick () {
    name = 'Pepito'
  }
</script>

<style>
	h1 { color: #09f; }
</style>

<button>Cambiar nombre</button>
<h1>Hello {name}!</h1>
```

Hemos añadido la función y el botón pero, al hacer clic no ocurriría nada. Esto es porque **no estamos escuchando el evento `clic` del elemento `<button>`**. En Svelte existe un concepto llamado `directivas`, que veremos en más detalle más adelante, que nos permiten controlar el comportamiento de un elemento de muchas formas.

En este caso, para escuchar el evento clic del botón y hacer que se ejecute cada vez que ocurra la función que queremos, tenemos que añadir la directiva `on:click`, muy parecido a como se tiene que hacer en React y Vue.

```html
<button on:click={handleClick}>
```

Ahora, cada vez que hagamos click en el botón, veremos que el nombre cambia del que le pasábamos por props a `Pepito`... **¿PERO QUE CLASE DE MAGIA NEGRA ES ESTA?** 🧙‍♂️ Porque, si nos fijamos, en ningún sitio le hemos dicho a Svelte que queríamos que `name` fuese un estado del componente.

### Inferencia del estado

**El estado de un componente es un valor del componente en un momento en concreto y que, al cambiar, la interfaz debe reflejar esos cambios.** Por ejemplo, un botón podría tener un estado que indicase si está activo o no. Cada vez que cambie ese valor, queremos que el botón visualmente se vea activo... o no.

Este concepto existe en casi todas las librerías actuales y Svelte, por supuesto, no iba a ser menos. El caso es que mientras en otras librerías y frameworks, el estado hay que indicarlo, en Svelte este se infiere por el uso que hacemos.

Esto es lo que está pasando en el ejemplo anterior. **Como Svelte tiene un paso de compilación, lo que está haciendo, es inferir que estamos usando la variable `name` como un estado** y que, por lo tanto, cada vez que su valor cambie, va a volver a renderizar el componente.

En ese paso de compilación podríamos ver dónde está pasando la magia, y revisando veríamos que **donde nosotros hacemos una simple asignación de la variable `name` a un nuevo valor, en Svelte tenemos algo así**:

```javascript
function handleClick() {
  $$invalidate(0, name = "Pepito");
}
```

### El típico ejemplo Contador

Ahora que sabemos todo esto, **podríamos crear el típico ejemplo del contador** de forma muy sencilla siguiendo los pasos que hemos hecho anteriormente.

```html
<script>
let contador = 0 // inicializamos una variable con el contador a 0

// al hacer click, incrementamos el contador en uno
function handleClick () {
  contador++
}
</script>

<button on:click={handleClick}>Incrementar</button>
<span>{contador}</span>
```

En menos de diez líneas, ya tenemos un contador, con un estado local en el componente. En este tipo de cosas es donde Svelte destaca y nos ayuda a escribir muchas menos líneas de código.

## Componentes en Svelte

Imaginemos que queremos ahora reutilizar el componente Contador, ya que nos gustaría en un lugar de nuestra aplicación poner más de un contador. Lo único que deberíamos hacer es copiar el código anterior y guardarlo en un archivo `Counter.svelte`.

Ahora, desde otro componente (vamos a poner que sea el componente `App.svelte` que es el que estamos renderizando en el punto de entrada de nuestra aplicación), lo único que tenemos que hacer es importarlo.

```html 
// App.svelte
<script>
  import Counter from './Counter.svelte'
</script>

<Counter>
<Counter>
<Counter>
```

Lo más interesante de este ejemplo es que **en el componente `Counter.svelte` no hemos tenido que exportar el componente en sí.** No hay ningún tipo de `export default` ni nada. Simplemente, Svelte entiende que es un componente y que se puede importar. De esta forma hace que los componentes queden muy limpios.

Hasta aquí tenemos tres contadores en pantalla, para hacer que esto sea más interesante, vamos a hacer que, desde props, **le podamos pasar el valor inicial del contador** (que ahora siempre empieza en 0). Para ello, vamos a usar la prop `initialCounter`:

```html {hl_lines=["6-8"]}
// App.svelte
<script>
  import Counter from './Counter.svelte'
</script>

<Counter initialValue={5}>
<Counter initialValue={10}>
<Counter>
```

Para hacer que la prop se pueda leer desde el `Counter` vamos al fichero `Counter.svelte` y tenemos, dentro de `<script>` que exportar una variable con el mismo nombre de la prop. La inicializamos con el valor `0` de forma que, si no se pasa una prop, ese sea el valor que toma por defecto.

```javascript
export let initialValue = 0
```

Ahora, esta variable es la que usaremos para inicializar la variable `contador` que teníamos antes y que estábamos usando como state:

```javascript
let contador = initialValue
```

Y el código final, quedaría así:

```html
<script>
// exportamos la prop e iniciamos a 0 como valor por defecto
export let initialValue = 0

// iniciamos la variable contador con el valor de initialValue
let contador = initialValue

// al hacer click, incrementamos el contador en uno
function handleClick () {
  contador++
}
</script>

<button on:click={handleClick}>Incrementar</button>
<span>{contador}</span>
```

## Conclusiones

Ya empezamos a ver, cada vez más, **la potencia de Svelte** y cómo, **gracias a su paso de compilación**, escribimos mucho menos código para crear nuestra interfaz. **El estado inferido**, que detecta qué variables usamos como estado local de nuestro componente, hace que trabajemos con una reactividad transparente, sin necesidad de ningún tipo de boilerplate ni indicación explicita de qué variables son parte del estado.

**Esta "falta" de boilerplate lo vemos incluso a la hora de crear componentes**, donde no necesitamos ni siquiera exportarlos... directamente, Svelte, hace la magia a la hora de importar el fichero.

Todo esto, aunque muy interesante, puede resultar chocante para mucha gente ya que Svelte, de alguna forma, genera un pseudolenguaje de compilación a Javascript. **¿Estamos dispuestos a pagar ese peaje por escribir menos?**. [¡Sigue la conversación en Twitter!](https://twitter.com/intent/tweet?text=%22C%C3%B3mo%20crear%20componentes%20y%20gestionar%20el%20estado%20en%20Svelte%22%20por%20@midudev&url=https://midu.dev/componentes-y-estado-en-svelte/)