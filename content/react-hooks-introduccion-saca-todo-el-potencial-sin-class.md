---
title: React Hooks, saca todo el potencial de React sin escribir clases - I
date: '2019-02-06'
image: '/images/react-hooks.jpeg'
description: Con la nueva característica de React, llamada Hooks, podremos utilizar los componentes funcionales para sacar todo el potencial a la librería. Algo que, hasta hace poco, sólo era posible con las clases.
language: 🇪🇸
---

[¡Ya está disponible React 16.8.0, la versión que trae los Hooks!](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html). Y, para celebrarlo, voy a iniciar una serie de artículos y [vídeos que iré publicando en mi canal de YouTube](https://www.youtube.com/c/midudev?sub_confirmation=1) con los que espero **cubrir todo sobre esta nueva API de React que promete permitirnos olvidarnos de usar clases para crear componentes en React.** En esta primera entrega vamos a ver un primer ejemplo, muy sencillo, para dotar de estado a un componente funcional (creado con una `function`) usando el hook `useState`. Pero antes...

## ¿Qué son los Hooks?

**Los Hooks son una nueva API de la librería de React que nos permite tener estado, y otras características de React, en los componentes creados con una `function`.** Esto, antes, no era posible y nos obligaba a crear un componente con `class` para poder acceder a todas las posibilidades de la librería. Y de ahí viene el nombre. _Hooks_ es gancho y, precisamente, lo que hacen, es que te permiten _enganchar_ tus componentes funcionales a todas las características que ofrece React.

Para que veamos en qué consisten vamos a ver como, hasta ahora, podíamos crear un componente Contador que tenía un estado interno que, al hacer click en un botón, se actualizaba y mostraba el número de veces que habíamos pulsado el botón. Todo esto creando un componente con `class`. 

```jsx
import React, { Component } from 'react'

class Contador extends Component {
  state = { count: 0 } // inicializamos el state a 0

  render () {
    const { count } = this.state // extraemos el count del state

    return (
      <div>
        <p>Has hecho click {count} veces</p>
        { /* Actualizamos el state usando el método setState */}
        <button onClick={() => this.setState({ count: count + 1)}>
          Haz click!
        </button>
      </div>
    )
  }
}
```

Ahora, gracias a los hooks, podremos conseguir el mismo resultado utilizando una `function` e importando el hook `useState` de la siguiente forma:

{{< highlight jsx "hl_lines=2 9 15" >}}
// importamos useState, el hook para crear un state en nuestro componente
import React, { useState } from 'react'

function Contador() {
  // useState recibe un parámetro: el valor inicial del estado (que será 0)
  // y devuelve un array de dos posiciones:
  //  la primera (count), tiene el valor del estado
  //  la segunda (setCount), el método para actualizar el estado
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Has hecho click {count} veces</p>
      { /* actualizamos el state al hacer click con setCount */ }
      <button onClick={() => setCount(count + 1)}>
        Haz click!
      </button>
    </div>
  )
}
{{< / highlight >}}

