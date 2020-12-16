---
title: "Cómo arreglar el mensaje 'xcrun: error: invalid active developer path, missing xcrun' de macOS"
date: '2020-12-16'
description: ¿Has actualizado a la última versión de macOS y te ha aparecido este error? Se puede solucionar instalando de nuevo las Command Line Developer Tools. 
tags:
- macos
---

A veces, tras actualizar `macOS` a una nueva versión de su sistema operativo, o por actualizar otras dependencias, es posible que al intentar utilizar algún comando de `git`, la terminal te devuelva un error un poco críptico que dice así:

```
$ git status
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools),
missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

En realidad este error es que deja de detectar que has aceptado los términos de uso de estas herramientas y deja de poder utilizarlas. Otra razón puede ser que las que tenías instaladas se han eliminado por el paso de actualización y tienes que reinstalarlas.

Sea como sea, **para solucionarlo,** **lo más sencillo es que las vuelvas a instalar.** De esta forma se volveran a registrar en el path correcto. Para ello, ejecuta este comando:

```
$ xcode-select --install
```

Te debería aparecer una ventana preguntándo si quieres instalar las herramientas de desarrollo que `xcode-select` necesita para poder ejecutarse. **Le decimos que sí.**

{{< img align="center" src="/images/como-arreglar-macos-xcrun-error-invalid-active-developer-path-missing-xcrun.png" alt="Ventana con el mensaje que va a instalar las herramientas ee desarrollo" >}}

Tras esto, comenzará una descarga y después una instalación que puede durar unos minutos. Una vez finalizado, prueba de nuevo el comando de git en tu terminal y debería funcionar correctamente. 🎉

### Soluciones si sigue sin funcionarte

En este punto, es raro que todavía no te funcione pero aquí te dejo algunas soluciones más que pueden ayudarte.

1. Reinicia el ordenador para asegurarte que se han registrado bien los cambios.
2. Si sigue sin funcionar, ejecuta en la terminal `sudo xcode-select --reset` para resetear toda la configuración.
3. Si todavía no funciona, prueba a descargar e instalar manualmente las *Command Line Tools for Xcode* desde [la página de Apple Developers.](https://developer.apple.com/download/more/)