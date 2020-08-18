---
title: Crea un nuevo proyecto con Svelte 3
date: '2019-09-08'
image: '/images/crear-proyecto-con-svelte.png'
description: Aprende a crear desde cero y paso a paso tu proyecto con el framework Svelte.js con este pequeño tutorial en español. Para tener todas las dependencias y un entorno de desarrollo listo para empezar a trabajar.

toc: true
tags:
- svelte
---

Pues viendo el éxito que tuvo el [artículo sobre la introducción a Svelte.js](https://midu.dev/introducci%C3%B3n-a-svelte/), me he decidido a hacer una **serie de artículos y vídeos para explicar cómo hacer una pequeña aplicación con este framework.**

En este artículo vamos a explicar como, paso a paso, puedes conseguir crear un nuevo proyecto con Svelte y tener listo tu entorno de desarrollo para poder desarrollar tu aplicación. Si prefieres verlo en vídeo, te dejo aquí el que he hecho para [mi canal de YouTube](https://www.youtube.com/c/midudev?sub_confirmation=1):

{{< youtube id="VTkDuQ9RLVU" >}}

> ⚠️ Los **REQUISITOS** para poder seguir este tutorial es tener instalado, al menos, **Node.js 8** y **npm 5.2.**

## Creando el proyecto de Svelte.js usando degit

Lo primero que debemos hacer es ir a una terminal y ejecutar este comando. ❗**Pero no lo ejecutes todavía**, que más adelante te explico qué es cada cosa y haremos un pequeño cambio.
```bash
npx degit sveltejs/template my-svelte-project
```

Vamos a **diseccionar un poco este comando**, para que entiendas perfectamente qué está haciendo:

`npx`: Es un **comando para ejecutar paquetes de npm que ofrecen un binario**. Anteriormente teníamos que instalar de forma global estos paquetes con `npm install -g` y luego instalarlo, pero ahora este comando nos ofrece hacerlo al vuelo, solucionando muchos problemas de permisos que teníamos antes.

`degit`: Este es el paquete que `npx` instalará y ejecutará. Se trata de **un paquete que hace una copia de un repositorio de GitHub**, pero sin la carpeta `.git`. Este paquete es del mismo creador de Svelte.js, *Rich Harris*.

`sveltejs/template`: **El repositorio que queremos copiar y que nos servirá de plantilla** para nuestro proyecto. Puedes comprobar que este repositorio existe si vas a la dirección https://github.com/sveltejs/template.

`my-svelte-project`: **El nombre de nuestro proyecto**. Aquí podemos indicar el nombre de proyecto que queramos. Es importante notar que nos creará una carpeta con este nombre en el directorio desde el que hemos ejecutado el comando.

Así que, en nuestro caso, vamos a cambiar el nombre del proyecto y ejecutaremos en la terminal.

```bash
npx degit sveltejs/template search-movies
```

Ya te imaginos el tema de nuestro proyecto. Un buscador de películas. Así que en los siguientes artículos veremos las props,

Pero antes, vamos a dejar listo nuestro entorno de desarrollo. Para ello, entramos en el directorio que hemos creado y ejecutamos el comando `npm install` de la siguiente forma:

## Instala las dependencias y levanta el servidor

```bash
cd search-movies
npm install
```

Una vez la instalación haya terminado, ya podemos podemos ver los diferentes scripts que podemos ejecutar en nuestro proyecto. Para ello, ejecutamos el comando `npm run`:

```bash
npm run

Lifecycle scripts included in svelte-app:
  start
    sirv public --single

available via `npm run-script`:
  build
    rollup -c
  autobuild
    rollup -c -w
  dev
    run-p start:dev autobuild
  start:dev
    sirv public --single --dev
```

Ya podemos ver que existen diferentes scripts que podemos ejecutar en nuestro proyecto. Actualmente nos interesa especialmente uno, el modo dev, así que ejecutamos el siguiente comando `npm run dev` y, al hacerlo, nos indicará una dirección localhost en el puerto 5000 (puede ser otro, si ya tienes eso ocupado) donde podremos acceder al servidor de desarrollo.

```bash
npm run dev

  Your application is ready~! 🚀

  - Local:      http://localhost:5000

────────────────── LOGS ──────────────────

rollup v1.20.3
bundles src/main.js → public/bundle.js...
LiveReload enabled
created public/bundle.js in 145ms

[2019-09-08 14:07:43] waiting for changes...
```

Ahora, si entramos en la dirección que nos facilita, veremos un típico "Hello world" con la particularidad que, este, está hecho con Svelte.js

# Estructura de carpetas del proyecto

Si abrimos la carpeta con nuestro editor de código, podremos ver la estructura de carpetas que nos ha creado. Vamos a revisarla aquí:

`node_modules`: Donde tenemos todas las dependencias instaladas para nuestro proyecto (que hemos instalado previamente con `npm install`).
`public`: La carpeta donde están los estáticos de nuestra aplicación. La que subiremos a Internet a la hora de hacer el deploy.
`src`: Dentro se encuentra el código fuente de nuestra aplicación y contiene dos archivos. `main.js`, que es el punto de entrada de nuestra aplicación y `App.svelte` que es el componente que queremos renderizar.

## Revisando el código fuente

Vamos a revisar línea por línea para ver para qué sirven los dos ficheros que tenemos en la carpeta `src`. Empezamos con el archivo `main.js`, el punto de entrada de la app:

```javascript
// importamos el componente App
import App from './App.svelte';
// creamos una instancia de este componente
// y le pasamos un objeto como opciones
const app = new App({
	target: document.body, // le decimos dónde lo queremos renderizar
	props: { // y un objeto con los parámetros que le queremos pasar
		name: 'world'
	}
});
// esta línea devuelve la app aunque no es necesaria
export default app;
```

Ahora, veamos el archivo `App.svelte`: 
```html
<script>
    // al hacer un export de una variable,
    // indicamos que esto es un parámetro del componente
    // a estos parámetros se le conocen como "prop"
	export let name;
</script>

<!-- aquí podemos indicar los estilos de nuestro componente -->
<style>
	h1 {
		color: #09f;
	}
</style>

<!-- aquí tenemos lo que renderizará el componente
     usamos las {} para hacer una evaluación, así
     veremos el valor de name renderizado -->
<h1>Hello {name}!</h1>
```

Ahora, **si haces algun cambio a este componente** (por ejemplo, pasas de "Hello" a "Hola") y **guardas los cambios, verás que la web que habías abierto en `http://localhost:5000` se ha actualizado automáticamente** y refleja la nueva frase que has guardado. Esto es porque ya viene preparado para hacer Live Reloading, de forma que no tengamos que refrescar nosotros a mano la pestaña. 

## Instala la extensión para tu editor favorito

Seguramente, al entrar al archivo `App.svelte` hayas notado que se ve todo el texto sin formatear, como si no soportase ese lenguaje. Para que vuestro editor pueda ayudaros a desarrollar en Svelte.js debéis instalar alguna extensión.

**Si estáis usando, como yo, Visual Studio Code**, entonces tenéis que instalar la extensión [`svelte`](https://marketplace.visualstudio.com/items?itemName=JamesBirtles.svelte-vscode) que da soporte a la sintaxis, además de hacer diagnósticos y dar información interesante al hacer hover sobre nuestras líneas de código: https://marketplace.visualstudio.com/items?itemName=JamesBirtles.svelte-vscode

**Para el editor Atom,** podéis instalar la extensión [`ide-svelte`](https://atom.io/packages/ide-svelte) que ofrece exactamente lo mismo que el de *Visual Studio Code.*

## Conclusiones

Con esto ya tenemos todo nuestro entorno de desarrollo preparado para trabajar con Svelte. A partir de aquí, en los siguientes artículos, veremos cómo podemos trabajar con las *props*, el *estado*, *efectos*, *ciclo de vida*, *eventos* y qué nos ofrece el lenguaje de plantillas de este framework a la hora de recorrer los elementos. **¡No te lo pierdas!**