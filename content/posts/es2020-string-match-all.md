---
title: ES2020 - globalThis
date: '2020-04-14'
description: Aprende cómo utilizar globalThis, por qué es útil y descubre algunos ejemplos
language: 🇪🇸
toc: true
tags:
- javascript
---

## Por qué necesitamos `globalThis`

```js
const getGlobalObject = () => { 
  if (typeof self !== 'undefined') { return self } 
  if (typeof window !== 'undefined') { return window } 
  if (typeof global !== 'undefined') { return global } 
  throw new Error('unable to locate global object') 
};

const globalThis = getGlobalObject() 
```
ES2020