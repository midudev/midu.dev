---
title: "Cómo convertir una función de callback en JavaScript a una función async/await"
date: "2022-12-06"
description: "En este artículo, te muestro cómo convertir una función de devolución de llamada en JavaScript a una función que utiliza la palabra clave async/await. Con esta técnica, puedes hacer que tu código sea más legible y fácil de mantener."
toc: true
tags:
  - javascript
---

En este artículo, te muestro cómo convertir una función con *callbacks* en JavaScript a una función que utiliza `async/await`. Con esta técnica, puedes hacer que tu código sea más legible y fácil de mantener.

Si aún no estás familiarizado con las funciones `async/await`, te explico rápidamente cómo funciona esta sintaxis.

La palabra clave *async* indica a JavaScript que una función es asíncrona, lo que significa que puede realizar operaciones de manera simultánea sin bloquear la ejecución del código restante.

La palabra clave *await*, por su parte, se utiliza dentro de una función *async* para esperar a que se complete una operación asíncrona antes de continuar con la ejecución. Esto nos permite escribir código de una manera más clara y concisa. Se lee como código síncrono, pero en realidad es código asíncrono.

### Transformar una función con callback a una función async/await

Por ejemplo, si tenemos una función que utiliza una devolución de llamada para obtener datos de una API, podríamos convertirla a una función async/await de la siguiente manera:

```javascript
// función con devolución de llamada (o callback)
function getDataCallback(callback) {
  setTimeout(() => {
    callback('Los datos han llegado');
  }, 2000);
}

getDataCallback(data => {
  console.log(data);
});
```

Para convertir esta función a una función *async/await*, debemos crear una nueva función async y utilizar la palabra clave await para esperar a que se complete la promesa.

La función *async/await* devolverá una promesa, por lo que podemos utilizar el método `then()` para obtener los datos.

```javascript
// función async/await
async function getDataAsync() {
  const data = await new Promise(resolve => {
    setTimeout(() => {
      resolve('Los datos han llegado');
    }, 2000);
  });

  return data
}

getDataAsync();
```

En la primera función, utilizamos una devolución de llamada (callback) para recibir los datos. En la segunda función, usamos la palabra clave await para esperar a que se complete la promesa y recibir los datos. Esto nos permite escribir el código de una manera más legible y fácil de mantener.
