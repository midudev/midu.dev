---
title: Cómo usar rutas absolutas en los imports en Next.js
date: '2021-05-19'
image: '/images/deja-de-usar-imports-relativos-next-js.png'
description: Evita usar rutas relativas a la hora de importar archivos en tus componentes de React en Next.js y usa rutas más fáciles de leer
tags:
- nextjs
---

Normalmente cuando trabajamos con aplicaciones de React, tenemos multitud de componentes en diferentes carpetas y tenemos que usar rutas relativas para poder importarlos allí donde lo necesitamos.

Por ejemplo con esta estructura de aplicación:

```raw
next-js-react-app/
├─ pages/
│  ├─ index.js
│  ├─ search/
│  │  ├─ index.js
├─ components/
│  ├─ Button/
│  │  ├─ index.js
│  │  ├─ index.css
```

Imaginemos que desde el archivo `pages/search/index.js` queremos importar el componente Button. Tendríamos que hacer el import de la siguiente manera:

```javascript
import Button from '../../components/Button'
```

Esto, que es un ejemplo sencillo, si tuvieramos que repetir constamente nos encontraríamos que es difícil de estar pendiente constantemente de seguir las rutas relativas para cada componente o archivo que queramos importar.

Para mejorar esto podemos usar los **imports con rutas absolutas** de esta forma:

```javascript
import Button from 'components/Button'
```

Si lo probamos, veremos que no funciona... **¡pero podemos hacer que lo haga!**

Para ello sólo tenemos que añadir un archivo llamado `jsconfig.json` en la raíz de tu proyecto y añadimos el siguiente contenido:

```javascript
{
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

De esta forma, ahora podremos **importar ficheros usando rutas absolutas** desde la raíz, de forma que las rutas que usaremos serán más predecibles y fáciles de completar.

Además este archivo de configuración también habilitará a que editores como Visual Studio Code entiendan este tipo de rutas.