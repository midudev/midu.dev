---
title: 'Cómo leer el contenido de un directorio en Deno'
date: '2022-12-22'
description: Aprende a leer el contenido de un directorio en Deno usando la función Deno.readDir
toc: true
tags:
  - deno
support: deno 1.29.1
---

A veces quieres leer el contenido de un directorio en Deno. Para ello, puedes usar la función `Deno.readDir`.

Esta función toma una ruta de directorio y devuelve una promesa que se resuelve con un iterador asíncrono de objetos `Deno.DirEntry`.

Como ves, a diferencia de *Node*, no necesitas importar ninguna biblioteca adicional para leer el contenido de un directorio en Deno. La función `Deno.readDir` está disponible desde el objeto global `Deno` y no necesitas importarla explícitamente.

```typescript
const dir = await Deno.readDir("ruta/al/directorio");
```

Ahora puedes iterar sobre el iterador asíncrono de objetos `Deno.DirEntry` y obtener el nombre de cada archivo o subdirectorio.

```typescript
for await (const entry of dir) {
  console.log(entry);
}

// { name: "archivo1.txt", isFile: true, isDirectory: false, isSymlink: false }
// { name: "archivo2.txt", isFile: true, isDirectory: false, isSymlink: false }
// { name: "subfolder", isFile: false, isDirectory: true, isSymlink: false }
```

Los campos disponibles son:

- `name`: *string*
El nombre del archivo. Es solo el nombre del recurso y no incluye la ruta completa.

- `isFile`: *boolean*
`true` si se trata de información de un archivo regular. Mutuamente exclusivo con `DirEntry.isDirectory` y `DirEntry.isSymlink`.

- `isDirectory`: *boolean*
`true` si se trata de información de un directorio regular. Mutuamente exclusivo con `DirEntry.isFile` y `DirEntry.isSymlink`.

- `isSymlink`: *boolean*
`true` si se trata de información de un enlace simbólico. Mutuamente exclusivo con `DirEntry.isFile` y `DirEntry.isDirectory`.

> **Nota**: `Deno.readDir` necesita el permiso de `allow-read` para funcionar. Puedes agregarlo a tu archivo `deno.json` o usar el parámetro `--allow-read` al ejecutar el script.

En el caso que el `path` no sea un directorio, la función `Deno.readDir` lanza un error `Deno.errors.NotFound`.
