---
title: >-
  Cómo cargar archivos JSON con ESModules en Node.js
date: '2021-06-14'
description: Con la llegada de los ECMAScript Modules a Node.js parece que se ha perdido la posibilidad de cargar archivos JSON... pero no. ¡Te cuento cómo puedes hacerlo!
tags:
  - node
---

Usar ECMAScript Modules en Node.js es ya una realidad y, con ello, no sólo vamos a tener que acostumbrarnos a una nueva sintaxis... también hay ciertas ventajas de `commonjs` que ahora mismo no sirven. Como importar archivos JSON usando simplemente un `const data = require('file.json')`.

A día de hoy para poder importar con ESModules un archivo `.json` tienes que utilizar el flag `--experimental-json-modules` al ejecutar Node.js tal y como explica [la documentación oficial.](https://nodejs.org/api/esm.html#esm_json_modules)

```javascript
// index.mjs
import packageConfig from './package.json' assert { type: 'json' };
```

Necesitarías usar:

```sh
node index.mjs # esto falla
node --experimental-json-modules index.mjs # funciona!
```

Si no quieres usar esta medida experimental... **¿cómo puedes importar un archivo JSON actualmente usando ESModules?**

## Opción 1: Leer y transformar el archivo JSON manualmente

La primera opción, y la que yo recomendaría, es la de utilizar la API del *File System de Node.js* para leer el contenido del fichero y transformarlo en un JSON usando `JSON.parse`.

```javascript
import { readFile } from 'fs/promises'

// leemos el archivo usando top-level await y con
// codificación utf-8
const file = await readFile('./file.json', 'utf-8')

// transformamos el contenido en un JSON
const json = JSON.parse(file)
```

## Opción 2:

La segunda opción es un poco más complicada y se trata de reusar la conocida funcionalidad de `require` en nuestro archivo donde usamos ESModules.

Para ello se usa `createRequire` un [método documentado en Node.js](https://nodejs.org/api/module.html#module_module_createrequire_filename) que te permite crear una función `require`. Para ello hay que pasarle como argumento un string con el path absoluto o un objeto URL.

Lo mejor aquí es aprovechar la propiedad `import.meta.url` para que nos de exactamente la ruta del archivo y así simular complemtanete la funcionalidad de `require`.

```javascript
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const json = require("./file.json")
```

## Conclusión

Seguramente con la salida de Node.js 18 (si no ha salido en el momento que leas este artículo) ya estará disponible una forma nativa de leer archivos JSON...

Aunque existir ya existe una propuesta aceptada y no me extrañaría que Node.js al final se decante por esta para mantener una compatibilidad total con la especificación.

La sintaxis sería esta:

```javascript
import json from "./foo.json" assert { type: "json" }
import("foo.json", { assert: { type: "json" } })
```

Ahora bien, mientras esto no es una realiadad, yo seguramente me quedaría con la primera opción... y olvidarme por completo que `commonjs` ha existido alguna vez.

