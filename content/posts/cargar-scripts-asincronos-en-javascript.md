---
title: Carga scripts externos de forma asíncrona en código JavaScript
date: '2022-02-18'
description: Importa de forma dinámica archivos externos desde código JavaScript de forma fácil y rápida.
toc: true
tags:
- javascript
---

Aunque hoy en día usamos empaquetadores de código para cargar nuestros scripts pero, **¿qué pasa si queremos cargar scripts externos de forma asíncrona y sólo cuando la necesitemos?**

Imagina que quieres cargar un script de terceros dentro de tu código JavaScript pero sólo después que haya ocurrido alguna acción por parte del usuario (como hacer click en un botón). Esta biblioteca está en un CDN y sólo la quieres cargar cuando realmente la necesitas...

## Si estás trabajando con la forma clásica...

Si estás cargando tus archivos JavaScript como siempre, significa que estás usando el sistema de módulos clásico:

```html
<script defer src='./index.js'></script>
```

Si es así entonces vas a tener que implementar una pequeña función para poder lograrlo. Vamos a llamar a la función `loadScript` y devolverá una *Promesa* cuando se haya cargado el script:

```javascript
// la función devuelve una promesa que se resolverá o rechazará
// dependiendo de la carga del script
const loadScript = (src) => new Promise((resolve, reject) => {
  // creamos un elemento script en el dom
  let script = document.createElement('script')
  // añadimos la fuente src al script del archivo 
  script.src = src
  // usamos los eventos nativos del script para resolver
  // o rechazar la promesa dependiendo de si se ha cargado
  script.onload = resolve
  script.onerror = reject
  // añadimos el script al documento
  document.head.appendChild(script)
})
```

Ahora ya sólo nos queda utilizar la función. Vamos a ver un ejemplo con **Google Analytics**, que es una biblioteca de terceros y que justamente es un uso bastante común.

```javascript
loadScript('https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y')
  .then(() => {
    window.dataLayer = window.dataLayer || []
    gtag('js', new Date())
    gtag('config', 'UA-XXXXX-Y')
  })
  .catch(console.error)
```

De esta forma podrías cargar Google Analytics de forma asíncrona y con código JavaScript.

## Si estás trabajando con ESModules...

Los `ESModules` son la nueva forma de trabajar con módulos en JavaScript. ¿Cómo puedes saber si estás usando ESModules en tu proyecto o código? Si en tu código HTML estás cargando el archivo principal de esta forma es que estás usando *ESModules*:

```html
<script type='module' src='./index.js'></script>
```

Si es así, puedes usar el método `import` dinámico de *ESModules* para importar scripts externos. Este método te devolverá una promesa que se resolverá cuando el script se haya cargado.

```javascript
try {
  const {default: axios} = await import('https://cdn.skypack.dev/axios')
  // El script se ha cargado y tienes disponible axios aquí
  const response = await axios.get('https://midu.dev')
  console.log(response.data)
} catch (e) {
  console.error('Error al cargar el script o hacer la petición', e)
}
```

Como ves, esta es la forma más fácil de cargar scripts externos en JavaScript, ya que *ESModules* ha tenido en cuenta esta necesidad y no necesitas implementar ningún tipo de código para conseguirlo.