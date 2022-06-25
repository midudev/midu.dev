---
title: Qué es Brotli y cómo activarlo en Express y Cloudfront usando Lambda@Edge
date: '2020-01-23'
image: '/images/brotli-express-cloudfront-lambda.png'
description: '¿Quieres mejorar fácilmente el Time to First Byte de tu sitio? Brotli te permite mejorar el rendimiento de tu web sin hacer cambios en tu código. Aprende a usarlo en servidores Express o en Cloudfront con Amazon S3 y gana un tiempo precioso para tu usuario.'
topic: performance
toc: true
tags:
- performance
---

> **¡Importante!** Este artículo ya no tiene mucho sentido ya que [Cloudfront ha añadido soporte nativo a Brotli](https://aws.amazon.com/es/about-aws/whats-new/2020/09/cloudfront-brotli-compression/). Sin embargo, creo que el aprendizaje de usar Lambda@Edge para este tipo retos es muy valioso. Por ejemplo, esto mismo se podría hacer para cargar diferentes formatos de imagenes según el navegador, cargar polyfills de forma dinámica y muchas cosas más.

## ¿Qué es Brotli?
**Brotli es una alternativa moderna a Gzip**, una técnica de compresión de datos que **ofrece hasta una reducción del 30%** en la transferencia de los archivos estáticos comparado con otras soluciones.

Su historia no deja de ser curiosa, ya que **al principio Brotli estaba pensado más bien para tipografía web** pero, tras ir evolucionando, se enfocó en otro tipo de archivos como imágenes SVG, documentos HTML, scripts y archivos css.

Pero, ¿cuál es el truco para que brotli sea mejor que gzip? **Pues en un diccionario predefinido de más de 13 mil palabras.** Estas palabras han sido cuidadosamente seleccionadas ya que son los símbolos más usados entre los tipos de archivo que se quiere comprimir y contiene, entre las típicas palabras clave, además, palabras comunes de diferentes idiomas.

Este diccionario 📖 es el que le permite conseguir mejores compresiones en el mismo, o mejor, tiempo posible.

## Cómo activar Brotli en Express 🚝

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

## Cómo activar Brotli en Cloudfront paso a paso 👇

Si estás usando un CDN como *Cloudfare* o *Akamai* tenéis la posibilidad de activar el uso de brotli de forma muy sencilla desde su panel de administración. O **si deployas en Now o Firebase, también lo tienes solucionado.** Puedes dejar de leer el artículo, tomarte un café y disfrutar de tu vida.

Sin embargo para los usuarios de AWS... **Amazon todavía no ofrece esta posibilidad para Cloudfront**, a diferencia de *gzip* que simplemente hay que marcar un checkbox para utilizarlo.

> En pocas palabras. Cloudfront es el CDN de Amazon. S3 es un servicio de almacenamiento en la nube y Lambda es un servicio de procesamiento sin servidor, para poder ejecutar funciones tras determinados eventos.

Entonces, **¿cómo podemos conseguir servir nuestros estáticos con compresión con Brotli en Cloudfront?** Pues te digo como lo hemos conseguido nosotros en Fotocasa.

### Lambda@Edge al rescate 🦸‍♀

**Lambda@Edge es un servicio que te permite ejecutar funciones Lambda para modificar el comportamiento de Cloudfront**. Simplemente, estas funciones se ejecutan durante el ciclo de una petición al servicio y podemos hacer cambios en lo que entrega revisando las cabecera, la petición y todo tipo de lógica. Podrías hacer cosas interesantes como A/B testing o crear una simple redirección... pero hay un mundo de posibilidades como verás más adelante.

{{< img src="/images/1_ZitRPstFKx3016JsykcjXA.png" alt="Puedes ejecutar una Lambda en los diferentes puntos del ciclo de una request a Cloudfront" align="center">}}

#### 1. Comprime tus estáticos 🗜️

Antes de nada, lo primero que vas a necesitar, es **tienes que comprimir tus estáticos en las codificaciones que quieras servir.** Si estás usando Webpack, puedes recurrir a usar un plugin como [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin). Las versiones de Node a partir de `10.16.0` y `11.7.0` ya tienen soporte nativo para este algoritmo de compresión.

```javascript
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

#### 2. Sube los estáticos a tu S3 🆙

Obviamente, **los estáticos que has comprimido deben llegar a tu bucket de S3 donde activarás Cloudfront.** Para hacerlo, tienes diferentes estrategias para conseguir esto, como usar el CLI de S3, aunque si no tienes nada montado ahora mismo y tienes dificultades sobre cómo hacerlo, puedes echarle un vistazo a mi utilidad de [S3 Folder Upload](https://github.com/midudev/s3-folder-upload).

**S3 Folder Upload puede funcionar prácticamente sin configuración.** Sólo tienes que pasarle los credenciales para poder acceder a tu bucket (aunque si ya estás en una máquina de AWS, ni siquiera necesitarás eso) e indicarle qué carpeta quieres subir.

Admite cierta configuración, como por ejemplo que te separe por carpetas los tipos de contenido (js, css, img...) o que te mantenga las subcarpetas. Pero la forma más sencilla de usarlo sería así dentro de la carpeta donde tienes el directorio a subir:

```bash
cd web-project
npx s3-folder-upload statics

# `statics` es la carpeta con todos tus estáticos
```

#### 3. Sube tu Lambda@Edge Function 🔀

En realidad, esta *Lambda@Edge* nos va a servir de proxy. Dependiendo del navegador del usuario y el recurso que estamos pidiendo, vamos a devolverle la versión comprimida con *Brotli*, con *Gzip* o sin comprimir.

> Las Lambda@Edge son funciones lambda que se ejecutan en el extremo, cerca de los usuarios. Nos permite revisar la request y, a partir de eso, modificar la request para ofrecer la mejor experiencia al usuario. Por ejemplo, podríamos usarlo para discriminar cuando un usuario puede usar el formato `webp` o `jpg`.
 
> ⚠️ Ten en cuenta que las invocaciones y uso de las Lambda@Edge puede tener un coste asociado.

> ⚠️ Ten en cuenta que la siguiente implementación hará que **todas las peticiones pasen por esta Lambda@Edge**, así que todos los estáticos .js y .css deberán tener sus versiones comprimidas en este Cloudfront. Por lo tanto: **no pruebes esto directamente en producción.**

Para ello, vamos a tener que crear primero la implementación de esta **Lambda@Edge**. Voy a intentar comentar línea por línea comentando lo que hace, para que no te pierdas:

```javascript
// tenemos que exportar una propiedad handler para la Lambda@Edge
// la función recibirá el Evento de la request, el contexto y el callback, que
// se debe ejecutar para seguir con el proceso de la request
exports.handler = (event, context, callback) => {
  // recupera lel objeto request del evento de Cloud Front
  const {request} = event.Records[0].cf
  // extrae las cabeceras y la uri de la request
  const {headers = {}, uri} = request
  // vemos si el recurso que pedimos termina por css y js
  // que son los que soportamos con brotli
  const isSupportedFile = uri.endsWith('.css') || uri.endsWith('.js')
  if (headers && isSupportedFile) {
    let gz = false
    let br = false
    // recuperamos la cabecera accept-encoding
    const ae = headers['accept-encoding']
    // si tenemos esa cabecera, vamos a comprobar
    if (ae) {
      // como el accept-encoding puede ser un array, lo recorremos
      for (let i = 0; i < ae.length; i++) {
        // tomamos el valor del primero
        const {value} = ae[i]
        // como pueden venir diferentes algoritmos, los separamos
        const bits = value.split(/\s*,\s*/)
        // si alguno incluye brotli o gzip
        // vamos a romper la ejecución del loop
        // y guardar en un flag que si soporta brotli
        if (bits.includes('br')) {
          br = true
          break
        } else if (bits.includes('gzip')) { // o gzip...
          gz = true
          break
        }
      }
    }
    // Si soporta brotli, añadimos el sufijo br a la request
    if (br) request.uri += '.br'
    // si es gzip, añadimos el sufijo gzip
    else if (gz) request.uri += '.gz'
    // si no, lo dejamos como ya estaba
  }
  // devolvemos la request con el cambio de uri, si procedía
  callback(null, request)
}
```

**Seguramente se pueda simplificar el código** y mejorar algunas cosas pero... como ya funcionaba, he decidido no tocarlo y evitar problemas. 😅 Tengo un repositorio donde estoy manteniendo este pequeño *proxy* así que, si encuentras problemas o se te ocurre como mejorarlo, te animo a que enviés tus issues y pull requests: https://github.com/SUI-Components/lambda-edge-serve-compressed-file

Una vez tienes lo tienes claro, tienes que subir la *Lambda@Edge*. Tienes un montón de opciones, algunas más automatizadas, pero si quieres ir a lo manual, en AWS tienes una [guía que paso a paso te indica cómo puedes crearla](https://docs.aws.amazon.com/es_es/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-create-in-lambda-console.html).

> Las Lambda@Edge sólo están disponiblese en EE.UU. Este (Norte de Virginia)us-east-1.

#### 4. Usa la Lambda@Edge en CloudFront para derivar las requests 🛒

> Si tienes un devops en tu equipo. Es el momento de tirar de él y pedirle hacer un pair programming para evitar montar un circo. 🤡

**Aquí viene lo delicado.** Primero deberíamos crear un nuevo `Behavior` (en el caso que no lo tengamos ya):

{{< img src="/images/cloudfront-distributions-behavior.png" alt="Creamos un comportamiento para nuestra distribución de Cloudfront" align="">}}

Una vez dentro, en Whitelist Headers, tenemos que añadir `Accept-Encoding` y `Origin`:

{{< img src="/images/cloudfront-brotli-whitelist.png" alt="Creamos un comportamiento para nuestra distribución de Cloudfront" align="">}}

También es importante desactivar la opción de `Compress Objects Automatically`. Por defecto debería estar en `ON` y esto lo que hace es comprimir los recursos en Gzip pero, por ahora, no lo hace en Brotli.

Para terminar, tenemos que usar la Lambda@Edge para interceptar la request de CloudFront. Para ello, en la última sección del `Edit Behavior` tenemos que interceptar el `CloudFront Event` llamado `Origin Request` e indicar la lambda que vamos a usar. En este caso tenemos que indicar el nombre ARN de la Lambda Function.

{{< img src="/images/cloudfront-brotli-event-origin-request.png" alt="Creamos un comportamiento para nuestra distribución de Cloudfront" align="">}}

> El nombre ARN de la Lambda Function lo puedes encontrar en la propia página donde has creado o editado la Lambda Function. Está en la parte superior derecha y tiene un icono para copiar fácilmente el nombre.

## Resultados de activar Brotli en Fotocasa 📉

Una vez esté activado, toca disfrutar de los resultados. Lo hemos activado en [Fotocasa](https://www.fotocasa.es/es/) y estos son los resultados:

{{< img src="/images/brotli-express-cloudfront-lambda.png" alt="Tras activar Brotli en Fotocasa hemos visto diferentes mejoras en nuestras métricas">}}

Al activar Brotli en [Fotocasa](https://fotocasa.es/es/) hemos conseguido los siguientes resultados:

- 🗜 Entre -18% y -25% al enviar archivos .js y .css
- ⚡️ Mejoramos 1s el Time-To-Interactive, eso es un -5%.
- 📡 Transferimos 40KB menos en datos.

Además ofrecemos al usuario que...

- 📱 Ahora al visitar la página, consume menos datos.
- 🔀 Si su navegador todavía no soporta brotli, recibe gzip.

Y esto, **de forma completamente transparente al desarrollador y a nuestros usuarios.**

## Cómo usar Brotli y soporte en navegadores 📴

**Para consumir recursos comprimidos con Brotli no tienes que hacer nada, el navegador se ocupa de todo de forma totalmente automática.** Actualmente, todos los navegadores modernos tienen soporte para este tipo de compresión:

- **Edge** desde la versión 15.
- **Chrome** desde la versión 49.
- **Safari** desde la versión 11.
- **Firefox** desde la versión 44.

Si todavía tienes dudas, para saber si tu navegador es uno de ellos, puedes revisar en las herramientas de desarrollo si, al pedir un archivo .html, .js, .css o .svg, envía la cabecera `Accept-Encoding: gzip, deflate, br`.

{{< img src="/images/accept-encoding-br.png" alt="La cabecera de la request, accept-encoding, con las codificaciones que soporta el navegador" align="">}}

De esta forma, si el servidor soporta este tipo de codificación, te enviará brotli para que puedas disfrutar de mejores tiempos de transferencia. Si no, **siempre nos quedará el mítico gzip.**

## Conclusiones

Igual has llegado hasta aquí y estás pensando 🤔 *"¡Menudo tocho para poder activar la cosa esta!"*. Sí, lo cierto es que no es precisamente sencillo conseguirlo y, por eso mismo, he querido compartir contigo **la aventura que tuvimos que seguir para conseguirlo en Cloudfront**. Si simplemente tienes un servidor Express, o similares, los pasos suelen ser más sencillos. Si ya tienes servicios de CDN que ya soportan Brotli, genial.

Por desgracia **Cloudfront, que es uno de los CDN más usados, no tiene este soporte nativo** y hay que "ayudarle" a trabjar con Brotli. Teniendo en cuenta que es algo que se hace una vez y que las mejoras a partir de entonces son transparentes, puede valer mucho la pena añadirlas. A nosotros nos ha compensadoo y espero que a ti te haya gustado el artículo. **¡Gracias por leerme!**