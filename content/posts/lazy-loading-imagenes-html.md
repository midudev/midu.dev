---
title: Lazy Loading de imágenes en HTML sin escribir JavaScript ⚡ 
date: '2021-07-25'
description: Aprende a utilizar el Lazy Load de imágenes nativo de HTML, para mejorar el rendimiento de tu sitio web muy fácilmente.
toc: true
tags:
- performance
- html
---

Desde hace un tiempo puedes hacer un lazy load nativo de tus imágenes e iframes gracias al nuevo atributo `loading` de HTML. Esto es un paso enorme a la hora de mejorar el rendimiento de tus sitios sin necesidad de cargar bibliotecas externas.

El nuevo atributo es parte del **estándar de HTML5** y se puede utilizar en las etiquetas `img` y `iframe` (no se puede usar en las etiquetas `video` ni `audio`). Internamente utiliza un *Intersection* *Observer* para saber cuando el elemento se encuentra en pantalla pero, claro, no tienes que preocuparte de escribir tú ni una sola línea de JavaScript para conseguirlo.

La sintaxis para usarlo sería así:

```html
<img src="imagen-carga-diferida.jpg" loading="lazy" alt="..." />
<iframe src="video.html" loading="lazy"></iframe>
```

## Los valores posibles del campo `loading`

El atributo `loading` de las imágenes y lo de los iframes acepta tres valores diferentes que determinarán cómo se compartará la carga de la imagen o iframe cuando el usuario esté cerca de verlo en pantalla.

- `lazy`: cuando el recurso queremos que tenga carga diferida.
- `eager`: cuando queremos que el recurso se cargue lo antes posible.
- `auto`: dejamos que el navegador decida si se debe cargar antes o después.

El valor por defecto, si no usas el campo `loading` en la etiqueta, será `auto`. De forma que el navegador decidirá qué prioridad debe tener el recurso.

## ¿Cómo puedo hacer el lazy load nativo en imágenes y iframes?

El atributo `loading` se puede usar en las etiquetas `img` y `iframe` como hemos comentado anteriormente. Pero aquí te dejo algunos ejemplos para que veas cómo se comportaría también usando la etiqueta `picture`:

```html
<!-- Carga diferida de la imagen cuando el usuario se acerca a la imagen -->
<img src="lazy-image.jpg" loading="lazy" alt="..."/>

<!-- Carga la imagen inmediatamente -->
<img src="hero-banner.jpg" loading="eager" alt=".."/>

<!-- Dejamos que el navegador decida -->
<img src="auto-image.jpg" loading="auto" alt=".."/>

<!-- Carga diferida en <picture>. <img> es el único elemento
     que necesita el atributo. El resto de `sources` usará
     esa configuración. -->
<picture>
  <source media="(min-width: 42em)" srcset="normal.jpg 1x, retina.jpg 2x">
  <source srcset="optimized.jpg 1x, optimized-retina.jpg 2x">
  <img src="fallback.jpg" loading="lazy">
</picture>

<!-- Lazy-load con imágenes que usan srcset -->
<img src="imagen-s.jpg"
     srcset="imagen-l.jpg 1024w, imagen-m.jpg 640w, imagen-s.jpg 320w"
     sizes="(min-width: 36em) 33.3vw, 100vw"
     alt="El lanzamiento más esperado" loading="lazy">

<!-- Lazy-load también funciona con iframes -->
<iframe src="video-player.html" loading="lazy"></iframe>

<!-- Incluso con destinos externos como YouTube -->
<iframe src="https://www.youtube.com/embed/Hw3VqZxFnGI" loading="lazy"></iframe>
```

Si quieres ver una demostración de esta nueva funcionalidad, te dejo aquí un vídeo:

{{< youtube id="ZBvvCdhLKdw" >}}

## ¿Qué soporte tiene en navegadores el lazy load nativo?

