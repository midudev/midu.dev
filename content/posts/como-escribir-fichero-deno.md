---
title: 'Cómo escribir un fichero en Deno'
date: '2022-12-26'
description: Aprende a escribir el contenido de un fichero en Deno usando 
toc: true
tags:
  - deno
support: deno 1.29.1
---

Deno es un runtime de JavaScript y TypeScript que ofrece una serie de herramientas y características para facilitar el desarrollo y la ejecución de aplicaciones. Una de estas características es la posibilidad de **escribir texto en archivos de forma sencilla y segura.**

Para escribir texto en un archivo con Deno, se puede utilizar el método `Deno.writeTextFile()`. Este método recibe como parámetros la ruta del archivo donde se quiere escribir el texto y la cadena de texto que se desea escribir. Además, el método **devuelve una promesa que se resuelve cuando el archivo se ha escrito correctamente.**

Por ejemplo, para escribir "Hola mundo" en un archivo llamado "hello.txt", se puede utilizar el siguiente código:

```typescript
await Deno.writeTextFile("./hello.txt", "Hola mundo!")
console.log("Archivo escrito en ./hello.txt")
```

Como Deno es seguro por defecto, el código anterior se tiene que ejecutar dándole permisos de escritura a nuestro programa. Para hacerlo, hay que pasarle el *flag* `--allow-write`:

```typescript
deno run --allow-write write.ts
```

Además, Deno.writeTextFile() tiene un parámetro opcional llamado *options*, que permite especificar diferentes opciones de escritura.

Por ejemplo, se puede utilizar la opción *append* para agregar texto al final de un archivo existente, en lugar de sobreescribirlo. Por ejemplo:

```typescript
await Deno.writeTextFile("./hello.txt", "Este texto se agregará al final.", {
  append: true,
})
```

Otra forma útil de utilizar `Deno.writeTextFile()` es combinarlo con `JSON.stringify` para escribir objetos serializados en formato *JSON* en un archivo.

Por ejemplo, vamos a escribir una función `writeJson` que nos permite pasarle un *path* y un objeto, y que nos devuelve una promesa con el *path* del archivo escrito o un mensaje de error en caso de que algo salga mal.

```typescript
async function writeJson(path: string, data: object): string {
  try {
    const json = JSON.stringify(data)
    await Deno.writeTextFile(path, json)
    return { path }
  } catch (e) {
    return { error: e.message }
  }
}

console.log(writeJson("./data.json", { message: "Hello World" }))
```

También existe la versión síncrona de `Deno.writeTextFile()`, que se llama `Deno.writeTextFileSync()`. Esta versión síncrona recibe los mismos parámetros que la versión asíncrona, pero no devuelve una promesa.

```typescript
Deno.writeTextFileSync("./hello.txt", "Hola mundo!")
```
