---
title: 'Cómo instalar Node en Mac, Linux y Windows'
date: '2020-08-17'
description: >-
  Instala paso a paso Node en Linux y Mac usando nvm y en Windows usando
  nvm-windows

toc: true
tags:
  - node
image: /images/og/como-instalar-node-en-mac-y-windows.png
---

Hoy en día **Node y NPM son básicos a la hora de preparar tu entorno de desarrollo web**. Y, aunque no es difícil conseguirlo, existen diferentes formas de lograrlo dependiendo del sistema operativo.

> **Importante**: Estas guías dan por sentado que no tienes una instalación previa de Node.js. Si es así, es posible que pueda darte problemas y que haya conflictos. Antes de continuar, asegurate que has desinstalado cualquier instalación previa de Node.js y npm.

## Instalando Node.js usando el instalador nativo

**La forma más sencilla de instalar Node.js** en tu sistema es, sin ninguna duda, [usar el instalador de la web oficial](https://nodejs.org/es/) donde podrás decidir entre usar la versión LTS o la actual.

**Aunque es la más sencilla tiene una desventaja muy grande** y es que esto hace que en todo tu sistema sólo cuentes con una versión de Node.js. Esto puede ser suficiente para algunos desarrolladores pero, normalmente, si trabajas en más de un proyecto puedes encontrar problemas fácilmente ya que cada proyecto puede soportar versiones diferentes de Node.js.

Por ello, aunque para empezar puede estar bien, te recomiendo los siguientes métodos descritos en el artículo.

## Instalar Node en Mac, Linux, Windows WSL usando nvm

**Esta sería la [forma](https://google.com) recomendada si tu sistema operativo está basado en UNIX** (como Mac, Linux o Windows WSL), ya que ofrece diferentes ventajas, como manejar diferentes versiones de Node al mismo tiempo. Muy útil cuando tienes que trabajar en diferentes proyectos.

### ¿Qué es nvm?

**nvm es un gestor de versiones de Node.js** diseñado para tener su instalación encapsulada por usuario, sin necesidad de permisos de administrador, e invocado de forma independiente por cada shell.

### Cómo instalar nvm paso a paso

Para instalar, y también actualizar, *nvm* tienes que ejecutar el script de instalación. Puedes descargar y ejecutar el código desde la terminal usando el siguiente comando:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Este script clonará el [repositorio de `nvm`](https://github.com/nvm-sh/nvm) en la ruta `~/.nvm` e intentará añadir las líneas de ejecución dependiendo del lenguaje de tu terminal (`~/.bash_profile`, `~/.zshrc`, `~/.profile` o `~/.bashrc`).

En el caso que, por lo que sea, no haya sido posible. Es posible que te pida que añadas manualmente las líneas de código. **Esto es sólo necesario si no ha sido posible hacerlo de forma automática.** Las líneas a añadir serían estas:

```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Esto carga nvm
```

Después de hacer esto es posible que necesites reiniciar la terminal o crear una nueva pestaña para poder utilizar el comando `nvm`.

#### Instala la versión que quieras de Node

Una vez tengas `nvm` en tu sistema es el momento de instalar Node. Para ello sólo tienes que ejecutar el siguiente comando:

```
nvm install --lts
```

Esto te ejecutará la versión **long-term support de Node**. En estos momentos es la 12 pero muy pronto será la 14 y, más adelante, pasará a ser la 16. Tenéis **el plan de lanzamientos con todas las próximas versiones LTS.**

> LTS o **long-term support** significa que es una versión que recibirá soporte durante un plazo más largo que otras versiones. Generalmente son hasta 30 meses de soporte para errores críticos. Si vas a usar Node en producción, lo mejor es que uses sólo versiones LTS.

Si lo prefieres, también puedes instalar una versión en específico ya sea indicando la major o, directamente, la versión exacta:

```
nvm install 12 # esto instalará la última versión 12 de Node.js
nvm install 12.18.3 # esto instalará exactamente la versión 12.18.3
```

#### Usando una versión de Node.js con nvm

A veces es posible que tengas más de una versión instalada de Node.js en tu usuario. Para ver todas las versiones de Node.js que tienes instaladas, puedes usar el comando `nvm ls`. Para ver las versiones disponibles a instalar tienes que usar `nvm ls-remote`.

Una vez tengas en tu sistema más de uno, vas a querer cambiar entre esas versiones. Para ello ejecuta `nvm use <version-que-quieres-usar>` por ejemplo:

```
nvm use 12
nvm use 8
nvm use --lts
```

Si quieres que alguna de estas sea tu versión por defecto, de forma que sea la que se usa la próxima vez que abras una pestaña, tienes que crear un alias para esa versión que se llame `default`.

Por ejemplo, imaginemos que tenemos instalada la versión 8 y 12 y ahora instalamos la 14 y queremos que esta sea la versión por defecto a partir de ahora. Deberíamos hacer lo siguiente:

```
nvm install 14
nvm alias default 14
```
> La primera vez que ejecutas `nvm install` hará que esa versión sea la `default`.


### Posibles problemas...

* En Mac vas a necesitar tener instalas las herramientas de desarrollo de Xcode. Cuando ejecutes por primera vez el script de instalación de `nvm` es posible que te aparezca una ventana pidiendo que lo hagas. Una vez instalada, prueba otra vez a instalar `nvm` con el mismo script que antes.
* Recuerda, como he comentado, al terminar la instalación es posible que necesites reiniciar la terminal o crear una nueva pestaña antes de poder ejecutar el comando `nvm`.
* Si tienes algún problema más, puedes ver la sección de [Problemas Frecuentes en el repositorio de nvm.](https://github.com/nvm-sh/nvm#troubleshooting-on-linux)

## Instalar Node en Windows usando nvm-windows

`nvm-windows` aunque comparte el nombre con `nvm` no son de los mismos creadores y, por lo tanto, tiene algunas diferencias. Y entre esas diferencias está también, claro, la forma de instalarlo. Para el caso de `nvm-windows` estos son los pasos que debes seguir:

1. Ve a la [sección de releases de nvm-windows](https://github.com/coreybutler/nvm-windows/releases).
2. Descarga el archivo `nvm-setup.zip` de la última release disponible.
3. Extrae y ejecuta el archivo `nvm-setup.exe`.
4. Sigue los pasos de la instalación guiada del paquete y elige la configuración que desees.
5. Una vez completado, abre una terminal `Power Shell` y ejecuta:

```
nvm ls
```

En ese momento el comando funcionará pero te dará el mensaje `"No installations recognized"`.

### Listando e instalando Node.js con nvm-windows

Ahora podemos listar todas las versiones disponibles para instalar con `nvm list available`. Una vez que de la lista veas la version que quieres instalar, debes ejecutar el comando `nvm install` junto con la versión deseada:

```
nvm list available
nvm install 12.18.3
```

Una vez que tengas diferentes versiones instaladas, puedes listarlas con `nvm ls` y cambiar entre las diferentes versiones con `nvm use`:

```
nvm ls

  12.18.3
  14.5.0

nvm use 14.5.0
```

Y con esto ya estaríamos preparados para trabajar con `nvm-windows`. Si tienes algún problema, puedes **revisar la [sección de "Problemas frecuentes" del repositorio](https://github.com/coreybutler/nvm-windows/wiki/Common-Issues) para ver si tienen solución a tu problema.**
