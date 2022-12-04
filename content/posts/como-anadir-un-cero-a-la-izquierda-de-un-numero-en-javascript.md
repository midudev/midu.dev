---
title: 'Cómo añadir un cero a la izquierda de un número en JavaScript'
date: '2022-12-05'
description: Cómo usar el método padStart para añadir ceros a la izquierda de un número en JavaScript
toc: true
tags:
  - javascript
---

A veces es necesario darle un formato específico a un número en **JavaScript** para cumplir con ciertos requisitos.

Por ejemplo, cuando se trabaja con fechas y horas, puede ser necesario añadir un cero a la izquierda de los números menores que 10 para que se muestren con dos dígitos.

Afortunadamente, **JavaScript nos proporciona una manera fácil de añadir un cero a la izquierda de un número**. Podemos usar el método `toString()` junto con el método `padStart()` para lograr esto.

Por ejemplo, si queremos añadir un cero a la izquierda del número 1, podemos escribir lo siguiente:

```javascript
const number = 1
console.log(number.toString().padStart(2, '0'))
```

En este caso, el método `toString()` convierte el número 1 en una cadena de texto, y luego el método `padStart()` añade un cero a la izquierda de la cadena hasta que tenga una longitud de dos dígitos.

También podemos añadir un cero a la izquierda de un número que ya es una cadena de texto, como en el siguiente ejemplo:

```javascript
const number = '5'
console.log(number.padStart(2, '0')) // 05
```

Si intentas ejecutar el código en un string que ya es de dos dígitos, el método `padStart()` no hará nada:

```javascript
const number = '10'
console.log(number.padStart(2, '0')) // 10
```

En este caso, el método `padStart()` no añade ningún cero a la izquierda porque el string ya tiene dos dígitos.

En resumen, para añadir un cero a la izquierda de un número en JavaScript, podemos usar el método toString() junto con el método padStart(). Este enfoque es fácil de usar y nos permite darle un formato específico a los números de manera sencilla.
