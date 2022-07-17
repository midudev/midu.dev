---
title: "Cómo solucionar el error ReferenceError: window is not defined"
date: '2022-07-10'
description: ¿Estás programando con JavaScript en el servidor y estás encontrando este error? ¡Es normal! Te cuento cómo solucionarlo
toc: true
tags:
  - javascript
---

En algún momento te vas a encontrar el error `ReferenceError: window is not defined` si desarrollas con **JavaScript**. Esto es porque estás dando por hecho que todos los entornos donde se ejecuta este lenguaje tiene acceso a este objeto global... **¡y no es así!**

Por ejemplo, si estás trabajando con Node.js, no tienes acceso al objeto `window` y, por lo tanto, es posible que si intentas acceder a `window` te devuelva este error:

```javascript
const value = window.localStorage.getItem('key')
```

> En Node.js el localStorage no está disponible. En otros entornos de ejecución como Deno sí que lo está, pero es algo particular ya que han adaptado la API para que funcione en la parte del servidor.

Igual ni siquiera estás usando conscientemente Node.js pero hay frameworks como Remix, Nuxt o Next.js que parte de su código se ejecutan en la parte del servidor y, allí, no tienen acceso al objeto `window`.

## Cómo solucionar el problema si es en tu código

Si el problema está en tu código es bastante sencillo. **Encuentra dónde estés accediendo a una propiedad del objeto `window` y elimina el código**. Si eso no es posible (por ejemplo, un código que se ejecuta tanto en servidor como en cliente) entonces puedes envolver el código en un condicional que compruebe si tiene acceso a `window`.

```javascript
let value
if (typeof window !== 'undefined') {
  value = window.localStorage.getItem('key')
}
```

¿Por qué usar `typeof window !== 'undefined'` en lugar de `window === undefined`? Es bien sencillo. El primero no fallará al hacer la comprobación pero el segundo fallaría ya que `window` no es accesible y no puede mirar que tenga el valor `undefined`.

> En JavaScript hay que diferenciar entre el valor `undefined` y que una variable no está definida, por lo tanto no es accesible, y su tipo sea `undefined`.

## Cómo solucionar el problema si es de una librería

También es posible que encuentres este problema con algunas **librerías de terceros** que, al importarlas, están pensadas para ser ejecutadas sólo en el cliente. **No es un problema común** (ya que normalmente revisan si tienen acceso al objeto antes de intentar referirse a él) pero puede pasar.

```javascript
// Código ejecutado en el servidor
import useSomething from 'dependencia-externa'

useSomething()
// ReferenceError: window is not defined
```

En estos casos **lo mejor es revisar toda la traza para determinar el origen del problema...**

Una vez detectes la dependencia *culpable*, tendrás diferentes opciones:

- Buscar una alternativa que no tenga el problema.
- Revisar si realmente necesitas cargar la dependencia en ese punto y si puedes mover la importación y uso de la dependencia en un archivo que sólo se ejecute en el cliente.
- Cargar de forma dinámica la dependencia sólo cuando sepas que estás en el cliente.

```javascript
if (typeof window !== 'undefined') {
  import('dependencia-externa')
    .then(({default: useSomething}) => useSomething())
}
```

## Típica mala práctica en React ⚛️...

Existe una mala práctica en React que puede traer graves problemas de rendimiento en tus aplicaciones. En ocasiones, en el cuerpo de la función de tu componente, te puedes encontrar el error de referencia al intentar acceder a `window`:

```jsx
export default User () {
  const user = window.localStorage.getItem('user')
  return <h1>{user}</h1>
}
```

Al ver algo así puedes caer en la tentación de hacer la solución que hemos comentado anteriormente...

```jsx
// ❌ este código sería INCORRECTO en el servidor
// y sólo está como ejemplo para ilustrar
export default User () {
  let user = ''
  if (typeof window !== 'undefined') {
    user = window.localStorage.getItem('user')
  }
  return <h1>{user}</h1>
}
```

**¿Cuál es el problema de este código?** Pues que servidor y cliente renderizarían elementos diferentes. Esto crearía una discordancia y en cliente se vería forzado a re-renderizar esa parte del árbol, lo que puede ser muy costoso.

Para evitar esto, lo ideal es que pases esta comprobación a un `useEffect` ya que sólo se ejecutan en el cliente y cada vez que se renderiza el componente. En este caso, con las dependencias vacías, hacemos que sólo se ejecute en el primer renderizado:

```jsx
// ✅ Esta sería la forma correcta de lidiar
// con estos problemas en servidor/cliente
import { useEffect } from 'react'

export default User () {
  const [user, setUser] = useState('')

  useEffect(() => {
    // esto sólo se ejecuta en cliente
    const user = window.localStorage.getItem('user')
    setUser(user)
  }, []) // dejamos las dependencias vacías para que sólo se ejecute la primera vez

  return <h1>{user}</h1>
}
```

> Si tu aplicación es sólo *Client Side Rendering* entonces no te tienes que preocupar de estas cosas... aunque hoy en día es cada vez más complicado que sea así, ya que estarías perdiendo algunas ventajas de SEO y rendimiento.

## Conclusiones

Cuando encuentres el error de `ReferenceError: window is not defined` es porque estás intentando acceder al objeto `window` desde el servidor (normalmente Node.js) y no está accesible. Revisa tu código o las dependencias que estás usando y evita acceder al objeto desde el servidor.
