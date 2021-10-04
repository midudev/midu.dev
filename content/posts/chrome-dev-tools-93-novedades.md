---
title: "Qué hay de nuevo en DevTools (Chrome 93)"
date: 2021-09-02
description:
  "Consultas de contenedores CSS editables, previsualización de paquetes web, mejor manejo de cadenas de texto en la Consola y más."
toc: true
tags:
- devtools
---

**¡Ya tenemos disponible una nueva versión de Google Chrome!** Y con ello, un montón de novedades para mejorar las herramientas de desarrollo. He traducido [las notas de lanzamiento oficial](https://developer.chrome.com/blog/new-in-devtools-93/) para que tengas en castellano las novedades del navegador en tu idioma. ⬇️

## Consultas de contenedores CSS editables en el panel de Estilos

Ahora puedes ver y editar las [consultas de contenedores CSS](https://web.dev/new-responsive/#responsive-to-the-container) en el panel de **Estilos**.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3NzGBpukHQfUZUKUpUgf.png" alt="Consultas a contenedores CSS en el panel de Estilos" >}}

Las consultas de contenedores (*container queries*) ofrecen una manera mucho más dinámica de realizar diseños adaptables. La regla `@container` funciona de una forma similar a las consultas de medios (*media queries*). Sin embargo, en lugar de consultar el tamaño de la ventana y la información del agente del usuario, `@container` consulta el contenedor ascendiente que cumple cierto criterio.

En el panel de **Elementos**, haz clic en el elemento del DOM que tenga la regla `@container`, DevTools ahora muestra la información de `@container` en el panel de **Estilos**. Clica en él para editar su tamaño. El panel **Estilos** también muestra la información correspondiente al contenedor. Coloca el puntero del mouse encima para resaltar el elemento contenedor en la página y revisa el tamaño del contenedor. Haz clic en él para seleccionar el elemento contenedor.

Actualmente la característica de consultas de contenedores es experimental. Por favor, activa la opción `#enable-container-queries` en `chrome://flags` para probarlo.



Chromium issue: [1146422](https://crbug.com/1146422)

## Previsualización de paquetes Web en el panel de Red

[Un paquete Web](https://web.dev/web-bundles/) es un formato de encapsulación de uno o más recursos HTTP en un sólo fichero. Ahora puedes previsualizar el contenido de tu paquete web en el panel de **Red**.

Actualmente la característica de paquete web es experimental. Por favor, activa la opción `#enable-experimental-web-platform-features` en `chrome://flags` para probarlo.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PEv1mNA14K18t5P3N6Yj.png" alt="Previsualización paquete web" height="492" >}}

Chromium issue: [1182537](https://crbug.com/1182537)


## Depuración de la API de Informes de Atribución

Los errores de la API de Informes de Atribución ahora son notificados en la pestaña **Problemas**.

[Informes de Atribución](https://developer.chrome.com/docs/privacy-sandbox/attribution-reporting/) es una nueva API que te ayuda a medir cuando una acción de usuario (como un clic a un anuncio o una visualización) conduce a una conversión, sin necesidad de usar identificadores de sitios cruzados.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png" alt="Errores de la API de Informes de Atribución en el panel Problemas" height="501" >}}

Chromium issue: [1190735](https://crbug.com/1190735)


## Mejor manejo de cadenas de texto en la Consola

Nuevo menú contextual en la **Consola** que te permite copiar cualquier cadena de texto como contenido, un literal de JavaScript o un literal JSON.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O5uMSgkHrQ2mQDSjmg3A.png" alt="Nuevo menú contextual en la Consola" height="477" >}}

En Chrome 90, DevTools actualizó la **Consola** para que siempre [formatease la salida de las cadenas de texto como literales JSON válidos](/blog/new-in-devtools-90/#double-quotes). Hemos recibido retroalimentación de equipos de desarrollo que este cambio puede ser confuso ya que sienten que la cantidad de secuencias de escape es excesiva y hace la salida illegible.

La **Consola** ahora formatea la salida de la cadena de texto como un literal JavaScript válido y, además, te proporciona 3 opciones para copiar las cadenas. La opción **Copiar como literal JavaScript** va a añadir las secuencias de escape a los carácteres especiales y envolverá las cadenas de texto en comillas simples, dobles o comillas invertidas dependiendo del contenido de la cadena. En su lugar, la opción **Copiar cadena como contenido** copia el contenido de la cadena tal cuál se encuentra (incluyendo nuevas líneas y otros carácteres especiales) al portapapeles. Finalmente, **Copiar como literal JSON** formatea la cadena como un JSON literal válido y lo copia al portapapeles.

Chromium issue: [1208389](https://crbug.com/1208389)


## Mejoras en la depuración de CORS

Los errores relacionados CORS de TypeErrors en la **Consola** ahora están enlazados al panel **Red** y la pestaña **Problemas**.

Haz clic en los dos nuevos iconos al lado de los mensajes de error relacionados con CORS para ver la petición en la red o entender el mensaje de error con más detalle y recibir soluciones potenciales en la pestaña **Problemas**.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VzoUggSoM0FnkDlIFPhq.png" alt="Iconos al lado de los mensajes de error relacionados con CORS" height="485" >}}

Chromium issue: [1213393](https://crbug.com/1213393)


## Lighthouse 8.1

El panel de **Lighthouse** ahora usa Lighthouse 8.1.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wENi9RXYMxdhm3zI4NVu.png" alt="Lighthouse" height="628" >}}

Si tu sitio expone mapas de código fuente (*source maps*) a Lighthouse, revisa el botón **Ver mapa de árbol** para ver un desglose del JavaScript que has enviado, filtrable por tamaño y cobertura al ser cargado.

El reporte también incluye una nueva métrica para filtrar (Revisa la captura de pantalla sobre el filtro **Mostrar auditorías relevantas a**). Selecciona una métrica para enfocarte en las oportunidades y diagnósticos más relevantes para mejorar esa métrica.

La **Categoría de Rendimiento** tiene algunos cambios de puntuación para alinearse con otras herramientas de rendimiento y reflejar mejor el estado de la web.

Revisa las [notas de lanzamiento](https://github.com/GoogleChrome/lighthouse/releases) para una lista entera de cambios.

Chromium issue: [772558](https://crbug.com/772558)


## Muestra una nueva nota URL en el panel de Manifiesto

El panel **Manifiesto** ahora muestra una [nueva nota URL](https://wicg.github.io/manifest-incubations/index.html#dfn-note_taking).

Actualmente en Chrome OS (CrOS), Aplicaciones Chrome y Aplicaciones Android que declaran la capacidad "nueva-nota" pueden ser seleccionados como una aplicación para tomar notas en la configuración de *Stylus* (se muestra si el dispositivo CrOS ha sido usado con un *stylus*). Cuando se selecciona la aplicación de tomar notas, la aplicación puede ser lanzada desde el botón "Crear Nota" de la paleta del *stylus*. Añadir un campo `new-note-url` en el manifiesto de la aplicación es parte de los esfuerzos por añadir una funcionalidad equivalente en las aplicaciones web.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2Cwggroar7pNesfAQi4K.png" alt="Nueva nota URL en el panel de Manifiesto" height="477" >}}

Chromium issue: [1185678](https://crbug.com/1185678)


## Arreglados los selectors CSS coincidentes

DevTools ha arreglado los selectores CSS coincidentes, que no funcionaban en el último lanzamiento.

Los selectores separados por coma en el panel de **Estilos** tienen colores diferentes dependiendo si coinciden con el nodo de DOM seleccionado:

- Una porción que no coincide se muestra con un gris claro.
- Un selector que coincide se muestra en negro.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O7CoHBrKA9cVKci1SM0M.png" alt="Selectores CSS coincidentes" height="477" >}}

Chromium issue: [1219153](https://crbug.com/1219153)


## Mostrando las respuestas JSON con formato legible

Ahora puedes ver las respuestas JSON en el panel de **Red** en un formato legible.

Abre la respuesta JSON en el panel de **Red**, haz clic en el botón `{}` para formatear el código.

{{< img src="https://developer-chrome-com.imgix.net/image/dPDCek3EhZgLQPGtEG3y0fTn4v82/x2NKXwJPzjycjeD7cLH6.png" alt="Muestra el código JSON con un formato legible" height="523" >}}

Chromium bug: [998674](https://crbug.com/998674)

{{< youtube id="1VaPAnUGRz8" >}}
