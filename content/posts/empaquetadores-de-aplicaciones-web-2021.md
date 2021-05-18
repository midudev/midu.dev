---
title: "Las alternativas de Webpack, empaquetadores de aplicaciones web para 2021 \U0001F4E6"
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

## esbuild, la alternativa rápida a Webpack 📦

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

```javascript
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

[🔗 Documentación de vite](https://vitejs.dev/)

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

## ¿Adiós Webpack? 👋 📦

**Creo que en 2021 todavía Webpack va a tener un papel principal en el desarrollo web.** Es difícil que, de repente, Webpack deje de ser el rey después de tanto tiempo pero, lo cierto, es que muchos frameworks ya están optando por Rollup, la alternativa a Webpack. Es el caso de Svelte, Vue.js y Angular.

El tema es que React sigue siendo, y no creo que tampoco cambie el próximo año, la biblioteca más extendida y hay que tener en cuenta que tanto como *Next.js* como *create-react-app* utilizan *Webpack* por debajo para ser usados. **¿Sería posible ver Next.js con esbuild?** Pues no lo descarto para nada... de hecho, viendo los tiempos que ofrece, quién sabe si cuando esté algo más maduro...

Pero en este artículo he querido destacar mis cuatro favoritos de cara a 2021. Hay otras opciones como [swc](https://github.com/swc-project/swc) o [brunch](https://brunch.io/) pero he querido enfocarme en estos que, en mi opinión, son los más prometedores, cada uno por un motivo distinto. ¡Espero que te hayan gustado y te animes a probarlos!

Y si te gusta Instagram, aquí te dejo la pieza que he hecho para hablar de ellos 👇

<div style='display: flex; justify-content: center; align-items: center; text-align: center'>
<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/CI8ee4BgDcw/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="13" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/CI8ee4BgDcw/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> Ver esta publicación en Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/CI8ee4BgDcw/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Una publicación compartida por midudev | Programador frontend (@midu.dev)</a></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script></div>
