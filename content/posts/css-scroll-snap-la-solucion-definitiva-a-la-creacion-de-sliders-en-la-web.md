---
title: CSS Scroll Snap, la solución definitiva a la creación de sliders en la web - Parte I
date: '2018-12-27'
image: '/images/scroll-snap.png'
description: 'Introducción a CSS Scroll Snap. La solución definitiva a la batalla infinita entre los desarrolladores web y la creación de sliders. Por fin.'
tags:
- css

---

{{< img align="left" alt="Una simple búsqueda en Google nos arroja aproximadamente más de un millón de resultados" src="/images/searching-slider-results.png">}}

Si llevas unos años en la programación web estoy bastante seguro que te has enfrentado a uno de los problemas más recurrentes del mundillo. **Hablo de los sliders.** A falta de una implementación nativa, cientos de soluciones en Javascript han convivido a lo largo de los años. Algunos vanilla, otros basados en alguna librería como jQuery o React, pero todos basándose de alguna forma en cálculos sobre el DOM. Algunos nombres serían: *slick, slippery, momentum-slider, simple-slider*... y es que, **una simple búsqueda en Google nos arroja aproximadamente más de un millón de resultados.** 🤯

Pues sabes qué, **que eso se ha acabado**. Porque, por fin, **ahora en CSS podrás crear tus propios sliders sin necesidad de utilizar, en la gran mayoría de los casos, una librería.** Se llama Scroll Snap, tiene un soporte bastante respetable y va a cambiar mucho el cómo creamos sliders en web:

{{< img align="center" alt="La API de scroll snap nos permite en pocas líneas de código crear un slider con una experiencia inmejorable" src="/images/scroll-snap.png">}}

**CSS Scroll Snap** nos permite declarar posiciones en nuestro scroll, de forma que podemos controlarlo mejor, especialmente al utilizar nuestros dedos para desplazarnos.

Esto, antes, lo conseguíamos utilizando Javascript y haciendo algunos cálculos (normalmente costosos) sobre los elementos del DOM. Como la web ha ido evolucionando para adaptarse a los móviles, y la experiencia a la hora de hacer scroll se ha convertido en vital por la falta de espacio, hace tiempo que se puso el foco en mejor la experiencia a la hora de dirigir el scroll.

