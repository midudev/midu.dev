---
title: React Hooks, useEffect. Añadiendo funcionalidad en el ciclo de vida de nuestro componente - III
date: '2019-02-19'
image: '/images/react-hooks-use-effect.jpg'
description: Usando useEffect podremos añadir funcionalidad a nuestro componente cuando se renderiza por primera vez, se actualiza cuando nueva información llega y cuando se desmonta del árbol de elementos
tags:
- react
---

Ya sabemos qué son los hooks y cómo usar el hook `useState` para añadir un estado a nuestro componente, para que puedan tener comportamiento y sean dinámicos. En este artículo, vamos a conocer el hook `useEffect` que, sin duda, será otro de los hooks más utilizados. ¿Su función? **Ejecutar código cada vez que nuestro componente se renderiza.**

## useEffect: accediendo al ciclo 🌀 de vida de nuestro componente

El ciclo de vida de los componentes en React permitía en nuestros componentes con `class` poder ejecutar código en diferentes **fases de montaje, actualización y desmontaje.** De esta forma, podíamos añadir cierta funcionalidad en las distintas etapas de nuestro componente.

Con los hooks también podremos acceder a esa ciclo de vida en nuestros componentes funcionales aunque de una forma más clara y sencilla. Para ello usaremos **`useEffect`, un hook que recibe como parámetro una función que se ejecutará cada vez que nuestro componente se renderice, ya sea por un cambio de estado, por recibir props nuevas o, y esto es importante, porque es la primera vez que se monta.**

Para usar este hook, primero debemos importarlo desde la librería de React.

```jsx
import React, { useEffect } from 'react'
```

Ahora, en nuestro componente funcional, **vamos a añadir un efecto que se ejecutará cada vez que nuestro componente se renderice.** Para eso, ejecutaremos el método `useEffect` dentro del cuerpo de nuestra función y le pasaremos como parámetro la función que queremos que ejecute al renderizar el componente.

{{< highlight jsx "hl_lines=4" >}}
import React, { useEffect } from 'react'

function Example() {
  useEffect(function () {
    console.log('render!')
  })
  
  return <span>This is a useEffect example</span>
}
{{< / highlight >}}

Esto hará que se muestre en consola el mensaje `render!` después que el componente se renderice por primera vez. Por si te lo estás preguntando, en este ejemplo, el método `useEffect` ha funcionado de forma similar a como lo hubiera hecho el ciclo de vida `componentDidMount`:

```jsx
import React, { Component } from 'react'

class Example extends Component {
  componentDidMount () {
    console.log('render!')
  }

  render () {
    return (<span>This is a componentDidMount example</span>)
  }
}
```

## useEffect: usando el state de nuestro componente y creando un efecto 💫

