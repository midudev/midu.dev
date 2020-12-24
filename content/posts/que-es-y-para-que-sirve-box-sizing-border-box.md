---
title: "box-sizing: border-box: ¿Qué es y para qué sirve?"
date: '2020-12-24'
description: >-
  Con el cambio de prestaciones de Travis para repositorios de código abierto en
  GitHub, el paso más lógico parece migrar a GitHub Actions. En este artículo te
  cuento cómo hacerlo paso a paso con proyectos de Node.js.
topic: css
tags:
  - css
image: /images/og/que-es-y-para-que-sirve-box-sizing-border-box.png
---

**El valor border-box en CSS para la propiedad box-sizing** llegó para cambiar la vida de los frontend para siempre. Trabajar con *paddings* en nuestros diseños era un incordio. ¿Por qué? Por el modelo de la caja. ¿Qué modelo de la caja? El de CSS. ¿Pero eso que es? Pues si tienes un minuto y lo quieres ver en vídeo, te lo cuento.

{{< youtube id="Vx854s9YE78" >}}

## ¿Qué hace la propiedad box-sizing?

La propiedad de CSS `box-sizing` indica cómo se deben calcular las medidas de un elemento. Esto, que parece trivial, no lo es tanto ya que por defecto **CSS considera que el ancho y alto de la caja es de las propiedades `width` y `height`**. ¿Qué significa esto? Pues que si le añades un `padding` o un `border` el tamaño de renderizado de la caja será: **width + padding + border**.

En el siguiente ejemplo tendríamos una caja de 290px de ancho ya que:
*250px de width + (10px * 2) de padding + (10px * 2) de border*

```css
div {
  width: 250px;
  border: 10px;
  padding: 10px;
}
```

Aunque no la veamos ahí, la propiedad `box-sizing` es la que se encarga de decir cómo debe ser ese cálculo. En este caso está utilizando el valor `content-box`, ya que es **su valor por defecto.**

Ahora bien, esto es bastante problemático ya que hace que sea muy difícil de calcular de forma predecible el ancho o alto de nuestros elementos si tienen `padding` o `border`. Para arreglar esto tenemos el valor `border-box`.

## ¿Para qué sirve el valor box-sizing: border-box?

Para simplificar el cálculo de la caja podemos usar el valor `border-box` que tiene un soporte total en los navegadores de hoy en día (tendríamos que remontarnos a Internet Explorer 8 para ver dónde no existe soporte).

El valor `border-box` en el `box-sizing` hace que el `padding` y el `border` pasen a formar parte del cálculo del ancho de la caja y no lo suman posteriormente.

En el siguiente ejemplo tendríamos una caja de 250px de ancho ya el `padding` y el `border` ya forman parte del cálculo del `width` del elemento:

```css
div {
  box-sizing: border-box;
  width: 250px;
  border: 10px;
  padding: 10px;
}
```

Y con esto simplificamos nuestra vida bastante ya que si queremos una caja que mida `250px` de esta forma tendremos la seguridad que será de la medida que le hemos indicado sin importar si usamos bordes o paddings. **¡Qué suficiente problemas nos da la maquetación para sufrir con estas cosas!** 😆

## ¿Cómo usar box-sizing: border-box?

Muchos resets CSS o normalizers ya incluyen el CSS necesario para que tu página use este tipo de cálculo del modelo de la caja de CSS pero si, por lo que fuese, necesitas añadirlo manualmente en tu proyecto, lo mejor es que lo uses de la siguiente forma:

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

Esto lo que hace es hacer que en tu `html` se use `border-box` y los elementos hereden este valor pero puedan cambiar si fuese necesario por otro valor (aunque es poco probable que lo uses quién sabe si cargas algún componente de tercero que sí).