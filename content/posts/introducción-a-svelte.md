---
title: Introducción a Svelte, un nuevo framework para tu frontend
date: '2019-08-31'
image: '/images/svelte-logo.png'
description: Svelte es un nuevo framework que tiene como objetivo simplificar al máximo la creación de aplicaciones web reactivas escribiendo el mínimo número de líneas posible.

toc: true
tags:
- svelte
---

{{< youtube id="Xsxm8_BI63s" >}}

En la pasada **JsCamp 2019** tuve la ocasión de ver la charla de Rich Harris titulada ["The Return of 'Write Less, Do More'"](https://svelte.dev/blog/write-less-code). En ella, hablaba de cómo nos preocupamos de muchas métricas, como el tamaño de nuestro bundle, pero no **le prestamos atención al número de líneas de código que escribimos porque a mayor número de líneas más potenciales bugs tendremos**. ¿Y cómo lo solucionamos? Pues Rich Harris viene con una solución en forma de framework: **Svelte.**

**Hace unos meses se lanzó Svelte 3.** Si os soy sincero, **ni sabía que existía una versión 2.** Ni 1. Ni nada. Pero esta tercera versión acaparó bastante atención gracias a las mejoras a la hora de ofrecer un estado reactivo de forma completamente transparente al usuario. Así que tras la charla decidí empaparme un poco para entender en qué es diferente y si vale la pena aprenderlo.

## ¿Qué es Svelte?

**Svelte es un frontend framework.** Tiene conceptos parecidos a React, Vue y Angular pero, a la vez, viene con diferencias muy importantes. Concretamente hay una diferencia importantísima y es que **Svelte tiene un paso previo de compilación.** ¿Por qué? Porque **el código que escribimos con Svelte**, aunque está basado en lenguajes que ya conoces como HTML, CSS y Javascript, **es un código que no entendería el navegador sin tratar y tiene que ser compilado previamente.**

Aunque muchos pueden ver esto como una desventaja, en realidad, es algo con lo que ya convivimos de alguna forma con el resto de frameworks por el uso de ES2015+ y JSX. Aunque, de alguna forma, el resto de bibliotecas y frameworks sí podrían obviar este paso, **con Svelte es completamente necesario.**

### Adiós 👋 Virtual DOM

No sólo la necesidad de compilar es la diferencia. **También la total ausencia de Virtual DOM, o VDOM.** El VDOM, que popularizó React en su día, guarda una foto del árbol de elementos del DOM en memoria de forma que, al tener que hacer actualizaciones, sabe los cambios mínimos a realizar. Esto lo hace porque manipular el DOM es lento y, de esta forma, **se evita trabajo innecesario.**

{{< img align="center" src="/images/rethinking-best-practices.jpg" alt="Pete Hunt en la JSConf 2013 hablando por qué decidieron añadir el Virtual DOM en React. El VDOM simplemente evita hacer trabajo innecesario en el DOM." >}}

Entonces, **si es algo bueno, ¿por qué Svelte no lo usa?** Porque no es gratis. El diffing que realiza el VDOM tiene su coste, y peor será cuanto más compleja sea nuestra app. ¿Eso quiere decir que Svelte es más lento que React y renderiza elementos de forma innecesaria? 

Nada de eso. Como Svelte es un compilador, lo que hace, es evitar el uso del Virtual DOM y aprovechándose del paso de compilación, para **envolver los cambios de estado y propiedades en métodos que, de forma quirúrgica, podrán actualizar el DOM.**

## Hola Mundo 🌍 en Svelte

Svelte utiliza el principio de Single File Component. Esto es, que en un mismo archivo, tienes un componente con su marcado (HTML), su funcionaldad (Javascript) y su estilo (CSS). Esto lo ha popularizado mucho Vue y, en Svelte, podemos ver que es incluso un poco más sencillo.

Entonces, **¿cómo escribiríamos un Hola Mundo con este framework?**

```html
<script>
  let name = "World"
</script>

<h1>Hello {name}!</h1>
```

Con esto ya podemos ver las primeras diferencias con otras alternativas como React. De hecho, vamos a añadir un Hola Mundo, lo más parecido posible, en React para que veamos algunas diferencias.

```javascript
import React from 'react'

export default () => {
  let name = "World"
  return <h1>Hello {name}!</h1>
}
```

**Primero; nada de importar la librería.** Al ser compilado, Svelte lo hará por nosotros. **Segundo, más declarativo** al no tener que indicarle que queremos exportar ese componente ni el marcado que queremos renderizar. Y, **tercero, separación de conceptos.** El marcado y el comportamiento e inicialización de datos están separados.

### Añadiendo estilos CSS 🖼️

Ahora, si vieramos este Hola Mundo, veríamos que nos queda un poco soso en cuanto a estilos, así que vamos a darle un poco de cariño y vamos a añadir un poco de CSS para dejarlo más presentable. Lo haremos añadiendo una etiqueta `<style>` he indicando dentro los elementos que queremos estilar.

```html
<script>
  let name = 'world';
</script>

<h1>Hello {name}!</h1>

<style>
  h1 {
    color: #09f;
    font-weight: 100;
    text-transform: uppercase;
  }
</style>
```

Aquí puedes ver el código funcionando:
<iframe loading="lazy" src="https://codesandbox.io/embed/trusting-germain-2to2d?fontsize=14&module=%2FApp.svelte" title="trusting-germain-2to2d" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## ¿Y qué pasa con el estado?

**Aquí es donde viene gran parte de la magia de Svelte.** Una de las luchas de su creador es, justamente, acabar con el boilerplate y, si lo piensas friamente, por poco boilerplate que tengan nuestros componentes de React o Vue, algo tienen. ¿Qué es si no el hook `useState`? ¿Y si pudieramos crear variables y la propia librería pudiese saber si es el estado del componente o una simple variable? Como Svelte es un compilador, es capaz de determinar esto en tiempo de compilado y un ejemplo sería esto:

```html
<script>
  let name = 'world';
  // a los 2 segundos, queremos que name pase a ser "frontender"
	setTimeout(function () {
		name = 'frontender'
	}, 2000)
</script>

<h1>Hello {name}!</h1>

<style>
	h1 {
		font-weight: 100;
		text-transform: uppercase;
	}
</style>
```

Lo que estamos haciendo es que, a los dos segundos, queremos cambiar el valor de `name` de forma que pase de `world` a `frontender`. **¿Lo hará? Pues lo cierto es que sí.** ¿Pero cómo? Pues Svelte, al hacer la compilación, determinará que `name` es un estado y que, al reasignarle un valor, debe hacer un re-renderizado de nuestro componente. 

## Conclusiones
Esto sólo es una pequeña pincelada sobre lo que nos ofrece Svelte. Desde luego, tiene un enfoque radicalmente distinto a lo que podemos estar acostumbrados con soluciones como React. Es cierto que no tiene la tracción que otras soluciones pero, desde luego, quién sabe si esto es un camino que en el futuro usen más y más bibliotecas. Por ahora, yo me he quedado con ganas de explorar más posibilidades de este framework así que, estáte atento, porque **seguro que sigo haciendo contenido sobre ello. :)**
