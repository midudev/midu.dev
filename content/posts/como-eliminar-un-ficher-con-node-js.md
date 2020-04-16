---
title: Cómo eliminar un fichero con Node.js
date: '2020-04-16'
description: Aprende a utilizar Node para eliminar un fichero o lista de ficheros gracias a fs.unlink y fs.unlinkSync.
topic: performance
language: 🇪🇸
toc: true
tags:
- node
---

En ocasiones necesitamos eliminar un fichero de nuestro sistema de forma programática utilizando [`Node.JS`](http://midu.dev/tags/node/). A veces me sorprende que la gente utilice de primeras una librería de `npm` ya que, es posible, que utilizando Node sea suficiente para conseguirlo.

### Cómo eliminar un fichero con Node.js usando fs.unlink

Para eliminar un fichero en Node.js podemos usar el módulo `fs` que tiene dos métodos que nos ayudarán a conseguirlo: `fs.unlink()` y `fs.unlinkSync()`.

La diferencia es que **el primero no bloqueará el hilo principal**, ya que realiza la operación de forma asíncrona, mientras que **el segundo esperará a que termine la operación** antes de seguir ejecutando el código que le sigue. Huelga decir que, siempre que podamos, tendríamos que usar el primero.

Usando `fs.unlinkSync`, que sería de forma síncrona:

```js
// importa el módulo de node `file-system`
const fs = require('fs')

try {
  fs.unlinkSync('./old-article.md')
  console.log('File removed')
} catch(err) {
  console.error('Something wrong happened removing the file', err)
}
```

Usando `fs.unlink`, que sería asíncrono:
```js 
// importa el módulo de node `file-system`
const fs = require('fs').promises

fs.unlink('./old-article.md')
  .then(() => {
    console.log('File removed')
  }).catch(err => {
    console.error('Something wrong happened removing the file', err)
  })
```

Desde Node.JS 10, también puedes utilizar la versión de `fs.unlink` que devuelve una Promesa. Para ello, sólo tienes que requerir el módulo `fs` pero in la propiedad `promises`. 

```js 
// importa el submódulo `promises` del módulo de node `file-system`
const fs = require('fs').promises

fs.unlink('./old-article.md')
  .then(() => {
    console.log('File removed')
  }).catch(err => {
    console.error('Something wrong happened removing the file', err)
  })

// o con async/await sería de la siguiente forma:
;(async () => {
  try {
    await fs.unlink('./old-article.md')
    console.log('File removed')
  } catch(err) {
    console.error('Something wrong happened removing the file', err)
  }
})()
```

### Cómo eliminar más de un fichero a la vez con Node.js

Vale, el ejemplo anterior funciona pero es muy básico, ya que sólo nos permite eliminar un fichero a la vez.

### Cómo mover un fichero a la papelera con Node.js

**Los ejemplos anteriores eliminan de forma definitiva los ficheros.** Y muchas veces tiene sentido pero, en ocasiones, lo que queremos en realidad, es simplemente **dejar los ficheros en la Papelera de Reciclaje de nuestro sistema operativo para decidir más tarde qué hacemos con ellos.**

Para eso, podemos utilizar el paquete `[trash](https://www.npmjs.com/package/trash)` que soporta los sistemas operativos macOS (10.12+), Linux y Windows (8+).

Para ello, tendremos que importar la utilidad y pasarle como parámetro el *path* o el *pattern* que tiene que buscar para mover a la papelera esos ficheros. También puedes pasarle un Array con más de un *path* o *pattern*. Además, la operación es asíncrona y devuelve una promesa.

```js
const trash = require('trash')

// elimina todos los archivos que terminan en .md
// excepto el que se llama articulo.md
trash(['*.md', '!articulo.png']).then(() => {
  console.log('Files moved to Trash!')
})

// o con async/await sería de la siguiente forma:
;(async () => {
  await trash(['*.md', '!articulo.png'])
  console.log('Files moved to Trash!')
})()
```

> El `pattern` (patrón) que le puedes pasar está basado en *glob pattern*. Puedes encontrar una lista de patrones aceptados aquí: https://github.com/sindresorhus/globby#globbing-patterns


