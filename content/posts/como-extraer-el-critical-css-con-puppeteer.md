---
title: Cómo extraer el Critical Path CSS con Puppeteer, Code Coverage y en sólo 20 líneas de código
date: '2019-02-21'
image: '/images/critical-path-css-20-lines-of-code.jpg'
description: 'Gracias a la potencia de Puppeeteer y usando el Code Coverage de las Chrome Developer Tools, podemos extraer muy fácilmente el CSS crítico de nuestro site'
topic: performance

tags:
- performance
---

El Critical Path de una web, o en castellano, **la ruta crítica es la secuencia mínima que una página tiene que seguir para poder hacer su primer pintado.** ¿Y por qué es importante? Porque según la longitud de ese camino crítico, el usuario verá más tarde la página web.

{{< youtube id="GIYp3qG1520" >}}

Por eso, a la hora de hacer optimizaciones a la performance de nuestro site, uno de los objetivos principales será **minimizar al máximo el número de recursos** o solicitudes que tenemos que hacer **para poder realizar el primer renderizado de nuestra página.**

No en vano [Lighthouse](https://developers.google.com/web/tools/lighthouse/?hl=es), la referencia de Google para tomar métricas de performance sobre la experiencia del usuario, tiene muy presente esto y una de sus comprobaciones es, precisamente, averiguar los pasos necesarios para renderizar la página del usuario. En el informe genera un diagrama como este:

```
Initial navigation
|---es/ (fotocasa.es)
    |---css/styles.css (cdn.fotocasa.es) - 1147.25ms, 70.77KB
    |---css/more-styles.css (cdn.fotocasa.es) - 1155.12ms, 71.20KB
    |---2.2.0/jquery.min.js (ajax.googleapis.com) - 2699.55ms, 99.92KB
    |---images/logo.jpg (cdn.fotocasa.es) - 3200.39ms, 73.59KB
```

### ¿Por qué el CSS bloquea el renderizado de nuestra página?

Como véis, **el CSS es un recurso que bloquea el renderizado de nuestra página.** Del propio HTML lo podríamos esperar ya que, sin él, no podríamos tener el DOM montado pero... ¿del CSS?

**La explicación es que una página no puede ser renderizada si no ha construido el árbol de renderizado.** Y el árbol de renderizado está compuesto por HTML y el CSSOM (una especie de DOM para CSS). Imaginad que no lo hiciese. No sólo **veríamos siempre nuestras páginas sin estilos para, de repente, aparecer bien pintada**, si no que podría incurrir en problemas en nuestro Javascript ya que los cálculos de dónde se encuentran nuestros elementos y cuanto ocupan podrían no ser correctos.

Por ello, el navegador por defecto descarga los recursos CSS de forma síncrona y bloqueando el renderizado de nuestras páginas pero, nosotros, podríamos forzar a que se cargase de forma asíncrona. Al hacerlo, **incurriríamos en el problema de mostrar nuestra página sin estilar y, de repente, mostrarla con los estilos y os puedo asegurar que el efecto es bastante incómodo para el usuario.**

{{< img src="/images/css-sin-estilos-con-estilos.jpg" alt="A la izquierda, Fotocasa sin estilos. A la derecha, con los estilos cargados" align="center">}}

Una de las formas de solucionar esto meter los estílos críticos de tu página en línea, dentro de unas etiquetas `<style>`. Los estilos críticos serían los que el usuario ve nada más entrar en tu sitio y deberían ser mucho menos que los que realmente estás cargando para poder mostrarle la página al usuario. Chrome tiene una herramienta llamada Code Coverage que puede ayudarte a visualizar cuanto CSS estás cargando respecto al que realmente necesita el usuario para renderizar la parte crítica.

{{< img src="/images/critical-path-css-20-lines-of-code.jpg" alt="Con Code Coverage podemos ver en las dos primeras líneas que apenas usamos el 30% de cada fichero CSS. La parte en verde sería nuestro CSS crítico">}}

El problema de extraer el CSS crítico de nuestra página son varios:
1. Es complicado hacer esto manualmente...
2. y es más complicado hacerlo para las diferentes rutas de nuestra página que necesitan un CSS distinto.

## Extraer el CSS crítico con Puppeteer

El otro día, estábamos hablando en el equipo de **Enablers Frontend de Schibsted Spain**, cómo podríamos extraer el CSS crítico de nuestras páginas web. [Básandonos en la solución de Extract CSS de Bart Veneman](https://github.com/bartveneman/extract-css) y el [ejemplo de GoogleChromeLabs sobre Code Coverage](https://github.com/GoogleChromeLabs/puppeteer-examples/blob/master/code_coverage.js) pudimos crear una forma muy sencilla de extraer el CSS crítico de cualquier página. ¡Vamos a hacerlo!

**Requisitos:** Tener instalada la última versión de [node y npm](https://nodejs.org/es/). Conexión a Internet 🌎.

Primero vamos a la carpeta donde queremos crear el proyecto y lo inicializamos sin que nos haga preguntas utilizando el comando `npm init -y`. Esto nos debe haber creado un archivo `package.json` en la misma carpeta.

Como dependencia de nuestro proyecto sólo tendremos **Puppeteer**. Si no lo conoces, es una librería de Google que nos proporciona una API a muy alto nivel para poder controlar un navegador Chrome de forma programática. Para instalarla ejecutaremos el comando `npm install puppeteer`.

Ahora, creamos el archivo `index.js` en la misma carpeta con nuestro editor favorito.

Lo primero que hacemos es requerir la dependencia:

```javascript
const puppeteer = require('puppeteer')
```

Ahora, vamos a crear una forma bastante rudimentaria de hacer que podamos utilizar diferentes URLs con nuestro programa utilizando las variables de entorno:

```javascript
const URL = process.env.URL || 'https://www.fotocasa.es'
```

¡Empieza la magia 🎩✨!. **La API de Puppeteer es totalmente asíncrona y basada en *Promises***, por lo que vamos a crear una IIFE (función que se invoca inmediatamente) que nos permita poder utilizar `async/await` en nuestro código y mejorar la legibilidad del mismo.

Dentro, lo que vamos a hacer es; **primero, crear una instancia de un navegador.** Le pasaremos como opciones que lo queremos headless, para que no nos abra la ventana visual del navegador. Y, en ese navegador, abriremos una página donde luego iremos a la URL.

```javascript
;(async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  // ...
})()
```

**Puppeteer también nos permite controlar y acceder a muchas funciones de las Chrome Developer Tools.** Hay una en concreto que nos va a servir en nuestro caso. Se trata del **Code Coverage**, una función que nos indica qué tanto por ciento de código Javascript y CSS estamos usando en nuestra página. Así que lo primero que haremos será abrir esta herramienta con `page.coverage.startCSSCoverage()`.

Después, **le indicaremos a la página que queremos navegar a nuestra URL.** Aquí podemos indicarle en qué punto consideramos que la página está cargada usando la propiedad `waitUntil`. En este caso vamos a asegurarnos que la página está suficientemente cargada usando el evento `load`. **Esto hará que el script tarde algún segundo más** pero puede valer la pena.

Una vez termine la navegación, lo que haremos es **parar el coverage que hemos iniciializiado anteriormente** utilizando el método `stopCSSCoverage`. Esto **nos devolverá valiosa información** que, más adelante, trataremos para recuperar el CSS crítico de nuestra página:

```javascript
  await page.coverage.startCSSCoverage()
  await page.goto(URL, {waitUntil: 'load'}) // domcontentload, load, networkidle0
  const cssCoverage = await page.coverage.stopCSSCoverage()
```

Ya tenemos el coverage de nuestro CSS, **ahora vamos a extraer el CSS que sí que usamos en nuestra página.** Para ello, creamos un string vacío en una variable llamada `criticalCSS` donde iremos acumulando todo el CSS que sí usamos.

```javascript
  let criticalCSS = ''
```

**Iteramos entre todos los CSS que estamos cargando en nuestra página.** Tendremos una `entry` por cada archivo `CSS` que estemos cargando. Dentro de cada entrada, tendremos los rangos de CSS que usamos.

De esta forma **Code Coverage nos indica qué trozos de nuestro código usamos. Estos rangos nos dan la posición inicial y final del rango de código que usamos**, y es lo que usaremos para extraer el CSS del archivo. Para ello, por cada rango, sacamos la porción usando `slice` y lo hacemos entre el principio y el final del rango. Y eso lo vamos acumulando en nuestra variable `criticalCSS`. 

```javascript
  for (const entry of cssCoverage) {
    for (const range of entry.ranges) {
      criticalCSS += entry.text.slice(range.start, range.end) + "\n"
    }
  }
```

Una vez terminamos el bucle, sólo tenemos mostrar por consola y cerrar las conexiones de la página y el navegador.

```javascript
  console.log(criticalCSS)

  await page.close()
  await browser.close()
```

Y aquí tenéis el snippet de código completo, de una pieza, para que lo podáis copiar y pegar. ⤵️

```javascript
const puppeteer = require('puppeteer')
const URL = process.env.URL || 'https://www.fotocasa.es'

;(async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()

  await page.coverage.startCSSCoverage()
  await page.goto(URL, {waitUntil: 'load'}) // domcontentload, load, networkidle0

  const cssCoverage = await page.coverage.stopCSSCoverage()

  let criticalCSS = ''
  for (const entry of cssCoverage) {
    for (const range of entry.ranges) {
      criticalCSS += entry.text.slice(range.start, range.end) + "\n"
    }
  }
  
  console.log(criticalCSS)

  await page.close()
  await browser.close()
})()
```

Ahora, para utilizarlo, sólo tenemos que ejecutar en nuestra terminal el siguiente comando:
```
URL=https://www.fotocasa.es/es node index.js
```

Tras unos segundos, nos debería aparecer en pantalla el CSS crítico de la página que le hemos pasado por variable de entorno. Si queréis, **podéis incluso guardar directamente en un archivo el resultado, listo para ser usado.**

```
URL=https://www.fotocasa.es/es node index.js > critical.css
URL=http://fotocasa.es/es/alquiler/viviendas/barcelona-capital/eixample/l node index.js > critical-search.css
```

**A partir de aquí las posibilidades son ilimitadas.** Podríais añadir en Travis una tarea para generar el CSS crítico cada vez que hacéis un deploy, podríais hacerlo para diferentes resoluciones o userAgents para tener el CSS crítico para cada uno de ellos y usarlo para todas las rutas que necesitáis. O podríais crear un microservicio que, pasándole una URL os devuelva el CSS crítico como en [Extract CSS](http://extract-css.now.sh). De cualquier forma, **con esto hemos visto cómo crear un script para extraer el CSS crítico con Puppeteer es cuestión de unas pocas líneas de código.**

**¡Si te ha gustado no dejes de compartirlo!**

## Referencias

[Puppeteer - Headless Chrome Node API ](https://github.com/GoogleChrome/puppeteer)<br />
[Google Chrome Labs Examples](https://github.com/GoogleChromeLabs/puppeteer-examples)<br />
[Minimal CSS Service](https://github.com/SUI-Components/minimal-css-service)

