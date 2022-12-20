---
title: 'Cómo leer el contenido de un archivo en Deno'
date: '2022-12-21'
description: Aprende a leer el contenido de un archivo en Deno usando la función Deno.readTextFile y Deno.readFile
toc: true
tags:
  - deno
support: deno 1.29.1
---

Leer el contenido de un archivo en Deno es una tarea muy simple gracias a la función `Deno.readTextFile`. Esta función toma una ruta de archivo y devuelve una promesa que se resuelve con el contenido del archivo como una cadena de texto.

Como ves, a diferencia de *Node*, no necesitas importar ninguna biblioteca adicional para leer el contenido de un archivo en Deno. La función `Deno.readTextFile` está disponible desde el objeto global `Deno` y no necesitas importarla explícitamente.

Acepta una ruta de archivo como argumento y devuelve una promesa que se resuelve con el contenido del archivo como una cadena de texto:

```typescript
const fileContent = await Deno.readTextFile("ruta/al/archivo.txt");
```

> **Nota**: `Deno.readTextFile` necesita el permiso de `allow-read` para funcionar. Puedes agregarlo a tu archivo `deno.json` o usar el parámetro `--allow-read` al ejecutar el script.

La variable *fileContent* ahora contendrá el contenido del archivo como una cadena de texto.

Es importante tener en cuenta que `Deno.readTextFile` **solo puede leer archivos de texto**. Si deseamos leer archivos de forma binaria, podemos utilizar la función `Deno.readFile` en su lugar. De hecho, `readTextFile` es solo una abstracción de `readFile` que convierte el contenido del archivo en una cadena de texto.

```typescript
const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("ruta/al/archivo.txt");
console.log(decoder.decode(data));
```

## Gestión de errores

Tanto `readFile` como `readTextFile` devuelven una **promesa que se resuelve con el contenido del archivo**. Si ocurre un error al leer el archivo, la promesa se rechazará con un objeto `Error` que contiene información sobre el error.

Si usas `async/await` puedes manejar el error de la siguiente manera:

```typescript
try {
  const fileContent = await readTextFile("ruta/al/archivo.txt");
} catch (error) {
  console.error(error); // haz algo con el error
}
```

## Leer archivos de forma síncrona

Aunque es poco recomendable, debes saber que también puedes leer archivos de forma síncrona en Deno. Para ello, puedes usar la función `Deno.readTextFileSync`:

```typescript
const fileContent = Deno.readTextFileSync("ruta/al/archivo.txt");
```

A diferencia de `readTextFile`, esta función **no devuelve una promesa**. En su lugar, devuelve el contenido del archivo como una cadena de texto. Pero, obviamente, bloquea el hilos de ejecución hasta que el archivo se haya leído por completo, lo cuál puede degradar el rendimiento de nuestro servicio.
