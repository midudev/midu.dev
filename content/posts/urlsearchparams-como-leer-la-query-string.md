---
title: URLSearchParams, cómo leer los valores de la querystring sin usar Regex
date: '2019-04-30'
image: '/images/urlsearchparams_cover.jpg'
description: Para leer los parámetros de una URL, hasta hace muy poco, teníamos que usar siempre expresiones regulares. Usando URLSearchParams esto deja de ser necesario y nos proporciona una forma sencilla de manipular esos datos.
tags:
- javascript
---

Para recuperar los parámetros de búsqueda (query values) de una URL siempre hemos tenido que **acudir a una librería externa o a expresiones regulares.** Esto hacía que, o bien, tuvieramos que añadir más tamaño a nuestra aplicación o tener que lidiar con indeseables errores por crear nuestra propia implementación.

**Desde 2016 existe una forma de manejar esto de forma más sencilla** y, además, es una forma nativa del navegador. Se llama `URLSearchParams` y en este artículo te explico todas las posibilidades que te da.

## Cómo usar URLSearchParams para recuperar los parámetros

Para poder utilizar esta API, debéis crear un nuevo objeto de `URLSearchParams` usando su constructor y pasando como argument la querystring con la que queréis trabajar.

Imaginad que estamos en la página: `https://www.fotocasa.es/es/?q=pisos+en+barcelona&ciudad=Barcelona`, veamos cómo podríamos trabajar con `URLSearchParams` para recuperar los parámetros de búsqueda de la URL.

```javascript
// recuperamos el querystring
const querystring = window.location.search
console.log(querystring) // '?q=pisos+en+barcelona&ciudad=Barcelona'

// usando el querystring, creamos un objeto del tipo URLSearchParams
const params = new URLSearchParams(querystring)
```

Una vez tenemos un objeto `params` del tipo `URLSearchParams` ya podremos utilizar los diferentes métodos que nos proporciona para poder recuperar la información que nos interesa.

```javascript
// recuperamos el valor del parámetro "q"
params.get('q') // "pisos en Barcelona"

// recuperamos el valor del parámetro "ciudad"
params.get('ciudad') // "Barcelona"

// si no existe, nos devolverá null
params.get('precio') // null
```

Además, **el objeto que nos devuelve es iterable**, por lo que podremos utilizar los diferentes métodos iterativos para poder acceder a todos los parámetros que tenemos en nuestra query.

```javascript
for (let p of params) {
  console.log(p);
}

params.forEach(p => console.log(p))

Array.from(params).length === 2
```

## Más métodos de `URLSearchParams`

La API de `URLSearchParams` también **nos proporciona unos muy útiles métodos para poder saber si un parámetro está en la URL.** De esta forma, podremos mantener nuestro código muy limpio cuando tengamos que hacer ciertas comprobaciones.

```javascript
// .has(key) nos dice si la key se encuentra en la querystring
params.has("ciudad") // true
params.has("provincia") // false

// .getAll(key) devuelve todos los valores de esa key
params.getAll("ciudad") // ["barcelona"]
```

Además de recuperar los parámetros de búsqueda, **muchas veces vamos a querer manipular la querystring de forma que podamos añadir o eliminar parámetros en la URL.** Esto también es posible gracias a los métodos `append`, `set` y `delete`. Además, una vez hayamos hecho esas manipulaciones, podremos usar el método `toString` para ver cómo quedaría la querystring tras los cambios.

```javascript
// .append(key, value) permite añadir un nuevo parámetro, no sustituye al anterior
params.append("from", "midudev")

// .toString() nos devuelve el querystring con todos los cambios
params.toString() // "q=pisos+en+barcelona&ciudad=Barcelona&from=midudev"

// .set(key, value) para sustituir o añadir el valor de una key con otro valor
params.set("from", "Follow midudev")
params.toString() // "q=pisos+en+barcelona&ciudad=Barcelona&from=Follow+midudev"

// .delete(key), borra una key de los parámetros de búsqueda de la URL
params.delete("from")

params.toString() // "q=URLUtils.searchParams"
```

Ten en cuenta que cuando haces un `append`, `set` o `delete` los cambios NO se reflejan en la URL. Lo único que estás haciendo es manipular el objeto de `URLSearchParams` que tienes en la variable. Para que esos cambios tengan efecto, tendrías que cambiar tú manualmente la dirección usando el valor que proporciona el método `toString`.

Para hacer los cambios en la URL, podríais hacer algo así:
```javascript
// creamos el objeto URLSearchParams
const params = new URLSearchParams('?q=articulos+de+frontend');
// añadimos el parámetro de búsqueda `from` con valor `midudev`
params.set('from', 'midudev')
// reemplazamos el historial del navegador con esta nueva querystring
window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
```

## Soporte en navegadores y polyfill

**La compatibilidad es muy buena** excepto, cómo no, **porque Internet Explorer 11 no lo soporta.** Si ese es el caso, te recomiendo que [añadas un polyfill que te proporcione esa funcionalidad](https://www.npmjs.com/package/url-search-params-polyfill). De esta forma, puedes ir utilizando esta API, que es nativa del navegador, y cuando dejes de soportar ~~al maldito~~ IE11, pues sólo tendrás que eliminar el polyfill y todo tu código seguirá funcionando.

Si necesitas detectar si tu navegador lo soporta, puedes usar el siguiente código:
```javascript
if ('URLSearchParams' in window) {
  // el navegador lo soporta
}
```

## Recursos
*Easy URL Manipulation with URLSearchParams: https://developers.google.com/web/updates/2016/01/urlsearchparams?hl=en*

*MDN UrlSearchParams: https://developer.mozilla.org/es/docs/Web/API/URLSearchParams*