_[Podéis jugar con el ejemplo anterior en este CodeSandbox que os he preparado.](https://codesandbox.io/s/v83v5mk1py)._

En el ejemplo usamos el hook `useState` para hacer que nuestro componente funcional `Contador` tenga un estado interno. Además de las diferencias evidentes, existe otro cambio sustancial y es la forma en la que actualizamos el `state`. En lugar de usar el clásico método `this.setState` ahora lo actualizamos usando el método `setCount` que tendrá como objetivo sólo y exclusivamente actualizar su estado en concreto.

Tal y como ya pasaba con el componente con `class` ahora, **cada vez que actualicemos el estado interno de nuestro componente, este se volverá a renderizar para plasmar los cambios que comportan.**

Esto es sólo la punta del iceberg. `useState` es sólo uno de los muchos hooks que tendremos disponible. Tendremos `useContext` para poder usar la API del contexto, `useEffect` para poder ejecutar código al renderizar nuestro componente (sería un componentDidMount y componentDidUpdate) y al desmontarlo... y muchos más que vamos a ir descubriendo en la serie de artículos que iré escribiendo. Si no puedes esperar más, [puedes leer sobre ellos en la propia documentación de la librería.](https://reactjs.org/docs/hooks-reference.html)

## ¿El por qué de los React Hooks?

Los chicos de Facebook, que llevan trabajando con React desde 2011 y han creado con la librería miles de componentes, han tirado de experiencia y apuntado a tres razones principales por las que han trabajado en esta nueva característica.

### 1. Las clases confunden a las personas... y a las máquinas:

Las clases siempre han sido una pequeña barrera a superar por muchas personas que han empezado a aprender React. Tener que explicar el concepto de `this` (especialmente a la hora de bindearlo en los eventos). Es cierto que el uso de las [class properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) **ha ayudado muchísimo a simplificarlas pero, todavía, no eran tan planas como una función.**

De hecho, cuando he enseñado React a compañeros y colegas, siempre he empezado diciendo que un componente de React no deja de ser una función donde sus props serían los parámetros. Más tarde, había que añadir un matiz y explicar que, para usar ciertas funcionalidades, había que tirar de clases pero, gracias a los hooks, **eso ya no será más el caso.**

**De igual forma, tampoco a las máquina les gustan las clases.** Y lo digo por diferentes motivos. Uno de los más importantes es que **las clases no minifican tan bien como las funciones, esto significa que nuestro código ocupará más.** La diferencia con un sólo componente puede no ser relevante pero si pasamos toda nuestra aplicación a funciones, puede marcar la diferencia.

{{% tweet 1065516163856310272 %}}

Pero el equipo de React va más al largo plazo y **también se refieren a las posibilidades de sacarle el mayor partido a [Prepack](https://prepack.io/).** Con clases las ventajas que se pueden extraer al ejecutar el código en tiempo de compilación son mucho menores que los que se pueden conseguir con las funciones.

### 2. Hasta ahora, era difícil reutilizar la lógica de los componentes:

La reutilización de componentes ha sido una de las grandes bazas de React. Sin embargo, existía cierta limitación a la hora de reutilizar la lógica interna de cada componente. Para ello, a lo largo de la vida de la librería, se han intentado diferentes aproximaciones para solucionarlo.

**La primera fueron los Mixins** pero [finalmente se consideraron una mala práctica dada su complejidad](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) y que hacía que los componentes quedasen demasiado atados a ellos. Podías llamar a algunos métodos mágicamente en tu método render que venían heredados por ellos por lo que, al final, se perdía

Más tarde, **llegaron los HoC (High Order Componentes)** (puedes descubrir el primer sitio donde se mostraron de la mano de [Sebastian Markbåge](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775)) Básicamente, eran **funciones  que envolvían componentes de React, de forma que dependiendo de la lógica interna de la función le inyectaba props diferentes al componente.** De esta forma se conseguía reutilizar la lógica entre diferentes componentes y ha sido, hasta hace muy poco, la forma predilecta de conseguirlo.

Después, [llegaron las Render Props](https://reactjs.org/docs/render-props.html). Lo que las render props buscaban era acabar con la magia oculta de los HoC y llevar esa funcionalidad al terreno declarativo. **La idea es muy buena, y se han visto muy buenas ideas al respecto como [la API de React Apollo](https://www.apollographql.com/docs/react/essentials/queries.html#manual-query).** Funciona muy bien especialmente cuando sólo necesitas un componente que proporcione Render Props pero, al concatenar uno tras otro, [se puede convertir en el Render Props Hell.](http://callbackhell.com/)

```jsx
class Mouse extends React.Component {
  state = { x: 0, y: 0 }

  handleMouseMove = ({ clientX, clientY }) => {
    this.setState({ x, y })
  }

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {/*
          Usamos la prop render para renderizar de forma dinámica el componente
        */}
        {this.props.render(this.state)}
      </div>
    )
  }
}

const MouseTracker = () => (
  <div>
    <h1>Move the mouse around!</h1>
    <Mouse
      render={mouse => (
        <span>Position of x is {mouse.x} and y is {mouse.y}</span>
      )}
    />
  </div>
)
```

El tema es que con la llegada de los Hooks, **podremos crear nuestros propios hooks (Custom Hooks) de forma que ganaremos lo mejor de los High Order Components y las Render Props**, sin necesidad de complicar nuestro componente y manteniendo la programación declarativa. Y vaya sin son reusables, tan reusables que la gente se ha animado a [compartir en diferentes catálogos pequeños hooks](https://usehooks.com/) para poder reutilizar muchas lógicas comunes a la hora de desarrollar aplicaciones de **React**.

Si te interesa, estáte atento, porque lo veremos en detalle en los siguientes artículos.

### 3. Los componentes complejos terminaban siendo difíciles de entender:

El ciclo de vida de los componentes en React, que podíamos usar en los componentes con `class` era una potentísima forma de ejecutar código arbitrariamente. El caso es que también hacía complejo de entender lo que podía llegar a hacer un componente ya que al final **teníamos que agrupar en cada uno lógica no relacionada entre ella pero que sí tenían que ir en cada bloque por el punto dónde debía ejecutarse.**

Lo podemos ver mejor en el siguiente tweet, donde **se ve la diferencia de lo que era con clases (donde se mezclaba lógica con diferentes objetivos) y cómo quedaría utilizando Hooks para agrupar mejor ese código.**

{{% tweet 1056960391543062528 %}}

Así que en realidad los Hooks aplican la filosofía de React sobre el flujo de datos y composición pero ya no sólo incluso _entre_ componentes si no _dentro_ del mismo componente.

## ¿Y ahora qué? ¿Dejo de usar clases?

Antes de terminar el artículo me gustaría dejar clara una cosa. **React ha sido, y seguirá siendo en los próximos años, famoso por una API estable.** Esto signifnica que **las clases no van a desaparecer en el corto ni medio ni, seguramente, largo plazo.** Lo que va a ocurrir es que los componentes funcionales, junto con los hooks, van a ser la forma "oficial" de crear componentes, pero se va a seguir manteniendo compatibilidad con las clases por un largo tiempo.

Dicho esto, mi recomendación es que, **si vas a crear un componente nuevo y tienes la última versión de React, entonces utilices funciones y Hooks**. Y eso si ya tienes claro cómo funcionan y entiendes lo que estás haciendo.

No hace falta que te recorras toda tu aplicación y conviertas todos tus componentes que usan `class` a `function`. Puedes hacerlo, conforme vayas tocando los componentes antiguos, cuando te vayas sintiendo más cómodo con la nueva API. En cualquier caso, **espero que la colección de artículos y [vídeos](https://www.youtube.com/c/midudev?sub_confirmation=1) que voy a ir publicando te ayuden.**


## Referencias

[react.js: Hooks Intro](https://reactjs.org/docs/hooks-intro.html)<br >
[React Today and Tomorrow and 90% Cleaner React With Hooks](https://www.youtube.com/watch?v=dpw9EHDh2bM)<br >