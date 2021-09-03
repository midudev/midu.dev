---
title: ¿Qué hay de nuevo en las DevTools de Chrome 92? Notas de la versión
date: '2021-07-23'
description: Editor de Grid en CSS, soporte para redeclaraciones de const en la Consola, ver el orden de los elementos y mucho más
toc: true
tags:
- devtools
---

## Editor de CSS Grid

¡Cuanto tiempo esperando esta función! Ahora puedes **previsualizar el resultado de la declaración de Grid en CSS** y editarla desde un nuevo editor en el inspector de elementos.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mV9Ac7QAD8vVPoiqmii6.png?w=1600" >}}

Cuando un elemento HTML de la página tiene un `display: grid` o `display: inline-grid` aplicado a él, verás que aparece un icono al lado de la declaración en el panel de *Styles*. 

Haz clic en ese icono para abrir el editor de CSS Grid. Desde ahí puedes previsualizar un cambio en la declaración del Grid (por ejemplo, puedes ver cómo quedaría el `justify-content: space-around`) y aplicar los cambios con solo un clic.

*Chromium Issue: [1203241](https://bugs.chromium.org/p/chromium/issues/detail?id=1203241)*

## Soporte para la redeclaración de `const` en la consola

La pestaña de *Consola*  ahora soporte la redeclaración de variables `const`, sumándose así a las redeclaraciones de [`let` y `class` que ya existían.](https://developer.chrome.com/blog/new-in-devtools-80/#redeclarations).

Esto permite a los desarrolladores hacer un copiado y pegado de código en la consola de DevTools para ver cómo funciona o experimentar, hacer pequeños cambios en el código y repetir el proceso sin necesidad de refrescar la página. Anteriormente, las DevTools mostraban un error de sintaxis al intentar redeclarar una variable `const` en la consola.

Veamos un ejemplo. La redeclaración de `const` se admite en scripts REPL separados (mira el ejemplo de la variable `a` más abajo). Ten en cuenta que lo siguiente no se soporta por diseño:

* `const` declaradas en scripts de la página no se pueden redeclarar en scripts REPL.
* `const` no se puede redeclarar en el mismo script REPL (mira el ejemplo de la variable `b`).

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/tJCPlokvxw6OWyCAmocM.png?w=1600" >}}

*Chromium Issue: [1076427](https://crbug.com/1076427)*

## Visor de orden de los elementos

Ahora puedes ver el orden de los elementos de la página en tu pantalla para mejorar la inspección de la accesibilidad.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2QoBtjGjFxgDAkKaO3y2.png?w=1600" >}}

El orden del contenido en un documento HTML es muy importante para el SEO y la accesibildad. Las nuevas funcionalidades de CSS permite a los desarrolladores crear contenido que parezca muy diferente en el orden en pantalla que como está plasmado en el documento HTML. Este es un problema de accesibilidad muy grande ya que un usuario que usa un lector de pantallas puede tener una diferente, y seguramente confusa, experiencia que un usuario que usa un navegador.

*Chromium Issue: [1094406](https://crbug.com/1094406)*

## Nuevos accesos directos a los detalles de un iframe

Ahora puedes ver los detalles de un `iframe` al hacer clic con el botón secundario en un elemento `iframe` y seleccionar la opción *Show frame details*.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YdENg6wjsgPNyMODdOHC.png?w=1600" >}}

Esto te llevará a una nueva vista con todos los detalles en el panel de `Application`, donde puedes examinar todos los detalles del documento, como seguridad, estado de isolación, política de permisos y poder depurar posibles problemas.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hEsg9Mc95n7w2tPrv6KH.png?w=1600" >}}

*Chromium Issue: [1192084](https://crbug.com/1192084)*

## Mejor soporte para depurar CORS

Los errores de *Cross-origin resource sharing (CORS)* ahora aparecen en la pestaña de *Issues* y, además, muestra las diferencias razones por las que se producen los errores. Puedes hacer click en cada *Issue* para ver el detalle de la causa y las soluciones.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UpiZQCNnlENB8ZluzeFt.png?w=1600" >}}

Chromium Issue: [1141824](https://crbug.com/1141824)

## Actualizaciones en el panel de *Network*

### Renombrar etiqueta *XHR* por *Fetch/XHR*

Este cambio ahora deja más claro que este filtro incluye tanto las peticiones de red realizadas con `XMLHttpRequest` como  con `Fetch API`.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/I0QOVTO52JRpl0jJO6Zt.png?w=1600" >}}

*Chromium Issue: [1201398](https://crbug.com/1201398)*

### Filtra los recursos de tipo Wasm en el panel de *Network*

Ahora puedes filtrar los recursos de red de Web Assembly usando el botón *Wasm* en el panel de *Network*.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vuTMcfCjDWFfVtDN6Dpf.png?w=1600" >}}

*Chromium Issue: [1103638](https://crbug.com/1103638)*

### User-Agent Client Hints por dispositivo en la pestaña de condiciones

Ahora los [User-Agent Client Hints](https://web.dev/user-agent-client-hints) son aplicados por dispositivo en el campo User Agent debajo de la pestaña de **Network Conditions**.

**Los User-Agent Client Hints son una nueva expansión de la Client Hints API.** Esto permite a los desarrolladores a acceder a información sobre el navegador del usuario y su dispositivo preservando la privacidad del usuario y de una forma mucho más ergonómica.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/iMlkTtV9OUdfujSWdHnR.png?w=1600" >}}

*Chromium Issue: [1174299](https://crbug.com/1174299)*

## Reporta problemas con el modo Quirks en la pestaña de Issues

DevTools ahora reporta los posibles problemas con el modo Quirks y el modo Limited-Quirks.

El modo Quirks y Limited-Quirks son modos de navegadores antiguos cuando todavía los estándares web no fueron establecidos. Estos modos emulan la era pre-standard para como se comportaba el diseño en el navegador y en ocasiones causan efectos visuales inesperados.

Cuando depuras problemas de diseño, los desarrolladores pueden pensar que son causados por CSS que han producido o errores en el HTML, mientras que el problema en realidad está en el modo de compatibilidad que la página se encuentra. Ahora DevTools proporciona sugerencias para solucionarlo.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XqtqSZPa1S1YnmeIt0ee.png?w=1600" >}}

*Chromium Issue: [622660](https://crbug.com/622660)*

## Incluye las intersecciones computadas en el panel de Performance

DevTools ahora te muestra el coste de las intersecciones computadas en la tabla de llamas. Este cambio te puede ayudar a identificar los eventos de Intersection Observer y depurar cualquier problema potencial de rendimiento.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Nx3K0Lpst0lICGbtpzsW.png?w=1600" >}}

*Chromium Issue: [1199137](https://crbug.com/1199137)*

## Lighthouse 7.5 en el panel de Lighthouse

El panel de Lighthouse ahora está ejecutando Lighthouse 7.5. La advertencia de "falta un `width` y `height` explícito" ha sido eliminado en imágenes que usan la propiedad `aspect-ratio` en CSS. Previamente, Lighthouse mostraba siempre esta advertencia si tu imagen no tenía definidos `width` y `height`.

Puedes ver todos los cambios de Lighthouse en sus [nota de lanzamiento](https://github.com/GoogleChrome/lighthouse/releases/tag/v7.5.0).

*Chromium Issue: [772558](https://crbug.com/772558)*

## "Restart frame" queda obsoleto en el menú contextual de la pila de llamada

La opción Restart frame queda obsoleta. Esta característica requiere más desarrollo para que funcione correctamente ya que actualmente está rota y falla frecuentemente.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Alvnt4FkoEFoP0SkdKgi.png?w=1600" >}}

*Chromium Issue: [1203606](https://crbug.com/1203606)*

## Monitor de protocolo [Experimental]

> Para activar este experimento, activa la casilla **Protocol Monitor** en **Settings > Experiments**.

Chrome DevTools usa el [Chrome DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/) para instrumentalizar, inspeccionar, depurar y analizar el comportamiento de Chrome. El **monitor de Protocolo** te provee una forma de ver todas las peticiones CDP y las respuestas realizadas por DevTools.

Dos nuevas funcionalidades han sido añadidas para facilitar las pruebas de CDP:

- Un nuevo botón **Save** que te permite guardar las respuestas CDP en un archivo JSON.
- Un nuevo campo que te permite enviar un comando CDP directamente.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mRVrHC9WEet7cwA7QAeV.png?w=1600" >}}

*Chromium issues: [1204004](https://crbug.com/1204004), [1204466](https://crbug.com/1204466)*

## Grabadora de Puppeteer [Experimental]

> Para activar este experimento, activa la casilla **Recorder** en **Settings > Experiments**.

[La grabadora de Puppeteer](https://developer.chrome.com/blog/new-in-devtools-89/#record) ahora genera una lista de pasos basada en tu interacción con el navegador, donde antes las DevTools generaba directamente un script de Puppeteer. Un nuevo botón **Export** ha sido añadido que te permite exportar los pasos como un script de Puppeteer.

Después de grabar los pasos, puedes usar el botón **Replay** para reproducir los pasos. [Sigue las instrucciones](https://developer.chrome.com/blog/new-in-devtools-89/#record) para aprender cómo empezar a utilizar este nuevo modo de grabación.

Ten en cuenta que este experimento está en sus primeras etapas de desarrollo. Hay planes para mejorar y expandir esta funcionalidad de grabación con el tiempo.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kh1Z4jcWxbO6rYCSoIPn.png?w=1600" >}}

*Chromium issues: [1199787](https://crbug.com/1199787)

**Este artículo es una traducción del artículo [What's New In DevTools (Chrome 92)](https://developer.chrome.com/blog/new-in-devtools-92/).** Puedes ver todas las novedades en vídeo aquí:

{{< youtube id="2baY3JpCxpo" >}}