---
title: Activa Brotli en Express y en Cloudfront usando una Lambda@Edge
date: '2019-05-20'
image: '/images/brotli-express-cloudfront-lambda.png'
description: 'Aprende a usar Brotli con Cloudfront y Amazon S3 para mejorar la performance de tu sitio web'
topic: performance
language: 🇪🇸
toc: true
---

## ¿Qué es Brotli?
**Brotli es una alternativa moderna a Gzip**, una técnica de compresión de datos que **ofrece hasta una reducción del 30%** en la transferencia de los archivos estáticos comparado con otras soluciones.

Su historia no deja de ser curiosa, ya que **al principio Brotli estaba pensada más bien para tipografía web** pero, tras ir evolucionando, se enfocó en otro tipo de archivos como imágenes SVG, documentos HTML, scripts y archivos css.

Pero, ¿cuál es el truco para que brotli sea mejor que gzip? **Pues en un diccionario predefinido de más de 13 mil palabras.** Estas palabras han sido cuidadosamente seleccionadas ya que son los símbolos más usados entre los tipos de archivo que se quiere comprimir y contiene, entre las típicas palabras clave, además, palabras comunes de diferentes idiomas.

Este diccionario 📖 es el que le permite conseguir mejores compresiones en el mismo, o mejor, tiempo posible.

## Cómo activar Brotli en Express

