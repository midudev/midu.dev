---
title: "Cómo revisar que un valor es una Promesa en JavaScript"
date: '2022-07-12'
description: No hay un método que directamente nos diga que un valor es una Promesa pero podemos conseguirlo con unas pocas líneas de código
toc: true
draft: true
tags:
  - javascript
---

No existe en JavaScript un método que compruebe si un valor es una Promesa. Y esto puede resultar sorprendente. Obviamente **puedes comprobar si un valor es una instancia** de `Promise` y eso podría parecer suficiente. **Spoiler: no lo es.**

```js
// ⚠️ OJO! Esto funciona PERO puede traerte problemas
// Sigue leyendo el artículo para descubrirlo

const p = new Promise(() => {});
console.log(p instanceof Promise) // true

const p2 = Promise.resolve()
console.log(p2 instanceof Promise) // true

async function asyncThing () { return 'a' }
const p3 = asyncThing()
console.log(p3 instanceof Promise) // true

const p4 = fetch('https://midu.dev')
console.log(p4 instanceof Promise) // true
```

¡En principio, pinta bastante bien! Y, seguramente, en muchos casos puede ser una buena idea. Es simple, fácil de entender y no tiene mucho misterio. ¡Pero no siempre funciona en todos los casos! ¿Por qué?

## El standard de las Promesas te sorprenderá

Las promesas tienen su propia especificación que determina *qué* es una Promesa. Y esa especificación es la siguiente:

**Una promesa representa un eventual resultado de una operación asíncrona.** De forma que la `promise` es un objeto o función con un método `then` que se comporta conforme a la especificación.

function isPromise(value) {
  if (
    p !== null &&
    typeof p === 'object' &&
    typeof p.then === 'function' &&
    typeof p.catch === 'function'
  ) {
    return true;
  }

  return false;
}

console.log(isPromise(null)); // 👉️ false

const p1 = new Promise(resolve => {
  resolve(10);
});
console.log(isPromise(p1)); // 👉️ true