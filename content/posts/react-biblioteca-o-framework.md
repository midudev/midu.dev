---
title: ¿Es React una biblioteca o un framework?
date: '2022-10-12'
description: Aprende la diferencia entre una biblioteca y un framework y cómo afecta a React
topic: react
tags:
- react
---

Existe una fina línea hoy en día entre qué es una biblioteca o un framework. Oficialmente, **React se autodenomina como biblioteca en su página web**. Esto es porque para poder crear una aplicación completa, necesitas usar otras bibliotecas, y se considera que React se enfoca específicamente en la construcción de interfaces de usuario.

Por ejemplo, *React* no ofrece un sistema de enrutado de aplicaciones oficial. Por ello, hay que usar una biblioteca como [React Router](https://reactrouter.com/) o usar un *framework* como [Next.js](https://nextjs.org/) que ya incluye un sistema de enrutado.

Tampoco puedes usar React para añadir las cabeceras que van en el `<head>` en tu aplicación, y también necesitarás otra biblioteca u framework para solucionar esto.

Otra diferencia es que React no te fuerza en qué empaquetador de aplicaciones usar. En cambio `Angular` en su propio tutorial ya te indica que debes usar `@angular/cli` para crear una aplicación, en cambio React siempre te deja la libertad de elegir qué empaquetador usar y ofrece diferentes opciones.

**Aún así, existe gente que considera a React como un framework**. Aunque no hay una definición oficial de qué es un framework, la mayoría de la gente considera que un framework es una biblioteca que incluye otras bibliotecas para crear una aplicación completa con reglas claras y casi sin configuración.

Por ejemplo, **Next.js se podría considerar un framework de React** porque incluye React, un sistema de enrutado, un sistema de renderizado del lado del servidor, etc.