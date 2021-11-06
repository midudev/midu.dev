---
title: Métricas de Web Performance
date: '2021-11-06'
description: Todas las métricas de Web Performance que debes conocer, sus valores recomendados y cómo se miden
toc: true
tags:
- performance
---

**¿Conoces todas las métricas que puedes extraer del rendimiento de una web?** Si no las sabes... ¡deberías! La *Web Performance* es muy importante para el éxito de cualquier página. Ya no sólo porque [Google lo tiene en cuenta a la hora de posicionar tu sitio](https://developers.google.com/web/updates/2018/07/search-ads-speed) en los resultados de búsqueda, sino porque muchas de las métricas que se miden impactan directamente en la experiencia de las personas que usan tu sitio.

Este artículo te ayudará a conocer todas las métricas que puedes extraer del rendimiento de una web y a conocer cómo se miden.

## ¿De dónde se extraen las métricas?

Antes de conocer las métricas de Web Performance, debes saber de dónde se extraen. Las métricas de rendimiento se pueden conseguir a través de dos fuentes:

* **Datos de laboratorio**: Esto es simular unas condiciones desde una máquina, medir el rendimiento y extraer la información. Esto, por ejemplo, es lo que consigues con herramientas como **Lighthouse** desde tus herramientas de desarrollo. Es útil para medir acciones concretas o ir más al detalle de los recursos que se cargan y cómo.

* **Datos de campo**: Estos son datos de usuarios reales de tu página web. Gracias a la API de *Performance Timings*, puedes extraer la información de cada usuario y enviarla a un servidor. La propia Google te ofrece la oportunidad de acceder a esta información con *Chrome UX Report* o desde [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/). Te ayuda a tener una visión más global del comportamiento de tu sitio y cómo ha ido evolucionando con el tiempo.

![En PageSpeed Insights puedes ver tanto los datos de experimentos como datos de campo de usuarios reales](https://pbs.twimg.com/media/FDcLFZ4WYAgbeda?format=jpg&name=medium "En PageSpeed Insights puedes ver tanto los datos de experimentos como datos de campo de usuarios reales")

Hay algunas métricas que se pueden extraer de ambas fuentes. Otras, sin embargo, tienen más sentido desde una u otra. **Tenlo en cuenta.**

## Métricas de rendimiento

### Time to First Byte

El *Time To First Byte (TTFB)* mide el tiempo desde que el navegador hace la petición de la página hasta que el primer byte es recibido.

Es una métrica bastante importante, ya que afecta a casi todas las demás métricas que veremos más adelante. Se ve afectada normalmente por el trabajo que hace el servidor (como llamadas a bases de datos o APIs) y la latencia del servidor.

![En las herramientas de desarrollo de Chrome es muy fácil extraer esta métrica](https://pbs.twimg.com/media/FDcLC-GXsAIu4Ie?format=jpg&name=medium "En las herramientas de desarrollo de Chrome es muy fácil extraer esta métrica")

**✅ Tiempos por debajo de 0,6 segundos**<br>
**Se extrae de datos de laboratorio 🧪 y usuarios reales 👩‍👩‍👧‍👦**

### First Contentful Paint

El *First Contentful Paint (FCP)* señala el tiempo que se ha tardado en mostrar en pantalla cualquier texto o imagen (incluido fondos)

Esta métrica es muy importante ya que le indica al usuario si realmente la web funciona y pueda empezar a consumir la web.

![Mientras que el First Paint sería la métrica del primer pintado, el First Contentful Paint mide que haya contenido, ya sea texto o imágenes](https://pbs.twimg.com/media/FDcLDd0XMAcOAPv?format=png&name=900x900 "Mientras que el First Paint sería la métrica del primer pintado, el First Contentful Paint mide que haya contenido, ya sea texto o imágenes")

**✅ Tiempo por debajo de 1,8 segundos**<br>
**Se extrae de datos de laboratorio 🧪 y usuarios reales 👩‍👩‍👧‍👦**

### Largest Contentful Paint

El *Largest Contentful Paint (LCP)* es similar al *FCP* pero cuenta el tiempo que ha tardado en renderizar la pieza de contenido más grande que está en el viewport. Este contenido puede, o no, coincidir con el que se ha contado como *FCP*.

Esta métrica es importante porque es, normalmente, el contenido que más llama la atención al usuario. **Es una de las tres Web Vitals de Google.**

![Normalmente las imágenes grandes son las que determinan el Largest Contentful Paint así que recuerda en optimizarlas](https://pbs.twimg.com/media/FDcLDqaXMAcOqAb?format=jpg&name=medium "Normalmente las imágenes grandes son las que determinan el Largest Contentful Paint así que recuerda en optimizarlas")

**✅ Debería ocurrir por debajo de los 2.5 segundos**<br>
**Se extrae de datos de laboratorio 🧪 y usuarios reales 👩‍👩‍👧‍👦**

### Speed Index

El *Speed Index (SI)* Calcula cómo de rápido el contenido visual se ha mostrado progresivamente en el *viewport* al usuario. Se podría decir que es la *velocidad* a la que hemos mostrado el contenido de la página.

Para que te hagas una idea, no es lo mismo una página en blanco durante 3 segundos y que muestre todo el contenido de golpe... a que tarde un poco más pero muestre contenido de forma progresiva. La persona que visita la página lo va a percibir de forma distinta.

![Este tipo de tiras te ayudan a ver cómo se ha ido pintando la página de forma progresiva y ver oportunidades de mejora](https://pbs.twimg.com/media/FDcLD7hXEAAmsxc?format=jpg&name=medium "Este tipo de tiras te ayudan a ver cómo se ha ido pintando la página de forma progresiva y ver oportunidades de mejora")

**✅ Por debajo de los 3.4 segundos**<br>
**Se extrae de datos de laboratorio 🧪**

### First Input Delay

El *First Input Delay (FID)* es la cantidad de tiempo que se tarda en que el usuario pueda hacer la primera acción en la página. Dicho de otra forma, el tiempo que tarda en responder la interfaz a la primera interacción del usuario.

Es una de las tres Web Vitals de Google para cuidar la interactividad de la página. ¿Sabes cuando haces clic en una página y no responde? Pues eso..

**✅ La primera interacción responde en menos de 100ms.**<br>
**Fiable especialmente en datos de usuarios reales 👩‍👩‍👧‍👦.**

### Max Potential First Input Delay

El *Max Potential First Input Delay (mFID)* es parecido al *FID* pero esta calcula el máximo valor posible de *FID* teniendo en cuenta el tiempo que el hilo principal ha estado bloqueado.

**✅ Por debajo de 130ms**<br>
**Útil para ser extraída en datos de usuarios reales. 🌎**

### Total Blocking Time

El *Total Blocking Time (TDT)* suma la duración de las tareas largas (más de 50ms) de JS que han bloqueado el hilo principal después del FCP.

Cuando más tiempo se bloquea el hilo principal, menos usable e interactiva es la página.

![En la pestaña de Performance en las DevTools pueden ver fácilmente las tareas largas que determinan el Total Blocking Time](https://pbs.twimg.com/media/FDcLEbMWYAUMOSk?format=jpg&name=medium)

**✅ Menos de 200ms de bloqueo**<br>
**Se extrae de datos de laboratorio 🧪**

### Time to Interactive

El *TTI o Time To Interactive* es el tiempo que tarda la página en haber mostrado todo el contenido útil, los eventos de los elementos más visibles han sido registrados y la página responde a interacciones en 50ms.

**No es muy estable** y poco a poco se ha ido abandonado en favor del *TDT*

**✅ Por debajo de 3,8 segundos**<br>
**Se extrae de datos de laboratorio 🧪**

### Cumulative Layout Shift

El *Cumulative Layout Shift (CLS)* mide los saltos que ha dado el layout de tu página mientras se cargaba.

Es la tercera métrica que es parte de las Web Vitals. Te ayuda a saber que la página es estable visualmente.

![Cuando el diseño de tu web da saltos, hace que los usuarios se frusten por hacer clic en lugares que no querían. Suele pasar con imágenes o banners de publicidad](https://pbs.twimg.com/media/FDcLE_8WUAQ2JHg?format=jpg&name=medium)

**✅ Una puntuación de 0,1 o menos**
**Se extrae de datos de laboratorio 🧪 y datos de campo. 🌎**

## Conclusiones

Con esto ya conoces las métricas más importantes a considerar sobre el rendimiento de tu sitio. Como habrás visto no hay rastro del *Transfer Size* (el tamaño de los recursos que descargas) y es que es una métrica bastante inútil. Aunque, es posible, que cuanto más CSS y JavaScript descargues... algunas métricas se vean afectadas, lo cierto es que no tiene por qué haber una relación directa.

Ahora que ya conoces las métricas que puedes usar para mejorar tu sitio, te recomiendo que te apoyes en una de las siguientes herramientas:
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/)
- [WebpageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

También es importante dominar la pestaña *Performance* de las *DevTools*, que te permite averiguar y extraer un montón de datos interesantes para mejorar las métricas.