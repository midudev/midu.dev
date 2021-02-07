---
title: Curso gratis de ReactJS 2020 con clases en vivo
date: '2020-05-17'
image: '/images/curso-gratis-react-2020.jpg'
description: Aprende qué es React, crea una aplicación desde cero, crea tus propios hooks y añade infinite scroll y testing con estas clases en vivo gratis.
toc: true
tags:
- react
---

Aprende qué es React, crea una aplicación desde cero, crea tus propios hooks y añade infinite scroll y testing con estas clases. Lo enseñamos desde cero y te explicamos por qué lo necesitas y deberías aprenderlo. 👇

<a href='https://midu.tube' target='_blank'>
{{< img align="center" src="/images/youtube-suscribirme.png" >}}
</a>

### Aprendiendo React desde cero
{{< youtube id="T_j60n1zgu0" >}}
{{< subscribe-to-youtube >}}

En esta clase aprendemos React desde cero y respondamos a las preguntas: **¿Qué es React? ¿Por qué deberías aprenderlo?** ¿Por qué lo necesitamos? ¿Qué es JSX?

También vemos **qué son las props y state**. Definimos el concepto de componente y vemos cómo usar eventos. Cómo funciona el renderizado condicional y usamos un hook, `useState` para añadir estado a nuestros componentes.

### Crea un app con create-react-app
{{< youtube id="QBLbXgeXMU8" >}}
{{< subscribe-to-youtube >}}

Ahora que **ya conocemos los conceptos básicos de React**, es el momento de **crear nuestra primera aplicación con todo lo aprendido.** En esta clase conocemos la herramienta `create-react-app` que nos permite crear desde cero una aplicación y nos permite no tener que preocuparnos por la configuración. Así empezaremos a crear nuestra aplicación para buscar gifs.

También vemos más hooks, como `useEffect` para ejecutar código cada vez que nuestro componentes se renderiza o sus dependencias cambian. Además también hacemos las primeras llamadas a una API y vemos cómo lo podemos gestionar.

### Custom Hooks y React Context
{{< youtube id="2qgs7buSnHQ" >}}
{{< subscribe-to-youtube >}}

**Subimos de nivel con los hooks.** En esta clase vemos cómo podemos crear nuestro propio hook para reutilizar parte de la lógica a la hora de buscar Gifs. También vemos cómo podemos manejar un formulario para escuchar sus eventos y por qué es una buena práctica utilizar el `onSubmit` y evitar escuchar simplemente el `onClick` de un botón.

Además conocemos **React Context, una funcionalidad de la biblioteca que nos permite compartir información entre componentes sin que le lleguen por las props.** Esto, además, nos permitirá crear una especie de estado global. Hablamos de las buenas prácticas sobre esto y cómo podemos conseguirlo.

### Lazy Load, Suspense y Paginación
{{< youtube id="VcxXipZg1-0" >}}
{{< subscribe-to-youtube >}}

**Para mejorar el rendimiento de nuestro sitio conocemos el concepto de Lazy Load** y cómo podemos hacer que nuestra aplicación se separe en `chunks`. Estos `chunks` o `pedazos` de la app se descargarán solo cuando sea necesario. Lo hacemos con una nueva sección que en móvil no aparece de forma que lo cargaremos sólo cuando hagamos scroll. Para ello creamos un nuevo hook llamado `useNearScreen`.

Para hacerlo descubrimos `React.lazy`, que nos permite cargar dinámicamente nuestros componentes. Sin embargo, veremos que esto no funciona tal cuál si no que tenemos que envolver el componentente que se carga de forma diferida con un componente de React llamado `<Suspense>` y que nos permite indicarle un `fallback`, un elemento que se renderizará mientras se carga el nuevo.

Además, **añadimos paginación** a nuestra aplicación, para poder ver más gifs.

### CSS Grid, Infinite Scroll y Testing
{{< youtube id="oCHdFiCgOSE" >}}
{{< subscribe-to-youtube >}}

