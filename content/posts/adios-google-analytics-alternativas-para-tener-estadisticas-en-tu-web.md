---
title: Adiós Google Analytics. Alternativas para tener estadísticas en tu web
date: '2021-02-04'
image: '/images/og/adios-google-analytics-alternativas-para-tener-estadisticas-en-tu-web.png'
description: ¿Por qué he dejado de usar Google Analytics y tú también deberías? Además, te doy algunas alternativas que puedes utilizar en su lugar
topic: me
toc: true
tags:
- me
---

Desde el nacimiento del blog **siempre he usado Google Analytics**. Es la elección obvia. **Es gratis** (más o menos) y los datos que ofrece son muchos y variados. Te permite conocer mejor tu audiencia y, lo que es importante, hacer acciones para mejorar tus métricas.

{{< img align="center" alt="Google Analytics es la solución de Google para tener estadísticas en tu página web. Seguramente, la opción más usada en el mundo occidental." src="/images/analytics.png" >}}

No me extraña que tú lo uses ni que la gran mayoría de páginas lo haga. Es normal. ¿Por qué ibas a usar otra cosa si además tendrías que, seguramente, **pagar por ello**?

Pues por una razón. **Porque cuando un producto es gratis... el producto eres tú.**

Y por si esto fuera poco, **hay más...**

## Seguramente estás usando Google Analytics ilegalmente 👮‍♂️

Bueno, esto poca gente lo sabe o realmente le importa. Pero **es grave**. El caso es que **si usas Google Analytics** y tu página web se sirve en la Unión Europea, **DEBERÍAS estar enseñando el AVISO DE COOKIES.**

*¡Pero Miguel, que yo ya enseño el aviso de cookies!*

¿Sí? Pero... **¿Realmente estás cargando Google Analytics sólo cuando tienes el consentimiento del usuario?** ¿O estás haciendo tracking incluso cuando el usuario te ha dicho que NO? De hecho, **¿le has dado realmente esa opción?**

{{< img align="center" alt="Típica barra de cookies que no cumple con la legalidad y que es usada en un montón de sitios..." src="/images/barra-aviso-de-cookies.jpg" >}}

El tema es que no basta con enseñar el aviso. Tendrías que hacer **dos cosas**:

* a) No cargar Google Analytics y/o trackear al usuario **hasta no tener su consentimiento**.
* b) Darle la posibilidad de revocar su consentimiento en cualquier momento.

**Y esto no pasa nunca.** De hecho **tooooodo el mundo tiene un blog donde carga Google Analytics** y ni pide consentimiento ni nada de nada. No te estoy señalando... yo mismo hasta hace unas semanas estaba haciendo lo mismo.

