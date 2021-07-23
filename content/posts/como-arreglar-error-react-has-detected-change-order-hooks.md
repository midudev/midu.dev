---
title: 'Cómo arreglar el error "Warning: React has detected a change in the order of Hooks"'
date: '2021-03-31'
description: Entiende qué significa y cómo arreglar este típico error de React
tags:
  - react
image: >-
  /images/og/como-arreglar-error-react-has-detected-change-order-hooks.jpg
---

Cuando trabajas en un proyecto con `React`, ya sea con `Next.js` o `create-react-app`, puedes encontrarte que la consola te muestra la siguiente advertencia:

```consola
Warning: React has detected a change in the order of Hooks called by...
This will lead to bugs and errors if not fixed.
For more information, read the Rules of Hooks: https://reactjs.org/docs/hooks-rules.html
```

El error, que **fue introducido en React 16.8.0**, aunque es algo críptico, quiere decir que **estás usando los hooks de forma condicional** o que no se está ejecutando siempre los mismos hooks, y en el mismo orden, después de que el componente se renderice.

Por ejemplo, mira este componente:

```jsx
function App() {
  const [count, setCount] = useState(0)
  if (count === 0) return 'No count' // ❌

  useEffect(() => {
    trackCount(count)
  }, [])

  return <h1>{count}</h1>
}
```

Parece inofensivo pero la línea con la ❌ es problemática ya que cuando `count` sea 0, entonces la función no ejecutará el `useEffect` y, por lo tanto los hooks que se usan no son exactamente los mismos siempre.

Lo correcto sería dejar esta condición después de todas las llamadas a los hooks.

```jsx
function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    trackCount(count)
  }, [])

  if (count === 0) return 'No count' // ✅
  return <h1>{count}</h1>
}
```

También puede ocurrir si directamente usas un hook en un condicional de la siguiente forma:

```jsx
function App() {
  const [count, setCount] = useState(0)

  if (count > 9) {  // ❌
    useEffect(() => {
      localStorage.setItem('count', count)
    }, [count])
  }

  return <h1>{count}</h1>
}
```

Aquí, se ejecuta el `useEffect` solo cuando el count sea mayor de 9. Esto hace que no siempre se ejecuten el mismo número de hooks ni en el mismo orden. Para evitarlo, tenemos que **mover el condicional para que esté dentro del efecto.**

```jsx
function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count > 9) { // ✅
      localStorage.setItem('count', count)
    }
  }, [count])

  return <h1>{count}</h1>
}
```

El error también lo he visto a veces al usar `useSWR` o `react-query`, hooks que te ayudan a hacer fetching de datos en tu app. Así que ten en cuenta que esta regla también aplica para custom hooks y hooks de terceros.

Por ejemplo, con `useSWR` podrías estar tentado a hacer esto:

```jsx
const App = () => {
  const [user] = useUser()
  let content

  if (user) {  // ❌
    const { data } = useSWR(`/api/user`, fetcher)
    content = data.content
  }
  
  return (
    <>
      {content
        ? <h1>{content}</h1>
        : <span>Loading...</span>
      }
    </>
  )
}
```

Pero esto también estaría mal porque estamos usando de forma condicional el hook `useSWR`. En este caso lo mejor sería pasar `null` o `undefined` a `useSWR` para evitar que haga una llamada si no tenemos usuario:

```jsx
const App = () => {
  const [user] = useUser()
  const { data } = useSWR(user ? `/api/user` : null, fetcher) // ✅

  return (
    <>
      {data
        ? <h1>{data}</h1>
        : <span>Loading...</span>
      }
    </>
  )
}
```

Existe un plugin de eslint que puede ayudarte a evitar este tipo de problemas. Se llama [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) y está mantenido por el equipo core de React.js, de forma que siempre incorpora las últimas ventajas para que funcione con React.

Ten en cuenta que **existen decenas de posibilidades a la hora de cometer este error** que no se cubren en el artículo porque podrían ser inabarcables. Por ejemplo, que el uso del hook lo tengas dentro de una función y sea esa función la que se ejecuta de forma condicional...

Lo mejor es que intentes colocar la llamada a los hooks siempre **en el nivel superior del cuerpo de la función** y lo más arriba posible, de forma que evites este tipo de problemas.