Ahora que ya hemos usado `useEffect` vamos a utilizarlo junto con [el hook `useState` que ya conocemos.](https://midu.dev/react-hooks-use-state-anadiendo-estado-a-nuestro-componente-funcional/#article-content). Para ello, vamos a recuperar el ejemplo del Contador pero vamos a hacer que, cada vez que se vaya a renderizar de nuevo el componente, actualice el título de la página con un mensaje indicando el número de veces que hemos hecho click en el botón. **Para ello tendremos que leer el valor actual del estado interno de nuestro componente de la siguiente forma**:

```jsx
import React, { useEffect, useState } from 'react'

function Contador() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Actualiza el title de la página en cada click!
    document.title = `Has hecho clic ${count} veces`
  })

  return (
    <div>
      <span>El contador está a {count}</span> 
      <button onClick={() => setCount(count + 1)}>
        Incrementar contador
      </button>
    </div>
  )
}
```

Para verlo en funcionamiento, [podéis acceder a la demo desde vuestro navegador.](https://codesandbox.io/s/948pj1q7kw) Así podréis comprobar que el título de la página se actualiza:
- Nada más entrar en la página. **Ya que se ejecuta useEffect al montarse nuestro componente.**
- Cada vez que hacemos click en el componente. Cuando el state cambia, esto dispara un nuevo renderizado y, al renderizarse de nuevo, se vuelve a ejecutar la función que le hemos pasado a `useEffect`.

Para seguir con las comparaciones con las clases, en este ejemplo nuestro `useEffect` está funcionando como el ciclo de vida `componentDidMount` y como el ciclo de vida `componentDidUpdate`. Esto nos ayuda a ver que pese a la sencillez que parece tener este hook, esconde un gran potencial.

## useEffect: Suscripciones a eventos y limpieza 🧹

Otro caso de uso muy típico de `useEffect` será para suscribirnos a eventos del DOM. Por ejemplo, puede ser útil para suscribirte al evento de scroll, o el de Intersection Observer para crear fácilmente un componente que sirva de Lazy Load... o simplemente para escuchar el evento `resize` del window como en el siguiente ejemplo:

```jsx
import React, { useEffect, useState } from "react";

function ShowWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth
      console.log(`updateWidth con ${width}`)
      setWidth(width)
    }
    // Actualizaremos el width al montar el componente
    updateWidth()
    // Nos suscribimos al evento resize() de window
    window.addEventListener("resize", updateWidth)
  })

  return (
    <div>
      <span>Width es de {width}px</span>
    </div>
  )
}
```

Como véis, hemos usado el `useEffect` para suscribirnos a un evento del DOM, en este caso del evento `resize` del window. Cada vez que recibimos el evento ejecutamos el método `updateWidth` que leera la propiedad `clientWidth` y lo pondrá en el estado de nuestro componente de forma que, así, podamos ver en pantalla cuál es el ancho de la ventana. Aquí tenéis la demo en Code Sandbox para que trasteéis con él:

{{< code id="21v2xyr90y" height="300" tab="both">}}

⚠️ Esto, funcionar, funciona. **Pero hay un problema bastante gordo y es muy importante que lo entiendas: podríamos provocar *memory leaks* en nuestras aplicaciones si no lo tienes en cuenta.**

Como hemos dicho anteriormente, `useEffect` se va a ejecutar cada vez que se renderiza nuestro componente. Por lo tanto, está bien que nos queramos suscribir al evento del `window` en el hook `useEffect` pero, si se vuelve a ejecutar la función en cada renderizado... **¡volveremos a suscribirnos de nuevo al evento `resize` cada vez que actualicemos el estado y hagamos que se renderice nuestro componente!**

**Obviamente, eso no es lo que queremos.** Para ello, tenemos que hacer limpieza de las suscripciones de nuestros eventos. Por eso, la función que le pasamos a `useEffect` puede, a su vez, devolver una función que se ejecutará cada vez que nuestro componente se vaya a volver a renderizar o que vaya a desmontar completamente. Esto es super útil para limpiar cualquier suscripción y evitar los *memory leaks* que comentaba anteriormente. Vamos a verlo:

{{< highlight jsx "hl_lines=18-21" >}}
import React, { useEffect, useState } from "react";

function ShowWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth
      console.log(`updateWidth con ${width}`)
      setWidth(width)
    }
    // Actualizaremos el width al montar el componente
    updateWidth()
    // Nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth)

    // Devolvemos una función para anular la suscripción al evento
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  })

  return (
    <div>
      <span>Width es de {width}px</span>
    </div>
  )
}
{{< / highlight >}}

La función que devolvemos se podría entender como el ciclo de vida `componentWillUnmount` de los componentes con clases. Con una diferencia. **Mientras que el ciclo de vida `componentWillUnmount` se ejecutaba cuando el componente se desmontaba, en este caso... se ejecuta cada vez que el componente se vuelve a renderizar.** Así que la suscripción y desuscripción ocurre cada vez que el efecto se ejecuta. Aunque no tiene porque ser un problema de performance, tenlo en cuenta.

## useEffect: Cómo evitar que se vuelva a ejecutar 🔃

Es posible que si nuestro componente se renderice mucho, por cambios constantes en su estado interno o por nuevas props, el ejecutar demasiado el efecto que le hemos pasado al método `useEffect` haga que exista un problema de performance. O, también, **que estemos ejecutando un efecto que vuelva a actualizar el estado de nuestro componente y podamos crear un loop infinito si no lo evitamos.**

**Por defecto los efectos se disparan cada vez que se realiza un nuevo renderizado** pero podemos evitar que el efecto se vuelva a ejecutar pasándole un segundo parámetro al hook. El parámetro es un array con todos los valores de los que depende nuestro efecto, de forma que sólo se ejecutará cuando ese valor cambie.

Vamos a verlo con un ejemplo. Imaginemos que queremos escribir un componente que haga una llamada a una API al montarse. A este componente le llamaremos `<PokemonInfo>` y recibirá como parámetro la prop `name` que será el nombre del Pokémon del que queremos buscar información.

En un primer momento, estaríamos tentados a hacer algo así:

