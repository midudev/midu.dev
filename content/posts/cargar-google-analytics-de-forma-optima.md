---
title: La mejor forma de cargar Google Analytics en tu web para performance
date: '2018-12-10'
image: '/images/analytics.png'
description: 'Muchas veces vamos a querer cargar Google Analytics en nuestra página web pero nos gustaría evitar el coste en performance que tiene. Te voy a explicar la mejor estrategia para cargar esta librería afectando lo mínimo posible la performance.'
topic: performance
toc: true
tags:
- performance
---

Cargar Google Analytics tiene, lo quieras o no, un impacto en la performance de tu página web. **No es la peor librería de terceros para añadir en tu web** (¡Hola Optimizely 🤪!) porque, en ese aspecto, Google tiene cierta sensibilidad en hacer que tu web cargue rápido pero... **eso no significa que siempre nos vaya a proporcionar la mejor opción**. Por defecto Google nos ofrece un código que puede ser interesante si estamos pensando en usar otros productos de la compañía pero podemos hacer algunas mejoras o... directamente usar otro.

Pero empecemos por el principio, si vamos a las `opciones de nuestra propiedad -> Información de Seguimiento -> Código de seguimiento`, allí nos recomendará el siguiente trozo de código para implementar en nuestra web para activar el seguimiento de Google Analytics:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-XXXXXXXX-X');
</script>
```

Lo que normalmente hacemos con este trozo de código es copiarlo en algún lugar de nuestra página y hacerlo funcionar. Veamos algunas pequeñas mejoras que podemos hacer al respecto.

### Mejor en el &lt;head> y en el orden correcto

El mejor lugar donde cargar el snippet es en el `<head>`. Al ser un script asíncrono, esto hará que la carga del script no bloquee otros recursos, ni tampoco el parseo del HTML y que, sólo al descargarlo, pausará el parseo del HTML para ejecutarlo.

**Por otra parte, podemos intentar mejorar sensiblemente el orden de carga.** Para ello vamos a dividir el snippet en dos partes. La primera, el script en línea que inicializa el script y, por otra, la carga del script asíncrono. El primero lo colocaremos antes de nuestros estilos (tanto en línea como externos, si los tuvieramos) mientras que el segundo lo pondremos después.

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXX-X');
</script>
<link rel="stylesheet" href="style.css" />
<style>/* critical-css */</style>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>
```

**El CSS es un recurso crítico y tiene la prioridad más alta de carga,** ya que el navegador considera que es crucial para poder pintar la página y enseñársela al usuario. Parsear el script en línea tiene un coste minúsculo y de esta forma no bloquearemos nada. Más adelante haré un artículo explicando esto pero, por ahora, probad si esto os funciona. 😉

Al final, el resultado sería este:
{{< img src="https://i.loli.net/2018/12/10/5c0e428ad3ee6.png" alt="Resultado tras aplicar Google Tag Manager para cargar Google Analytics" align="">}}

Como véis, para el primer recurso hay una barra lila enorme. Eso ha sido la negociación de los certificados SSL y ha evitado que pudieramos empezar a trackear con Google Analytics antes. ¿Podemos hacer algo para mejorarlo 🤔?

### Ayuda al navegador a cargar más rápido los recursos

Ya que sabemos que nuestro snippet va a cargar unos recursos en concreto, podemos ayudar a nuestro navegador a cargarlos cuanto antes. Para ello vamos a usar los Resource Hints (sugerencia de recursos):

`preconnect`: informa al usuario que vas a hacer una conexión con otro origen, de forma que te gustaría comenzarla lo antes posible. Esto hará que el navegador haga la conexión con el dominio antes, ahorrando más adelante la conexión DNS, redirecciones y la negociación de los recursos.

`dns-prefetch`: es una parte de lo que hace preconnect, la resolución del nombre del sistema de nombres de dominio. Por lo tanto es menos potente pero, sin embargo, tiene un soporte mayor, así que también lo usaremos y el navegador ya detectará cuál es más ventajosa.

```html
<link rel="preconnect dns-prefetch" href="https://www.googletagmanager.com">
<link rel="preconnect dns-prefetch" href="https://www.google-analytics.com">
```

Estas líneas pueden ir sin ningún problema después de las líneas anteriores, ya que el navegador las detectará al descargar el archivo HTML y lo usará incluso antes de empezar a descargar los recursos.

