---
title: React Server Components,
date: '2019-02-07'
image: '/images/og/react-server-components.png'
description: React Server Components, la nueva RFC para tener componentes de React que sólo se ejecutan en el servidor y que tienen cero impacto en el bundle-size de tu app.

tags:
- react
---

El Core Team de *React.js* ha anunciado una [RFC sobre un nuevo tipo de componentes llamados React Server Components](https://github.com/reactjs/rfcs/pull/188). ¿Y qué hace tan interesantes estos nuevos componentes? Pues que como su nombre indica, **estos componentes sólo se evaluan en el servidor** y por lo tanto no tienen ningún impacto en el tamaño del bundle de tu aplicación. Dicho de otra forma, **en el cliente su peso será de 0KB.** ¿Cómo? ¡Sigue leyendo! 👇

## Los React Server Components (RSC)

Antes de empezar tienes que tener clara una cosa. Los React Server Components están todavía en desarrollo e investigación, por lo que muchas cosas de las que vamos a hablar en este artículo pueden cambiar en los próximos meses. No es algo que tengas por qué aprender