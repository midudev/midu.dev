---
title: "Eliminar primer carácter de una cadena de texto en JavaScript"
date: '2021-07-27'
description: Instrucciones para eliminar el primer carácter de un string en JavaScript de diferentes maneras
toc: true
tags:
  - javascript
---

**Los strings son tipos primitivos en JavaScript** y, por lo tanto, son inmutables. Esto quiere decir que no pueden ser modificados así que para realizar un cambio en una cadena de texto, en realidad, **tienes que crear un nuevo string.**

Para eliminar el primer carácter de un string en JavaScript, hay dos formas:

## 1. Usando el método `slice()`

El mejor método para **conseguir una cadena de texto derivada de otra en JavaScript** es `slice`. Este método **recibe dos parámetros** que indica la posición de inicio y la posición de fin de la cadena de texto a extraer.

Lo interesante es que **puedes usar índices con valores negativos** para indicar valores relativos al final de la cadena de texto.

```javascript
const str = '*platano_'
const newStr = str.slice(1, -1)
console.log(newStr) // platano
```

En cambio, si solo quieres eliminar el primer carácter de un string, sólo necesitarías usar el primer parámetro, ya que entenderá que quieres recuperar el resto del string.

```javascript
const str = '_midudev'
const newStr = str.slice(1)
console.log(newStr) // 'midudev'
```

## 2. Usando el método `substring()`

Como el nombre indica, este método nos permite **recuperar una subcadena de un string**. Para ello recibe dos parámetros que serán el inicio y el final de la subcadena que queremos recuperar.

```javascript
const str = '*platano_'
const newStr = str.substring(1, str.length - 1)
console.log(newStr) // platano
```

Fíjate que debemos guardar en una nueva variable el resultado de la operación `substring`, ya que el string original no se modifica.

Ahora, para eliminar el primer carácter, lo que podemos hacer es simplemente usar el primer parámetro, indicando que queremos recuperar toda la cadena pero a partir de la posición 1 del string:

```javascript
const str = '_midudev'
const newStr = str.substring(1)
console.log(newStr) // 'midudev'
```

## ¿Qué diferencia hay entre `slice` y `substring`?

La diferencia es que `slice` permite usar índices negativos relativos respecto al final del *string* mientras que `substring` no. La diferencia es sutil pero lo cierto es que hace que `slice` sea más interesante, ya que es más completo y más fácil de entender.

## No uses `substr()`

Por favor, no uses el método `substr()`. Aunque sigue funcionando, **su uso está obsoleto** y es recomendable que uses una de las dos alternativas mencionadas anteriormente.
