---
title: Symbols en JavaScript. ¿Qué son y para qué sirven?
date: '2022-12-20'
description: Los Symbols en JavaScript son un tipo de dato primitivo pero poca gente sabe su utilidad. ¡Te la explico en este artículo!
toc: true
tags:
- javascript
---

Los *Symbols* (símbolos en español) son un tipo de dato primitivo en JavaScript que se introdujo en *ECMAScript 6*. Que sean primitivos quiere decir que está al nivel de los *String*, *Number*, *Boolean* y compañía.

Pero... ¿Qué son? Un símbolo es único. Esto quiere decir que, cada vez que creamos uno nuevo, es completamente diferente y no se compara con ningún otro símbolo, incluso si se crean a partir del mismo valor.

Los símbolos se utilizan principalmente para crear propiedades de objetos privadas o para crear una forma de nombrar eventos de forma única. Sirven para asegurarnos que creamos una referencia única que nunca colisionará con otra.

## ¿Cómo se crea un `Symbol`?

Para crear un símbolo, se utiliza la función `Symbol()`. Opcionalmente, se puede pasar una cadena como argumento, que se utiliza como descripción del símbolo. **Esta descripción no es accesible en ningún lugar del código** y solo se utiliza para fines de depuración.

```javascript
const mySymbol = Symbol()
const mySymbolWithDescription = Symbol('descripción del símbolo')

// los símbolos son únicos
Symbol() === Symbol() // false
// incluso con la misma descripción
Symbol('a') === Symbol('a') // false 
```

Si quieres crear un símbolo a partir de una cadena de texto, puedes usar el método `Symbol.for()`. Esto crea un símbolo globalmente compartido, lo que significa que siempre se devuelve el mismo símbolo para una clave dada.

```javascript
const sharedSymbol = Symbol.for('shared symbol')
const sameSharedSymbol = Symbol.for('shared symbol')

sharedSymbol === sameSharedSymbol // true
```

Una vez que se ha creado un símbolo, **se puede utilizar como clave en un objeto**. Pero ten cuidado porque **los símbolos no se enumeran cuando se itera sobre las propiedades de un objeto**. Se podría decir que son como propiedades privadas, en cierto modo.

```javascript
const mySymbol = Symbol('property of object')
const myObject = {
  [mySymbol]: 'This is the value'
}

console.log(myObject[mySymbol]); // 'This is the value'
```

Los símbolos también se pueden utilizar como eventos únicos. Por ejemplo, si queremos crear una función que se ejecute cuando se hace clic en un elemento del DOM, podemos utilizar un símbolo para nombrar de forma única el evento y evitar conflictos con otros eventos que puedan estar en el mismo elemento.

```javascript
const clickEventSymbol = Symbol('Click event')

element.addEventListener(clickEventSymbol, () => {
  console.log('Click event triggered')
})
```

En resumen, los símbolos son un tipo de dato único en JavaScript que **se pueden utilizar para crear propiedades de objetos privadas o para nombrar eventos de forma única**.

Se crean utilizando la función `Symbol()` o el método `Symbol.for()` y se pueden utilizar como claves en objetos o como nombres de eventos.
