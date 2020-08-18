---
title: Los ocho métodos de console que debes conocer
date: '2019-09-30'
image: '/images/console-info-warn-error.png'
description: La consola nos ofrece muchos métodos más además de console.log. Conoce los que quedan, que te ayudarán a mostrar mejores mensajes en la consola. warn, error, info, table, time, timeEnd, count y assert.
topic: javascript

tags:
- javascript
---

Estamos muy habituados a usar `console.log` para depurar nuestro código pero... ¿sabías que `console` tiene más métodos para ayudarnos a mostrar información útil en consola?

## info, warn y error para dar mayor contexto

Si queremos mostrar un mensaje en la consola, normalmente usamos simplemente `console.log`. Existe, sin embargo, diferentes **métodos que nos van a permitir indicar de una forma mucho más clara qué tipo de mensaje queremos mostrar.**

* `console.info(msg)`: Para enviar a la consola un mensaje **informativo**. En algunos navegadores se comportará como el  `console.log` y en otros se acompañará con un icono "i". ℹ️
* `console.warn(msg)`: Para enviar **advertencias** o *warnings*. Se mostrará en amarillo y se acompaña normalmente con un signo de atención. ⚠️
* `console.error(msg)`: Enviamos **errores** a la consola. Se muestra en rojo y adjunta un icono indicando que es un error. 🛑

Aquí puedes ver un ejemplo en las herramientas de desarrollo de *Google Chrome*:
{{< img src="/images/console-info-warn-error.png" alt="Los métodos info, warn y error nos permiten dotar de mayor contexto el mensaje que queremos mostrar" align="center">}}

Lo más interesante de todo esto, es que normalmente **los navegadores te permiten filtrar en consola el tipo de mensaje que quieres ver**. De forma que podrías filtrar para ver sólo las advertencias. Esto te puede ayudar a buscar entre la maraña de mensajes en la consola todas las advertencias que tengas.

## table para objetos y arrays

A la hora de presentar la información de un objeto o un array en la consola podemos utilizar el método `console.table`. Esto nos presentará la información en la consola dentro de una tabla, donde nos separará cada elemento o propiedad con sus diferentes valores.

Tomando este objeto como referencia:

```javascript
const person = {
    name: 'Miguel',
    twitter: 'midudev',
    frontend: true
}

console.table(person)
```

En la consola de nuestro navegador, nos mostraría la información de la siguiente manera:

{{< img src="/images/console-table-example.png" alt="Con table, la información se entiende mucho mejor sin necesidad de tener que expandir nada" align="center">}}

Por ejemplo, puedes sacarle partido a este método para conocer todas las posibilidades de `console` para ello prueba a ejecutar el siguiente código en tu consola: 

```javascript
console.table(Object.entries(console).sort())
```

## time y timeEnd, para contar el tiempo de ejecución

Con `console.time` vamos a poder iniciar un temporizador ⏲ para calcular la duración, en milisegundos, de un bloque de código. Para terminar de contar debemos utilizar el método `console.timeEnd`. Lo interesante de estos métodos es que el parámetro que reciben ambos es la etiqueta para identificar el temporizador ya que puedes tener más de uno corriendo a la vez.

Lo mejor es que veamos un ejemplo:

```javascript
console.time('fetch')
console.time('fetchAndRender')

fetch(apiURL)
    .then(res => res.json())
    .then(response => {
        console.timeEnd('fetch') // fetch: 5213.01904296875ms
        renderResults(response)
        console.timeEnd('fetchAndRender') // 6048.29687501904ms
    })
```

Lo puedes probar tu mismo en la consola de tu navegador para que veas como funciona:

{{< img src="/images/console-time-end-animation.gif" alt="time y timeEnd calcula el tiempo transcurrido, en ms, entre la llamada del primer y segundo método" align="center">}}

Una cosa importante a tener en cuenta es que **estos métodos no son, ni de lejos, perfectos a la hora de hacer un benchmarking real** de ciertas operaciones pero, sin embargo, pueden ser muy interesantes para detectar cuellos de botella en nuestro código.

## 1, 2, 3... cuenta con console usando count

Estoy seguro que también alguna vez has querido averiguar **cuántas veces se ejecutaba una función o un bloque de código.** Pues bien, con `console.count` esto lo vas a tener más que resuelto. Olvida de crear variables y ensuciar tu código.

Simplemente usa este método y pásale una etiqueta para contar cuantas veces se ha ejecutado. **Puedes pasar diferentes etiquetas** para contar diferentes ejecuciones o no pasar ninguna y que use `default`.

{{< img src="/images/console-count-usage.png" alt="time y timeEnd calcula el tiempo transcurrido, en ms, entre la llamada del primer y segundo método" align="center">}}

## assert, la mini librería de testing en console

El último método que quiero compartir contigo es bastante peculiar. ¿Te imaginas poder comprobar si algo es cierto? Como si estuvieras utilizando un framework de testing unitario pero... ¡con console! Pues existe y se llama `console.assert`, lo puedes usar de la siguiente manera.

{{< img src="/images/console-assert-example.png" alt="time y timeEnd calcula el tiempo transcurrido, en ms, entre la llamada del primer y segundo método" align="center">}}

Como ves, como **primer parámetro recibe la aserción** que quieres comprobar y como **segundo parámetro puedes pasar toda la información que quieres mostrar si no se cumple** la condición. **¡Ten en cuenta que si la condición se cumple no aparecerá nada en la consola!**

> ⚠️ Mucho cuidado con `console.assert`. Para empezar, no es parte del estándar... y, por ello, su implementación es diferente dependiendo del navegador o la plataforma. Por ejemplo, en los navegadores si le pasamos una afirmación que no cumple, mostrará el `message` en consola mientras que en `node.js` si le pasamos una aserción que no se cumple... ¡dará un pete con `AssertionError`.

## Conclusiones

Y con esto ya conoces algunos métodos muy interesantes para dejar de lado `console.log` que te pueden ayudar a mejorar las trazas que vas dejando en consola. Y, aunque siempre es mejor dominar a la perfección el `debugger` al menos con esto espero que evites dejar mensajes en tu código como este:

{{< img src="/images/console-no-lo-hagas-nunca.png" alt="time y timeEnd calcula el tiempo transcurrido, en ms, entre la llamada del primer y segundo método" align="center">}}