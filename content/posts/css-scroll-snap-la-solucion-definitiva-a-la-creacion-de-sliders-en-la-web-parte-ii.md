---
date: '2019-01-12'
description: 'Crea tu propio slider paso a paso, sencillo pero totalmente funcional, utilizando CSS gracias a la propiedad Scroll Snap.'
image: '/images/snap.jpg'

title: 'CSS Scroll Snap, la solución definitiva a la creación de sliders en la web - Parte II'
tags:
- css
---

[En la anterior entrega de esta serie de artículos hemos conocido las propiedades CSS Scroll Snap](https://midu.dev/css-scroll-snap-la-solucion-definitiva-a-la-creacion-de-sliders-en-la-web/), una forma de declarar posiciones en nuestro scroll, de forma que podemos controlar cómo se debe comportar el deslizamiento del mismo en los diferentes elementos que navegamos.

{{< youtube id="uhP6OL0bwpY" >}}

Para controlarlo, y para hacer repaso, lo haremos utilizando básicamente dos propiedades CSS:

- La primera se llama `scroll-snap-type`. Se utiliza en el contenedor, el que tiene el scroll, y es el que nos permitirá indicar el tipo de puntos de ajuste de nuestro contenido. **Básicamente, le indicaremos qué dirección del scroll queremos controlar.** Además, un segundo parámetro nos ayudará a afinar el comportamiento, de forma que podamos obligar que el scroll no se quedé parado en mitad de dos elementos.

- La segunda propiedad que vimos es `scroll-snap-align`. Esta propiedad se tiene que usar **en cada elemento del contenedor e indica cómo se tendrá que alinear ese elemento dentro del contenedor**. Los valores que se pueden usar nos permitirá alinearlo al principio, centro y final del elemento.

## Creando nuestro slider con sólo CSS, paso a paso

{{< img src="/images/scroll-snap-articulo-cabecera.jpg" alt="Vamos a ver como crear un slider sencillo gracias al uso de los CSS Snap Points" align="">}}

Con el repaso que hemos hecho de las propiedades `scroll-snap-type` y `scroll-snap-align` ya tenemos suficiente para crear un slider sencillo pero funcional. Vamos a crearlo paso a paso, desde el principio, para entender cómo está funcionando.

### Creando el HTML básico

```html
<div class='slider'>
  <img src="image1.png" />
  <img src="image2.png" />
  <img src="image3.png" />
  <img src="image4.png" />
</div>
```

Esto, nos crea una la estructura HTML básica que vamos a necesitar para nuestro slider. En este ejemplo, y por simplicidad, vamos a hacerlo directamente con imágenes, pero **ten en cuenta que el slider podría funcionar también con elementos más complejos**. En cualquier caso, a continuación os dejo cómo queda este HTML usando unas imágenes de ejemplo de Unsplash:

{{< pen id="REyKao" height="500" tab="result">}}

### Estilando los elementos para que parezca un slider

Vale. Estamos muy lejos de un slider, pero no os vayáis todavía. En primer lugar, **deberíamos conseguir que las imágenes queden todas alineadas de izquierda a derecha.** Para ello podemos usar un `display: flex` en nuestro contenedor, para que nos alinee todos los elementos. Además, para este ejemplo, vamos a hacer que el slider ocupe toda la pantalla. Para ello hacemos que el `width` sea del 100%, y el height ocupe todo el viewport.

```css
.slider {
    display: flex;
    
    width: 100%;
    height: 100vh;
}
```

{{< pen id="MZGJyz" height="500" tab="result">}}

Como podéis comprobar, **los osos pandas se ven horribles con esa relación de aspecto** 🐼🙀. Vamos a arreglarlo con más #CSS. Para ello, lo primero que vamos a hacer es obligar que la caja ocupe siempre el 100%. Esto es vital, ya que queremos que en nuestro slider sólo se vea un slide y que este ocupe exactamente el mismo espacio que el slider. Lo conseguiremos con `flex: 0 0 100%`.

Esto mejora bastante las cosas pero **todavía podemos hacer que las imágenes que se vean mejor.** Para ello, vamos a indicarle que use el 100% del width. Con esto las imágenes se adaptaran a la caja que hemos creado antes. Ahora bien, esto hace que la imágen se adapte al espacio pero la relación de aspecto queda rota en algunas. Para arreglarlo, vamos a usar la propiedad `object-fit: cover;`. Esto hará que la imagen mantenga su relación de aspecto (a costa de perder parte de la imagen).

```css
.slider img {
  flex: 0 0 100%;

  width: 100%;
  object-fit: cover;
}
```

{{< pen id="wRjgJy" height="500" tab="result">}}

### Añadiendo la funcionalidad CSS Scroll Snap a nuestro slider

Bueno, esto va tomando forma. Además, si observáis en la demostración anterior, **ya tenemos las imágenes completamente alineadas** y, si intentamos hacer scroll, podremos ver que a la derecha están el resto de imágenes. Pues con esto, ya sólo nos queda utilizar la mágia de *CSS Scroll Snap* para crear el slider. Para ello:

- Usamos en el contenedor la regla `scroll-snap-type: x mandatory;`. Esto indicará que **queremos capturar el scroll horizontal** del contenedor y que es obligatorio que siempre, al dejar de hacer scroll, vaya a un punto de anclaje. De esta forma evitaremos que nuestro slider se quede en mitad de dos imágenes.
- En las imágenes, usaremos `scroll-snap-align: center;`. Esto le indicará que **el punto de anclaje es el centro del elemento.** Así, nuestras imágenes siempre quedarán alineadas que, en este caso, significa que se verá sólo una imagen (ya que ocupan el 100% del contenedor).

```css
.slider {
  /* ... resto de propiedades */
  scroll-snap-type: x mandatory;

}

.slider img {
  /* ... resto de propiedades */
  scroll-snap-align: center;
}
```

Ahora bien, si lo probáis... **¡veréis que no funciona 😱!** No es que os haya engañado es que todavía queda un pequeño detalle y es que... **¿dónde estamos haciendo scroll?** Pues, en realidad, actualmente estamos haciendo scroll sobre el elemento `<body>` y nos estamos capturando el scroll del elemento `.slider`. Para solucionar eso, vamos a añadir que el `overflow-x` será `scroll`, y el `overflow-y`, que es el que no nos interesa, será `hidden`.

Y con esto... **¡ya tenemos un slider sencillo pero funcional tanto en desktop con trackpad y en mobile!** Para probarlo, haced scroll con el trackpad o haced swipe en vuestro dispositivo móvil. Si estáis en un navegador compatible, veréis que al terminar el movimiento, se queda en la siguiente imagen.

{{< pen id="jXxyLe" height="378" tab="result">}}

## ¿Y esto lo puedo usar ya?

Seguramente, después de este artículo, te estés preguntando si esta tecnología ya está lista para ser usada. Pues bien, **tiene una nada despreciable cifra de más de un 80% de soporte, usando prefijos, en los navegadores.**

{{< img src="/images/can-i-use-scroll-snap.png" alt="La tabla de compatibilidad de Scroll Snap es mucho mejor de lo que piensas y de lo que parece" align="">}}

Hay que tener en cuenta, sin embargo, que **este porcentaje tiene un poco de trampa y es que le suma un 10% de navegadores que tienen un soporte limitado o que soportan la versión anterior**. Sin embargo, no es muy difícil solventar esto y dar un soporte gradual a los navegadores de forma que, los que no sean compatibles, nuestro slider pueda seguir funcionando aunque con unas funcionalidades más limitadas.

¿Te gustaría ver cómo lo podemos conseguir? Pues estáte atento para verlo en la tercera parte. [Sígueme en Twitter](https://twitter.com/midudev) para ser el primero en enterarte cuando aparece el siguiente artículo o, si lo prefieres, puedes suscribirte al [RSS del blog](/index.xml).