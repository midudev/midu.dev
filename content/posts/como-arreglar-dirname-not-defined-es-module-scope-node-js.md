---
title: 'Cómo arreglar el error que dice que __dirname no está definido en archivo ES Module de Node.js'
date: '2021-07-12'
description: Al migrar tus archivos de Node.js de Common.js a ESModules puedes encontrar que la variable __dirname no está definida. ¡Aprende a arreglarlo!
tags:
  - node
---

A veces, mientras migras tu código de Node.js de [Common.js](https://en.wikipedia.org/wiki/Common_JS) a [ESModules](https://en.wikipedia.org/wiki/ECMAScript_Modules), puedes encontrar que la variable `__dirname` no está definida.

Por ejemplo, partiendo del siguiente código de un archivo Common.js:

```javascript
const path = require('path')
const root = path.join(__dirname, '..', 'src')
```

Una vez pases tu proyecto para que use `ESModules`...

```javascript
import path from 'path'
const root = path.join(__dirname, '..', 'src')
```

Encontrarás que te devuelve el siguiente error:

```shell
ReferenceError: __dirname is not defined in ES module scope
```

Esto es porque la variable `__dirname` no está definida en proyectos con ES Modules. 

Sin embargo, hay una solución sencilla que puede hacer que la migración sea fácil y deje de darte problemas.

Para ello tienes que utilizar la variable `import.meta.url`. Esta es una variable especial que contiene toda la meta información relativa al módulo, de forma que podremos acceder al contexto del módulo.

Con esto y gracias a la clase `URL` podremos conseguir el mismo efecto de antes. Como primer parámetro le pasaremos la ruta y como segundo parámetro tendremos la URL base, que en este caso será la información del módulo actual.

```javascript
const {pathname: root} = new URL('../src', import.meta.url)
```

Como ves, además de no necesitar más el `path.join` luego lo que hacemos es acceder a la propiedad `pathname` del objeto `URL` que hemos creado.

¡Espero que te sirva! De esta forma, podrás seguir migrando proyectos de Common.js a ESModules sin problemas.