Actualmente más del 70% de los navegadores de Internet soporta totalmente la carga diferida de imágenes e iframes usando el atributo `loading`. Chrome, desde la versión 77, Opera y las versiones modernas de Edge tienen una compatibilidad total.

A día de hoy Firefox lo soporta pero sólo para ser usado con imágenes. Todavía no tiene soporte para `iframe`.

En el caso de Internet Explorer 11, no tiene ningún soporte. Mientras que Safari, tanto de escritorio como para móvil, su soporte actualmente es experimental y tiene que ser activado manualmente a través de *Settings > Advanced > Experimental Features.*

Tienes el **soporte de los navegadores actualizado a día de hoy** en la siguiente tabla para hacerte a la idea:

<script defer src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/public/caniuse-embed.min.js"></script>
<p class="ciu_embed" data-feature="loading-lazy-attr" data-periods="future_1,current,past_1,past_2" data-accessible-colours="false">
<picture>
<source type="image/webp" srcset="https://caniuse.bitsofco.de/image/loading-lazy-attr.webp">
<source type="image/png" srcset="https://caniuse.bitsofco.de/image/loading-lazy-attr.png">
<img src="https://caniuse.bitsofco.de/image/loading-lazy-attr.jpg" alt="Data on support for the loading-lazy-attr feature across the major browsers from caniuse.com">
</picture>
</p>

### ¿Cómo puedo saber si mi navegador soporta este lazy load?

Puedes comprobar si la propiedad `loading` es parte del prototipo del `HTMLImageElement` o `HTMLIFrameElement`. Por ejemplo, con este código

```javascript
const hasNativeLazyLoadSupport = 'loading' in HTMLImageElement.prototype
if (!hasNativeLazyLoadSupport) { 
  // aplicar otra estrategia para la carga diferida
}
```

### ¿Qué pasa si uso loading=lazy pero mi navegador no lo soporta?

Si tu navegador no soporta este atributo simplemente lo ignorará. Esto es ideal, ya que hace que puedas usar este atributo `loading` en las imágenes y funcionará en aquellos navegadores que lo soporten. Los que no lo soporten... obviamente no obtendrán el beneficio de la carga diferida pero tampoco tendrán un impacto negativo ni les afectarán de ninguna manera.

A este tipo de estrategia se le llama *mejora* *progresiva*, ya que no rompe la retrocompatibilidad pero hace que los navegadores que sí lo soporten tengan una carga más rápida y eficiente.

### ¿Y si quiero hacer lazy loading en un navegador que no lo soporta?

En ese caso puedes utilizar la biblioteca `vanilla-lazyload` para dar soporte en tu página web a los navegadores que no soportan todavía esta característica pero, usando la comprobación de si `loading` es parte del prototipo de `HTMLImageElement` o `HTMLIFrameElement`, podemos evitar cargar la dependencia y usar la funcionalidad nativa cuando es soportada.

```html
<!-- Imagen que se ve desde el principio, no hacemos lazy load -->
<img src="hero-image.jpg" loading="eager" alt="Hero image">

<!-- Usamos `loading` a `lazy` y `data-src` en lugar de `src` -->
<img data-src="lazy-image1.jpg" loading="lazy" alt="Imagen diferida 1">
<img data-src="lazy-image2.jpg" loading="lazy" alt="Imagen diferida 2">
<img data-src="lazy-image3.jpg" loading="lazy" alt="Imagen diferida 3">
<iframe data-src="video-player.html" loading="lazy" alt="Iframe diferido">

<script>
  (function() {
    // miramos si tiene soporte a lazy loading nativo
    const hasNativeLazyLoadSupport = 'loading' in HTMLImageElement.prototype

    // si tiene soporte nativo de carga diferida...
    if (hasNativeLazyLoadSupport) {
      // recuperamos todas las imágenes e iframes con el atributo
      const lazyEls = document.querySelectorAll("[loading=lazy]")
      // pasamos el data-src a src y dejamos que el navegador haga el resto
      lazyEls.forEach(lazyEl => {
        const src = lazyEl.getAttribute("data-src")
        lazyEl.setAttribute("src", src)
      })
    } else {
      // Cargamos dinámicamente una biblioteca externa para 
      // hacer la carga diferida
      const script = document.createElement("script")
      script.async = true
      script.src =
        "https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.4.0/dist/lazyload.min.js"

      // esta configuración es necesaria por la librería vanilla-lazyload
      // le indicamos los elementos a los que queremos hacer la carga diferida
      window.lazyLoadOptions = {
        elements_selector: "[loading=lazy]"
      }
      // añadimos el script par la carga asíncrona de la biblioteca
      document.body.appendChild(script)
    }
  })()
</script>
```

