---
title: 'Cómo añadir un buscador en tu blog JamStack con Algolia'
date: '2021-05-21'
description: Te voy a explicar paso a paso cómo he añadido en mi blog hecho con JamStack un buscador gracias a Algolia
toc: true
tags:
  - algolia
image: >-
  /images/og/como-anadir-buscador-blog-jamstack-algolia.jpg
---

{{< youtube id="zBTYBIUw1iw" >}}

Muchos lectores del blog me han pedido que añada un buscador. Al ser mi blog un JAMStack, había algunos retos. **¿Cómo podía indexar todo el contenido que tengo en archivos estáticos?** **¿Cómo hago que ese índice esté actualizado a lo largo del tiempo?** **¿Cómo hago un ranking de esas búsquedas...?**

Una forma bastante sencilla, que da una solución general, sería tirar de *Google Custom Search*, que ya tiene todo mi contenido indexado. Sin embargo, tiene algunas **desventajas**: es rápido pero no lo suficiente, pierdo el control de la búsqueda y, además, no puedo evolucionarlo como me gustaría.

Después de informarme de mis opciones, al final he decidido tirar por Algolia, una compañía que se encarga de crear experiencias de búsqueda como servicio (SaaS) y que viene a solucionar mis problemas. Vamos a ver cómo podemos añadir la búsqueda en mi blog paso a paso.

<div style='text-align: center;'>
  <video loop style='width: 90%; max-width: 500px; height: auto;' autoplay src='https://cleanshot-cloud-fra.accelerator.net/media/6116/EUL02znNnMwBdnQlIxiO2gxxEMqI3fg6WYKb484K.mp4'>
  <em>El resultado final</em>
</div>

## ¿Cómo funciona Algolia?

Algolia nos **ofrece una API y widgets** para montar nuestra búsqueda. Pero, antes, para poder ofrecernos esto **tenemos que indexar nuestro contenido en su plataforma.** Existen diferentes estrategias para lograr esto. En mi caso estoy usando Hugo y podría crear una plantilla que tuviese toda la información que necesito.

Para crear una **solución lo más general posible**, que pueda servir para cualquier blog que use un JAMStack, **voy a usar el RSS para generar un archivo JSON** y, este, que pase a formar parte del índice de Algolia.

Los pasos serán:
- Creamos la aplicación y el índice en Algolia.
- Convertimos el RSS a un formato JSON.
- Enviamos ese JSON al índice de Algolia usando su API.
- Configuramos el índice en Algolia para mejorar las búsquedas.
- Usamos los widgets y la API de Algolia para tener la búsqueda en el front end.

¡Vamos a Algolia a crear nuestra app!

## Creando nuestra aplicación e índice en Algolia