Por otra parte, **existe una mala práctica en este caso que sería usar `preload` para indicarle al navegador que debe precargar los recursos de Analytics.** Aunque es cierto que sí vamos a cargar sí o sí esos recursos, también es verdad que seguramente tengamos recursos mucho más importantes que las analíticas, que al fin y al cabo no le dan valor al usuario, que precargar. Así que piénsatelo antes de usarlo.

En cualquier caso, tras usar el consejo de esta sección, la carga quedaría de la siguiente forma:

{{< img src="https://i.loli.net/2018/12/10/5c0e46e5a37c0.png" alt="Con preconnect y prefetch, hemos mejorado algo la carga de los recursos" align="">}}

### Cargar Google Analytics directamente

**¿Es Google Analytics el único servicio de Google que estás usando en tu página?** ¿Eres desarrollador o tienes acceso rápido y directo al equipo para añadir los eventos que necesitas? **Entonces, seguramente, no necesitas utilizar el snippet que te ha proporcionado Google.**

Como comentaba antes, el snippet que por defecto te da Google es sencillo y te permite copiar, pegar y empezar a funcionar. Sin embargo, todavía puedes utilizar directamente Google Analytics sin necesidad de cargar el archivo `gtag.js` y de esta forma conseguir una mejora importante a la hora de cargar la librería.

```html
<script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-XXXXXXXX-X', 'auto');
  ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js' />
```

Igual que en el anterior, también podemos hacer un preconnect y un dns-prefetch de los recursos, además de optimizar el orden de carga, de forma que nos quedaría algo así:

```html
<link rel="preconnect dns-prefetch" href="https://www.google-analytics.com">
<script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-XXXXXXXX-X', 'auto');
  ga('send', 'pageview');
</script>
<style> /* critical-css */ </style>
<script async src='https://www.google-analytics.com/analytics.js' />
```

Como podéis ver, **ahora solo tenemos que hacer preconnect y prefetch de un solo recurso**. Y ahí ya tenemos una pista de la gran ventaja que tiene este método y es que, en el caso anterior debíamos hacer dos requests para poder empezar a usar Google Analytics mientras que en este método sólo tendremos que hacer una. ¿Y cómo quedaría esto? Una request menos, 31.5KB menos de descarga y casi 100ms más rápido empezar a hacer tracking en desktop.

{{< img src="https://i.loli.net/2018/12/10/5c0e47d8b3ae8.png" alt="Cargando sólo Google Analytcs, mejoramos en 100ms la carga en desktop" align="">}}

### Usar el minimal Google Analytics

