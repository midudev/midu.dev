---
title: Cómo detectar ad blockers con JavaScript
date: '2021-02-06'
description: Usando un poco de JavaScript podemos detectar si el usuario de nuestro sitio está usando un AdBlocker y hacer algo al respecto.
toc: true
tags:
  - javascript
image: /images/og/como-detectar-ad-blockers-con-javascript.png
---

[Dependiendo del país](https://www.statista.com/statistics/804008/ad-blocking-reach-usage-us) **hasta un 30% de los usuarios usan AdBlocker**. Esto significa que casi uno de cada tres usuarios usa algún tipo de extensión o manera de bloquear los anuncios de tu sitio. Y la cifra sube año a año 📈.

Lo cierto es que **puedes intentar sortear esto** pero es una decisión del usuario que, la verdad, es difícil de saltársela. Se pueden intentar cosas pero, con el tiempo, siempre aparece alguna manera de bloquear los anuncios y los trackers.

Igualmente es bastante **útil a veces tener una forma de detectar si el usuario está usando algún bloqueador de publicidad** para enseñarle algún tipo de mensaje que le invite a reconsiderar su decisión o, simplemente, para aprovechar y mostrar otro tipo de contenido para llenar el hueco.

## Código JavaScript para saber usuario usa un AdBlocker

**La técnica consiste en crear un elemento que simule ser un anuncio** de forma que el *AdBlocker* lo detecte y lo elimine. De esta forma, si se elimina, sabremos que tenemos una extensión que bloque este tipo de contenido y, si se mantiene, entonces el usuario no tiene ningún *AdBlocker* 💡.

**¡Vamos a verlo con código!**

```javascript
// creamos un flag para saber si tenemos adblocker
let isAdBlockEnabled = false

// creamos un elemento div y lo iniciamos con una clase
// que sabemos que el adblocker eliminaría
const ad = document.createElement('div')
ad.innerHTML = '&nbsp;'
ad.className = 'adsbox'
// añadimos nuestra simulación de anuncio en el body
document.body.appendChild(ad)

// ahora dejamos 100ms para que el adblocker haga su trabajo
// y entonces veremos si el elemento sigue visible
window.setTimeout(() => {
  // si el elemento no tiene altura, es que
  // el AdBlocker se lo ha cargado
  isAdBlockEnabled = ad.offsetHeight === 0
  // eliminamos el "falso" anuncio
  ad.remove()

  if (isAdBlockEnabled) {
    // codigo a ejecutar si el adblocker está activado
  }
}, 100)
```

Una cosa importante es que este snippet **tiene que ejecutarse una vez el DOM haya sido cargado totalmente.** Para ello puedes añadir el script al final del documento o simplemente esperar al evento `DOMContentLoaded`.

También, puedes probar el snippet en cualquier página abriendo las herramientas de desarrollo. Lo pegas en la consola y lo ejecutas. Luego podrás ver si el valor de `isAdBlockEnabled` es `true` o `false` dependiendo si usas extensiones como **uBlock** o **Ghostery**.

{{< img align="center" alt="He activado el uBlock y he utilizado el snippet anterior en la consola para ver si lo detecta correctamente" src="/images/testing-way-to-check-adblocker.png" >}}

## Usando Promesas para integrarlo mejor en tu código

En el caso que quieras envolver esta utilidad en una promesa, lo puedes hacer de forma muy sencilla. Lo ideal sería extraerlo a un módulo, para que el estado del `isAdBlockEnabled` se guarde en el módulo y sólo exportes el método `checkIsAdBlockEnabled`.

```javascript
// ahora usamo como estado inicial `undefined`
// que nos servirá para saber si ya hemos calculado
// si el usuario tiene adBlocker
let isAdBlockEnabled = undefined

const checkIsAdBlockEnabled = () => {
  // con esto evitamos que se vuelva a manipular el DOM
  // si ya sabemos si el resultado de la ejecución anterior
  if (typeof isAdBlockEnabled !== 'undefined')
    return Promise.resolve(isAdBlockEnabled)

  const ad = document.createElement('div')
  ad.innerHTML = '&nbsp;'
  ad.className = 'adsbox'
  document.body.appendChild(ad)

  return new Promise(resolve => {
    window.setTimeout(() => {
      // si el elemento no tiene altura, es que
      // el AdBlocker se lo ha cargado
      isAdBlockEnabled = ad.offsetHeight === 0
      // eliminamos el "falso" anuncio
      ad.remove()
      resolve(isAdBlockEnabled)
    }, 100)
  })
}

// ya lo podrías usar en cualquier parte de tu código así
checkIsAdBlockEnabled().then(isAdBlockEnabled => {
  console.log(isAdBlockEnabled)
})
```

## Conclusiones sobre detectar el AdBlocker con JavaScript

Ahora que tienes este poder, **úsalo con responsabilidad**. Creo que no es buena idea molestar al usuario y evitar que pueda usar tu sitio web. Podrías, por ejemplo, borrar contenido de la web al detectar que tiene el AdBlocker, o mostrar una modal que no se pueda quitar... pero, como te digo, **creo que no es buena idea.**

**Sí puedes invitarle, amablemente, que tus anuncios en el sitio ayudan a tu página a sobrevivir.** O llenar los huecos con otro tipo de publicidad que no detecten los AdBlockers...

En mi caso este problema lo he encontrado en mi trabajo pero como te habrás dado cuenta mi blog no tiene anuncios de ningún tipo. :) **Espero que a ti te sirva.**

Si quieres continuar la conversación, te invito que [me menciones en Twitter](https://twitter.com/midudev) para seguir debatiendo sobre cómo detectar los AdBlockers con JavaScript y si tienes un método mejor. 👋