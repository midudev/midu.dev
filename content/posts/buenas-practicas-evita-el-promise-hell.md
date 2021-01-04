---
title: Buenas prácticas. Evita el Promise Hell
date: '2018-12-10'
image: '/images/analytics.png'
description: El Promise Hell ocurre cuando hacemos un anidamiento innecesario de las promesas.
topic: javascript
toc: true
tags:
- javascript
---

El **Promise Hell** es similar al mítico **Callback Hell** donde se crean demasiados niveles de anidamiento que hacen que tu código sea difícil de leer.⁠ Esto suele ocurrir por no usar correctamente las promesas (normalmente por no entenderlas del todo) o por no separar las funciones que usamos en ellas.

En este artículo vamos a ver **cómo podemos evitar anidar promesas** y, en su lugar, cómo podemos encadenarlas para que nuestro código sea mucho más claro y limpio.

Vamos a partir de este código de ejemplo donde usamos el método `fetch` para recuperar unos datos JSON. `fetch` devuelve una promesa con los datos de la respuesta y esta respuesta debemos convertirla al tipo de datos correcto con `res.json()` que también devuelve una promesa:

```javascript
// ❌ Código de ejemplo, esto NO está bien y no sigue buenas prácticas
fetch('https://midu.dev/best-practices.json)
  .then((res) => {
    return res.json().then((bestPractice) => {
      return createImg(bestPractice)
        .then((image) => {
          return postOnInstagram(image)
        })
    })
  })
```

### Encadena tus promesas en lugar de anidarlas

Lo primero que podemos hacer con nuestro código es usar el encadenamiento de las promesas en lugar del anidamiento. Esto lo podemos hacer gracias a que **una vez que estás trabajando con una promesa, el valor que devuelves dentro pasa a ser una promesa** de forma que puedes encadenar un nuevo `.then`.