```jsx
// 🚫 ESTE COMPONENTE NO FUNCIONA CORRECTAMENTE!
function PokemonInfo({ name = "pikachu" }) {
  const [pokemonInfo, setPokemonInfo] = useState(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(pikachu => {
        setPokemonInfo(pikachu)
      })
  })

  return (
    pokemonInfo && (
      <span>
        La pokeId es #{pokemonInfo.id} y su nombre es {pokemonInfo.name}
      </span>
    )
  )
}
```

**¿Por qué no funciona bien? Porque estamos creando un loop infinito.** Ojo a esto. Lo que está pasando es que hemos creado un efecto que se ejecutará al montar el componente. Este efecto hace un `fetch` a una API para recuperar la información del Pokémon **y actualiza el estado interno del componente.** Esto provoca otro render. ¿Y eso que significa? Que se vuelve a ejecutar el efecto... y vuelve a iniciarse el loop que hemos provocado.

Para solucionar esto vamos a usar el segundo parámetro del hook `useEffect` que hemos explicado antes. Esto sería **la lista de parámetros de los que depende el efecto** y, lo que indica, es que cuando estos parámetros no cambien entonces no volverá a renderizar el efecto. En este caso, **este efecto sólo lo querremos renderizar cuando el nombre del Pokémon que queremos buscar cambie por props.**

{{< highlight jsx "hl_lines=7" >}}
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(pikachu => {
        setPokemonInfo(pikachu)
      })
  }, [name])
{{</ highlight >}}

Podemos ver esto funcionando correctamente en la siguiente demostración:
{{< code id="k2pp9zpl45" height="300" tab="both">}}

### ¿Qué pasa si le pasamos un array vacío?

Ahora que podemos evitar que el efecto se ejecute... también podríamos pasarle un array vacío como parámetro. ¿Y qué pasaría? **Esto le diría a React que nuestro efecto no depende de ningún valor y que, por lo tanto, sólo debería ejecutarse al montarse y desmontarse nuestro componente.**

*Si sigues pensando en clases*, esto significa que nuestro hook pasaría a ser un `componentDidMount` y un `componentWillUnmount`.

Este tipo de comportamiento nos vendría perfecto, por ejemplo, para casos como nuestro ejemplo anterior que habíamos creado un efecto para suscribirnos al *window* y así saber cuando hacíamos resize. La razón es que no dependemos de ninguna prop ni siquiera de si el valor del state cambia, por lo que **podríamos usar ese parámetro para evitar llamadas al efecto de forma no necesaria.**

{{< highlight jsx "hl_lines=22" >}}
import React, { useEffect, useState } from "react";

function ShowWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth
      console.log(`updateWidth con ${width}`)
      setWidth(width)
    }
    // actualizaremos el width al montar el componente
    updateWidth()
    // nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth)

    // devolvemos una función para anular la suscripción al evento
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, []) // este efecto se ejecuta sólo al montarse el componente

  return (
    <div>
      <span>Width es de {width}px</span>
    </div>
  )
}
{{< / highlight >}}


## Conclusiones sobre useEffect

Con **el hook `useEffect` podremos ejecutar código cada vez que nuestro componente se renderice (ya sea por una actualización o sea la primera vez).** Y no sólo eso. Ya hemos visto que es el sitio ideal para suscribirnos a eventos, ya sea del navegador o de otras fuentes, pero también que podemos manejar las desuscripción para evitar crear *memory leaks*.

También hemos podido entender que `useEffect` viene a sustituir en gran parte los ciclos de vida de los componentes que vimos en los componentes que extendían de la clase `Component`. De hecho, viene a sustituir los ciclos `componentWillMount`, `componentDidMount`, `componentWillUpdate`, `componentDidUpdate` y `componentWillUnmount`. **Esto nos debería ayudar a generar menos código y hacer nuestros componentes más sencillos.**

Ahora que sabemos [qué son los hooks de React](https://midu.dev/react-hooks-introduccion-saca-todo-el-potencial-sin-class), [el hook `useState` para añadir un estado interno a nuestro componente](https://midu.dev/react-hooks-use-state-anadiendo-estado-a-nuestro-componente-funcional/) y este `useEffect` ya conocemos lo que es, seguramente, el 80% del grueso del día a día de los hooks. Pero **todavía quedan cosas, tan interesantes, como crear nuestros propios hooks. Lo veremos en el siguiente artículo, ¡no te lo pierdas!**
