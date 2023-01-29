---
title: Desactivar reglas de eslint
date: '2023-01-29'
description: Aprende a desactivar reglas de eslint en tu código a diferentes niveles
tags:
- javascript
---

ESLint es una herramienta de linting de JavaScript que ayuda a encontrar y corregir problemas en el código. A veces, puede que una regla específica no se ajuste a tus necesidades o preferencias, y necesites desactivarla. Aquí hay varias maneras de hacerlo.

## 1. Desactivar eslint para una línea

Puedes desactivar una regla para una sola línea agregando un comentario en esa línea que contenga el comando "eslint-disable". Por ejemplo:

```javascript
// eslint-disable-next-line no-alert
alert('foo');
```

También puedes desactivar una regla para una sola línea agregando un comentario en la misma línea.

```javascript
alert('foo'); // eslint-disable-line no-alert
```

Si no indicas el nombre de la regla, se desactivará la regla para esa línea.

```javascript
// eslint-disable-next-line
alert('foo');
```

## 2. Desactivar eslint para un bloque

Puedes desactivar una regla para un bloque de código agregando un comentario en la línea anterior al bloque que contenga el comando "eslint-disable" y el nombre de la regla que quieres desactivar. Por ejemplo:

```javascript
/* eslint-disable no-alert */
alert('foo');
alert('bar');
/* eslint-enable no-alert */
```

Si no indicas la regla, desactivarás todas las reglas para ese bloque.

```javascript
/* eslint-disable */
alert('foo');
alert('bar');
/* eslint-enable */
```

## 3. Desactivar eslint para un archivo

Puedes desactivar una regla para un archivo agregando un comentario en la primera línea del archivo que contenga el comando "eslint-disable" y el nombre de la regla que quieres desactivar. Por ejemplo:

```javascript
/* eslint-disable no-alert */
alert('foo');
```

Si no indicas la regla, desactivarás completamente el linter para ese archivo.

```javascript
/* eslint-disable */
alert('foo');
```

## 4. Desactivar una regla para todo el proyecto

Puedes desactivar reglas en todo un archivo agregando una sección "rules" en tu archivo de configuración de ESLint, .eslintrc. Por ejemplo:

```json
{
  "rules": {
    "no-alert": "off"
  }
}
```
