---
title: React Hooks, useState. Añadiendo estado a nuestro componente funcional - II
date: '2019-02-07'
image: '/images/react-hooks-use-state.png'
description: Los componentes en React pueden tener un estado interno que determina cómo se debe renderizar. Con los hooks podremos crear componentes dinámicos e interactivos muy fácilmente.
language: 🇪🇸
---

Como ya hemos visto en [la entrada anterior](http://midudev.com/react-hooks-introduccion-saca-todo-el-potencial-sin-class/), los hooks son funciones especiales que nos permiten acceder a las funcionalidades de React. En este artículo vamos a ver uno de los hooks más importantes `useState`, con el que **podremos añadir un estado interno a nuestros componentes para hacerlos dinámicos e interactivos.**

## useState: añadiendo estado 🔁 a nuestro componente funcional

Para usar este hook, primero debemos importarlo desde la librería de React.

```jsx
import React, { useState } from 'react'
```

Ahora, en nuestro componente funcional, **vamos a inicializar el estado interno de nuestro componente.** Para eso, ejecutaremos el método `useState` y le pasaremos como parámetro el valor inicial del estado, que en nuestro caso queremos que sea el número 0.

{{< highlight jsx "hl_lines=4" >}}
import React, { useState } from 'react'

function Contador() {
  const [count, setCount] = useState(0)
  // ...
{{< / highlight >}}

Ejecutar el método `useState` con el valor inicial de nuestro estado **nos devuelve un array que tendrá el valor del estado y un método para actualizar el estado.**

Supongo que habréis notado los símbolos `[` y `]` y **quizás te estás preguntando qué significan si no estás habituado con la nueva sintaxis de Javascript.** Esta característica se llama `array destructuring` y básicamente nos permite extraer los elementos de un array y crear variables directamente. En este caso estamos extrayendo la primera posición del array, donde tendremos el valor del state, y lo llamamos `count`. En la segunda posición, que le llamamos `setCount` nos devuelve el método que ejecutaremos para actualizar el estado más adelante.

Para que lo veáis más claro, **podríamos hacer el mismo ejemplo utilizando la sintaxis más clásica:**

{{< highlight jsx "hl_lines=4 6-7" >}}
import React, { useState } from 'react'

function Contador() {
  const counterState = useState(0) // ejecutar useState devuelve un array

  const counter = counterState[0] // el primer elemento es el valor del state
  const setCounter = counterState[1] // el segundo elemento es el método para actualizar el state
  // ...
{{< / highlight >}}

**Como véis, no deja de ser un array de dos posiciones.** Por legibilidad os recomiendo que siempre uséis la desestructuración del array y pongáis nombres claros y concisos sobre lo que hacen.

Esto significa que, aunque es recomendable usar nombres semánticos que tengan sentido con lo que estamos haciendo, **eres totalmente libre de poner el nombre que más te interese a la hora de extraer estos dos métodos del array.**

## Cómo leer el estado de nuestro componente 👀

**Leer el valor del estado es muy sencillo ya que es, simplemente, utilizar una variable.** Es la que hemos guardado en `count`. Una vez lo tenemos, ya podremos usarlo donde lo necesitemos. Por ejemplo, podríamos mostrar el valor actual del estado si en el renderizado evaluamos su valor envolviéndolo con `{}` de la siguiente forma.

{{< highlight jsx "hl_lines=6" >}}
import React, { useState } from 'react'

function Contador() {
  const [count, setCount] = useState(0)
  return (
    <span>El contador está a {count}</span> 
  )
}
{{< / highlight >}}

Como véis, hasta este punto, **ya se ve la ventaja y la claridad respecto a usar clases para tener un state en nuestro componente.** No necesitamos referirnos al contexto `this` para acceder al state, ni tenemos que inicializarlo como propiedad de nuestra clase porque, oh, tampoco necesitamos ninguna clase. **Aquí os lo dejo para que veáis vosotros mismo la diferencia.**

```jsx
import React, { Component } from 'react'

class Contador extends Component {
  state = { count: 0 }
  
  render () {
    return <span>El contador está a {this.state.count}</span>
  }
}
```

## Cómo actualizar el estado de nuestro componente 🖍

De la misma forma que antes utilizábamos el método `this.setState` para actualizar el estado, ahora tendremos que utilizar el método `setCount` que hemos recuperado al usar `useState` para pasar como parámetro el nuevo valor que tenga el state. 

Vamos a ver un ejemplo donde actualizamos el valor del estado de `count` al hacer click en un botón.

{{< highlight jsx "hl_lines=8" >}}
import React, { useState } from 'react'

function Contador() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span>El contador está a {count}</span> 
      <button onClick={() => setCount(count + 1)}>
        Incrementar contador
      </button>
    </div>
  )
}
{{< / highlight >}}

Y aquí tenéis el código funcionando para que trasteéis con él.

{{% code id="rlkrzn43j4" height="300" tab="both" %}}

## useState vs setState: cambiando la mentalidad 🧠

En los ejemplos anteriores hemos visto el caso de un `state` sencillo, que es sólo un número pero... **¿qué pasa con estados más complejos?** Hasta ahora, el `state` de nuestros componentes de clases era siempre un objeto. Es posible que estéis tentados a seguir con la misma mentalidad que hasta ahora pero os podéis encontrar con problemas al respecto. Y es que **el método `this.setState` recibía un objeto con las nuevas propiedades del state y fusionaba el nuevo state que se le pasaba con el state que ya tenía.** Por ejemplo:

```javascript
// este es el estado inicial
this.state = {
  isLoading: true,
  hasResults: false,
  literal: 'Star Wars'
}
// ejecutamos setState con lo que cambia del state
this.setState({ isLoading: false }) 
// el state nuevo es la mezcla entre el nuevo state y el antiguo
console.log(this.state)
// { isLoading: false, hasResults: false, literal: 'Star Wars'}
```

Así es como funcionaba al utilizar el `state` que proporcionaban las clases de React **pero, ahora, funciona completamente de forma diferente.** Imaginad que queremos replicar el mismo state que teníamos en el ejemplo anterior. A priori, podríamos pensar en hacer algo así.

```javascript
// ⛔️ THIS CODE IS WRONG AND IS ONLY FOR DEMO PURPOSES!
const [state, setState] = useState({
  isLoading: true,
  hasResults: false,
  literal: 'Star Wars'
})
// ejecutamos el setState para actualizar la parte que cambia
setState({ isLoading: false })
// el nuevo state es... incorrecto!
console.log(state) // { isLoading: false }
```

La diferencia es que, el método `this.setState` fusionaba el objeto del estado anterior con la parte del estado nuevo que queremos actualizar y que le pasábamos como parámetro. En cambio, **el nuevo método `useState` nos devuelve un método para actualizar el `state` pero, lo que hará, es machacar el estado anterior y poner el nuevo.**

En este caso, podríamos solucionarlo pasando el valor previo del estado a la hora de actualizarlo, de forma que no perdamos la información **pero, ya te adelanto, que esto no es lo que vamos a querer hacer:**

```javascript
// ⚠️ THIS CODE COULD WORK BUT STILL IS NOT WHAT WE WANT
const [state, setState] = useState({
  isLoading: true,
  hasResults: false,
  literal: 'Star Wars'
})
// ejecutamos el setState para actualizar la parte que cambia
setState({ ...state, isLoading: false })
// el nuevo state es... incorrecto!
console.log(state) // { isLoading: false, hasResults: false, literal: 'Star Wars' }
```

Eso, en este caso, podría funcionar. Pero hay diferentes cuestions. Lo primero es que, **con un estado más complicado con más niveles, podría no funcionar** dependiendo de cómo querríamos hacer las actualizaciones. Y, lo segundo, es que **estaríamos actualizando partes del estado sin que haya necesidad.**

Debemos cambiar nuestra mentalidad de cómo gestionamos el state con el hook `useState`. **La buena práctica a partir de ahora sería separar el estado en pequeños trozos, cada uno con su propio `useState` de la siguiente forma.**

```javascript
// ✅ SEPARATING THE STATE
const [isLoading, setIsLoading] = useState(true)
const [hasResults, setHasResults] = useState(false)
const [literal, setLiteral] = useState('Star Wars')
// ✅ WE ONLY UPDATE WHAT IS NEEDED
setIsLoading(false)

console.log(isLoading) // false
```

Como véis, hemos usado un `useState` para cada parte del state y, cada uno, lo hemos inicializado con su valor inicial correspondiente. De esta forma obtenemos una mayor legibilidad, tenemos el estado separado en pequeñas partes y, además, **somos mucho más claros a la hora de actualizarlo.**

## Conclusiones sobre useState

Con esto ya hemos conocido en profundidad nuestro primer hook y, seguramente, uno de los más importantes. **El hook `useState` va a ser nuestro principal aliado para crear componentes dinámicos que deben renderizarse según los cambios que ocurran en la interfaz del usuario.**

Además de aprender a usarlo, **también hemos comentado cómo debemos cambiar nuestra mentalidad a la hora de separar el estado de nuestro componente en partes.** Mientras que antes teníamos un sólo objeto con todo el estado, ahora con el hook `useState` deberemos dividirlo en trozos. No sólo porque a la hora de actualizarlo se comporta diferente al `this.setState` más clásico, si no **para hacer nuestro código más legible y siempre actualizar sólo la parte que toca.**

En el próximo artículo aprenderemos a usar el hook `useEffect`, que nos permitirá ejecutar código arbitrariamente cada vez que nuestro componente se monte, se actualice y se desmonte.