La historia de *Scroll Snap* viene de muy atrás. De hecho, [los primeros drafts son de... ¡2013!](https://gist.github.com/majido/9900261e1b7e2b1eb180b01c03656b42). Esto ha hecho que algunos navegadores actualmente tengan la especificación antigua (conocida como css-snappoints) y otros, como Chrome y Safari, tengan la nueva (conocida como css-scrollsnap).

{{< img align="" alt="Evolución de la especificación de Scroll Snap" src="/images/specification-history.png">}}

Por si os lo estáis preguntando. **Sí, la especificación anterior era un rollo.** Es verdad que era muy potente ya que podías manualmente identificar los puntos de ajuste usando píxeles o espacios relativos. Eso hacía que fuese muy difícil poder trabajar con él al tener elementos dentro del contenedor con diferentes tamaños. El nuevo elimina ese problema y te permite crear puntos de ajuste para el inicio, final y centro de cada elemento. Pero antes de seguir por ahí, **vamos a ver las propiedades para crear nuestro slider.**

## scroll-snap-type

En este artículo vamos a basarnos en la especificación nueva. Para ello vamos a ver en detalle la primera propiedad `scroll-snap-type`. Esta propiedad CSS se tiene que usar en el contenedor de nuestro contenido donde queremos controlar el scroll y nos permite identificar el tipo de los puntos de ajuste de nuestro contenido. Dicho de otra forma, le diremos si queremos controlar el scroll en una dirección, otra, ninguna o ambas.

`none`: Cuando se hace scroll en el contenedor, se ignoran los puntos de ajuste.

`x`: Los puntos de ajuste son horizontales.

`y`: Los puntos de ajuste son verticales.

`both`: Los puntos de ajuste son tanto horizontales como verticales (locurón).

**`scroll-snap-type` acepta un segundo parámetro** que determina si el viewport de nuestro contenido se debe ajustar a los elementos de forma obligatoria o sólo si está muy próximo de sus bordes.

`mandatory`: Al terminar de hacer scroll, **el scroll se mueve automáticamente SIEMPRE al punto de ajuste que se haya determinado.** Cuando se cambia el tamaño de la ventana, se cambia de orientación o se modifica el tamaño, SIEMPRE se moverá para satisfacer esto.

`proximity`: Al terminar de hacer scroll, **el scroll se mueve automáticamente SÓLO cuando el scroll esté muy próximo al punto de ajuste que se haya determinado.** Cuando se cambia el tamaño de la ventana, se cambia de orientación o se modifica el tamaño, SÓLO se moverá si se encuentra muy cerca de satisfacer la premisa anterior.

En el siguiente ejemplo podéis ver cómo cambia el comportamiento dependiendo de si usamos `mandatory` o `proximity`. El de la izquierda, no importa cuanto hagáis scroll, que siempre terminará con un recuadro en el contenedor y nunca veréis dos a la vez, mientras que el otro a veces puede quedar a medias de dos elementos.

{{< pen id="ZjrOpx" height="300" tab="result">}}

Ya os podéis imaginar que, para crear un slider, normalmente nos interesará utilizar la propiedad `mandatory` de forma que al hacer scroll, sea como sea, simpere acaba en el viewport de nuestro contenedor el slide completo y no se quede a medias. **Esto hará que se sienta como un slider nativo.** Además, la dirección será, en la gran mayoría de los casos, horizontal. Por lo que tendremos algo así:

```css
.slider-container {
  scroll-snap-type: x mandatory;
}
```

## scroll-snap-align

La otra propiedad es `scroll-snap-align`. Esta propiedad se usa a nivel de cada elemento que tengamos en nuestro contenedor y nos indica cómo se tendrá que alinear el elemento en el viewport. También acepta dos valores. El primero se refiere a `x`y `y`. Si sólo usas uno, ese valor se usará para ambas direcciones (de la misma forma que pasa con otras propiedades como `margin` o `padding`). Los valores que pueden tomar son:

`none`: La caja no tiene ningún punto de ajuste en su eje.

`start`: La caja tiene como punto de ajuste su inicio.

`end`: La caja tiene como punto de ajuste su final.

`center`: La caja tiene como punto de ajuste su centro.

En el siguiente ejemplo podéis ver cómo funcionaría el uso de Scroll Snap donde sus elementos tienen un `scroll-snap-align` con el valor `start`, de forma que le indicamos que el scroll debe ajustarse al inicio de cada elemento. Probad, con un navegador compatible, a hacer scroll para que ver que siempre termina el scroll al inicio de un elemento.

{{< pen id="JBjROd" height="300" tab="result">}}

En este caso ya vemos que, normalmente, el que nos interesaría para crear un slider sería usar el `center` de forma que el elemento acabe justamente en el centro una vez que hayamos hecho scroll en el contenedor.

```css
.slider-container img {
  scroll-snap-align: center;
}
```

Ahora que ya conocemos las dos propiedades básicas de CSS Scroll Snap, ya casi tenemos preparado el terreno para poder crear nuestro slider con sólo puro CSS. **¡Lo veremos en la segunda parte! ¡No te lo pierdas! ☝️**

## Recursos
*Draft de la especificación: https://drafts.csswg.org/css-scroll-snap/*

*Artículo muy completo en Alligator: https://alligator.io/css/scroll-snapping/*

*Documentación en Mozilla: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type*

*Artículo comparando la versión anterior y la actual de Scroll Snap: https://css-tricks.com/practical-css-scroll-snapping/*

*Artículo en Developers Google: https://developers.google.com/web/updates/2018/07/css-scroll-snap*