---
title: Por qué no uso punto y coma (;) en Javascript
date: '2020-04-22'
description: La explicación por la que no uso el ; al final de cada sentencia en Javascript. Un poco de historia, ventajas y problemas que puedes encontrarte.
language: 🇪🇸
toc: true
tags:
- me
---

No son pocas las veces que cuando hago presentaciones o vídeos en [mi canal de Youtube](https://www.youtube.com/c/midudev?sub_confirmation=1), la gente me pregunta: **¿por qué no usas punto y coma en Javascript?** De hecho alguno se lo toma incluso demasiado personal y llega a juzgar la calidad del programador por esta decisión (lo cuál, es bastante sorprendente).

Y es que, amigos, el debate de usar `;` al finalizar una sentencia en Javascript está [al nivel de usar espacios y tabulación en el código](https://www.youtube.com/watch?v=SsoOG6ZeyUI) (que igual eso da para otro artículo otro día). Por ello, **voy a intentar en este artículo presentarte las diferentes opciones sobre usar, o no, `;` y por qué yo personalmente no las uso.** No intento convencerte, solo faltaría, pero espero que con este artículo entiendas mis razones.

> **tldr;** *Por si no quieres leerte el tocho 🧱*: El código me parece más claro, me gusta escribir menos y considero que es indiferente hoy en día escribir o no el punto y coma porque existen herramientas como Prettier que formatean el código como más te guste.

### El caso de `;` en Javascript

**[Javascript](https://midu.dev/tags/javascript)** es un lenguaje de programación particular en muchas cosas (para algo lo crearon en poco más de una semana...ツ) y no iba a ser menos respecto al uso de punto y coma. El caso es que **Javascript requiere que *algunas* las declaraciones** terminen con `;`:

```javascript
// declaraciones con punto y coma
const string = 'Hola'; // <-- asignación
console.log(string); // <-- ejecución
i++; // <-- incremento
return true; // <-- return
```

**Sin embargo existen otras declaraciones que no necesitan terminar con punto y coma** como, por ejemplo, los bucles con `for`, `while`, o los condicionales `if`, `switch`, `try` o declarar una `function`:

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
} // <--- no necesita punto y coma

if (isTrue) {
  doSomething();
} // <--- no necesita punto y coma

function doMore() {
  const a = 1 + 2;
} // <--- no necesita punto y coma
```

Alguno podría pensar que la regla sería tan sencilla como pensar que después del token `}` nunca va `;` **pero no...** y es que si tenemos una asignación de un objeto o función, **Javascript necesita que exista.**

```javascript
const persona = {
  name: 'Miguel',
  twitter: '@midudev'
}; // <--- asignación

const sayHello = () => { console.log(`Hola ${persona.name}`) }; // <--- asignación
```

### Javascript requiere punto y coma, sí... pero no que lo escribas

Vale, hemos dicho que *Javascript* requiere que algunas declaraciónes terminen con `;` pero... **¡es opcional que la escribas!** Aunque suene esto contradictorio, lo que ocurre, es que cuando nuestro código Javascript pasa por el parseador, existe un [proceso llamado **ASI** (*Automatic Semicolon Insertion*)](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-rules-of-automatic-semicolon-insertion) que añade automáticamente un `;` en diferentes supuestos (que por temas de espacio, lo simplifico):

1. Al final de un archivo. (si todo fuese así de fácil ¯\\_(ツ)_/¯)
2. Antes de `}` al cerrar una función:

```javascript
function helloWorld () {
  return 'hola Mundo 🌍'
}
// después de ASI sería
function helloWorld () {
  return 'hola Mundo 🌍'; // <-- punto y coma
}
```
3. Al final de una línea cuando la siguiente comienza con un símbolo que no sigue la gramática del lenguaje 
**(*spoiler*: esta es la que más magia tiene).**

```javascript
if (isASIAwesome) writeSemicolon()
console.log(isASIAwesome)
```

La primera línea sería `if (isASIAwesome) writeSemicolon()` y la siguiente comienza con el símbolo (o *token*) `c` del `console.log`, por lo tanto *ASI* considera que tiene que añadir un punto y coma al final de la línea anterior ya que el token `c` no tendría sentido en la gramática del lenguaje.

```javascript
// tras pasar por ASI
if (isASIAwesome) writeSemicolon(); // siguiente token es 'c', mejor pongo ;
console.log(isASIAwesome); // final del archivo, pongo ;
```

Por ejemplo, esto sí tiene sentido en Javascript y ASI no añadiría puntos y coma en cada salto de línea:
```javascript
listOfNames[firsPosition]
  .split('.')
  .join(' ')

// tras pasar por ASI
listOfNames[firsPosition] // <-- el siguiente token es '.' y tiene sentido
  .split('.') // <-- el siguiente token es '.' y tiene sentido
  .join(' '); // <-- final de archivo