Activar Brotli en [Express](https://expressjs.com/es/) es muy sencillo gracias a `shrink-ray-current`, un fork del archifamoso middleware `compression`. ¿La diferencia? El soporte de nuevos tipos de compresión como zopfli y, el que nos importa, **brotli**.

Partiendo de la base que ya tenéis un servidor Express funcionando, sólo tendréis que instalar la dependencia con `npm install shrink-ray-current` y seguidamente, añadir este middleware para comprimir todas las peticiones al servidor.

> Aunque existe un paquete `shink-ray`, este no se actualiza desde hace bastante tiempo. `shink-ray-current` es un fork más actualizado que además ofrece la posibilidad de usar el paquete ilorb que viene en node de forma nativa en sus últimas versiones.

```javascript
// recuperamos las dependencias
const express = require('express')
const shinkRay = require('shrink-ray-current')
// inicialización del server
const app = express()
// servimos la carpeta public que tendrá los estáticos
app.use(express.static('public'))
// comprimir todas las peticiones 
app.use(shrinkRay())
// inicializamos el servidor
app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`)
)
```

Con esto, **no sólo los archivos estáticos que sirvamos, si no las respuestas HTML dinámicas de nuestro servidor, se servirán con compresión brotli**. En el caso que el userAgent que nos haga la petición no soporte este tipo de compresión, se le servirá otra (como gzip) o ninguna, de forma automática.

El problema de esto es que la compresión se realiza al vuelo y esto puede tener una sobrecarga en nuestro servidor. **Normalmente el coste compensa la mejora en la transferencia de datos, pero es algo a tener en cuenta.**

## Cómo activar Brotli en Cloudfront

Si estás usando un CDN como Cloudfare o Akamai tenéis la posibilidad de activar el uso de brotli de forma muy sencilla sin embargo Amazon todavía no ofrece esta posibilidad para Cloudfront, a diferencia de gzip que simplemente hay que marcar un checkbox para utilizarlo.

> En pocas palabras. Cloudfront es el CDN de Amazon. S3 es un servicio de almacenamiento en la nube y Lambda es un servicio de procesamiento sin servidor, para poder ejecutar funciones tras determinados eventos.

Entonces, **¿cómo podemos conseguir servir nuestros estáticos con compresión con Brotli en Cloudfront?** Pues te digo como lo hemos conseguido nosotros en Fotocasa.

### Lambda@Edge al rescate

**Lambda@Edge es un servicio que te permite ejecutar funciones Lambda para modificar el comportamiento de Cloudfront**. Simplemente, estas funciones se ejecutan durante el ciclo de una petición al servicio y podemos hacer cambios en lo que entrega revisando las cabecera, la petición y todo tipo de lógica.


#### 1. Comprime tus estáticos

Antes de nada, lo primero que vas a necesitar, es **tienes que comprimir tus estáticos en las codificaciones que quieras servir.** Si estás usando Webpack, puedes recurrir a usar un plugin como [compresesion-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin). Las versiones de Node a partir de `10.16.0` y `11.7.0` ya tienen soporte nativo para este algoritmo de compresión.

```js
// en tu webpack.config.js
module.exports = {
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz',
      threshold: 0,
      minRatio: 2,
      test: /\.(js|css)$/i
    }),
    new CompressionPlugin({
      filename: '[path].br',
      algorithm: 'brotliCompress',
      threshold: 0,
      minRatio: 2,
      test: /\.(js|css)$/i,
      compressionOptions: {level: 11}
    })
  ]
}
```

Le pasamos como `threshold` el valor `0` y como `minRatio` el valor `2` **para asegurarnos que TODOS los archivos son comprimidos con los algoritmos que le indicamos.** ¿Por qué? Porque como veremos más adelante, la Lambda@Edge que vamos a programar no va a poder ver si el archivo que va a pedir está disponible en otro tipo de compresión por lo que debemos hacer que todos los que servimos ya estén disponibles en todos los tipos de compresión que soportamos.

#### 2. Sube los estáticos a tu S3

Obviamente, **los estáticos que has comprimido deben llegar a tu bucket de S3 donde activarás Cloudfront.** Para hacerlo, tienes diferentes estrategias para conseguir esto, como usar el CLI de S3, aunque si no tienes nada montado ahora mismo y tienes dificultades sobre cómo hacerlo, puedes echarle un vistazo a mi utilidad de [S3 Folder Upload](https://github.com/midudev/s3-folder-upload).

**S3 Folder Upload puede funcionar prácticamente sin configuración.** Sólo tienes que pasarle los credenciales para poder acceder a tu bucket (aunque si ya estás en una máquina de AWS, ni siquiera necesitarás eso) e indicarle qué carpeta quieres subir.

Admite cierta configuración, como por ejemplo que te separe por carpetas los tipos de contenido (js, css, img...), que te mantenga las subcarpetas... Pero la forma más sencillo de usarlo sería así.

```bash
npx s3-folder-upload tu-carpeta-de-estaticos
```

#### 3. Sube tu Lambda@Edge Function

En realidad, esta Lambda@Edge nos va a servir en forma de proxy. Dependiendo de la request

#### 4. Usa la function en CloudFront para discriminar

## Resultados de activar Brotli en Fotocasa

{{% img src="/images/brotli-express-cloudfront-lambda.png" align="left" alt="Tras activar Brotli en Fotocasa hemos visto diferentes mejoras en nuestras métricas" %}}

Al activar Brotli en [Fotocasa](https://fotocasa.es/es/) hemos conseguido los siguientes resultados:

- 🗜 Entre -18% y -25% al enviar archivos .js y .css
- ⚡️ Mejoramos 1s el Time-To-Interactive, un -5%.
- 📡 Transferimos 40KB menos en datos.

Además ofrecemos al usuario que...

- 📱 Ahora al visitar la página, consume menos datos.
- 🔀 Si su navegador todavía no soporta brotli, recibe gzip.

Y esto, **de forma completamente transparente al desarrollador y a nuestros usuarios.**

## Cómo usar Brotli y soporte en navegadores

**Para consumir recursos comprimidos con Brotli no tienes que hacer nada, el navegador se ocupa de todo de forma totalmente automática.** Actualmente, todos los navegadores modernos tienen soporte para este tipo de compresión:

- **Edge** desde la versión 15.
- **Chrome** desde la versión 49.
- **Safari** desde la versión 11.
- **Firefox** desde la versión 44.

Si todavía tienes dudas, para saber si tu navegador es uno de ellos, puedes revisar en las herramientas de desarrollo si, al pedir un archivo .html, .js, .css o .svg, envía la cabecera `Accept-Encoding: gzip, deflate, br`.

De esta forma, si el servidor soporta este tipo de codificación, te enviará brotli para que puedas disfrutar de mejores tiempos de transferencia.