---
title: >-
  Cómo arreglar el error 'gyp: No Xcode or CLT version detected' de macOS al hacer npm install
date: '2021-03-31'
description: >-
  ¿Estás intentando hacer un npm install y te aparece este error en la terminal? Seguramente 
tags:
  - macos
image: >-
  /images/og/como-arreglar-macos-xcrun-error-invalid-active-developer-path-missing-xcrun.png
---

Si estás usando `macOS` es posible que al intentar hacer un `npm install` te aparezca un error en la terminal algo difícil de entender que se debe parecer a este y donde habla de que la herramienta `xcodebuild` requiere tener instalado Xcode:

```sh
$ npm install
> ckmeans@1.0.1 install /Users/project/node_modules/ckmeans
> node-gyp rebuild

xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance

xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance

No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

gyp: No Xcode or CLT version detected!
gyp ERR! configure error 
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:305:16)
gyp ERR! stack     at emitTwo (events.js:106:13)
gyp ERR! stack     at ChildProcess.emit (events.js:191:7)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:215:12)
gyp ERR! System Darwin 16.0.0
gyp ERR! command "/usr/local/Cellar/node/8.1.3/bin/node" "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /Users/project/node_modules/ckmeans
gyp ERR! node -v v7.0.0
gyp ERR! node-gyp -v v3.4.0
gyp ERR! not ok 
```

**Este error significa que las Herramientas de Desarrollo (CLT) de Xcode no están instaladas** o no se encuentran en el path que se espera. También es posible que las tengas instaladas pero todavía no has aceptado los términos de uso que te habilita poder usarlas.

Esto es porque `node-gyp` necesita estas dependencias para compilar tus dependencias ya que la versión de `node` que estás usando todavía no tiene los binarios pre-compilados para tu sistema. **Es normal y tiene solución.**

## ¿Cómo solucionar el error?

Existen diferentes formas de solucionarlo. Te recomiendo que las pruebes en orden, ya que cada una comporta distintas operaciones y la primera sería la más recomendada y sencilla.

1. **Volver a instalar las Command Line Tools** con un comando en la terminal.

```
xcode-select --install
```

Te debería aparecer una ventana preguntándo si quieres instalar las herramientas de desarrollo que `xcode-select` necesita para poder ejecutarse. **Le decimos que sí.**

{{< img align="center" src="/images/como-arreglar-macos-xcrun-error-invalid-active-developer-path-missing-xcrun.png" alt="Ventana con el mensaje que va a instalar las herramientas ee desarrollo" >}}

Tras esto, comenzará una descarga y después una instalación que puede durar unos minutos. Una vez finalizado, prueba de nuevo el comando de git en tu terminal y debería funcionar correctamente. 🎉

2. Resetear el path

Es posible que al intentar instalar las herramientas de desarrollo te diga que ya están instaladas.

```
$ xcode-select --install
xcode-select: error: command line tools are already installed, 
use "Software Update" to install updates
```

En este caso, primero deberías ver si realmente tienes alguna actualización pendiente e instalarla.

Si no es el caso, podrás ejecutar el comando para hacer reset de toda la configuración:

```
$ sudo xcode-select --reset
```

3. Borrar las actuales y reinstalar las herramientas de desarrollo.

```
sudo rm -rf $(xcode-select -print-path)
xcode-select --install
```

El primer comando recupera el `path` que usa tu sistema actualmente para alojar las herramientas de desarrollo, las borra de forma recursiva y las vuelve instalar.

4. Instalarlas de forma manual:

Si todavía no funciona, prueba a descargar e instalar manualmente las *Command Line Tools for Xcode* desde [la página de Apple Developers.](https://developer.apple.com/download/more/)