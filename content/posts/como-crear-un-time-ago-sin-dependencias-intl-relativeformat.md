---
title: Cómo crear un TimeAgo sin dependencias usando Intl.RelativeTimeFormat
date: '2020-08-25'
description: >-
  Muchas veces utilizamos dependencias como Moment.js para crear la
  funcionalidad de Timeago en diferentes idiomas. ¿Es necesario? Aprende una
  forma de hacerlo totalmente nativo y sin dependencias.
toc: true
tags:
  - javascript
image: /images/og/como-crear-un-time-ago-sin-dependencias-intl-relativeformat.png
---

## Manipulando fechas en Javascript y Moment.js 📅

A nadie le gusta trabajar con el tiempo en `Javascript`. Y no me extraña ya que los métodos que ofrece `Date` han quedado obsoletos y siempre han sido bastante farragoso parsear y manipular fechas y horas.

Por ello se crearon bibliotecas como [Moment.js](https://momentjs.com/). Una forma fácil de tratar con fechas en **Javascript**. Pero detrás de esa facilidad se esconde una dependencia obsoleta y poco liviana. Tanto es así que los propios creadores ya tienen una alternativa llamada [luxon](https://moment.github.io/luxon/), más liviana y basada en los estándares de la web.

Pero, **¿Realmente es necesario siempre usar una dependencia para conseguir lo que queremos?** Lo cierto es que últimamente **Javascript** ha seguido incorporando nuevas APIs que nos permiten parsear y manipular las fechas de una forma más cómoda. Tanto que **conseguir la funcionalidad TimeAgo**, la más requerida y por la que se instalan este tipo de depedencias, **es muy fácil de conseguir con unas pocas líneas de código** (y además con traducciones).

### ¿Qué es un TimeAgo? ⏳

*TimeAgo* es una funcionalidad en las interfaces de usuario que indica, de forma muy sencilla, cuanto tiempo hace que un recurso ha sido publicado. Por ejemplo: *"Hace 32 segundos"*,  *"Hace 5 horas"*, *"Hace 2 días"*.

Esto le da al usuario más información que si le ofrecemos la fecha sin ningún tipo de formateo y así le proporcionamos al visitante una forma sencilla de entender cómo de **actualizada** es la información que le estamos proporcionando.

En sitios como **Instragram, Twitter, Facebook** o incluso blogs, se ofrece este sistema. Normalmente las unidades llegan hasta días. Si lleva más de una semana entonces ya simplemente se muestra la fecha en concreto.

## Cómo crear tu propio TimeAgo con Javascript 👷‍♀️

### Conociendo Intl.RelativeTimeFormat

*Intl.RelativeTimeFormat* es un objeto que nos permite crear un formateador para conseguir los tiempos relativos traducido a diferentes idiomas. Para crear una instancia debes usar el constructor `Intl.RelativeTimeFormat` y pasarle el idioma y, después diferentes opciones para formatear el tiempo.

```javascript
// Crea un formateador de tiempo relativo en tu idioma
// y le pasamos un objeto con las opciones por defecto
const rtf = new Intl.RelativeTimeFormat({
  localeMatcher: 'best fit', // otros valores: 'lookup'
  numeric: 'always', // otros valores: 'auto' para poner "ayer" o "anteayer"
  style: 'long', // otros valores: 'short' o 'narrow'
})
```

> Si no le pasamos ningún parámetro, por defecto, traducirá al lenguaje del navegador. Si no soporta ese lenguaje, entonces hará fallback al que tenga por defecto (normalmente inglés).

Ahora que tenemos en `rtf` una instancia del formatear de tiempo relativo, ya podemos usarlo. Para ello tenemos que pasarle dos parámetros. Primero la cantidad de tiempo y como segundo parámetro la unidad de tiempo a la que nos referimos. Veamos algunos ejemplos:

```javascript
// Para hablar que algo ocurrió hace un día
// Tenemos que usar unidades negativas
rtf.format(-1, 'day')
// > Hace 1 día

// Para hablar sobre algo que ocurrirá en el futuro
// Se usan los valores positivos
rtf.format(2, 'day')
// > Dentro de 2 días

// Podemos usar diferentes unidades de tiempo
// Y se pueden usar en singular y plural
rtf.format(-30, 'second')
// > Hace 30 segundos
rtf.format(-40, 'seconds')
// > Hace 40 segundos
```

Perfecto, ahora ya sabemos que podríamos usar Intl.RelativeTimeFormat para conseguir esto... pero... ¿cómo sabemos qué unidad debemos usar y el valor que tendría esa diferencia? Pues vamos a ello.

### Cómo conseguir la unidad y el valor para usar con Intl.RelativeTimeFormat

Para conseguir la unidad y valor que tenemos que usar con Intl.RelativeTimeFormat, primero necesitamos **calcular la diferencia de tiempo que hay entre la fecha actual y la fecha de nuestro recurso.** Para hacer esto vamos a trabajar con *timestamps de Javascript*, que son los milisegundos que han pasado desde las *00:00:00 UTC del 1 de enero de 1970* y la fecha en cuestión.

Para recuperar la fecha actual con ese timestamp podemos usar `Date.now()`. Vamos a crear una función llamada `getSecondsDiff` que al pasarle un `timestamp` con ese formato lo compare con el `Date.now()` y la diferencia de segundos que hay entre ambas fechas.

```javascript
const getSecondsDiff = (timestamp) => {
  // restamos el tiempo actual al que le pasamos por parámetro
  // lo dividimos entre 1000 para quitar los milisegundos
  return (Date.now() - timestamp) / 1000
}
```

Ahora ya sabemos la diferencia en segundos entre las dos fechas. Ahora, **necesitamos conocer si esa diferencia de segundos tiene sentido expresarlo como segundos, minutos, días, horas...** Porque si la diferencia es de 90 segundos, por ejemplo, lo interesante sería saber que queremos expresar que "Hace 1 minuto" pero si son más de 3600 segundos ya estaríamos hablando de horas y no tendría expresarlo en minutos.

Para saber qué unidad tenemos que usar, empezaremos por tener un **diccionario** que nos indique el número de segundos que hay en las diferentes unidades que queremos controlar con el TimeAgo. Por ejemplo, **un día tiene 86400 segundos.**

```javascript
const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1 // un segundo tiene... un segundo :D
}
```

Ahora vamos a crear un método llamado `getUnitAndValueDate` donde recibiremos la diferencia que hemos calculado en el método `getSecondsDiff` y nos calculará en qué unidad de tiempo tenemos que expresar esa diferencia.

```javascript
const getUnitAndValueDate = (secondsElapsed) => {
  // creamos un for of para extraer cada unidad y los segundos en esa unidad del diccionario
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    // si los segundos que han pasado entre las fechas es mayor a los segundos
    // que hay en la unidad o si la unidad es "second"...
    if (secondsElapsed >= secondsInUnit || unit === "second") {
      // extraemos el valor dividiendo el tiempo que ha pasado en segundos
      // con los segundos que tiene la unidad y redondeamos la unidad
      // ej: 3800 segundos pasados / 3600 segundos (1 hora) = 1.05 horas
      // Math.floor(1.05) -> 1 hora
      // finalmente multiplicamos por -1 ya que necesitamos
      // la diferencia en negativo porque, como hemos visto antes,
      // así nos indicará el "Hace ..." en lugar del "Dentro de..."
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      // además del valor también tenemos que devolver la unidad
      return { value, unit }
    }
  }
}
```

Bueno, pues ya tenemos tanto el `value` como el `unit` (la unidad de tiempo) que debemos pasarle al formateador de fechas relativas. Con esto ya podemos crear un método llamado `getTimeAgo` que al pasarle un timestamp nos devuelva el tiempo relativo formateado.

```javascript
const getTimeAgo = timestamp => {
  // creamos una instancia de RelativeTimeFormat para traducir en castellano
  const rtf = new Intl.RelativeTimeFormat()
  // recuperamos el número de segundos de diferencia entre la fecha que pasamos
  // por parámetro y el momento actual
  const secondsElapsed = getSecondsDiff(timestamp)
  // extraemos la unidad de tiempo que tenemos que usar
  // para referirnos a esos segundos y el valor
  const {value, unit} = getUnitAndValueDate(secondsElapsed)
  // formateamos el tiempo relativo usando esos dos valores
  return rtf.format(value, unit)
}
```

Y con eso ya tendríamos nuestro código funcionando.

```javascript
const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const getSecondsDiff = timestamp => (Date.now() - timestamp) / 1000
const getUnitAndValueDate = (secondsElapsed) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === "second") {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}

const getTimeAgo = timestamp => {
  const rtf = new Intl.RelativeTimeFormat()

  const secondsElapsed = getSecondsDiff(timestamp)
  const {value, unit} = getUnitAndValueDate(secondsElapsed)
  return rtf.format(value, unit)
}
```

Para terminar, os dejo aquí algunas pruebas rápidas calculando las fechas que podríamos pasarle por parámetro:

```javascript
const thirtySecondsAgoDate = Date.now() - (30 * 1000)
console.log(getTimeAgo(thirtySecondsAgoDate))
// -> hace 30 segundos

const fourMinutesAgoDate = Date.now() - (5 * 60 * 1000)
console.log(getTimeAgo(fourMinutesAgoDate))
// -> hace 5 minutos

const threeHoursAgoDate = Date.now() - (3 * 60 * 60 * 1000)
console.log(getTimeAgo(threeHoursAgoDate))
// -> hace 3 horas

const yesterdayDate = Date.now() - (1 * 24 * 60 * 60 * 1000)
console.log(getTimeAgo(yesterdayDate))
// -> hace 1 día

const twoDaysAgoDate = Date.now() - (2 * 24 * 60 * 60 * 1000)
console.log(getTimeAgo(twoDaysAgoDate))
// -> hace 2 días
```

## Compatibilidad

La compatibilidad de *Intl.RelativeTimeFormat* es bastante buena con **dos excepciones**: primero, como siempre, la falta de soporte con **Internet Explorer 11** y, para seguir, sin soporte en **Safari** (tanto en iOS como macOS).

{{< img src="/images/intl-relative-time-format-can-i-use.jpg" align="center" alt="La compatibilidad es buena excepto por Safari. Por suerte en iOS 14 y el nuevo macOS esto se solucionará." >}}

En este punto hay **dos estrategias**. Una puede ser que, si no soporta esta API, a ese usuario se le enseñe la fecha sin el tiempo relativo. Otra sería cargar un polyfill. [Hay varios disponibles](https://github.com/tc39/proposal-intl-relative-time#polyfills) (aunque sólo dos pasan el Conformance Test de EcmaScript).

Si te preocupa Safari, **en iOS 14 y la nueva versión de macOS Big Sur, va a añadir soporte a esta API** por lo que la necesidad de polyfill será menor.

Si estás pensando en la compatibilidad con **Node.js**, hace tiempo que el objeto `Intl` está disponible en **Node.js**. El único problema que puedes encontrar es que no soporte todos los idiomas y sólo te lo traduzca al inglés. Para asegurarte que no tienes ese problema, tienes que instalar la versión `full-icu` de **Node.js**. **Más información aquí: https://nodejs.org/api/intl.html**

## Conclusiones

Con esto ya **hemos aprendido cómo crear nuestro propio TimeAgo** sin necesidad de recurrir a ningún tipo de dependencia. Lo mejor es que lo conseguimos en unas pocas líneas de código y, de gratis, viene con todas las traducciones necesarias. 

Dicho esto, a veces es posible que tengas que hacer muchas manipulaciones y formateos de fechas. Entonces, seguramente, sea interesante usar una dependencia. Hay alternativas a moment.js como [Day.js](https://day.js.org/), [date-fns](https://date-fns.org/) o, de los propios creadores de moment.js, tenemos [luxon](https://moment.github.io/luxon/).

Pero **si simplemente necesitas el tiempo relativo** de una fecha es posible, quizás, que valga más la pena hacer una implementación propia, **usando la tecnología de la plataforma** y evitándote añadir una dependencia, que normalmente con traducciones es bastante pesada, a tu aplicación.