## ¿Debería usar siempre el atributo loading=lazy?

**NO.** Evita usar el atributo `loading="lazy"` para imágenes que sean visibles en la página desde el principio ya que estás añadiendo cálculos innecesarios en tu sitio (ya que el cálculo se hace usando *Intersection Observer*)

**Lo recomendable es añadir este atributo sólo en las imágenes que no se muestren en la página inmediatamente** y que se carguen a medida que se necesiten. De esta forma la priorización que hará el navegador será mucho más correcta.

Aquí tienes un ejemplo:

```html
<!-- son visibiles en el viewport -->
<img src="zapatos.jpg" alt="Zapatos" width="200" height="200">
<img src="camiseta.jpg" alt="Camiseta" width="200" height="200">
<img src="chandal.jpg" alt="Chandal" width="200" height="200">

<!-- imágenes que hay que hacer scroll para verlas -->
<img src="camisa.jpg" loading="lazy" alt="Camisa" width="200" height="200">
<img src="chaqueta.jpg" loading="lazy" alt="Chaqueta" width="200" height="200">
<img src="pijama.jpg" loading="lazy" alt="Pijama" width="200" height="200">
```

## ¡Lo estoy probando pero se está descargando las imágenes!

Hay que tener en cuenta que esta lazy load nativo tiene dos particularides.

La primera es que el navegador, para hacer la carga diferida del recurso, **hace una pequeña descarga del mismo para recuperar los metadatos**. Esto le permite saber las dimensiones y dejar ese espacio en el layout. Piensa que, de otra manera, el layout se podría ver incorrecto hasta que no se cargase la imagen.

{{< img src="https://addyosmani.com/assets/images/lazy-load-devtools.png" align="center" alt="Chrome se descarga 2KB de la imagen para poder obtener algunos metadatos, como sus dimensiones.">}}

**Lo segundo es que dependiendo de tu conexión**, la distancia que necesita la imagen para empezar a cargarse varía notablemente. Por ejemplo, si tienes una muy buena conexión a Internet, es posible que tu imagen o iframe se cargue a pesar de estar a una distancia considerable.

Por ejemplo, para conexiones rápidas, Chrome usa una distancia de `1250px` para empezar a cargar el recurso. Para conexiones como 3G, la distancia es de `2500px`.

Ahora la pregunta... **¿por qué cuanto peor conexión la carga del recurso ocurre con mayor antelación?** Al tener una peor conexión se necesitará más tiempo para obtener el recurso, de esta manera, se solicita antes para garantizar con mayor seguridad que el usuario podrá ver el recurso cuando llegue al punto dónde éste se encuentra.

## Conclusiones

**No hay razón para no empezar a usar ya el atributo `loading="lazy"` en las imágenes y iframes** que estén fuera del área visible para el usuario. Si el navegador lo soporta, tendremos de forma muy sencilla mejoras de rendimiento en nuestro sitio... y si no lo soporta, pues seguirá como hasta ahora.

**Fuentes:**
[Native image lazy-loading for the web!](https://addyosmani.com/blog/lazy-loading/)
[Browser-level image lazy-loading for the web](https://web.dev/browser-level-image-lazy-loading/)
