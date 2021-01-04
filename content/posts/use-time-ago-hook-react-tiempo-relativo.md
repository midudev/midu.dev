---
title: 'useTimeAgo, un custom hook en React para mostrar el tiempo relativo ⏱'
date: '2020-08-26'
description: >-
  Crea en pocas líneas de código un custom hook para mostrar el tiempo relativo
  de una fecha y sin dependencias
toc: true
tags:
  - react
image: /images/og/use-time-ago-hook-react-tiempo-relativo.png
---

Ayer vimos cómo podíamos crear una [función en Javascript para conseguir el tiempo relativo de una fecha](https://midu.dev/como-crear-un-time-ago-sin-dependencias-intl-relativeformat/) (timeago). Hoy vamos a usar ese mismo código para crear un hook llamado `useTimeAgo` que, además, vaya actualizando el tiempo relativo.

Si lo prefieres, puedes ver el proceso completo en el siguiente vídeo:

<iframe width="560" height="315" src="https://www.youtube.com/embed/AiyiiXXChwo?start=459" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## useTimeAgo ⏱