```

### Por qué no uso `;` en Javascript

Ahora que conoces que existe un sistema que se llama *ASI* que añade por ti los puntos y coma ([y que está bien documentado en ECMAScript](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-automatic-semicolon-insertion)), que es totalmente lícito hacerlo y que hasta [el creador de Javascript se arrepiente de no haber incluso haber ignorado por completo los puntos y coma](https://brendaneich.com/2012/04/the-infernal-semicolon/) deja que te cuente **por qué prefiero no escribir puntos y coma.**

Primero, porque **considero que los `;` me distraen del verdadero valor del código** y prefiero evitarlo, si puedo, para enfocarme en lo realmente importante.

Segundo, **evito perder tiempo escribiendo algo que realmente se va a añadir automáticamente** al parsearse. Escribo (y he escrito en mi vida 👨‍💻) muchas líneas como para apreciar cualquier carácter que me pueda evitar. 😆

Y, tercero, **la regla de no escribir `;` me parece más sencilla de seguir**. Si quisieramos añadir siempre punto y coma, como hemos visto, hay diferentes reglas que deberíamos seguir. Que seguramente ya la tenemos interiorizada y la vemos muy sencilla, pero a la hora de explicarle a alguien que empieza desde cero... siempre he visto problemas a la hora de entenderla.

Pero al no escribir `;` sólo existe una regla (fácilmente evitable y corregible por herramientas de linter) y es que **no puedes empezar una línea con `[`, \` o `(`** (hay más pero con nulas posibilidades que ocurran).

```javascript
const mensaje = 'hola'
[1, 2, 3].map(x => x * 2)

// después de ASI, se evaluaría esto
const mensaje = 'hola'[1, 2, 3].map(x => x * 2) // orgggggh
```

Esto ocurre por el supuesto número 3 en el que ASI actuaba que vimos en la sección anterior (o más bien la ausencia de ella), en el que, después de un salto de línea, si había un token que no tenía sentido en la gramática, añadía un `;`. **Pero resulta que en este caso sí tiene sentido ya que `[` puede significar que queremos acceder a una posición del string `hola`**, por lo que no añade ningún punto y coma al final.

La solución, es simple, aunque seguramente más de una persona le dé por echar espuma por la boca: **hay que añadir un punto y coma al inicio de la línea con el token problemático.**

```javascript
const mensaje = 'hola'
;[1, 2, 3].map(x => x * 2) // -> iniciamos esta línea con punto y coma
```

Ahora bien, **no os voy a convencer que aunque es una única regla sea algo sencillo. Porque no lo es y olvidarse de ello puede resultar en una fatalidad.** Pero sí os quiero convencer que **hoy en día deberíais tener sí o sí un linter para que hagan el trabajo por nosotros**. `standard` y otros linters solucionan automáticamente este problema gracias a la regla [`no-unexpected-multiline`](https://eslint.org/docs/rules/no-unexpected-multiline) aunque hay que decir que MUY rara vez este problema existe en un código real ya que, normalmente, ese tipo de código lo escribiríamos de otra forma.

### Por qué usar `;` en Javascript

Ahora que sabemos que ASI añade automáticamente los `;` que Javascript necesita. **¿Por qué no fiarnos de ese sistema?** En este punto hay diferentes motivos por los que un desarrollador puede decidir no hacerlo.

Hay muchas razones para decidir usar `;`... pero una de ellas no puede ser *"no me interesa aprender cómo funciona ASI"* ya que este motivo, que lo he escuchado alguna vez, **es un completo error ya que ASI existe y va a existir siempre en Javascript**. Y, lo que es peor, de la misma forma que antes hemos visto que la ausencia de puntos y coma tiene algún corner case, en el caso de añadirlos también existen.

Pongamos el ejemplo de este código y uno de los errores más típicos. Al asegurarnos que ponemos punto y coma en todos sitios, no significa que todo funcione como esperamos (y no saber cómo funciona ASI, no ayuda):

```javascript
function foo () {
  return 
  {
    name: 'bar'
  }; // este punto y coma me indica que termina la sentencia del return
}; // <-- este no hace falta pero, por usar ;, que sea siempre! :D
```

**¿Esto que devuelve?** Esto devuelve `undefined` ya que *ASI* ha añadido un punto y coma automáticamente en el *return* de la segunda línea de la siguiente forma pese a que nosotros habíamos añadido uno para indicarle donde era la declaración.

```javascript
function foo () {
  return; // <-- ASI te ha metido un regalito aquí 🎁
  {
    name: 'bar'
  };
};
```

Si te gusta añadir puntos y coma porque te parece más agradable de leer, porque te parece más correcto (aunque objetivamente no es ni más ni menos correcto en Javascript), porque estás más acostumbrado... **pues, ¡sigue haciéndolo!**

#### Conclusiones y por qué pienso que todo lo que he escrito no importa

**Espero que ahora me entiendas mejor.** Si eres de los míos y no escribes puntos y coma, genial. Si sigues escribiendo punto y coma en todas tus declaraciones (bueno, todas no, que ya hemos visto que sólo son algunas 😜) pues... **¡genial también! 👏**

Sinceramente creo que hoy en día cualquiera de las dos decisiones son correctas y más teniendo la posibilidad que herramientas como `eslint`, `standard` o `prettier` existen. Y, básicamente, deja que tengas que preocuparte de todo esto. 

Creo, eso sí, que **es importante saber cómo funciona la inserción automática de puntos y coma en Javascript**, de forma que conozcas bien el lenguaje. Con las herramientas mencionadas anteriormente vas a evitarte problemas, pero nunca está de más conocer estos pequeños detalles.

Para terminar, sólo un deseo. **No perdáis el tiempo en este tipo de discusiones. Al final, lo que le da valor a vuestros usuarios no es la ausencia ni presencia de puntos y coma.** [No seáis haters ༼ ༎ຶ ෴ ༎ຶ༽](https://github.com/standard/standard/issues/78)