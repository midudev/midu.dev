---
title: Cómo eliminar un fichero con Node.js
date: '2020-04-16'
description: >-
  Aprende a utilizar Node para eliminar un fichero o lista de ficheros gracias a
  fs.unlink y fs.unlinkSync.
topic: node
toc: true
tags:
  - node
image: /images/og/como-eliminar-un-ficher-con-node-js.png
---

En ocasiones necesitamos **eliminar un fichero de nuestro sistema de forma programática** utilizando [`Node.js`](https://midu.dev/tags/node/). Muchas veces vamos directos a buscar un paquete en `npm` (que los hay y muy buenos como [del](https://github.com/sindresorhus/del)) que nos solucione la papeleta pero `Node.js` incorpora una forma nativa de eliminar ficheros y enlaces simbólicos a ficheros con muy poco esfuerzo. Y creo que puede ser interesante aprenderlo.

### Cómo eliminar un fichero con Node.js usando `fs.unlink`

Para eliminar un fichero en Node.js podemos usar el módulo `fs` que tiene dos métodos que nos ayudarán a conseguirlo: `fs.unlink()` y `fs.unlinkSync()`.

La diferencia es que **el primero no bloqueará el hilo principal**, ya que realiza la operación de forma asíncrona, mientras que **el segundo esperará a que termine la operación** antes de seguir ejecutando el código que le sigue. Huelga decir que, siempre que podamos, tendríamos que usar el primero.

Usando `fs.unlinkSync`, que sería de forma síncrona:

```javascript
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
```javascript 
// importa el módulo de node `file-system`
const fs = require('fs').promises

fs.unlink('./old-article.md')
  .then(() => {
    console.log('File removed')
  }).catch(err => {
    console.error('Something wrong happened removing the file', err)
  })
```

### Cómo conseguir eliminar el fichero con Promesas

Desde *Node.js* 10, también **puedes utilizar la versión de `fs.unlink` que devuelve una Promesa**. Para ello, sólo tienes que requerir el módulo `fs` pero accediendo a la propiedad `promises`. 

```javascript 
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

### Cómo eliminar más de un fichero a la vez con Node.js

Vale, el ejemplo anterior funciona... pero es muy básico, ya que **sólo nos permite eliminar un fichero a la vez** y, en ocasiones, queremos eliminar una lista de ficheros.

#### Usando un `Promise.all`

Sería muy sencillo basarnos en el ejemplo anterior para poder borrar más de un fichero gracias al uso de `Promise.all`:

```javascript
const fs = require('fs').promises

const files = [
  './articles/old-article.md',
  './articles/old-article2.md',
  './articles/old-article3.md',
]

Promise.all(files.map(file => fs.unlink(file)))
  .then(() => {
    console.log('All files removed')
  })
  .catch(err => {
    console.error('Something wrong happened removing files', err)
  })
```

#### Eliminando los ficheros de un directorio

Por ejemplo, si tuvieramos una carpeta `/images` y quisieramos borrar todos los ficheros dentro, podríamos usar el método `fs.readdir` para leer los ficheros de un directorio y el `path.join` para tener el path correcto para nuestro sistema para el fichero. De esta forma:

```javascript
const fs = require('fs').promises
const path = require('path')
const FOLDER_TO_REMOVE = 'images'

fs.readdir(FOLDER_TO_REMOVE)
  .then(files => {
    const unlinkPromises = files.map(file => {
      const filePath = path.join(FOLDER_TO_REMOVE, file)
      return fs.unlink(filePath)
    })

    return Promise.all(unlinkPromises)
  }).catch(err => {
    console.error(`Something wrong happened removing files of ${FOLDER_TO_REMOVE}`)
  })
```

La solución anterior funciona en el caso que el directorio no tenga, a su vez, otros directorios. De lo contrario, nos dará un error `Error: EPERM: operation not permitted, unlink 'images/sub-folder'`.

Para ignorar los directorios, podríamos hacer una pequeña utilidad que nos ayudase a detectarlos:

```javascript
async function checkIsDirectory (path) {
  const stats = await fs.lstat(path)
  return stats.isDirectory()
}
```

Y entonces utilizamos ese método para que, si es un directorio, no hagamos nada con ese path.

```javascript {hl_lines=[2, "5-6"]}
fs.readdir(FOLDER_TO_REMOVE)
  .then(files => {
    const unlinkPromises = files.map(async file => { // añadimos async
      const filePath = path.join(FOLDER_TO_REMOVE, file)
      const isDirectory = await checkIsDirectory(filePath)
      return isDirectory ? Promise.resolve() : fs.unlink(filePath)
    })

    return Promise.all(unlinkPromises)
  }).catch(err => {
    console.error(`Something wrong happened removing files of ${FOLDER_TO_REMOVE}`)
  })
```

#### Eliminado un directorio de forma recursiva

¿Y qué pasa si quiero eliminar también los subdirectorios de ese directorio? Bueno, si estás utilizando la versión `Node.js 12.10.0` o superior, puedes utilizar directamente el método [`fs.rmdir`](https://nodejs.org/api/fs.html#fs_fs_rmdir_path_options_callback) y la opción `recursive` el directorio de forma recursiva (esto no sólo eliminará los ficheros de dentro si no también todos sus subdirectorios).

```javascript
const fs = require('fs').promises

fs.rmdir('./articles', { recursive: true })
  .then(() => {
    console.log('"articles" folder removed')
  })
  .catch(err => {
    console.error('Something wrong happened removing "articles" folder', err)
  })
```

> A la hora de escribir este artículo, la opción `recursive` está en modo experimental y puede no ser estable.

#### Eliminar ficheros buscando un `pattern`

Otra opción sería utilizar una librería como [globby](https://github.com/sindresorhus/globby) para poder borrar archivos de forma más granular. Por ejemplo, pongamos que tenemos una carpeta de imágenes con esta estructura:

```
├── images
├────  image000.png
├────  old-image000.png
├────  old-image001.jpg
├────  ...
├────  old-image400.gif
```

Y queremos eliminar todos los ficheros que tienen extensión `.jpg` y que, además, son imágenes antiguas por lo que su nombre comienza con `old-image`. Entonces, podríamos hacer lo siguiente:

```javascript
const globby = require('globby')
const fs = require('fs').promises

globby('./images/old-image*.jpg')
  .then(files => {
    const deletePromises = files.map(file => fs.unlink(file))
    return Promise.all(deletePromises)
  })
  .then(() => {
    console.log('All files removed')
  })
  .catch(err => {
    console.error('Something wrong happened removing files', err)
  })
```

Al final, aquí podríamos usar cualquier patrón (o lista de patrones) que queramos buscar. Usando [la documentación de globby](https://github.com/sindresorhus/globby#globbing-patterns) puedes encontrar diferentes posibilidades, como usar `!` al principio de un `pattern` para negar la búsqueda o usar expresiones OR con `{}`.

### Cómo mover ficheros a la papelera con Node.js

**Los ejemplos anteriores eliminan de forma definitiva los ficheros.** Y muchas veces tiene sentido pero, en ocasiones, lo que queremos en realidad, es simplemente **dejar los ficheros en la Papelera de Reciclaje de nuestro sistema operativo para decidir más tarde qué hacemos con ellos.**

Para eso, podemos utilizar el paquete [`trash`](https://www.npmjs.com/package/trash) que soporta los sistemas operativos *macOS (10.12+), Linux y Windows (8+)*.

Para ello, tendremos que importar la utilidad y pasarle como parámetro el *path* o el *pattern* que tiene que buscar para mover a la papelera esos ficheros. También puedes pasarle un Array con más de un *path* o *pattern*. Además, la operación es asíncrona y devuelve una promesa.

```javascript
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

> El `pattern` (patrón) que le puedes pasar está basado en *glob pattern*. Igual que en el ejemplo anterior. Puedes encontrar una lista de patrones aceptados aquí: https://github.com/sindresorhus/globby#globbing-patterns

## Conclusiones

Como decía al principio, es verdad que paquetes como [`del`](https://github.com/sindresorhus/del) nos soluciona directamente mucho de los problemas que hemos visto anteriormente pero **creo que es importante conocer las posibilidades nativas que nos da Node.js** y que, a veces, puede ser interesante no tener una dependencia para ciertas operaciones. Si estabas buscando **cómo puedes eliminar ficheros y directorios en Node.js** espero que este artículo te haya servido. A mi me ha valido para repasar. :)
