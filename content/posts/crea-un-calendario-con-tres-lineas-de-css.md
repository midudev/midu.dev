---
title: Crea un calendario 📆 con tres líneas de CSS
date: '2020-12-25'
image: '/images/og/crea-un-calendario-con-tres-lineas-de-css.png'
description: "Aprende a maquetar un calendario en HTML con unas pocas líneas de CSS gracias a la potencia de display:grid"

toc: true
tags:
- css
---

Hasta hace poco, **maquetar un calendario en CSS** era bastante rollo. No es que fuese imposible, ni mucho menos, pero para crear la cuadrícula de días debíamos de tener en cuenta unas cuantas cosas y hacía que el CSS fuese, no complicado, pero sí algo largo.

Con la llegada de `display: grid` a alguien se le ha ocurrido una ingeniosa manera de simplificar esto. **He creado un vídeo** donde enseño paso a paso cómo hacerlo, para que veas la potencia de esta estrategia:

{{< youtube id="Bpyl59_fjvU" >}}

**Si prefieres leer texto**, pues sigue por aquí, que te voy contando. 👇

## El marcado de nuestro calendario

Como un calendario no deja de ser **una lista numerada de números**, vamos a utilizar la etiqueta `<ol>`. Cada día será un elemento de la lista, por lo que cada día será un `<li>`. Para saber en qué día de la semana estamos podríamos usar también 7 elementos `<li>` para indicar los días de Lunes a Domingo.

Quedaría algo así:

```html
<div>
  <h1>Enero 2021</h1>
  <ol>
    <li class="day-name">Lun</li>
    <li class="day-name">Mar</li>
    <li class="day-name">Mié</li>
    <li class="day-name">Jue</li>
    <li class="day-name">Vie</li>
    <li class="day-name">Sáb</li>
    <li class="day-name">Dom</li>

    <li class="first-day">1</li>
    <li>2</li>
    <!-- ... -->
    <li>31</li>
  </ol>
</div>
```

Como ves, hemos marcado con una clase tanto el día de la semana (`.day-name`) como el primer día numérico (`.first-day`). De esta forma, podremos estilar fácilmente esas partes y luego te explicaré cómo.

## Las 3 líneas mágicas de CSS para estilar un calendario

Como **un calendario no deja de ser una cuadrícula de números**... ya te puedes imaginar que vamos a utilizar `display: grid`. Ahora bien, esto no es suficiente, tenemos una cuadrícula pero... ¿de cuantas columnas? Pues si la semana tiene 7 días, parece bastante evidente que nuestra cuadrícula va a tener 7 columnas:

```css
ol {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
```

Desde luego **no parece muy adecuado poner a mano cada `fr` para indicar las siete columnas.** No te preocupes, hay una forma mejor usando el método `repeat`.

```css
ol {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
```

Ahora mejor. Si probases este código verías que, aunque empieza a tener mejor pinta... **salen demasiados números y es que, por defecto, la etiqueta `ol` nos indica el número de cada elemento**. Vamos a ocultar esto, ya que no los necesitamos. Y también quitamos el padding que añade por defecto:

```css
ol {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  padding: 0;
}
```

¡Mucho mejor! Ahora, sí que parece un calendario pero, sin embargo, existe un problema y es que **el día 1 de enero de 2021 no cae en lunes**, que es lo que nos estaría mostrando. El día correcto sería empezar en viernes. ¿Cómo hacemos para que empiece por el día correcto?

Usando la clase `.first-day` vamos a indicarle en qué columna debería empezar a poner los números. En este caso lo correcto sería que empezase en viernes. Esto es, en la quinta columna. Pues añadimos este CSS para hacer que funcione:

```css
.first-day {
  grid-column-start: 5
}
```

A partir de aquí puedes empezar a estilar y dejar a tu gusto el calendario CSS. Aquí te dejo una demo completa con una versión bastante sencilla pero puedes entretenerte jugando con ello:

<iframe src="https://codesandbox.io/embed/calendario-en-3-lineas-de-css-xzwl3?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="calendario-en-3-lineas-de-css"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>

**Referencias**: <br>
[Calendar Tricks: A calendar in three lines of CSS](https://calendartricks.com/a-calendar-in-three-lines-of-css/)
