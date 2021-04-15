---
title: "Cómo crear un spinner loader con CSS 🌀"
date: '2021-04-15'
description: >-
  Aprende a crear un donut spinner 🍩 sólo usando CSS y en menos de un minuto. Perfecto para frontenders impacientes ⏲️.
toc: true
tags:
  - css
image: https://img.youtube.com/vi/8nm9WPptL0c/maxresdefault.jpg
---

Un spinner loader, o donut spinner, es un elemento muy típico en nuestras aplicaciones ya que le **indica al usuario que un contenido se está cargando.**

Vamos a ver **cómo puedes crear el tuyo con HTML y CSS** en muy pocas líneas de código. Si quieres, puedes ver el vídeo donde lo hago paso a paso:

{{< youtube id="8nm9WPptL0c" >}}
{{< subscribe-to-youtube >}}

## ¿Cómo queda el spinner?
Si quieres ver el resultado final, te dejo aquí un Codepen para que veas cómo quedaría nuestro spinner: 

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="result" data-user="miduga" data-slug-hash="RwGxpyJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS Spinner">
  <span>See the Pen <a href="https://codepen.io/miduga/pen/RwGxpyJ">
  CSS Spinner</a> by @midudev (<a href="https://codepen.io/miduga">@miduga</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Creando el spinner con HTML y CSS desde cero

Lo primero que tenemos que hacer es el HTML de nuestro spinner:

```html
<div class='spinner'></div>
```

Y a partir de aquí estilamos esta clase con CSS. ¡Vamos por partes!

Primero le añadimos un borde, con **4 píxeles de borde** y lo hacemos con un color negro pero con mucha transparencia. Pero hacemos que uno de los lados no tenga color, que sea transparente. Y también hacemos que use el border-radius, para curvar este nuevo borde.

```css
.spinner {
  border: 4px solid rgba(0, 0, 0, .1);
  border-left-color: transparent;
  border-radius: 50%;
}
```

Para las medidas, usamos una forma cuadrada con un **alto y ancho de 36px.**

```css
.spinner {
  border: 4px solid rgba(0, 0, 0, .1);
  border-left-color: transparent;
  width: 36px;
  height: 36px;
}
```

Y finalmente vamos a añadir nuestra animación. Vamos a llamar a esta animación `spin`, que dure un segundo y el tipo de animación sea `linear` que es lineal. Puedes usar la que quieras en este punto.

Lo importante es que pongas que se tiene que hacer de forma `infinite`, para que se haga repetidas veces la animación.

```css
.spinner {
  border: 4px solid rgba(0, 0, 0, .1);
  border-left-color: transparent;
  width: 36px;
  height: 36px;
  
  animation: spin 1s linear infinite;
}
```

Ahora creamos la animación usando `@keyframes` de forma que empezamos en un punto (el punto de inicio es 0%) y, al final, habremos rotado el spinner completamente (100%):

```css
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
```

¡Y ya lo tenemos! Puedes ver el **resultado final** en este enlace:
https://codepen.io/miduga/pen/RwGxpyJ?editors=1100

Y si prefieres verlo en vídeo, lo tienes aquí:

{{< youtube id="8nm9WPptL0c" >}}
{{< subscribe-to-youtube >}}