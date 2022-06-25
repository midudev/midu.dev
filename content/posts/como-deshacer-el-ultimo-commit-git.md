---
title: Cómo deshacer el último commit con git
date: '2020-08-26'
description: >-
  A veces hacemos commit en git e inmediatamente nos damos cuenta que nos hemos
  equivocado.
toc: true
tags:
  - git
image: /images/og/como-deshacer-el-ultimo-commit-git.png
---

<div style='text-align: center'>

**¿Quieres aprender sobre programación y desarrollo web?**<br />
¡Suscríbete a mi canal de YouTube! 👇<br />
<a class="yt-subscribe-button" rel="noopener nofollow" href="https://www.youtube.com/c/midudev?sub_confirmation=1" target="_blank" style='margin-top: 8px'><span><svg viewBox="0 0 24 24" width="16" style="margin:-2px 4px 0 0"><path d="M23.495 6.205a3.007 3.007.0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007.0 00.527 6.205 31.247 31.247.0 00.005 12.01a31.247 31.247.0 00.522 5.783 3.007 3.007.0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506.0 9.396-.502a3.007 3.007.0 002.088-2.088 31.247 31.247.0 00.5-5.783 31.247 31.247.0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" fill="#fff"></path></svg>¡Suscríbete!</span>
<span>79K</span></a>
</div>

Lo mejor que tiene *Git* es que *casi* siempre que te equivocas puedes deshacer tu cambio y seguir siendo feliz. Digamos que te proporciona un montón de redes de seguridad para evitar que hagas cosas que... no deberías 🤣.

Una de esas veces es cuando hacemos un commit. **¿Qué pasa si nos hemos equivocado?** **¿Cómo deshacemos el último commit? ¿Y si ya lo he publicado?** Todas las respuestas, aquí. 👇

## Deshacer el último commit (no publicado)

A veces **queremos tirar para atrás el último commit** que hemos hecho porque hemos añadido más archivos de la cuenta, queremos hacer commit de otra cosa o, simplemente, porque ahora no tocaba.

Si todavía no has hecho `push` de tus cambios tienes dos formas de hacer esto que dependerá de si quieres, o no, mantener los cambios del commit.

- Si **quieres mantener los cambios**:

```
git reset --soft HEAD~1
```

Con el comando `reset` hacemos que la rama actual retroceda a la revisión que le indicamos. En este caso le decimos `HEAD~1` que significa: queremos volver a la versión inmediatamente anterior a la que estamos ahora.

El parámetro `--soft` es el que va a hacer que los cambios que habíamos hecho en el commit, en lugar de eliminarlos, nos los mantenga como cambios locales en nuestro repositorio.

- Si **NO quieres mantener los cambios**:

```
git reset --hard HEAD~1
```

Es simplemente el mismo comando pero cambiamos `--soft` por `--hard`. Esto eliminará los cambios de los que habíamos hecho commit anteriormente. **¡⚠️ Asegúrate que eso es lo que quieres antes de hacerlo!**

## Si quieres arreglar el último commit (y no has hecho push)

A veces no quieres tirar atrás el último commit que has hecho si no que simplemente quieres arreglarlo. Aquí hay dos opciones:

- Sólo **quieres arreglar el mensaje que has usado para el último commit**:

```
git commit --amend -m "Este es el mensaje correcto"
```

- **Quieres añadir más cambios al último commit**:

```
# Añade los archivos con modificaciones que quieres añadir al commit anterior
git add src/archivo-con-cambios.js
# Vuelve a hacer el commit con el parámetro amend
git commit --amend -m "Mensaje del commit"
```

Ya sea que sólo quieres cambiar el mensaje de commit o que además quieres añadir modificaciones en el último commit, lo importante es que **esto NO va a crear un nuevo commit si no que va a solucionar el anterior.**

> Importante: El parámetro de `--amend` es muy útil pero sólo funciona con el último commit y siempre y cuando NO esté publicado. Si ya has hecho `push` de ese commit, esto no va a funcionar. Deberías hacer un `git revert` en su lugar.

## Deshacer un commit (ya publicado)

A veces es demasiado tarde y no sólo has hecho commit, si no que además has publicado los cambios. Peeero, todavía hay esperanza. Puedes hacer un `revert` de tus cambios indicando el commit que quieres deshacer.

```
git revert 74a1092
```

Esto creará un **nuevo commit que deshará todos los cambios de ese commit en concreto.** Es una forma interesante de mantener en el historial de Git ese cambio (quién sabe si lo puedes necesitar más adelante). 

A veces el problema es que puedes haber añadido otros commits posteriormente que entren en conflicto con ese pero eso es una historia que **igual abordamos en un artículo futuro.**

## Conclusiones

Como has podido ver, **existen multitud de formas de deshacer un commit**, ya sea que has publicado o no. Así que si has hecho commit de algo que no debías, que no te entren los nervios, simplemente respira y elige de este artículo lo que necesitas para conseguir arreglarlo. **A todos nos ha pasado alguna vez** y seguro que no es la primera vez ni la última.