Existe todavía una opción todavía más hardcore para conseguir utilizar Google Analytics con un impacto mínimo en la performance de tu página. Se llama [Minimal Google Analytics](https://minimalanalytics.com/) y es un pequeño snippet de código que te hace que no tengas que cargar **ninguna librería externa para utilizar Google Analytics**. Sí, has leído bien, puedes utilizar un pequeño script en línea para poder utilizar algunas funcionalidades de Google Analytics.

El snippet, que **son sin gzipear 1.5KB**, es este:

```html
<script>
  (function(a,b,c){var d=a.history,e=document,f=navigator||{},g=localStorage,
  h=encodeURIComponent,i=d.pushState,k=function(){return Math.random().toString(36)},
  l=function(){return g.cid||(g.cid=k()),g.cid},m=function(r){var s=[];for(var t in r)
  r.hasOwnProperty(t)&&void 0!==r[t]&&s.push(h(t)+"="+h(r[t]));return s.join("&")},
  n=function(r,s,t,u,v,w,x){var z="https://www.google-analytics.com/collect",
  A=m({v:"1",ds:"web",aip:c.anonymizeIp?1:void 0,tid:b,cid:l(),t:r||"pageview",
  sd:c.colorDepth&&screen.colorDepth?screen.colorDepth+"-bits":void 0,dr:e.referrer||
  void 0,dt:e.title,dl:e.location.origin+e.location.pathname+e.location.search,ul:c.language?
  (f.language||"").toLowerCase():void 0,de:c.characterSet?e.characterSet:void 0,
  sr:c.screenSize?(a.screen||{}).width+"x"+(a.screen||{}).height:void 0,vp:c.screenSize&&
  a.visualViewport?(a.visualViewport||{}).width+"x"+(a.visualViewport||{}).height:void 0,
  ec:s||void 0,ea:t||void 0,el:u||void 0,ev:v||void 0,exd:w||void 0,exf:"undefined"!=typeof x&&
  !1==!!x?0:void 0});if(f.sendBeacon)f.sendBeacon(z,A);else{var y=new XMLHttpRequest;
  y.open("POST",z,!0),y.send(A)}};d.pushState=function(r){return"function"==typeof d.onpushstate&&
  d.onpushstate({state:r}),setTimeout(n,c.delay||10),i.apply(d,arguments)},n(),
  a.ma={trackEvent:function o(r,s,t,u){return n("event",r,s,t,u)},
  trackException:function q(r,s){return n("exception",null,null,null,null,r,s)}}})
  (window,"UA-XXXXXXXXX-X",{anonymizeIp:true,colorDepth:true,characterSet:true,screenSize:true,language:true});
</script>
```

Como véis, tenéis que cambiar el `UA-XXXXXXXXX-X` por vuestro tracking id.

Las ventajas, como os podéis imaginar, es que con esto tendremos una request menos y no descargaremos los ~17KB de la librería de Google Analytics. Pero tiene tres desventajas:

- **Este snippet no está soportado oficialmente por Google.** Esto significa que, eventualmente, es posible que las opciones de Google Analytics o la API de `collect` pueda cambiar y esto deje de funcionar correctamente. Cargar la librería nos asegura que usaremos siempre la última versión y Google se encargará por nosotros de mantener la compatibilidad.
- No nos permite utilizar algunas funcionalidades avanzadas como, por ejemplo, trackear Adwords aunque sí podemos enviar eventos y excepciones con el siguiente código.

```javascript
ma.trackEvent('Category', 'Action', 'Label', 'Value') // event
ma.trackException('Description', 'Fatal') // exception
```

Además, tened en cuenta que, por buenas razones, utiliza el flag `anonymizeIp` por defecto. De forma que todas las IPs de tus usuarios permanecen anónimas dentro de tu web.

En este caso, todavía, recomiendo dejar `preconnect ` y `dns-prefetch` para el dominio de `https://www.google-analytics.com` 

Pero lo interesante, que me imagino que lo estáis esperando, es la imagen de network que nos queda. **0 requests de librerías externas, 17KB menos a descargar y unos cuantos ms menos hasta el pageview.**

{{< img src="https://i.loli.net/2018/12/17/5c168d8406716.png" alt="Usar Google Minimal Analytcs nos permite no hacer requests de librerías para empezar a usar el tracking" align="">}}

## Resumiendo las opciones

### Usa analytics.js si...

✅ sólo te interesa cargar Google Analytics.<br />
✅ puedes añadir eventos o funnels en Analytics directamente en el código.<br />
✅ eres exigente con la performance de tu web y quieres cargar lo normal.<br />
✅ todavía te interesa utilizar algunas funcionalidades especiales de Analytics como tracking con Adwords.

### Usa gtag.js si...

✅ vas a usar otros productos de Google como Optimize o Adwords.<br />
✅ quieres usar otras funcionalidades de Google Tag Manager.<br />
✅ necesitas publicar muchos cambios de eventos de Google Analytics sin necesidad de desarrolladores.<br />

✅ la performance no te quita el sueño (por más que debería! 🤪)

### Usa minimal Google Analytics snippet

✅ sólo quieres utilizar lo más básico de Google Analytics.<br />
✅sabes lo que estás haciendo al cargar este script en línea y aceptas no usar algo oficial de Google para trackear tu página. <br />
✅eres MUY exigente (como yo! 🙃) con la performance de tu página.

### Y uses el que uses...

✅ coloca en el `<head>` el snippet de código.<br />
✅ separa el snippet para colocar el código en línea antes de tus estilos y el otro después (en el caso del minimal GA, siempre antes).<br />
✅ usa preconnect y dns-prefetch para cargar cuanto antes la librería o las conexiones necesarias.

## Bonus points 🌟!

Si todavía quieres ir más allá, **puedes usar Service Workers para conseguir dos cosas**: sincronizar el tracking cuando la conexión del usuario no es muy buena y para cachear la request a ga.js. Esto es especialmente interesante si estás creando una aplicación o web que debería funcionar en modo sin conexión.

**Para activar Google Analytics de forma offline**, sólo tenéis que usar el siguiente código en vuestro Service Worker, gracias a workbox:

```javascript
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

// este register route sólo en el caso de querer usar analytics.js o gtag.js
workbox.routing.registerRoute(
  'https://www.google-analytics.com/analytics.js',
  workbox.strategies.staleWhileRevalidate()
)

workbox.googleAnalytics.initialize();
```
