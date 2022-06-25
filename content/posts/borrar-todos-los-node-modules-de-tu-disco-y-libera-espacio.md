---
title: Borra todos los directorios node_modules de tu disco y libera espacio
date: '2019-08-07'
image: '/images/disco-duro.jpg'
description: Cómo borrar el contenido de las carpetas node_modules con las dependencias de tus proyectos para liberar espacio en tu disco
toc: true
tags:
- terminal
---

Aunque no te des cuenta, **las dependencias de tus proyectos ocupan una barbaridad**. De hecho, no es raro que cada carpeta `node_modules` ocupe, **100MB o más**... Y digo "o más" porque yo **he detectado algún proyecto que la carpeta ocupa la friolera de 1GB.**

Entonces, ¿te pasa como a mi que tienes decenas de proyectos? Pues libera espacio en tu disco duro borrando todos los directorios `node_modules` que tienes en tu sistema. ¡Sobre todo si no lo estás usando!

## Revisar cuánto ocupan los directorios /node_modules

Por ejemplo, yo tengo todos mis proyectos en la carpeta `Dev` dentro de mi usuario. Así que primero debería acceder a esa carpeta y luego ejecutar un comando que me buscará todas las carpetas `node_modules` dentro de `~/Dev` y me dirá el tamaño que ocupa cada una y el total. Como tengo macOS voy a utilizar estos comandos que **son compatibles con Linx y macOS.**

```bash
cd ~/Dev
find . -name "node_modules" -type d -prune | xargs du -chs

# Ejemplo de output:
# 154M    ./react-rendering-strategies/node_modules
# 134M    ./comic-bubbles/node_modules
# 289M    total
```

Si tienes **Windows**, los pasos serían similares, sólo que tendríamos que usar otros comandos:

```bash
cd Dev
FOR /d /r . %d in (node_modules) DO @IF EXIST "%d" echo %d"
```

## Borrar definitivamente las carpetas

> **ATENCIÓN**, eliminando la carpeta `node_modules` hará que tengas que volver a hacer un `npm install` en los proyectos en los que quieras trabajar de nuevo. **¡Tenlo en cuenta!**

Ahora que ya sabes lo que ocupan es posible que, si tenías unos cuantos proyectos, te hayas dado un buen susto de lo que ocupan las carpetas `node_modules` y ahora quieras hacer una limpieza eliminándolos. Para ello, en Linux/Mac puedes usar el siguiente comando:

```bash
cd ~/Dev
find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;
```

Es muy importante acordarte de entrar en la carpeta donde tengas tus proyectos, en mi caso `~/Dev`, para eliminar las carpetas `node_modules` sólo de los proyectos que realmente quieres y controlas.

Si tienes **Windows** y usas el **CMD**, puedes utilizar el siguiente comando.

```bash
cd Dev
FOR /d /r . %d in (node_modules) DO @IF EXIST "%d" rd /s /q "%d"
```

Y con esto, **ya puedes limpiar algo tu disco duro.** En mi caso he conseguido rebajar... **¡20GB de espacio!** Aunque también es verdad que tengo un poco de síndrome de diógenes en ese sentido y tenía cientos de repositorios y proyectos en mi carpeta después de años usando el ordenador. **Quizás mi limpieza debería ir un poco más allá y empezar a eliminar proyectos que no toco desde hace meses. 😅**

Fuente: [How to delete ALL node_modules folders on your machine and free up HD space!](https://dev.to/trilon/how-to-delete-all-nodemodules-folders-on-your-machine-43dh)


