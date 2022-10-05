---
title: ¿Cómo funciona realmente la igualdad ==?
date: '2021-07-24'
description: En JavaScript puedes usar == o === para hacer comparaciones. Deberías usar siempre el estricto pero te explico como funciona el ==.
toc: true
tags:
  - javascript
---

## == no siempre hace transformación de tipos

Cuando hacemos una igualdad usando `==` mucha gente cree que JavaScript usa la **coerción de datos** para comparar ambos valores. Pero lo cierto es que **no es exactamente así.** Al usar este tipo de igualdad, lo que ocurre en realidad, es que entra en acción otro tipo de mecanismo.

El mecanismo consiste en una serie de pasos y comprobaciones para identificar si la igualdad es cierta o no y, sólo en ocasiones, utiliza la coerción de datos para poder comparar ambos valores. Gracias a esto, ocurren cosas como esta:

```javascript
2 == "2" // true
true == 1 // true
"" == 0 // true
undefined == null // true
"true" == true // true
"false" == false // false
```

Sabemos que hay transformación de tipos de datos, de *String* a *Number* o viceversa, porque estamos haciendo comparaciones entre tipos distintos y, sin embargo, *JavaScript* nos está diciendo que algunas condiciones son verdaderas.

Así que entendemos que se ejecuta un proceso para hacer la transformación de estos datos pero seguramente desconoces exactamente el algoritmo hay detrás para determinar este resultado.

Y es que... ¿por qué `null == 0` es entonces `false`? ¿No hace ahí una coerción de tipos?

### Explicación del algoritmo de comparación en ==
El algoritmo tiene nombre y se llama ***Abstract Equality Comparison Algorithm*** (Algoritmo de comparación de Igualdad Abstracta) y está [bien documentado][Ref].

La regla dice que en una comparación `x == y`, donde `x` e `y` son valores, devolverá `true` o `false`...

* Si `x` e `y` son del mismo tipo:
  * Si `x` es `undefined` o `null` devolverá `true`
  * Si `x` es un `Number` entonces:
    * Si `x` o `y` es `NaN` entonces devolverá `false`.
    * Si `x` es el mismo valor numérico que `y` devolverá `true`
    * Si `x` es 0 e `y` es 0, independientemente de su signo, devolverá `true`.
    * En cualquier otro caso, será `false`
  * Si `x` es `String` entonces será `true` si `x` e `y` tienen la misma secuencia de carácteres (misma longitud y posición). Si no, será `false`.
  * Si `x` es `Boolean` entonces devolverá `true` si ambos son `true` o ambos son `false`. Si no, será `false`.
  * Si `x` e `y` están referenciando al mismo objeto será `true`, si no `false`. 
* Si `x` es `null` e `y` es `undefined` será `true`. 
* Si `y` es `undefined` e `y` es `null` será `true`. 
* Si `x` es `Number` e `y` es `String` devuelve el resultado de comparar `x == Number(y)`
* Si `x` es `String` e `y` es `Number` devuelve el resultado de comparar `Number(x) == y`
* Si `x` es `Boolean`, devuelve el resultado de comparar `Number(x) == y`
* Si `y` es `Boolean`, devuelve el resultado de comparar `x == Number(y)`
* Si `x` es `String` o `Number` e `y` es `Object` devuelve el resultado de comparar `x == toPrimitive(y)`
* Si `x` es `Object` e `y` es `String` o `Number` devuelve el resultado de comparar `toPrimitive(x) == x`
* El resto de casos devuelve `false`

> Cuando un Object (un objeto, array, function...) se convierte al primitivo... es muy tricky. Por ejemplo, al comparar un string con un array, el array pasaría a ser un String y al convertir un array vacio a string es un string vacio. En cambio el objeto {} a string pasa a ser "[object Object]".

Como ves, **el algoritmo no hace sólo una conversión de tipos y ya está**. Es bastante más complejo que eso y, en ocasiones, ni siquiera es necesario transformar los tipos.

Si siempre hiciese coerción de datos `null == 0` sería `true` pero en cambio es `false` pero si hicieramos `Number(null) == 0` o `Boolean(null) == 0` sí que serían ambos `true`. Así que ya ves que no es correcto decir que `==` hace una coerción de los tipos a secas... si no que entra en juego un algoritmo de comparación de igualdad más complejo (y documentado).

De esta forma ya puedes probar a seguir este algoritmo para determinar igualdades con `==` para determinar qué resultado te va a esperar. De hecho, te dejo aquí una lista para que practiques... ¡a ver qué tal!

## Práctica de comparación de igualdad con ==

```javascript
window.midudev == null
"si" == "si"
"talvez" == " talvez"
"null" == null
null == "null"
undefined == 0
null == 0
2 == "2"
"[object Object]" == {a: 'b'}
;({a: 'b'}) == "[object Object]"
"" == []
"" == {}
```

[Ref]: https://262.ecma-international.org/5.1/#sec-11.9.3 "The Abstract Equality Comparison Algorithm"
