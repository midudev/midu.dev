---
title: Type casting en TypeScript
date: '2022-07-14'
description: Typecasting es una técnica que te permite la conversión de un tipo a otro 
toc: true
tags:
- typescript
---

JavaScript es un lenguaje de programación con tipos dinámicos. Eso permite que podamos cambiar los tipos de las variables muy fácilmente o tratar que sabemos qué tipo es aunque no sea conocido de antemano.

**Esto en TypeScript cambia.** A veces es imposible saber el tipo exacto de la variable ya que existen demasiadas posibilidades y TypeScript no es capaz de determinarlo en tiempo de compilación.

Este sería un ejemplo:

```typescript
const input = document.querySelector('.input')
const inputValue = input.value
```

Con esto tenemos dos errores:
* `Object is possibly 'null'`
* `Property 'value' does not exist on type 'Element'.`

El primero es porque, al hacer un `document.querySelector` es posible que no encontremos el elemento en el DOM y, por lo tanto, recibamos un `null`.

Lo podemos arreglar así:

```typescript
const input = document.querySelector('.input')
const inputValue = input != null ? input.value : ''
```

Pero todavía tenemos el error de `Property 'value' does not exist on type 'Element'.`. ¿Por qué pasa esto?

Lo que ocurre es que *TypeScript* no es capaz de saber que el tipo que va a recibir es exactamente un `HTMLInputElement`. Por eso no puede asegurarte que vaya a poder acceder a la propiedad `value` del elemento.

Esa es la razón por la que determina que el tipo es `Element` uno más genérico que engloba todas las posibilidades.

## ¡Pero nosotros sabemos el tipo!

Claro, nosotros *sabemos* que el elemento que nos va a devolver es un `HTMLInputElement`. ¿Cómo podemos forzarlo? Una forma de solucionarlo sería así:

```typescript
const input: HTMLInputElement | null = document.querySelector('.input')
const inputValue = input != null ? input.value : ''
```

No es una mala opción pero esto nos obliga a indicar el resto de tipos que podría tener la variable (por eso indicamos el `| null`). **¿Qué pasa si el día de mañana esto cambia y hay otros posibles tipos que devuelven?**

Otra opción sería indicarle a *TypeScript* que el tipo que va a recuperar no es `Element` si no `HTMLInputElement`:

```typescript
const input = document.querySelector<HTMLInputElement>('.input')
const inputValue = input != null ? input.value : ''
```

De esta forma lo hacemos en el momento de la asignación y, además, no tenemos que saber qué otros tipos podría devolver la llamada de este método (en este caso, `null`).

Otra opción, que yo no recomendaría, sería utilizar el `as` para hacer el casting:

```typescript
const input = document.querySelector('.input')
const inputValue = input != null ? (input as HTMLInputElement).value : ''
```

**No la recomiendo ya que estarías arrastrando continuamente el casting** a todos los lugares que quieras acceder a algo del elemento.

## A tener en cuenta al usar casting...

Una cosa que debes tener en cuenta es que *TypeScript* se va a fiar ciegamente que la conversión de tipos que estás haciendo es correcta. Si le dices que va a ser un `HTMLInputElement` va a fiarse que esto siempre va a ser así. Vamos, que es tu responsabilidad que esto sea cierto.

Aquí tienes un ejemplo:

```typescript
const text = document.querySelector('.text')
console.log((text as HTMLInputElement).value)
```

El problema es que aunque el elemento realmente no sea un `input`, *TypeScript* no se va a quejar en ningún momento de este error por lo que puedes tener la falsa sensación que los tipos están bien pero... ¡no es así!

Y es que, tienes que tener en cuenta que TypeScript NO funciona en tiempo de ejecución (que es cuando se evalua el código y recupera el elemento gracias al selector).