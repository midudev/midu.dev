---
title: Malas prácticas en JavaScript
date: '2022-09-11'
description: Se habla mucho de las buenas prácticas en programación pero... ¿qué pasa con lo que debes evitar?
topic: javascript
tags:
- javascript
---

Todo el mundo habla de las buenas prácticas en programación. Pero ¿qué pasa con lo que debes evitar?

Vamos a hablar algunas malas prácticas en JavaScript que debes evitar a toda costa. ¡Te las explico para que no te pase!

## Crear objetos y arrays con el constructor

A la hora de crear objetos y arrays NO uses el constructor.

Aunque el resultado es el mismo, el segundo es más corto y más fácilmente reconocible.

```javascript
// ❌
const object = new Object()
const array = new Array()

// ✅
const object = {}
const array = [] 
```

## Usar `var` en vez de `let` y `const`

NO uses var en pleno 2022...

Hoy en día deberías usar sólo `let` y `const`:
- El ámbito está más claro (entre llaves)
- No crea objetos globales.
- Da error si los redeclaras.

La única excusa es que todavía soportas IE11 y no puedes transformar tu código con Babel o similares.

```javascript
// ❌ Usando var
var name = 'Miguel'
if (name === 'Miguel') {
  var name = 'Midu'
}
console.log(name) // 'Midu'

// ✅ Usando let y const
const name = 'Miguel'
if (name === 'Miguel') {
  let name = 'Midu'
}
console.log(name) // 'Miguel'
```

## Usar y abusar de las funciones impuras

Las funciones impuras son aquellas que no siempre devuelven lo mismo o que leen (o escriben) información que puede cambiar fuera del ámbito de su código.

Son mucho más difíciles de entender, de hacer tests y de depurar.

Evítalas siempre que puedas:

```javascript
const STOP_WORDS = ['a', 'and', 'the', 'or']
let inputSearch = 'The new iPhone or a new clone'

// ❌ slugify es una función impura
const slugify = () => inputSearch
    .split(' ')
  	.map(n => n.toLowerCase())
    .filter(n => !STOP_WORDS.includes(n))
    .join('-')

slugify()

// ✅ Función pura, pasando parámetros
const slugify = ({input, stopWords }) => {
  return input
    .split(' ')
  	.map(n => n.toLowerCase())
    .filter(n => !stopWords.includes(n))
    .join('-')
}

// Ahora es más extensible, fácil de hacer tests
// y de reutilizares en otros proyectos
slugify({ input: 'The new iPhone or a new clone', stopWords: STOP_WORDS })
```

## Usar los comentarios para explicar el código

Si usas comentarios explica el por qué del código y no cómo lo estás haciendo. Tu código debería ser entendible para todos sin necesidad de añadir explicaciones pero a veces la decisión de por qué se necesita el código sí necesita contexto.

```javascript
// ❌
// La variable a es la edad, revisamos
// que sea mayor de 18
if (a > 18) {
  // Si es mayor de 18, entonces
  // entramos aquí
}

// ✅
// [JIRA-3618]: Los usuarios menores de edad
// son redirigidos a la página de acceso
// hasta que habilitemos los filtros necesarios
if (age > 18) { ... }
```

## Conversión de tipos con operadores

Deja de convertir tipos en JavaScript usando operadores.

En su lugar, utiliza los métodos habilitados para ello.
Son mucho más entendibles y justamente esa es su función.

Ahorrarte unos bytes no justifica la perdida de comprensión por otras personas.

```javascript
const number = 0
const string = '7'

// ❌
!!number; // false
+string; // 7
number + ''; // '0'

// ✅
Boolean(number); // false
Number(string); // 7
String(number); // '0'
```

## No utilices un if para devolver true/false de una condición

NO utilices un `if` para devolver true o false.

Es un error muy común, que no aporta absolutamente nada.

Si según una condición ya estás determinando el booleano, devuélvelo directamente.

```javascript
// ❌ Innecesario if
if (num > 0 && num % 2 === 0) {
  return true
} else {
  return false
}

// ✅ Devolvemos directamente el booleano
return num > 0 && num % 2 === 0
```

## No utilices `==` para comparar valores

El operador `==` de JavaScript hace una comparación entre dos valores.

El problema es que en este proceso un complicado algoritmo entra en acción, usando la conversión de tipos en algunos casos...

Mejor usar siempre la igualdad estricta `===` para comparar valor y tipo.

```javascript
// ❌
const number = 0
const string = '0'
const bool = false
const nil = null

number == bool // true
string == number // true
nil == string // false OJO!
number == nil // false OJO!

// ✅
number === bool // false
string === number // false
nil === string // false
number === nil // false
```

## Magic Strings y Magic Numbers

NO uses Magic Strings o Magic Numbers en tu código.

Estos son valores que aparecen en mitad de tu código, que además podrían ser reusables, y que no tienen contexto por si mismos pero sí una utilidad.

Son difíciles de entender y de depurar. Por ejemplo:

```javascript
// ❌
if (age > 18) {}
const isMiduConf = confId === 1
return productType === 'swk'

// ✅
const AGE_ADULTHOOD = 18
const MIDU_CONF_ID = 1
const SOFTWARE_KEYS_TYPE_ID = 'swk'

if (age > AGE_ADULTHOOD)
const isMiduConf = confId === MIDU_CONF_ID
return productType === SOFTWARE_KEYS_TYPE_ID
```

## async/await que no maneja errores

RECUERDA poner un try/catch en tu async/await.

Si tu promesa puede hacer lanzar una excepción, algo muy probable, es posible que tu proyecto explote si no la manejas.

Recuerda manejarlas para evitarlo:

```javascript
async function downloadImage(img = 'panda.png') {
  let response = await fetch(img)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.blob()
}

// ❌
const img = await downloadImage()

// ✅
let img
try {
  img = await downloadImage()
} catch {
  img = DEFAULT_IMG
}

// ✅
const img = await downloadImage().catch(() => DEFAULT_IMG)
```

Si quieres **Aprender JavaScript completamente gratis**, te recomiendo que te apuntes a [https://aprendejavascript.dev/](https://aprendejavascript.dev/).
