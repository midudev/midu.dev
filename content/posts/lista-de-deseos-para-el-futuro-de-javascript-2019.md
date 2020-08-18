---
title: Lista de deseos para el futuro de Javascript
date: '2019-02-03'
image: '/images/js-future.jpg'
description: En los últimos años hemos visto una evolución brutal de Javascript como lenguaje de programación, añadiendo nuevas caracterísitcas, métodos y funcionalidades. Pero los desarrolladores de este lenguaje queremos más. Aquí una lista de mis deseos.
tags:
- javascript

---

No es casualidad que una de mis sagas favoritas sea [Back to the Future](https://es.wikipedia.org/wiki/Back_to_the_Future). Contiene dos elementos que, desde muy pequeño, siempre me han emocionado. La primera, **los viajes en el tiempo**. La segunda, **la ciencia ficción como medio para imaginar el futuro y dar pinceladas de lo que nos espera.**

En el mundo de Javascript hemos tenido nuestro propio [DeLorean DMC-12](https://es.wikipedia.org/wiki/DeLorean_DMC-12): **Babel**. Y es que, con Babel, hemos podido saborear el futuro del lenguaje manteniendo compatibilidad con los navegadores actuales. Seguramente, el tener la posibilidad de adoptar tan rápido las nuevas características de Javascript, hace que queramos todavía **más y mayores evoluciones del lenguaje**.

Vamos a repasar en este artículo algunas de las cosas que más echo en falta en el lenguaje, en mi día a día. **La lista es personal y totalmente subjetiva**; algunas cosas están previstas por [el comité TC39](https://www.ecma-international.org/memento/tc39-m.htm) y, otras, simplemente son ensoñaciones mías pero, de vez en cuando, vale la pena dejar volar la imaginación.

## Eliminado algunos WAT del lenguaje

{{< img src="/images/wat_doritos.jpg" alt="WAT!?!?!?!" align="left">}}

Existe una [famosa charla de 2012 llamada WAT ](https://www.destroyallsoftware.com/talks/wat)(del inglés WHAT!) que repasa, en forma de sarcasmo, algunas de las particularidades de Ruby y Javascript que más problemas (y mofas) causan.

No nos vamos a engañar... **mucha de las cosas que se comentan en ese vídeo siguen estando vigentes y se basan, casi todos, en la coerción de Javascript** (básicamente, forzar que un tipo de datos se comporte como si fuese otro tipo) pero igual podemos hacer algo para mejorar la experiencia del desarrollador y que estas cosas vayan quedando, poco a poco, en el olvido.

### immutable, un nuevo tipo de variable

**En Javascript, los objetos, funciones y arrays se pasan como referencia, mientras que el resto de tipos se pasan como valor.** Esto puede generar un problema de mutabilidad de los datos, al crear efectos secundarios inesperados dentro de nuestras funciones, si no somos conscientes de lo que estamos haciendo cuando modifiquemos una propiedad de un objeto que nos ha llegado como parámetro. Pero, a veces, ni siquiera eso es necesario. También nos puede ocurrir al guardar un objeto en una variable.

Y es que, `const` guarda la referencia del objeto y no su valor, de forma que a veces se puede entender mal que `const` nos asegura que el valor de lo que guardamos no va a cambiar, cuando sí podemos mutarlo sin problemas. Para ello, hace unas semanas ya estuve bromeando con ello en un artículo para el día de los inocentes sobr el nuevo tipo de variables `immutable`.

```javascript
const persona = { name: 'Miguel', twitter: '@midudev' }
persona.name = 'Dani'
console.log(persona.name) // -> Dani

immutable persona = { name: 'Miguel', twitter: '@midudev' }
persona.name = 'Dani'
// Uncaught TypeError: Assignment to an immutable variable.
```

### Comparando objetos por valor

Por la misma razón que comentábamos antes de la referencia de los objetos, comparar el valor de dos objetos no es tan trivial como podría parecer. Veamos un ejemplo:

```javascript
'abc' === 'abc' // true -> compara el valor
{x: 1, y: 4} === {x: 1, y: 4} // false -> compara las referencias y son objetos distintos
```

¿Y si existiese una forma de forzar que se pudieran comparar dos objetos o arrays por su valor? Pues [Alex Rauschmayer ofrece una posible sintaxis para conseguirlo](http://2ality.com/2019/01/future-js.html?ref=dailydevlinks.com#comparing-objects-by-value):

```javascript
#{x: 1, y: 4} === #{x: 1, y: 4} // true
#[1, 2, 3] === #[1, 2, 3] // true

const persona = { name: 'Miguel', twitter: '@midudev' }
const persona2 = { name: 'Miguel', twitter: '@midudev' }
#persona === #persona2 // true
```

**Veo muchas posibilidades a esto aunque algún problema.** Por ejemplo, ¿qué pasa con los objetos o arrays que son más complejos? Otra; el símbolo `#` se va a usar para las propiedades privadas de las clases en Javascript, ¿no va a crear confusión? **¿Al comparar los valores también compara el orden de las keys y los elementos?** Muchas dudas al respecto pero, desde luego, interesante de plantear.


### Thin Arrow Function ->
En EcmaScript2015 se añadieron las _arrow function_ a Javascript. Me he encontrado que muchos estudiantes aprenden que se trata de otra forma de generar funciones. Primero **ven que permite crear funciones más cortas**, después que tienen **la posibilidad de hacer un retorno de valores implícito** y... finalmente **tienen que lidiar con la particularidad que el contexto de `this` se enlaza con el contexto de creación de la función** 😅. 

**En la mayoría de los casos, el enlace del contexto, no es un problema por dos razones**: o no lo usamos en absoluto en la función o justamente nos viene bien que lo haga. De hecho, **ya se ha explicado en diferentes ocasiones desde el comité TC39 que está hecho a conciencia** pero en mi opinión, es una pena que en el caso de querer mantener el contexto `this` sin tocar, ya no podamos usar este tipo de funciones.

```javascript
const materials = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium']
console.log(materials.map(material -> material.length))
// expected output: Array [8, 6, 7, 9]
```

La regla sería:

>Usa **=>** cuando quieres que `this` sea el contexto donde el método se **DEFINE**.

>Usa **->** cuando quieres que `this` sea el context donde el método se **EJECUTA**.

De hecho, la idea no sería completamente nueva si no que estaría basada en [cómo funcionan las funciones en CoffeeScript.](https://coffeescript.org/#functions).

## Mejor soporte para programación funcional y otras lindezas
Añadir más métodos iterativos al _prototype_ de array y las _arrow function_, gracias al return implicito de la primera línea si no usamos `{}`, ha sido un paso adelante para poder seguir más patrones de programación funcional en el lenguaje pero todavía quedan cosas por hacer.

No me refiero sólo a la posibilidad que los Observables llegen al lenguaje, que desde hace años está dando vueltas [una proposal para añadir Observables a Javascript](https://github.com/tc39/proposal-observable), si no a otros añadidos que nos ayuden a seguir este paradigma.

Un patrón que usa funciones puras es la de crear cadenas de funciones donde la salida de la anterior es la entrada de la siguiente. **Lo que se conoce como chaining** y que, lo mejor, es que ya **existe una propuesta en la mesa del TC39 que está en la fase 1 para arreglar esto.** Se llama _pipeline operator_ y funcionaría así:

```javascript
// sin pipeline operator
let result = exclaim(capitalize(doubleSay("hello")))
result //=> "Hello, hello!"

// con pipeline operator
let result = "hello"
  |> doubleSay
  |> capitalize
  |> exclaim

console.log(result) // "Hello, hello!"
```

**Esta propuesta, por desgracia, lleva años dando vueltas y es por la dificultad de concretar los detalles de cómo funcionaría en todos los casos** como, por ejemplo, con métodos asíncronos o métodos a los que queremos añadirle algún parámetro. Para solucionar esto existen diferentes corrientes que están compitiendo entre ellos para ver cuál es la que se convierte en la propuesta final. Las dos más destacadas son: [la basada en F#](https://github.com/tc39/proposal-pipeline-operator/wiki#proposal-1-f-sharp-style-only-with-await) y otra llamada [Hack Style](https://github.com/tc39/proposal-pipeline-operator/wiki#proposal-2-hack-style-only).

### lastItem y lastIndex en un array

Parece mentira que a estas alturas todavía tengamos que crear una operación para poder acceder al último elemento de un array. Para solucionarlo existe [una proposal llamada `array-last`](https://github.com/keithamus/proposal-array-last) que nos permitirá acceder con una propiedad al último elemento e índice del array.

```javascript
myArray[myArray.length - 1] // return the last item of the array
// but it has some problems...
const calculatedLastIndex = myArray.length - 1
myArray[myArray.length] // manual error
myArray[calculatedLastIndex - 1] // manual error

// using the new proposal
myArray.lastItem // return the last item of the array
myArray.lastIndex // return the last index of the array
```

De esta forma, igual que para acceder a la longitud de un array usamos la propiedad `length` ahora podremos usar la propiedad `lastItem` para recuperar el último elemento de una lista, sin necesidad de crear una operación o usar el método `pop()` que mutaba el array.

## Cerrando la brecha con Typescript

Para que quede claro: **no creo que vayamos a ver tipos estáticos en el lenguaje al medio plazo.** Los cambios en Javascript tienen una regla muy estricta: **mantener la compatibilidad con versiones anteriores por el bien de la web**. De esta forma, las mejoras que vemos son añadidos que no interfieren con anteriores características. **Si los tipos llegasen a Javascript... tendríamos cientos de problemas a solucionar con los propios métodos nativos del lenguaje.**

Dicho esto, sí creo que vamos a ver poco a poco algunos añadidos interesantes que sí ofrece Typescript y que añadir en Javascript no supondrían ningún problema y, para mi, hay uno que tendría todo el sentido:

### Enums

Los enums (enumerados) son un tipo de datos que nos permite crear un número finito de valores constantes que solemos utilizar para identificar tipos, decisiones, atributos y demás. **En Javascript podemos conseguir algo similar utilizando objetos** pero nos obliga a añadir manualmente los valores que identifican cada constante. Además, el problema, es que si queremos que haya

```javascript
// now: Manual enum, you have to put the value
const PropertyTypes = {
  commercialStore: 0,
  flat: 1,
  apartment: 2,
  house: 3,
  singleFamilyHouse: 4,
  penthouse: 5,
  buidling: 1 // another way to say flat (manual value)
}

// using proposal enum
enum propertyTypes {
  commercialStore,
  flat,
  apartment,
  house,
  singleFamilyHouse,
  penthouse,
  building = flat // another way to say flat (declarative)
}

console.log(PropertyTypes.apartment // 2)
```

Un caso de uso, por ejemplo, bastante práctico sería [para crear las acciones de los reducers en Redux](https://redux.js.org/basics/actions#actions), de forma que ya no tendríamos que generar la key y la value de la acción, y sólo tendríamos que crear un enum de las acciones. 

Por si os interesa, **[ya existe una proposición que, aunque está en la fase 0, tiene bastante buena pinta.](https://github.com/rbuckton/proposal-enum)**.

## Conclusiones

**Estos son sólo algunos de los ejemplos que me gustaría ver próximamente en el lenguaje.** Seguramente, dentro de un año, habrá que revisar las que he comentado, quitar algunas que ya dejarán de tener sentido y añadir otras que probablemente me parezcan más importantes en mi día a día. Ahora mismo, hay una mezcla de ensoñación con algo de realidad (y con proposals que ya están avanzando en el lenguaje). Si te gustaría comentar también lo que esperas en el lenguaje, las cosas que echas en falta y esperas que lleguen pronto, [coméntalo en Twitter, enviando una respuesta a mi cuenta de @midudev.](https://twitter.com/midudev) **¡Gracias por leerme!**

{{< tweet 1092084605858009088>}}

## Referencias

[The Next Javascript](https://the-next-javascript-presentation.now.sh/)<br />
[Javascript TC39 Proposals](https://github.com/tc39/proposals)<br />
[Future Javascript: What's missing](http://2ality.com/2019/01/future-js.html?ref=dailydevlinks.com)