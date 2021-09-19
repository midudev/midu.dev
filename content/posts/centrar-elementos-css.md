---
title: Las mejores formas de centrar elementos en CSS
date: '2021-08-05'
description: Descubre cómo centrar elementos en CSS tanto horizontalmente como verticalmente con propiedades que funcionan en todos los navegadores modernos.
toc: true
tags:
- css
---

Si hay una broma recurrente en *CSS* siempre ha sido **la dificultad de centrar un elemento tanto horizontal como verticalmente en condiciones**. Durante muchos años nos han acompañado multitud de hacks para poder conseguirlo... pero hoy en día ya no es necesario.

Te voy a enseñar diferentes formas de **cómo puedes centrar elementos en los dos ejes con CSS.**

## 1. Usando grid y place-content

Con `grid`, centrar elementos en los dos ejes es sencillo. Es **fácil de recordar** y funciona muy bien para layouts grandes.

Digo *casi* porque **los elementos que contiene tomarán la anchura del elemento más ancho**... Un pequeño inconveniente que debes tener en cuenta.

```css
.container {
  display: grid;
  place-content: center;
}
```

[Demo](https://codi.link/PGRpdiBjbGFzcz0nY29udGFpbmVyJz4KICA8aDE+VGV4dG8gY2VudHJhZG88L2gxPgo8L2Rpdj4=%7CLmNvbnRhaW5lciB7CiAgZGlzcGxheTogZ3JpZDsKICBwbGFjZS1jb250ZW50OiBjZW50ZXI7Cn0KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCmJvZHkgewogIGJhY2tncm91bmQ6ICMwOWY7CiAgZm9udC1mYW1pbHk6IHN5c3RlbS11aTsKfQoKaDEgewogIGJhY2tncm91bmQ6ICNmZmY7CiAgcGFkZGluZzogMTZweDsKfQoKLmNvbnRhaW5lciB7CiAgaGVpZ2h0OiA5NnZoOwp9%7C)

## 2. Flex y margin auto

Para elementos pequeños, como iconos, existe una sencilla forma de utilizar `flex` junto con `margin: auto` para centrar los elementos. Hace su trabajo en algunas situaciones complicadas, **es fácil de recordar** pero... bueno, todo lo que se basa en selectores que sean con **asterisco** hay que tomarlo con pinzas y, además, **no se lleva bien con los overflows.**

```css
.container {
  display: flex;
}

.container > * {
  margin-auto: auto;
}
```

[Demo](https://codi.link/PGRpdiBjbGFzcz0nY29udGFpbmVyJz4KICA8aDE+VGV4dG8gY2VudHJhZG88L2gxPgo8L2Rpdj4=%7CLmNvbnRhaW5lciB7CiAgZGlzcGxheTogZmxleDsKfQoKLmNvbnRhaW5lciA+ICogewogIG1hcmdpbjogYXV0bzsKfQoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKYm9keSB7CiAgYmFja2dyb3VuZDogIzA5ZjsKICBmb250LWZhbWlseTogc3lzdGVtLXVpOwp9CgpoMSB7CiAgYmFja2dyb3VuZDogI2ZmZjsKICBwYWRkaW5nOiAxNnB4Owp9CgouY29udGFpbmVyIHsKICBoZWlnaHQ6IDk2dmg7Cn0=%7C)

## 3. Con posiciones absolutas

Es uno de los más antiguos pero si ha resistido el paso del tiempo... ¡es por algo! Esta solución se basa en utilizar un `position: absolute` para centrar el elemento en el centro. Es perfecto especialmente para modales o elementos que deben sobreponerse para ser siempre visibles.

Lo malo es que necesita tener un contenedor relativo y que funciona bien cuando sólo hay uno... si empiezas a llenar tu código de esto, que huele a hack, vas a tener muchos quebraderos de cabeza.

> Ojo, que este *hack* se debe aplicar directamente sobre el elemento que se quiera centrar y no el contenedor.

```css
.element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

[Demo](https://codi.link/PGRpdiBjbGFzcz0nY29udGFpbmVyJz4KICA8aDE+VGV4dG8gY2VudHJhZG88L2gxPgo8L2Rpdj4=%7CaDEgewogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICB0b3A6IDUwJTsKICBsZWZ0OiA1MCU7CiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7Cn0KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCmJvZHkgewogIGJhY2tncm91bmQ6ICMwOWY7CiAgZm9udC1mYW1pbHk6IHN5c3RlbS11aTsKfQoKaDEgewogIGJhY2tncm91bmQ6ICNmZmY7CiAgcGFkZGluZzogMTZweDsKfQoKLmNvbnRhaW5lciB7CiAgaGVpZ2h0OiA5NnZoOwp9%7C)

## 4.  La mejor solución 🏆: Flexcelente

Sin ninguna duda, la solución más correcta y que, justamente, está pensada para ello es usar `flex` junto con `align-items` y `justify-content` a center.

* **`align-items`**: define el comportamiento de los elementos a través del eje contrario al principal (si el `flex-direction` es `column`, entonces serían las filas).

* **`justify-content`**: define el alíneamiento y distribución de los elementos en el eje principal (si el `flex-direction` es `column`, entonces serían las columnas).

De esta forma, podemos hacer lo siguiente:

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

[Demo](https://codi.link/PGRpdiBjbGFzcz0nY29udGFpbmVyJz4KICA8aDE+VGV4dG8gY2VudHJhZG88L2gxPgo8L2Rpdj4=%7CLmNvbnRhaW5lciB7CiAgZGlzcGxheTogZmxleDsKICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICBhbGlnbi1pdGVtczogY2VudGVyOwp9CgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCmJvZHkgewogIGJhY2tncm91bmQ6ICMwOWY7CiAgZm9udC1mYW1pbHk6IHN5c3RlbS11aTsKfQoKaDEgewogIGJhY2tncm91bmQ6ICNmZmY7CiAgcGFkZGluZzogMTZweDsKfQoKLmNvbnRhaW5lciB7CiAgaGVpZ2h0OiA5NnZoOwp9%7C)

## Conclusiones

Desde luego mi favorita es la última. No tiene desventajas, excepto el lío que te puedas hacer con las propiedades `justify-content` y `align-items`, y hace justamente lo que se espera.

En ocasiones la solución de `position: absolute` para modales puede funcionar bien o para layouts muy grandes, usar `display: grid` es interesante para layouts grandes (por ejemplo, para centrar todo el contenido de tu página).

¡Espero que a partir de ahora ya no tengas problemas en centrar elementos con CSS! ✌️
