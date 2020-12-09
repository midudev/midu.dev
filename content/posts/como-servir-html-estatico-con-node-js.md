---
title: Cómo servir un index.html y estáticos Javascript y CSS con Node.js
date: '2020-12-08'
description: >-
  Aprender a servir un archivo index.html, cualquier página HTML o estáticos
  usando Node.js y sin ninguna dependencia
toc: true
tags:
  - node
image: /images/og/como-servir-html-estatico-con-node-js.png
---

**Node.js** ofrece una forma muy sencilla de crear un pequeño servidor para servir **archivos estáticos** sin necesidad de recurrir a la instalación de dependencias como `express`.

Por ejemplo, para crear un servidor que sirva un fichero `index.html` podemos utilizar este código utilizando, simplemente, las dependencias nativas de Node.js `fs` y `http`.

```javascript
const {createReadStream} = require('fs')
const {createServer} = require('http')

// configuramos con una variable de entorno el puerto
const {PORT = 3000} = process.env

// creamos con el content type del archivo que vamos a servir
const HTML_CONTENT_TYPE = 'text/html'

// creamos un requestListener para pasarle a nuestro servidor
const requestListener = (req, res) => {
  // escribimos en la respuesta el status code de 200 y el content type que necesitamos
  res.writeHead(200, { 'Content-Type': HTML_CONTENT_TYPE })
  // leemos el fichero index.html y su contenido lo redirigimos a la respuesta
  createReadStream('index.html').pipe(res)
}

// creamos un servidor con el requestListener
const server = createServer(requestListener)

// hacemos que el servidor escuche el puerto configurado
server.listen(PORT)
```

En el caso que quieras pasar a usar `ESModules`, que ya son estables desde Node 15.3.0, tendrías que cambiar las dos primeras líneas para usar `import` en lugar de `require` y extraer los módulos que quieres usar en el código.

```diff
- const {createReadStream} = require('fs')
- const {createServer} = require('http')
+ import http from 'http'
+ import fs from 'fs'
+ const {createReadStream} = fs
+ const {createServer} = http
```

Ahora que hemos hecho un ejemplo muy sencillo, podríamos servir diferentes tipos de archivos modificando la función `requestListener` de forma que no sólo soporte el `index.html` pero también otros archivos estáticos que tenemos en una carpeta `public`. Por ejemplo, archivos CSS y Javascript:

```javascript
const path = require('path')
const {createReadStream} = require('fs')
const {createServer} = require('http')

// configuramos con una variable de entorno el puerto
const {PORT = 3000} = process.env

const HTML_CONTENT_TYPE = 'text/html'
const CSS_CONTENT_TYPE = 'text/css'
const JS_CONTENT_TYPE = 'text/javascript'

const PUBLIC_FOLDER = path.join(__dirname, 'public')
// creamos un requestListener para pasarle a nuestro servidor
const requestListener = (req, res) => {
  const {url} = req
  let statusCode = 200
  let contentType = HTML_CONTENT_TYPE
  let stream

  // si estamos pidiendo la ruta principal, devolvemos el contenido del index.html
  if (url === '/') {
    stream = createReadStream(`${PUBLIC_FOLDER}/index.html`)
  } else if (url.match("\.css$")) { // para los archivos CSS
    contentType = CSS_CONTENT_TYPE
    stream = createReadStream(`${PUBLIC_FOLDER}${url}`)
  } else if (url.match("\.js$")) { // para los archivos JavaScript
    contentType = JS_CONTENT_TYPE
    stream = createReadStream(`${PUBLIC_FOLDER}${url}`)
  } else { // si llegamos aquí, es un 404
    statusCode = 404
  }

  // escribimos las cabeceras de la respuesta dependiendo de la request
  res.writeHead(statusCode, {'Content-Type': contentType})
  // si tenemos un stream, lo enviamos a la respuesta
  if (stream) stream.pipe(res)
  // si no, devolvemos un string diciendo que no hemos encontrado nada
  else return res.end('Not found')
}

// creamos un servidor con el requestListener
const server = createServer(requestListener)

// hacemos que el servidor escuche el puerto configurado
server.listen(PORT)
```

Por supuesto quedaría añadir un mejor soporte cuando no encuentra en la ruta el fichero estático, admitir otros tipos de archivos y más... pero es un buen punto de partida para saber **crear desde cero tu propio servidor web con Node.js.**
