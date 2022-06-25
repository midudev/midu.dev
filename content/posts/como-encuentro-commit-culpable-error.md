---
title: "Cómo usar git bisect para encontrar el commit culpable de un error"
date: '2021-07-16'
description: Gracias a git bisect, puedes comenzar una búsqueda entre un historial de commits para determinar cuál de ellos es el que introduce el error.
topic: git
tags:
  - git
---

Imagina que estás en un proyecto y, de repente, hay un error en producción pero, desde el último pase, se han hecho cientos de commits. ¿Cómo sabes qué commit es el culpable? Hacerlo a mano es una tarea difícil...

Para ello es bueno conocer `git bisect`. *Bisect* significa partir por la mitad y es justamente lo que va a hacer este comando: ir dividiendo toda la pila de commits en dos partes, una parte de la pila contendrá el error y otra parte no.

Aunque algo así lo podríamos hacer de forma manual con `git checkout` esta herramienta es mucho más eficiente. Vamos a ver cómo lo deberíamo usar.

Primero, lo iniciamos:

```sh
git bisect start
```

Ahora tenemos que marcar el error. Para ello, vamos a ir a la rama de producción y ejecutamos `git bisect bad`. Si ya sabemos el commit del error, podemos pasar directamente el número de commit, pero en nuestro ejemplo vamos a usar `HEAD` para que el commit que estamos viendo sea el que está en producción.

Ya hemos indicado cuál es el commit que sabemos que tiene el error, ahora nos toca indicar un commit que sabemos que funciona correctamente. Podemos ir bastante atrás (por ejemplo, una semana atrás donde no ocurría el problema) y hacemos checkout a ese commit.

```sh
git checkout 587d364d # 587d364d es un commit de hace una semana
git bisect good # indicamos que este commit sí funcionaba
```

También lo puedes hacer en un solo comando con `git bisect good 587d364d`.

Una vez hecho esto, `git bisect` cambiará el `HEAD` por un commit entre los sospechosos y nos indicará el número de pasos que deberíamos hacer para encontrar el error y el número de commits por revisar.

```sh
Bisecting: 16 revisions left to test after this (roughly 4 steps)
[92e11f055a73eb61ca5c17657d84f8340b9bcc57] Update youtube count
```

En este punto deberemos probar el código para ver si el commit que probamos contiene el error. Si contiene el error ejecutamos `git bisect bad` y, si no lo contiene, ejecutamos `git bisect good`.

En cualquiera de los dos casos, `git bisect` volverá a cambiar el `HEAD` por otro commit para que volvamos a hacer la prueba y repetiremos los pasos hasta que definitivamente nos indique en qué commit se introdujo el problema.

```sh
❯ git bisect good
a6ee8be012ecd323a0cf0ba5be0c8e85bcad5d11 is the first bad commit
commit a6ee8be012ecd323a0cf0ba5be0c8e85bcad5d11
Merge: a053f1f 94fc4d4
Author: Miguel Ángel Durán <miduga@gmail.com>
Date:   Sat Jul 3 16:42:27 2021 +0200

    Merge pull request #63 from midudev/new-search-less-deps

    New search improving perf

 assets/js/scripts.js         | 135 ++++++++++++++++---------------------------
 assets/styles/global.css     |   5 +-
 layouts/_default/baseof.html |   1 -
 layouts/partials/logo.html   |  77 +++++++++++++++---------
 4 files changed, 104 insertions(+), 114 deletions(-)
```

Una vez que tengamos el commit, debemos ejecutar `git bisect reset` para reestablecer el `HEAD` correcto y finalizar el proceso.

> Ahora que sabes esto... no uses este comando para señalar a un colega de trabajo. Todos cometemos errores. Y somos un equipo. :)