Cuando hicmos la paginación, vimos que no se estaban añadiendo correctamente los resultados. Así que en esta clase **mejoramos el layout de nuestra app utilizando **CSS Grid**** y vemos cómo podríamos hacer un diseño `masonry` (por ahora **sólo con Firefox Nightly pero... es un momento WOW!** 🤩).

Además, conseguimos **reusar el hook `useNearScreen` para añadirle Infinite Scroll** a nuestra aplicación y vemos los problemas que nos podemos encontrar y cómo solucionarlo con `useCallback` y usando la función `debounce`.

Finalmente, empezaremos a ver algo de testing con `Jest` y `@testing-library/react`. Además de algún test muy básico, también veremos cómo podemos probar **componentes que se cargan de forma asíncrona.**

### React.memo, mejora el rendimiento de la app y Deploy con Vercel
{{< youtube id="Wo7_OVtu1ls" >}}
{{< subscribe-to-youtube >}}

Ahora es el momento de **optimizar nuestra aplicación**. Para ello, aprenderemos qué son las **React Developer Tools** y cómo podemos sacarle partido para detectar renderizados innecesarios en nuestra aplicación. También aprendemos qué es `React.memo` y cómo podemos usarlo para arreglar esos problemas de optimización.

Finalmente, haremos un **deploy desde la terminal gracias a los servicios gratuitos de Vercel**, que nos ofrecerá SSL y una URL para compartir con nuestros colegas.

### SEO con React y Deploy Integrado con GitHub
{{< youtube id="b-pwpHaYOTI" >}}
{{< subscribe-to-youtube >}}

En esta clase vamos a preparar la app para que los crawlers, como el de Google, puedan encontrar nuestra aplicación es super importante. Por ello, **añadiremos títulos y descripciones** gracias, primero, a **crear nuestro propio Hook de SEO** que lo haga y, luego, viendo `react-helmet`.

Además, también **vamos a preparar nuestro repositorio para tener Continuous Deployment.** De forma que cada vez que hagamos un merge a master con cambios de código, tengamos una nueva versión desplegada en Internet.

### useReducer y testing de React Hooks
{{< youtube id="Wjy_nlYXTik" >}}
{{< subscribe-to-youtube >}}

Ahora que ya tenemos nuestra aplicación de **React ⚛️** desplegada en producción, es el momento de subir nuestra aplicación de nivel. Para ello vamos a entender cómo usar el hook `useReducer` que nos permite tener un estado en nuestra aplicación y actualizarlo de una forma mucho más limpia y sencilla, especialmente para estados grandes.

Además, viendo que esto de los hooks se va complicando, veremos cómo podemos hacer testing de los **Custom Hooks** que vamos creando gracias a la librería **React Hooks Testing Library**.

### Inicio de sesión y gestión de favoritos del usuario
{{< youtube id="VT5S9Y49SYs" >}}
{{< subscribe-to-youtube >}}

Ahora es el momento de utilizar una **API para poder loguear a nuestros usuarios.** Para ello he creado una **API en Deno 🦕** que nos permitirá iniciar sesión, registrar al usuario y que estos puedan gestionar sus favoritos.

En esta clase vemos como podemos iniciar sesión, creamos un estado global con el contexto, un hook para poder consumirlo y guardar la sesión del usuario (gracias a un Javascript Web Token) usando **SessionStorage**.

### Registro de usuario con Formik y React.createPortal

En esta clase vamos a ver cómo podemos usar **Formik** para gestionar nuestros usuarios y **createPortal** para poder renderizar fuera del árbol de elementos un componente hijo en React.

{{< youtube id="dtbI6gDnTFU" >}}
{{< subscribe-to-youtube >}}

### CSS en JS y Styled Components con Emotion

Y la última clase, donde veremos cómo podemos añadir **CSS en JS** en nuestra aplicación gracias a **Emotion**. Veremos los dos sabores: *CSS-en-JS clásico* y uno basado en *styled components*:

{{< youtube id="DjVGdUM1dHQ" >}}
{{< subscribe-to-youtube >}}

<a href='https://midu.tube' target='_blank'>
{{< img alt="Suscríbete para no perderte los próximos vídeos sobre desarrollo web y full stack"  align="center" src="/images/youtube-suscribirme.png" >}}
</a>
