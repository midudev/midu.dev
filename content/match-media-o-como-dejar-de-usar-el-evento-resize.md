---
title: matchMedia, o cómo dejar de usar el evento resize para siempre
date: '2019-03-18'
image: '/images/images-match-media-on-resize.jpeg'
description: 'La API matchMedia te permite aprovecharte de la potencia de las media queries de CSS en Javascript y, además, dejar de escuchar el evento resize para siempre'
topic: performance
language: 🇪🇸
toc: true
---

Antes de nada, aviso para navegantes: **la API matchMedia no es nueva.** De hecho, tiene bastantes años. Lo cuál hace que todavía sea más sorprendente que muy poca gente la conozca o la use en su día a día, teniendo en cuenta que tiene un soporte excepcional entre los navegadores, **incluso de Internet Explorer 11**, como veremos más adelante.

Pero, ¿por qué os hablo del método matchMedia del objeto `window`. Pues bien, porque con este método podéis dejar de escuchar, en muchos casos, el evento `resize`. ¿Y por qué? Porque su funcionalidad es similar aunque mucho más efectiva: nos permite saber cuando la ventana satisface una media query de CSS, de forma que podremos ejecutar código de forma arbitraria cuando eso suceda (o deje de suceder).

## ¿Qué es matchMedia? El poder de las mediaQueries en Javascript

El método `matchMedia` del objeto `window` recibe como parámetro un string que representa la media query que queremos analizar y devuelve un nuevo objeto del tipo MediaQueryList, que nos permitirá saber si nuestra ventana satisface la condición que le hemos pasado y, además, nos permitirá escuchar el evento que nos diga cuando la ventana la satisface o la deja de satisfacer.

Vamos a verlo en código. En el siguiente código, vamos a utilizar el método para saber cuando nuestra ventana es mayor a 720px, para eso tenemos que ejecutar el método `matchMedia` con la media query que queremos comprobar.

```javascript
const mql = window.matchMedia("(min-width: 721px)")
```

Ahora, en la constante `mql` tenemos un MediaQueryList. Con él podremos saber si la media query que hemos pasado como parámetro se cumple, para ello podemos acceder a la propiedad `matches`:

```javascript
const mql = window.matchMedia("(min-width: 721px)")
const isGreaterThan720px = mql.matches
```

`matches` tendrá como valor `true`, si la resolución de la ventana es mayor a 720px. Si no lo cumple, su valor será `false`.

## Adiós al evento 'resize' al escuchar cambios en el tamaño de la ventana

Hasta ahora muchos de nosotros hemos escuchado el evento `onresize` del `window` para ejecutar una condición dentro del callback y saber así cuando debíamos ejecutar una función. Por ejemplo, imaginad que queríamos ejecutar una función sólo cuando la ventana sea más pequeña que 640px. Usando el evento `resize` nos saldría esto:

```javascript
window.addEventListener('resize', function() {
    if (window.innerWidth > 640) {
        doStuffForSmallWindow()
    }
})
```
Esto funcionaría, pero el problema es que estaríamos ejecutando el callback cada vez que la ventana cambiase su tamaño (u orientación), independientemente si la condición interna se cumple. **Esto podría incurrir en un problema de performance.** 

Además, estaríamos ejecutando igualmente el método `doStuffForSmallWindow` siempre que estemos por debajo de 640px, cuando en realidad, sólo queríamos ejecutarlo una vez.

**Ambos problemas son solventables.** El primero utilizando una técnica de debounce o throttle, para evitar que se ejecute constantemente el evento. Para lo segundo, podríamos eliminar el eventListener una vez que se ejecutase por primera vez, para evitar que vuelva a ocurrir (aunque no siempre va a ser lo que queramos, sobretodo si estáis usando esto para ocultar cosas del DOM, ya que se quedaría ahí para siempre).

```javascript
// load 'just-debounce-it' for doing that
// hacemos que esta función se ejecute como máximo cada x tiempo
const fn = debounce(function () {
    if (window.innerWidth > 640) {
        doStuffForSmallWindow()
        // eliminamos el eventListener para evitar que se
        // vuelva a escuchar el evento
        window.removeEventListener('resize', fn)
    }
}, 250, true)
// 250ms, tiempo entra cada ejecución
// true para que se dispare la primera vez inmediatamente

window.addEventListener('resize', fn)
```

**Pero existe una mejora alternativa, nativa y sin librerías, para hacer esto.** Gracias a `matchMedia`. Una vez recuperamos el `MediaQueryList` que devuelve la ejecución del método `matchMedia` con la media query que queremos comprpobar, podremos escuchar un evento que ejecutará un callback cada vez que cambie el estado de la propiedad `match`.

Lo podríamos conseguir así de la siguiente forma:

```javascript
// recuperamos el MediaQueryList usando el método matchMedia
const mql = window.matchMedia('(max-width: 640px)')
// escuchamos el evento que se dispara cada vez que el estado
// de esta mediaQuery cambie
mq.addListener(function(mql) {
    if (mql.matches) {
        doStuffForSmallWindow()
    }
})
```

Es importante notar una cosa. **El listener se ejecutará cada vez que el valor de `matches` cambie.** Esto significa que cada vez que la ventana cumpla o deje de cumplir la condición, entonces se ejecutará el callback. Tenedlo en cuenta, ya que el comportamiento es diferente al resize.

### Ejemplo práctico de cómo usar matchMedia

Os dejo aquí un vídeo que he grabado con **un ejemplo práctico donde añado una nueva sección a mi blog.** El objetivo es mostrar a los usuarios de resoluciones grandes [mi último vídeo publicado en mi canal de Youtube.](https://youtube.com/c/midudev).

Como se ejecuta una llamada a una API y pinta algo en el DOM, no me basta con ocultarlo por CSS. Quiero que esa petición se haga sólo cuando se necesita y para ello usaré el método de `matchMedia`. **Así, si la resolución es pequeña, se evitará hacer esa petición.** Además, verás, que el callback se ejecuta sólo cuando cambia la condición.

## Cuando usar matchMedia y cuando el evento 'onresize'

### Usa matchMedia...

✅ cuando quieres ejecutar una acción cuando llegues a un tamaño.<br />
✅ cuando quieres saber cuando sí y cuando no se satisface una media query.<br />
✅ eres MUY exigente (como yo! 🙃) con la performance de tu página.

### Usa el evento resize...

✅ cuando tienes que hacer algo cada vez que **realmente** haya un resize de la ventana (por ejemplo, enviar un evento)<br />
✅ cuando tienes que hacer muchísimos arreglos con un detalle muy grande (cada muy pocos píxeles)<br />
ℹ️ ... y en cualquiera de esos casos, siempre deberías hacer **debounce** o **throttling** de la función que ejecutas al escuchar el evento.

