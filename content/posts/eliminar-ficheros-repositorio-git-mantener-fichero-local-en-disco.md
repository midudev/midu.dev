---
title: Eliminar ficheros de un repositorio Git sin borrar el fichero local
date: '2020-06-24'
description: >-
  A veces hacemos commit de ficheros que, más adelante, queremos ignorar pero
  nos gustaría mantenerlo localmente. Esto puede pasar con ficheros .env. ¿Cómo
  podemos borrar el fichero del repositorio pero mantenerlo localmente?
toc: true
tags:
  - git
image: >-
  /images/og/eliminar-ficheros-repositorio-git-mantener-fichero-local-en-disco.png
---

En ocasiones hacemos commits de ficheros que, más adelante, queremos que dejen de estar en nuestro repositorio **Git** pero, por otro lado, todavía se mantengan disponibles localmente.

Esto puede pasar, por ejemplo, si hacemos commit de ficheros `.env` o con carpetas de configuración de nuestro editor que, localmente en nuestro disco tienen sentido, pero **no deberían estar disponibles en el repositorio** de forma de cualquiera lo pueda ver.

Si el commit lo acabas de hacer, [lo mejor sería que deshagas el commit antes de publicarlo, o hacer un revert](https://midu.dev/como-deshacer-el-ultimo-commit-git/). Si ya lleva tiempo el archivo tendrás que buscar alternativas.

**Una solución muy simple** sería eliminar el fichero o directorio, hacer el commit, añadir en el `.gitignore` los ficheros o directorios a ignorar y volverlos a recuperar.

Sin embargo, existe una *forma más profesional* de hacer esto. Vamos a ver los pasos.

## El ejemplo práctico

Tengo un repositorio llamado [react-live-coding](https://github.com/midudev/react-live-coding) donde he subido, sin querer, una carpeta que está pensada para guardar la configuración del deployment. La carpeta es `.vercel` y nuestro objetivo es que desaparezca del repositorio pero mantenerla en nuestro disco ya que la necesitamos para hacer despliegues .

{{< img src="/images/git-eliminar-archivo-remoto-no-local.png" alt="Esta es la carpeta remota que queremos eliminar pero queremos conservarla local">}}

## Borrar los ficheros en el repositorio

Ahora **tenemos que borrar los ficheros** (en este caso un directorio completo) de nuestro repositorio de git pero, como son archivos que necesitamos para hacer despliegues desde nuestra máquina, **manteniendo los ficheros en nuestro disco local.**

Para ello sólo tenemos que ejecutar el siguiente comando:

```
git remove --cached .vercel
```

La clave aquí es el parámetro `--cached` que significa que los ficheros van a ser borrados sólo del índice del repositorio.

## Commitea y pushea los cambios

Para que los cambios se vean reflejados en el repositorio remoto, y no sólo de forma local en nuestra rama, tenemos que hacer commit y push de nuestros cambios. **Asegúrate que sólo estás haciendo commit y push de los cambios referidos a borrar estos ficheros.** No mezcles con otros ficheros que tenías previamente.

```
git commit -m "Remove .vercel deploy config folder"
git push origin master
```

## Ignorar los archivos en git con `.gitignore`

Como **no queremos que este directorio vuelva a subir al repositorio**, tenemos que añadirlo en el `.gitignore`. En este ejemplo vamos a ignorar la carpeta `.vercel` ya que contiene la configuración del despliegue y, por error, la he puesto disponible en el repositorio.

Este sería el fichero `gitignore` que tenemos en la raíz:

```{hl_lines=["7-8"]}
# dependencies
/node_modules

# production
/build

# deploy config (new added line)
.vercel
```

Como es un proyecto de Webpack, tenemos ya ignoradas la carpeta `node_modules` con todas las dependencias y la carpeta `build` donde se hace el empaquetado de nuestra aplicación .Así que hemos añadido la de `.vercel`.


