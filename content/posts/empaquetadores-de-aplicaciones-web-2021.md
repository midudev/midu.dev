---
title: "Los empaquetadores de aplicaciones web para 2021 \U0001F4E6"
date: '2020-12-18'
description: >-
  ¿Existen alternativas a Webpack y Rollup? ¡Sí! Y algunas MUY interesantes.
  Conoce los mejores empaquetadores de apps web del momento.
toc: true
tags:
  - webpack
image: /images/og/empaquetadores-de-aplicaciones-web-2021.png
---

Actualmente **Webpack**, y en menor medida **Rollup** y **Parcel**, son los favoritos a la hora de empaquetar nuestras aplicaciones web. Pero esta tendencia puede que este año 2021 empiece a cambiar gracias a la irrupción de nuevas alternativas que ofrecen más velocidad, sencillez y menos dependencias. ¡Conócelas!

## esbuild, la anternativa rápida a Webpack 📦

Nacido en 2020, **esbuild** es un empaquetador de aplicaciones web que está **escrito en Go**. Esto hace que sea hasta **100 veces más rápido que Webpack o Rollup.**

Además trae soporte para Typescript, transformaciones a lo Babel de Javascript, soporte a la sintaxis JSX, minificación, source maps y tree shaking... **¡sin configuración ni dependencias!**

Para instalar `esbuild` sólo tenéis que ejecutar en vuestro proyecto:
```
npm install esbuild
```

A partir de aquí podéis usar directamente la línea de comandos. Por ejemplo, para empaquetar una aplicación que tiene como punto de entrada un archivo `app.js`y que queremos empaquetarlo en un archivo `bundle.js` sería así:
```
esbuild app.js --bundle --outfile=bundle.js
```

También se puede usar la API de Javascript que ofrece una forma de usar `esbuild` de forma programática:

```js
require('esbuild').build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
}).catch(() => process.exit(1))
```

Seguramente esta última sería la forma ideal para proyectos que van creciendo. Además así se puede envolver con [chokidar](https://github.com/paulmillr/chokidar) para hacer que se vuelva a ejecutar el bundelizado cada vez que los archivos cambian.

Si te interesa saber más sobre **esbuild**, hice un vídeo para aprenderlo desde cero.
{{< youtube id="EVoqj6bhMlk" >}}

[🔗 Documentación de esbuild](https://esbuild.github.io/getting-started/#build-scripts)

## vite, sencillo y optimizado 🟢

De la mano **del creador de Vue.js**, Evan You, llega **vite**. La apuesta de este empaquetador es usar ES Modules de forma que en modo desarrollo funciona de forma nativa, y super rápida, mientras que en producción se empaqueta con Rollup.

Como curiosidad, **vite utiliza para ciertas operaciones también esbuild** (para la compilación de Typescript, por ejemplo)... por lo que viendo que usa Rollup y esbuild, podríamos decir que vite es como una implementación subjetiva de un conjunto de herramientas para empaquetar tu aplicación. Que tampoco está nada mal.

Especialmente recomendado para proyectos con Vue.js, puedes iniciar uno fácilmente así:
```
npm init vite-app nombre-de-tu-proyecto
cd nombre-de-tu-proyecto
npm install
```

Con esto ya te creará una carpeta con todo listo para funcionar y unos archivos para que empieces con Vue.js.

[🔗 Documentación de vite](https://esbuild.github.io/getting-started/)

## WMR, todo lo que necesitas en un archivo de sólo 2MB 🗜

Jason Miller siempre sorprende. **El creador de Preact**, la alternativa rápida y pequeña de React, ha lanzado una minúscula herramienta de desarrollo de aplicaciones web **en un sólo archivo de 2MB.**

Se llama `WMR` y en esos 2MB **trae soporte para TypeScript, JSX, CSS Modules**, soporte a HTTP2, soporte a plugins de Rollup, Hot Reloading y muchas cosas más.

```
npm init wmr nombre-de-tu-proyecto
```

Como Parcel, WMR usa como punto de entrada de la aplicación un `index.html` por lo que tendrás que crearlo en la ruta `public/index.html`. Un ejemplo sería:

```
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="/style.css" />
	</head>
	<body>
		<script type="module" src="/index.js"></script>
	</body>
</html>
```

Además, puedes usar paquetes con `npm` e importarlos sin necesidad de instalarlos. WMR se ocupa de importarlos correctamente sin que tengas que encargarte de nada.

[🔗 Documentación de WMR](https://github.com/preactjs/wmr)

## Snowpack, diseñado para la web moderna 🚀

**Snowpack fue de los primeros** en señalar el camino a unos empaquetadores que apostasen totalmente por la plataforma. Apoyándose en los ESModules, Snowpack presume de tener una instalación casi inexistente, un modo desarrollo inmediato y un montón de plugins que le otorgan soporte a todos y cada uno de los frameworks más usados actualmente, como **React, Angular, Preact, Vue.js y Svelte**.

Además añade Fast Refresh lo que hace que nuestra página no se actualice en cada cambio si no que lo hace el componente en concreto, aumentado la velocidad de desarrollo en nuestras aplicaciones.

Lo puedes instalar fácilmente con:

```
npm install --save-dev snowpack
```

Y a partir de ahí **usar el CLI **para ejecutar el modo desarrollo o para empaquetar tu aplicación. Lo mejor es añadirte unos scripts en tu `package.json` para llamarlos fácilmente cuando los necesites:

```json
"scripts": {
    "start": "snowpack dev",
    "build": "snowpack build"
}
```

Igual que Parcel y WMR, necesitas tener un archivo `index.html`. Por defecto, en el caso de Snowpack, lo busca en la raíz del proyecto. ¡Y con esto ya lo tendríamos funcionando!

En el caso de **Snowpack**, como otros empaquetadores que hemos visto como **WMR**, se basan en usar dependencias ES Modules, por lo que lo mejor es usar [skypack.dev](https://www.skypack.dev/) (del creador de Snowpack) para buscar paquetes de npm optimizados para ser usados e instalados sin necesidad de usar una herramienta de bundelizado (que pueden ser consumidos directamente a través de un navegador).

¿Por qué? Porque como hemos visto, en modo desarrollo funciona de forma nativa con ES Modules, de forma que **no va a hacer ninguna transformación de ningún tipo a tu código.** Tenlo en cuenta.

## Conclusiones

Pues aquí mis cuatro favoritos de cara a 2021. Hay otras opciones como [swc](https://github.com/swc-project/swc) o [brunch](https://brunch.io/) pero he querido enfocarme en estos que, en mi opinión, son los más prometedores por diferentes cuestiones.

También, por supuesto, **creo que en 2021 todavía Webpack va a tener un papel principal en el desarrollo web.** Es difícil que, de repente, Webpack deje de ser el rey después de tanto tiempo pero, lo cierto, es que muchos frameworks ya están optando por Rollup, la alternativa a Webpack. Es el caso de Svelte, Vue.js y Angular.

El tema es que React sigue siendo, y no creo que tampoco cambie el próximo año, la biblioteca más extendida y hay que tener en cuenta que tanto como *Next.js* como *create-react-app* utilizan *Webpack* por debajo para ser usados. **¿Sería posible ver Next.js con esbuild?** Pues no lo descarto para nada... de hecho, viendo los tiempos que ofrece, quién sabe si cuando esté algo más maduro...
