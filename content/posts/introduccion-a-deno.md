---
title: 'Introducción a Deno, un nuevo runtime de Javascript y Typescript'
date: '2020-05-16'
description: >-
  Deno es un nuevo entorno de ejecución de Javascript y Typescript basado en el
  motor V8 y programado con Rust. Además ha sido creado por Ryan Dahl, el
  creador original de NodeJS.

toc: true
tags:
  - deno
image: /images/og/introduccion-a-deno.png
---

{{< youtube id="Xsxm8_BI63s" >}}

## ¿Qué es Deno?

**Deno es un nuevo entorno de ejecución de Javascript y Typescript basado en el motor V8 de Google.** Sí, es *parecido* a lo que ya tenemos con Node.js y es que **el creador de Deno es Ryan Dahl**, el creador original de *Node.js*. Por eso el nombre no es casualidad. [El propio Ryan Dahl explicaba en la JSConf EU de 2018 las 10 cosas de las que se arrepentía de Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA&vl=es) y esas son precisamente las cosas que quería darle la vuelta. De ahí que el nombre sea un juego con no-de (de-no).

## ¿Qué diferencia Deno a Node?



Ayer vi dos conferencias de Ryan y las conclusiones más sobresalientes (a mi parecer) seria:
- Seguridad por defecto
- Mejor performance
- Typescript nativo
- Sync/await nativo
- No existe más ningún gestor de packages (node_modules murió)
- Se debe especificar la extensión de los archivos (js,ts)
- Compilación runtime
- Empaqietador nativo (bundle), deja todo el proyecto en 1 ts
En una de las conferencias escuché a Ryan "molesto" porque parece que Google no continuó con el soporte de JIT y esto ha venido a traer un complejidad tecnológica en Node y alabando a Microsoft por el desarrollo de Typescript, de hecho Ryan lo llama la próxima evolución de Javascript.
Deno no es un reemplazo literal de Node, es una alternativa, ya que mientras el core de Node está en C++ Deno está desarrollando en Rust (que parece prometer mejor rendimiento y escalabilidad).
No todo es color de rosa, Node en algunas pruebas (pocas) tiene mejor rendimiento aún advierte (en su sitio web) que los proyectos y plugins creados en Node no correrán en Deno ... creo prudente que cada quien haga su tarea de investigación y saque sus propias conclusiones
