---
title: Cómo leer, copiar y pegar del portapapeles en JavaScript
date: '2023-01-30'
description: En este artículo aprenderás a usar el portapapeles en JavaScript con ejemplos de código
tags:
- javascript
---

La API del portapapeles disponible en el objeto `navigator` te permite leer y escribir datos del portapapeles del usuario.

Ten en cuenta que para usar la API del portapapeles, **el usuario debe dar permiso a la página web o aplicación para acceder al portapapeles.** Este permiso debe obtenerse de la API de permisos usando los permisos *"clipboard-read"* y/o *"clipboard-write"*.

Esta API está diseñada para dejar de usar el objeto `document.execCommand()` que ya no está soportado en la mayoría de los navegadores.

**Recuerda leer la nota final sobre la compatibilidad de la API del portapapeles en los navegadores actuales.**

## 1. Leer del portapapeles

Para leer del portapapeles, puedes usar el método `readText()` del objeto `navigator.clipboard`. Este método devuelve una promesa que resuelve con el texto del portapapeles.

```javascript
navigator.clipboard.readText()
  .then(text => {
    console.log('Texto del portapapeles:', text)
  })
  .catch(err => {
    console.error('Error al leer del portapapeles:', err)
  })
```

También puedes usar `async/await` para leer del portapapeles:

```javascript
try {
  const text = await navigator.clipboard.readText()
  console.log('Texto del portapapeles:', text)
} catch (err) {
  console.error('Error al leer del portapapeles:', err)
}
```

Pero imagina que tienes algo diferente en el portapapeles, como una imagen. En ese caso, el método `readText()` fallará. Para evitar esto, puedes usar el método `read()` del objeto `navigator.clipboard` que devuelve una promesa que resuelve con un objeto `ClipboardItem` que contiene los datos del portapapeles.

```javascript
navigator.clipboard.read()
  .then(data => {
    // iteramos sobre los datos del portapapeles
    for (const item of data) {
      // si el tipo de datos es texto plano
      if (item.type === 'text/plain') {
        item.getAsString(text => {
          console.log('Texto del portapapeles:', text)
        })
      }
      // si es una imagen, entonces la mostramos
      else if (item.type === 'image/png') {
        const blob = await item.getType('image/png')
        const img = new Image()
        img.src = URL.createObjectURL(blob)
        document.body.appendChild(img)
      }
    }
  })
  .catch(err => {
    console.error('Error al leer del portapapeles:', err)
  })
```

## 2. Escribir al portapapeles

Para escribir al portapapeles texto, puedes usar el método `writeText()` del objeto `navigator.clipboard`. Este método devuelve una promesa que resuelve cuando el texto se ha copiado al portapapeles.

```javascript
navigator.clipboard.writeText('Hola mundo')
  .then(() => {
    console.log('Texto copiado al portapapeles')
  })
  .catch(err => {
    console.error('Error al copiar al portapapeles:', err)
  })
```

También puedes usar `async/await` para escribir al portapapeles:

```javascript
try {
  await navigator.clipboard.writeText('Hola mundo')
  console.log('Texto copiado al portapapeles')
} catch (err) {
  console.error('Error al copiar al portapapeles:', err)
}
```

Pero imagina que quieres copiar una imagen al portapapeles. En ese caso, puedes usar el método `write()` del objeto `navigator.clipboard` que devuelve una promesa que resuelve cuando los datos se han copiado al portapapeles.

```javascript
const img = document.querySelector('img')
const blob = await fetch(img.src).then(r => r.blob())
const item = new ClipboardItem({ 'image/png': blob })

navigator.clipboard.write([item])
  .then(() => {
    console.log('Imagen copiada al portapapeles')
  })
  .catch(err => {
    console.error('Error al copiar al portapapeles:', err)
  })
```

Como ves, en el ejemplo usamos la clase `ClipboardItem` para crear un objeto que contiene los datos que queremos copiar al portapapeles. Este objeto se pasa al método `write()` del objeto `navigator.clipboard`.

Ten en cuenta que no puedes guardar cualquier cosa en el portapapeles. Por ejemplo, no puedes guardar un objeto `File` o `Blob` directamente. En su lugar, debes crear un objeto `ClipboardItem` que contenga los datos que quieres copiar al portapapeles.

## Soporte en los navegadores

La API de Clipboard asíncrona está soportada por casi todos los navegadores modernos... **pero con matices.**

Y es que en Safari, por temas de privacidad, Apple sólo te permite escribir en el portapapeles, si el usuario te ha dado permiso, pero nunca podrás leer de él.

En Firefox puedes leer el portapapeles... pero sólo podrás escribir texto. No podrás escribir imágenes, por ejemplo, al menos a día de hoy.

En navegadores basados en Chromium (Chrome, Edge, Opera...) no hay ninguna limitación siempre que cuentes con el permiso del usuario.

<script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/public/caniuse-embed.min.js"></script>
<p class="ciu_embed" data-feature="async-clipboard" data-periods="future_1,current,past_1,past_2" data-accessible-colours="false">
<picture>
<source type="image/webp" srcset="https://caniuse.bitsofco.de/image/async-clipboard.webp">
<source type="image/png" srcset="https://caniuse.bitsofco.de/image/async-clipboard.png">
<img src="https://caniuse.bitsofco.de/image/async-clipboard.jpg" alt="Data on support for the async-clipboard feature across the major browsers from caniuse.com">
</picture>
</p>