Primero, [vamos a ir a Algolia para registranos](https://midu.dev/images/algolia-horizontal-logo.png), si no lo estamos ya. Seguramente, si es la primera vez que entras, tendrás un tutorial que te indica cómo empezar paso a paso. 

Lo primero es crear una aplicación. Aquí, además del nombre, indicaremos la capa de precios que queremos utilizar. En nuestro caso será la FREE, que te da 10 unidades gratis al mes y que trae lo suficiente para funcionar (más adelante os comentaré sobre los precios del servicio).

Al seguir tendremos que elegir el centro de datos mejor situado según nuestra ubicación. Ten en cuenta que Algolia te recomendará el mejor lugar según tu ubicación. **Si tu página es servida en otra localización o país, tenlo en cuenta, y selecciona el centro de datos que mejor funcione para tu web.**

{{< img align="center" src="/images/como-anadir-buscador-02.jpg" alt="Selecciona tu centro de datos adecuado según tu ubicación" >}}

Tras esto, tendremos que aceptar los términos y condiciones y, finalmente, podremos decidir si seguimos una guía paso a paso o si ya somos usuarios que han usado Algolia. En nuestro caso, **vamos a decir que somos usuarios con experiencia y nos basaremos en este artículo con los siguientes pasos.**

## Creando el índice en Algolia

Pulsamos en `Create Index` si nos aparece en la pantalla o vamos al menú de `Indices` y, al hacer click, nos indicará de crear uno.

Nos pide un nombre. En este punto es interesante utilizar diferentes índices dependiendo del entorno (dev, prod, test...). En nuestro caso vamos a ir directamente a usar el de producción. `prod_blog_content`.

Ahora tendremos que importar la información que tiene que ser indexada. Podríamos añadir los elementos subiendo un archivo JSON con nuestros elementos, podríamos añadirlos a mano (nooooooo) y, lo que haremos, **se puede utilizar la API para automatizar este proceso.**

Ahora nos faltaría recuperar 

## Generando el contenido para enviarlo al índice de Algolia

Teniendo en cuenta que ya estoy creando un RSS para mi blog, puedo leer ese mismo contenido para generar el JSON que necesitamos. Para ello vamos a usar el paquete `xml2json` por lo que tendremos que instalarlo como dependencia en nuestro proyecto (`npm install xml2json`).

Vamos a recuperar el archivo `index.xml` (que es el RSS) y lo transformamos a JSON.

```javascript
const fs = require('fs')
const path = require('path')
// usamos el paquete `xml2json` para transformar el RSS a un JSON
const parser = require('xml2json')

// leemos con Node el RSS de nuestro blog
const rss = fs.readFileSync(path.resolve(__dirname, '../public/index.xml'), 'utf-8')
// pasamos la opción object: true para que nos devuelva un objeto de JavaScript
const json = parser.toJson(rss, {object: true})
// en item vamos a tener un array de elementos con todos los artículos
console.log(json.rss.channel.item)
```

Con esto ya tendríamos todo nuestro contenido del blog preparado para ser indexado. Si no tienes un archivo RSS generado, tendrás que pensar en una alternativa para ser capaz de exporar todo el contenido aunque, desde luego, te recomiendo que siempre generes un archivo RSS.

## Enviando el contenido al índice de Algolia

Una vez que ya tenemos el contenido, sólo nos faltará enviarlo a Algolia. Para ello **necesitamos antes sacar las API Keys.** Para ello, volvemos a la aplicación de **Algolia** y en el menú principal buscamos la sección "API Keys". Allí necesitaremos recuperar dos IDs: el **Application ID** y el **Admin API Key**. También necesitamos recordar el nombre del índice que creamos antes.

Una vez tengamos eso, necesitamos instalar primero la dependencia de `algoliasearch`. Lo haremos con `npm install algoliasearch`. Y ahora pasamos al código.

```javascript
const algoliasearch = require('algoliasearch')

const ALGOLIA_APPLICATION_ID = "N06USNNE94"
const ALGOLIA_ADMIN_API_KEY = "ffb74847ebfbabfbfbf66cb59c4673ba" // es inventado :P
const ALGOLIA_INDEX_NAME = "prod_blog_content"

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX_NAME)
```

Las constantes de `ALGOLIA_`, seguramente, sería **mejor sacarlos de variables de entorno.** Pero en este caso, por sencillez, los vamos a dejar así.

Lo interesante del índice de Algolia es que no necesita un contrato en concreto pero sería interesante hacer que nuestros posts siempre tengan una id única. Para ello podemos usar la propiedad `ObjectId` que Algolia define como un identificador único para nuestro post. En nuestro caso vamos a usar el atributo `guid` que ya está disponible.

```javascript
const posts = json.rss.channel.item.map(post => ({...post, objectID: post.guid }))
```

> Es importante ofrecer un objectID que siempre sea el mismo para evitar que el mismo post se añada dos veces en el índice con identificadores distintos. No es importante que sea un número, auto-generado o lo que sea. Pero siempre tiene que ser el mismo y debe ser único que identifique a ese post.

Con esto ya habremos iniciado el índice, preparado para recibir los posts para ser indexados. Así que ya podemos llamar la API para enviar todos estos posts al índice de Algolia.

```javascript
index.saveObjects(posts)
  .then(objectIds => {
    console.log({objectIds})
  })
  .catch(err => {
    console.error(err)
  })
```

El código completo quedaría así:

```javascript
const parser = require('xml2json')
const fs = require('fs')
const path = require('path')
const algoliasearch = require('algoliasearch')

const ALGOLIA_APPLICATION_ID = "N06USNNE94"
const ALGOLIA_ADMIN_API_KEY = "9089a9d591b8c82c89e2a810f4c77fa1" // es inventado :P
const ALGOLIA_INDEX_NAME = "prod_blog_content"

const rss = fs.readFileSync(path.resolve(__dirname, '../public/index.xml'), 'utf-8')
const json = parser.toJson(rss, {object: true})


const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX_NAME)

const posts = json.rss.channel.item.map(post => ({...post, objectID: post.guid }))

index.saveObjects(posts)
  .then(objectIds => {
    console.log({objectIds})
  })
  .catch(err => {
    console.error(err)
  })
```

Al ejecutar el código nos debería aparecer algo así:

```
{
  objectIds: {
    taskIDs: [ 10798010001 ],
    objectIDs: [
      'https://midu.dev/como-crear-un-spinner-con-css/',
      'https://midu.dev/podcast/03_04_como-no-hacer-un-live-coding-challenge-de-mierda/',
      'https://midu.dev/como-arreglar-error-react-has-detected-change-order-hooks/',
      'https://midu.dev/como-arreglar-no-xcode-or-clt-version-detected-npm-install/',
      'https://midu.dev/no-sirvo-para-programar-no-es-para-todos-vales-como-programador/',
    ...
  }
  ```

Eso significa que todo ha ido bien. Y, para comprobarlo, podemos ir a nuestra página de Algolia y ver si nuestro contenido ha sido indexado correctamente.

{{< img align="center" src="/images/como-anadir-buscador-03.jpg" alt="Al volver al índice de Algolia ya podemos ver que está nuestro contenido con diferentes atributos" >}}

## Configurando nuestra búsqueda en Algolia

Tenemos el contenido pero todavía le tenemos que decir a Algolia cómo funciona nuestra búsqueda. Para ello tenemos que a nuestro índice y dirigirnos a la sección de Configuración.

### Cambiando los atributos que se usan en la búsqueda

Primero vamos a decirle qué atributos del contenido se usan en la búsqueda. En nuestro caso estamos enviando el `title`, `description`, `date`, `link` y `objectID`. Vamos a indicar que queremos que se pueda buscar sobre los dos primeros. Además, tenemos que indicar el orden de importancia de cada uno.

En nuestro caso el título es más importante que la descripción, por lo que vamos a añadir el `title` por encima del `description`. Además, vamos a hacer que estos atributos sean _ordered_. Esto significa que si la palabra buscada está más al principio de la frase, tendrá una importancia mayor. Por ejemplo si buscas *"React"* el título *"React desde cero"* será más importante que *"Cómo mejorar en React"*, ya que la palabra está al final de la frase. Esto lo podéis ir personalizando a vuestro gusto.

No olvides darle a _Review and Save Settings_ antes de salir de la página.

{{< img align="center" src="/images/como-anadir-buscador-04.jpg" alt="Hemos configurado que los atributos 'buscables'  sean el título y la descripción. Además el título es más importante y en ambos vamos a tener en cuenta el orden de la palabra que se busca" >}}

Si quieres probar cómo funciona la búsqueda, puedes volver a la pestaña _Browse_ y allí hacer una búsqueda para ver los resultados que devuelve y qué campos ha usado.

## Construyendo el front end de nuestro buscador con Algolia

En nuestro `index.html`


```html
  <!-- Motor de búsqueda de algolia -->
  <script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.5.1/dist/algoliasearch-lite.umd.js"></script>
  <!-- Widget para añadir un Instant Search en nuestro blog fácilmente -->
  <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.8.3/dist/instantsearch.production.min.js"></script>
  <!-- Estilos por defecto para el Instant Search -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css">
```

Una vez que tenemos todos los recursos cargados, vamos a añadir el HTML necesario en nuestro blog. Lo colocaremos donde queramos que aparezca nuestra búsqueda y sus resultados:

```html
<div>
  <div id='searchbox'></div>
  <div id='hits'></div>
</div>
```

Ya podemos empezar a escribir nuestro JavaScript para inicializar la búsqueda. Te dejo por aquí paso a paso lo que hay que hacer para añadir nuestro buscador de Algolia a nuestro blog.

```javascript
// Vamos a "API Keys" y recuperamos el Application ID y el Search-Only API Key
var ALGOLIA_APPLICATION_ID = 'QK9VV9YO5F'
var ALGOLIA_SEARCH_ONLY_API_KEY = '247bb355c786b6e9f528bc382cab3039'

// Las usamos para inicializar el cliente de Algolia
var algoliaClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_ONLY_API_KEY);

// Inicializamos el módulo de instantsearch
var search = instantsearch({
  indexName: 'prod_blog_content', // este es el nombre de tu índice, pon el correcto
  numberLocale: 'es', // idioma para el buscador
  searchClient: algoliaClient // el cliente que hemos iniciado antes
});

// Le indicamos los widgets que vamos a usar
search.addWidgets([
  // en el elemento con id 'searchbox' iniciamos el buscador
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Buscar...'
  }),

  // los resultados irán en el elemento con id 'hits'
  instantsearch.widgets.hits({
    container: '#hits'
  }),

  // configuramos que sólo salgan tres resultados
  instantsearch.widgets.configure({
    hitsPerPage: 3
  }),
]);

search.start()
```

Si has llegado hasta aquí... verás que todo funcionar funciona... pero al entrar en nuestro blog, aparece el buscador ya con resultados y además el cómo se muestran no es lo más adecuado (se ve el objeto JSON ahí horrible, directamente :D). Si haces una búsqueda veás que sí funciona pero nos quedaría mejorar los dos puntos mencionados.

### Mejorar la UI de los resultados

Para mejorar los resultados vamos a usar una plantilla customizada. Para ello cada widget recibe una propiedad `templates` que te permite cambiar el renderizado por defecto de cada uno.

El sistema de plantillas que usa es [mustache](https://mustache.github.io/) y podremos referirnos a propiedades que tengamos en el post indexado. Incluye una función llamada `helpers.highlight` que te permite resaltar si la búsqueda se encuentra en el texto que intentas renderizar.

Quedaría de esta forma:

```javascript
instantsearch.widgets.hits({
  container: '#hits',
  templates: {
    empty: 'Sin resultados', // para cuando no hay resultados
    // para renderizar cada resultado
    item: `<a href='{{ link }}'>
      {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
      <div>
        <small>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</small>
      </div>
    </a>`,
  },
}),
```

{{< img align="center" src="/images/como-anadir-buscador-05.jpg" alt="Nuestro buscador va tomando forma" >}}

### Evitar la primera búsqueda

Ahora que visualmente ya queda bastante bien, todavía tenemos que solucionar un problemilla y es que cuando entramos en la página el buscador ya muestra resultados pese a que todavía no lo estamos usando.

Sorprendentemente no existeu una opción que fácilmente nos permita esto y me imagino que tiene que ver con el hecho que este módulo de `instantSearch` está pensando más bien para páginas de búsqueda que siempre tienen resultados.

Igualmente sabemos de programación, así que vamos a conseguir emular el mismo comportamiento que deseamos. Para ello vamos a hacer lo siguiente:

```javascript
// creamos una variable y la iniciamos a true
var algoliaClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_ONLY_API_KEY);

// creamos un searchClient partiendo del algoliaClient
var searchClient = {
  ...algoliaClient,
  search(requests) {
    // esta opción del searchClient es la que se ejecuta cuando
    // se hace una búsqueda. Comprobamos antes si es la primera
    // carga para evitar que haga la búsqueda
    if (firstLoad === true) {
      firstLoad = false
      return // return sin hacer nada
    }
    return algoliaClient.search(requests)
  }
}

var search = instantsearch({
  indexName: 'prod_blog_content',
  numberLocale: 'es',
  searchClient // el cliente que tiene el cambio de la config
});
```

Con esto hemos conseguido nuestro objetivo y ahora el buscador no funcionará de primeras, si no que esperará a que lo usemos para mostrar los resultados.

Este sería el resultado final:

<div style='text-align: center;'>
  <video loop style='width: 60%; height: auto;' autoplay src='https://cleanshot-cloud-fra.accelerator.net/media/6116/EUL02znNnMwBdnQlIxiO2gxxEMqI3fg6WYKb484K.mp4'>
</div>

## Precio de Algolia

Seguramente ahora te estarás preguntando por cuánto te va a salir esto. Lo cierto es que para proyectos pequeños es muy posible que no tengas que pagar nada... **Tienes disponibles hasta 10.000 búsquedas al mes y 10.000 elementos a indexar de forma totalmente gratis**. En el caso que necesites más, puedes pagar conforme vayas necesitando más. 1000 búsquedas y 1000 elementos más te saldrá por 1$ al mes.

{{< img align="center" src="/images/como-anadir-buscador-01.jpg" alt="Los precios de Algolia" >}}

Si además tu proyecto es de código abierto, [puedes optar a una licencia especial de forma totalmente gratuita](https://www.algolia.com/for-open-source/) valorada en 180$ al mes (200.000 elementos a indexar y 200.000 búsquedas al mes). No está nada mal.

## Conclusiones usando Algolia para mi búsqueda

Creo que todavía puedo mejorar bastante la búsqueda y de hecho tengo algunas ideas. Para empezar, explorando la biblioteca de Autocomplete de la misma Algolia que es más liviana que InstantSearch y que ofrece más personalización.

También quiero mejorar, no sólo el diseño, pero cómo se cargan los scripts. De forma que **sólo se carguen los scripts de Algolia** cuando realmente sean necesarios.

Pero por ahora, teniendo en cuenta que hasta hace pocas semanas no sabía absolutamente nada de este servicio, estoy bastante contento cómo ha funcionado y lo que he logrado con un par de horas de trabajo

Si te interesa darle una oportunidad, puedes [usar mi código](https://utm.io/udih1) (si usas el producto, me llevo una pequeña comisión):
[Registrarse en Algolia](https://utm.io/udih1)

Y si no, ¡sigue atento a mi blog porque seguro que seguiré contando cómo va evolucionado la cosa! ¡Gracias por leerme!