Ahí tenemos la cuantiosa multa a [Google y Amazon por instalar cookies sin el permiso del usuario](https://twitter.com/CNIL/status/1336931161621327872). Pero no hay que irse muy lejos. Hace unos meses Twitter fue [multada por la denuncia de un particular por 30.000€](https://confilegal.com/20200611-proteccion-de-datos-multa-a-twitter-con-30-000-euros-por-una-infraccion-leve-en-su-politica-de-cookies/).

## La gestión de cookies es un incordio pero un incordio necesario 🛑

Sé que **es una verdadera molestia tener que mostrar el banner** y a veces es un reto técnico gestionar los consentimientos del usuario con los scripts que cargamos. Lo ideal, en mi opinión, es que toda esta gestión se pudiese hacer a nivel de navegador (y así evitar tanto código innecesario en la red para lo mismo) pero, por ahora, **es un mal necesario.**

Es necesario porque **se nos ha ido de las manos.** Hemos estado usando las cookies por encima de nuestras posibilidades. Retorciéndolas de forma que hemos vilipendiado a nuestros usuarios explotando sus datos hasta cotas insospechadas para poder sacar el rendimiento económico máximo. Poder sacarlo nosotros... o las empresas de siempre como **Google, Facebook o Amazon.**

{{< img align="center" alt="He entrado en un blog cualquiera y sin enseñarme ningún aviso de cookies ya me ha metido unas cuantas de Google y Facebook. Sin consentimiento." src="/images/cookies-sin-consentimientos.png" >}}

Cuando **usas Google Analytics, al final, estás nutriendo a Google de un montón de información que le va a ayudar a tomar decisiones.** Ver lo que hace el usuario. Saber lo que mejor funciona. Compartir esa información con anunciantes. Y aprovecharse de tus usuarios.

Al final es cierto que tienes tus queridas estadísticas pero **lo pagas compartiendo datos** a una multinacional que le va a sacar provecho y, claro, pagando con la privacidad de tus usuarios. De hecho tus visitantes, no sólo pierden su privacidad, si no que **se ven molestados por una barra de cookies**, si te da por cumplir la legalidad, que tienen que aceptar si quieren utilizar tu web en condiciones. (si estás pensando en evitar que puedan usar la web si no aceptan que sepas que **es ilegal**).

Por suerte, poco a poco, vemos movimientos como el de [GitHub, que ha eliminado totalmente las cookies de su sitio](https://github.blog/2020-12-17-no-cookie-for-you/) justamente para evitar tener que molestar a sus usuarios con el manido aviso.

## Adiós Google Analytics 👋, adiós aviso de cookies y hola mejoras de rendimiento ⚡

Hace tiempo escribí un artículo donde explico **cuál es [la mejor forma de cargar Google Analytics](https://midu.dev/cargar-google-analytics-de-forma-optima/) para mejorar el rendimiento de tu página web.** Pero... ¿sabes qué? La mejor forma es no cargarlo. 🤣

Y es que **Google Analytics no es el cliente de analíticas más liviano**, precisamente, pese a utilizar el snippet que comento en el artículo.

### Alternativas a Google Analytics 🔀📈

Alternativas hay unas cuantas. Por mi parte, he empezado a utilizar [Fathom Analytics](https://usefathom.com/ref/8C8RPY). Me da la información necesaria para saber cómo va funcionando mi sitio y además **cumple completamente la GDPR, así que no tengo que usar ningún aviso de cookies.**

{{< img align="center" alt="Así se ven las estadísticas en Fathom Analytics" src="https://usefathom.com/assets/fathom-analytics.png" >}}

**También me gusta que tiene un diseño limpio**, una integración sencilla (una sola línea de código), una forma muy fácil de compartir las estadísticas a partir de una URL y un muy buen rendimiento ⚡. Vamos, un **win-win**.

¿Lo malo? Que **sólo está en inglés** y **su plan empieza a partir de 14$ 💸** (por 100.000 páginas vistas). ¿Es caro? Pues sí. Si lo comparas con gratis, es caro. Pero creo que la privacidad de mis usuarios vale cada euro que pago. 🕵️‍♂️

Si quieres probarlo, **te dejo un enlace con mi referal.** Yo me llevaría un **25%** si al final te haces cliente y por tu parte **tienes 10$ gratis** para empezar (además del periódo de prueba):

**👉 [Registrarse con 10$ de crédito en Fathom](https://usefathom.com/ref/8C8RPY)**

Si no quieres usar mi código de referal: [Fathom Analytics](https://usefathom.com/)

#### Más alternativas para Google Analytics y Fathom

* [Plausible](https://plausible.io/): **La mejor alternativa a Fathom.** De hecho tiene todas las ventajas de Fathom a un precio más pequeño y un diseño muy cuidado. ¿Por qué elegí entonces Fathom? Porque tiene más años en el mercado y pensaba en utilizar algo más asentado... pero veremos si no doy el salto. 😝

* [Simple Analytics](https://simpleanalytics.com/): Otro que lleva un tiempo. Su precio empieza por **19$ por 100k páginas vistas**. Una razón que me echó para atrás es que en varios artículos leí que tenía [grandes discrepancias con las visitas registradas](https://dev.to/hmhrex/a-comparison-of-the-top-3-privacy-focused-analytics-platforms-209m) con **Plausible** y **Fathom**. Supongo que lo habrán arreglado pero no me apetecía probarlo por mi mismo (y además es más caro respecto a **Fathom** y **Plausible**)

* [Privacy First Adinton](https://privacy-first.adinton.com/): Una empresa de Barcelona que **ofrece por 19€ un plan ilimitado para blogs y empresas pequeñas**. Tampoco requiere el consentimiento del usuario y ofrece un montón de estadísticas y maneras de crear KPIs de tus métricas.
 
* [Matomo](https://matomo.org/): Una alternativa que **puedes hospedar por tu parte de forma totalmente gratuita**. Si no, puedes pagar a partir de 29€ al mes por la versión Cloud.

## Conclusiones del artículo: responsabilizate de tus elecciones

**No quiero con este artículo que te sientas mal o culpable** por usar Google Analytics. Sólo quiero que tengas más información a la hora de tomar la decisión de utilizarlo en tu sitio y que seas consciente que es posible que estés incurriendo en una falta que pueda suponerte una multa.

En un mundo, el de Internet, que **estamos siempre acostumbrados a tener las cosas gratis**... tenemos la responsabilidad de parar un momento y revisar las razones por las que estos servicios o contenidos son gratis. Especialmente aquellos que vienen de multinacionales poderosas donde su poder, seguramente, **vienen precisamente de los datos que manejan.** 

Que a ver, **a veces también puedes revisar si tu blog realmente necesita analíticas.** Entiendo la necesidad en páginas que se monetizan. Si tienes unas pocas visitas al mes, seguramente es mejor no tener analíticas y dejar que los usuarios disfruten de tu contenido libremente. En mi caso lo hago para saber de **dónde provienen mis usuarios, qué dispositivos usan y qué artículos interesan más**... pero no sería la primera vez que me he planteado quitar totalmente las analíticas... 🙃

En cualquier caso, este blog a partir de ahora **me va a costar 14$ al mes** por [usar Fathom](https://usefathom.com/ref/8C8RPY) pero creo que los vale si a cambio de eso la privacidad de mis lectores está controlada. **Te invito a que hagas esa reflexión también con tus páginas y aplicaciones**.

Si quieres continuar la conversación, te invito que [me menciones en Twitter](https://twitter.com/midudev) o [compartas el artículo](https://twitter.com/share?url=https%3a%2f%2fmidu.dev%2fadios-google-analytics-alternativas-para-tener-estadisticas-en-tu-web%2f&text=%22Adi%c3%b3s%20Google%20Analytics.%20Alternativas%20para%20tener%20estad%c3%adsticas%20en%20tu%20web%22%20por%20@midudev) allí para seguir debatiendo. 👋

**👉 [Registrarse con 10$ de crédito en Fathom](https://usefathom.com/ref/8C8RPY)**
