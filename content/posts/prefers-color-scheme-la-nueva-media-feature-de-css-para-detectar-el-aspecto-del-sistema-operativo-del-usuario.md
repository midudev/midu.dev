---
date: 2019-01-08T23:33:51+01:00
description: 'Muy pronto vamos a poder usar una nueva media query llamada prefers-color-scheme que nos permitirá cambiar los colores de nuestro sitio dependiendo si el usuario ha elegido un aspecto claro u oscuro para su OS'
image: '/images/DwbAZwlWkAAnZQx.jpg'

title: "prefers-color-scheme: La nueva media feature de CSS para detectar el tema del usuario"
tags:
- css
---


Adaptar el tema de nuestras aplicaciones web según la configuración del usuario en su sistema operativo siempre ha sido un tema pendiente. Ahí queda el intento de Microsoft con la media feature [-ms-high-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/-ms-high-contrast) que nos permitía adaptar nuestro CSS dependiendo del contraste que tenía configurado nuestro sistema operativo.

{{< img align="center" src="/images/DwbAZwlWkAAnZQx.jpg" alt="Podremos usar CSS directamente para estilar nuestra web dependiendo del tema de color que haya elegido el usuario en su sistema operativo">}}

Recientemente, con el [nuevo modo oscuro de macOS Mojave](https://www.theverge.com/2018/9/24/17896252/mac-os-mojave-review-updates-dark-mode-new-features), la tendencia ha vuelto a la mesa. Mientras que [Apple ofreció una API para adaptar las aplicaciones del sistema operativo](https://developer.apple.com/documentation/appkit/supporting_dark_mode_in_your_interface) a este nuevo aspecto, la web no podía competir con ese nivel de personalización. Lo comentaba en Twitter *Sindre Sorhus*, creador de la librería de testing [AVA.js](https://github.com/avajs), en junio de 2018 con el siguiente tweet:

<blockquote class="twitter-tweet" data-lang="es"><p lang="en" dir="ltr">We need a Dark Mode API for the web. I would really like it if websites respected my dark mode setting in macOS Mojave (and other OSes with dark mode).</p>&mdash; Sindre Sorhus (@sindresorhus) <a href="https://twitter.com/sindresorhus/status/1004413215554428929?ref_src=twsrc%5Etfw">6 de junio de 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

La [CSSWG](https://drafts.csswg.org/) fue bastante rápida al respecto y, el siguiente mes y empujado por Dean Jackson de Apple (como era de esperar), ya tenía disponible una especificación para detectar con [una media query la preferencia del usuario para el contraste elegido en el tema de su sistema operativo.](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme) **Esto es eficiencia.**

La nueva query se escribe `@media (prefers-scholor-scheme: value)` donde `value` puede ser:

- `no-preference` para indicar que el usuario no tiene una preferencia conocida en el sistema.
- `light` para indicar que su preferencia es tener un tema con colores claros.
- `dark` para indicar que la preferencia del usuario es tener un tema con colores oscuros.

Veamos un ejemplo con código CSS. Vamos a usar la propiedad content

```css
body {
  --color: #ff6961;
  --content: '🙅‍ no compatible';
  
  background-color: var(--color);
}

body::after {
  content: var(--content);
}

@media (prefers-color-scheme: light) {
  body {
    --color: white;
    --content: '🌞 light version';
  }
}

@media (prefers-color-scheme: dark) {
  body {
    --color: black;
    --content: '🌑 dark version';
  }
}
```

**Y aquí la demo disponible:**

{{< pen id="EGpgbK" height="300" tab="result">}}

Si vuestro navegador no soporta la media query, aparecerá un fondo rojo y un mensaje diciendo que no es compatible. Si es compatible, veréis que dependiendo del contraste que hayáis elegido, veréis la versión light o la versión dark.

Para que veáis que todo esto no es un invento mío, **os dejo el siguiente tweet que hice el otro día donde mostraba el efecto con este propio blog:**

<blockquote class="twitter-tweet" data-lang="es"><p lang="es" dir="ltr">&quot;prefers-color-scheme&quot; es una <a href="https://twitter.com/hashtag/CSS?src=hash&amp;ref_src=twsrc%5Etfw">#CSS</a> media feature que nos permite detectar si nuestro usuario ha elegido colores claros ⚪️ u oscuros ⚫️ para el aspecto de su sistema operativo.<br><br>Más info en <a href="https://twitter.com/MozDevNet?ref_src=twsrc%5Etfw">@MozDevNet</a>: <a href="https://t.co/i8kitpyTsb">https://t.co/i8kitpyTsb</a><br><br>👀 Aquí os dejo una demo con mi propio blog. <a href="https://t.co/65GT7AtN14">pic.twitter.com/65GT7AtN14</a></p>&mdash; Miguel Ángel Durán 👨‍💻 (@midudev) <a href="https://twitter.com/midudev/status/1082765722693062656?ref_src=twsrc%5Etfw">8 de enero de 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Para poder verlo, tuve que utilizar [la versión Technology Preview de Safari.](https://developer.apple.com/safari/technology-preview/) que te permite probar las próximas características que traerá el navegador de Apple para macOS. 

[Podéis ver un ejemplo completo y con mejor diseño en CodePen.](https://codepen.io/miduga/pen/LMXmYq)

## ¿Pero lo puedo usar ya?

Esa es la pregunta que os debéis estar haciendo algunos. **Me temo que tal y como está... la respuesta es no.** En el momento de escribir este artículo sólo está soportado por la versión Technology Preview de Safari. **Sin embargo**, tienes la posibilidad de recurrir a la magia de PostCSS y Javascript para conseguir el efecto deseado.

Primero, debes transformar tus media queries `prefers-color-scheme` con un plugin de PostCSS que lo convertirá en una consulta sobre el `color-index`. Pasará `prefers-color-scheme: dark` a `(color-index: 48)`, `prefers-color-scheme: light` a `(color-index: 70)` y `prefers-color-scheme: no-preference` a `( color-index: 22)`. ¿Y qué clase de magia esconde esto? Pues bien, en realidad el `color-index` es soportado por todos los navegadores hasta ¡Internet Explorer 9!

Pero esto no termina aquí, no es tan sencillo. Para terminar que funcione esto, **[hay que cargar un pequeño archivo Javascript e inicializarlo.](https://github.com/csstools/css-prefers-color-scheme/blob/master/README-BROWSER.md)**. Promete una experiencia cercana a la nativa pero, obviamente, esto está muy lejos de ser lo ideal. **Sólo recomendaría usarlo de esta forma si estás completamente seguro que es algo que quieres utilizar y no puedes esperar a que esté más maduro en el resto de navegadores.**

## Lo más importante: web que se siente nativa

En realidad lo más interesante de todo esto **es ver como se sigue trabajando para hacer que las tecnologías web se asemejen lo máximo posible a las apps nativas.** Imaginad las aplicaciones web que tenemos en nuestros escritorios, como Visual Studio Code y Slack, que puedan adaptarse utilizando tecnologías web al contraste que ha elegido el usuario en el sistema operativo. Y esto, nos ayuda a pensar que la web no se va a quedar rezagada.