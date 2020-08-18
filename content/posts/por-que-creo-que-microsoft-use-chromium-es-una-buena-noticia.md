---
title: Por qué creo que Microsoft use Chromium es una buena noticia... para todos
date: '2018-12-05'
image: '/images/microsoft-edge-presentation.jpg'
description: 'Al parecer, Microsoft va a dejar de mantener el motor actual de Edge para empezar a utilizar Chromium, el motor de código abierto de Chrome. Todo el mundo está dando su opinión y, oye, yo no iba a ser menos. Eso sí, yo creo que igual es una buena noticia para todos. También para ti.'
tags:
- opinion

---

Ya hay confirmación oficial. **[Microsoft planea adoptar Chromium como motor para su navegador Microsoft Edge y abandonará su motor propietario.](https://blogs.windows.com/windowsexperience/2018/12/06/microsoft-edge-making-the-web-better-through-more-open-source-collaboration/)** Un paso más para extender la contribución de Microsoft al OSS (open source software) y un volantazo muy importante sobre la política de Microsoft respecto a los navegadores web después de años y años de fracasos continuados.

Sin embargo, esta noticia que llega tras días de rumores, **ha despertado los recelos de no pocas personas en la comunidad.** ¿La razón? Mucha gente opina que esto refuerza el papel dominador de Google en Internet pero... ¿es eso exactamente así? En mi opinión, aunque entiendo ese miedo, no lo creo.

## ¿Pero qué es Chromium?

**Chromium es el navegador de código abierto del que Chrome obtiene su código fuente.** Sin embargo, hay que tener claro que aunque comparten la mayor parte del código hay algunas funcionalidades que sólo existen en Chrome como, por ejemplo, el lector de archivos PDF o el inicio de sesión en Google. Esto ha permitido que otros navegadores tomen como base Chromium. **Dos grandes destacados son Opera y Brave.** Y, pese a ello, ofrecen una experiencia de usuario sensiblemente diferente a Chrome.

{{< img src="/images/opera.jpg" alt="Opera Browser ofrece una experiencia de usuario bastante distinta a Chrome pese a compartir motor" align="left">}}

Es importante saber que Chromium comenzó en su día basándose en **[WebKit](https://webkit.org/), el motor para navegadores web de código abierto creado por Apple para Safari** pero, tras unos años, [Google hizo un fork del proyecto](https://blog.chromium.org/2013/04/blink-rendering-engine-for-chromium.html) para continuar evolucionandólo por su parte sin la necesidad de depender de Apple.

Y ahora que sabes qué es Chromium deja que te cuente las **razones por las que creo que esto es una buena noticia no sólo para Microsoft**, si no para los desarrolladores e incluso los usuarios.

Microsoft ha sufrido una transmutación enorme en cuanto a su política y su percepción dentro del mundo de desarrollo. Poco a poco ha ido abrazando, y siendo actualmente uno de sus mayores contribuidores, el código abierto. Y no es casualidad que Visual Code sea, ahora mismo, uno de los editores de código favoritos en el mundo del frontend.

**Pero por más que su imagen se esté aclarando, también es cierto que como empresa tiene sus propias motivaciones para hacer este movimiento.** Y seguro que hay un plan detrás de la posibilidad de que abandonen el motor actual de Edge en favor de Chromium. A mi se me ocurre:

* ***Ahorrar esfuerzos que no están siendo productivos para la marca y el producto.*** ¿Quién no está cansado de que Internet Explorer, antes, y Edge, ahora, sean los típicos navegadores problemáticos en cuanto a adopción de nuevas características web? Yo lo estoy. **Y creo honestamente que Microsoft también.** Usar Chromium les va a permitir dejar de estar en la cola a la hora de adoptar las nuevas tecnologías web, seguramente con menos esfuerzo y poder centrarse en lo que realmente puede marcar la diferencia: la experiencia usando el navegador.

* ***Aprovechar para contribuir más activamente a uno de los proyectos open source estrella.*** Chromium no es sólo el motor de Chrome. También es el motor de Electron. ¿Y sabéis qué aplicación MUY importante de Microsoft utiliza Electron? Visual Studio Code. Con esto en mente, ¿no tiene todo el sentido del mundo ahorrar esfuerzos en el motor de Edge y trabajar en Chromium para beneficiarse indirectamente de ello? Es más, ¿no va a influir positivamente de alguna forma a la percepción de Microsoft como marca? Yo creo que sí a ambas.

* ***Microsoft no gana dinero por hacer motores de navegadores.*** Y menos cuando cuando la porción de su pastel es tan pequeña. Por lo tanto, parece que Microsoft tiene mucho que ganar y poco que perder. **Porque, siendo honestos, ¿sabéis para qué usa la mayoría de la gente Edge? Para instalar Chrome o Firefox.** Así que, desde la perspectiva de Microsoft... si no puedes con el enemigo, mejor únete a él.

* ***Desacople del core del sistema operativo.*** Uno de los problemas de Edge es que, al parecer y tal y como ya pasaba con Internet Explorer, muchas librerías y funcionalidades del navegador están, de alguna forma, acopladas al propio sistema operativo. Eso impedía la evolución natural del navegador y, además, del sistema operativo. Adoptar Chromium podría acelerar ambos desarrollados. De hecho, **esto permitirá a Microsoft lanzar Edge no sólo en todas las versiones de Windows si no en otros sistemas operativos.**

### Es bueno para los desarrolladores 👩‍💻

Más adelante hay una sección que habla de algunas opiniones contrarias a esta decisión por parte de desarrolladores pero, si me lo permitís, me gustaría apuntar a algunas que creo que muchos van a agradecer:

* **Edge seguía siendo un dolor de cabeza a la hora de desarrollar webs.** Y no hablamos sólo de las muy mejorables herramientas de desarrollo que ofrecía. Tampoco el motor nunca ha sido capaz, pese a los múltiples esfuerzos, de estar a la altura de Firefox o Chrome. Su ritmo de versiones también ha estado siempre por detrás de la competencia y, aún hoy, no ha sido capaz de recuperar la cuota de mercado que mantiene Internet Explorer.

{{< img alt="Edge todavía no soporta gran parte de la tecnología de los Web Components y necesita polyfills para hacerlos funcionar" src="/images/caniuseedge.png">}}

* **Menos fragmentación.** Tener que preocuparse de un motor de navegador a la hora de trabajar va a ser un alivio para muchos desarrolladores, entre los que yo me incluyo. En la diversidad está el gusto pero tampoco ayudaba que existiesen tantos motores diferentes y, algunos como este, tan problemáticos.

* **Edge no es multiplataforma actualmente.** Es cierto que es un problema que, entre los navegadores más utilizados, también tiene Safari. Siempre uno puede usar Browserstack o instalarse una máquina virtual pero nunca ofrecería la misma comodidad que Chrome o Firefox en ese sentido. **Creo que, veremos si el tiempo lo confirma, vamos a ver a Edge en todos los sitemas operativos disponibles** y, por lo tanto, los desarrolladores podrán probar sus trabajos de forma nativa en el navegador.

* **Acelera la adoptación de nuevas tecnologías web.** Ya lo he comentado antes, pero que Microsoft colabore en el desarrollo de Chromium sólo puede traer buenas noticias al proyecto. Esto debería hacer que el proyecto tome todavía más tracción y pueda evolucionar toda más deprisa. Mucha gente disiente ya que opina que la competencia era buena para que hubiese algún tipo de competición pero vamos a hacer la pregunta al revés. **¿Está la actual diversidad de navegadores ayudando a la web a moverse hacia adelante y competir con las plataformas nativas?** Porque yo me temo que la respuesta es no.

### Es bueno para los usuarios 👨‍💼

El hecho que, nada más instalar Windows, los usuarios puedan tener un navegador con garantías, seguro, desacoplado del core del sistema operativo, ya es un buen indicador que es bueno para el usuario.

¿Es posible que esto en realidad haga que las instalaciones en Windows de Firefox y Chrome desciendan porque el usuario sienta que no es TAN necesario? Veremos. **Creo que se le está dando mucha importancia al motor que usa el navegador cuando el usuario, en realidad, le importa más la experiencia al usar el navegador y el cómo se tratan sus datos.** De hecho, en su comunicado Microsoft asegura que Edge se va a seguir llamándose Edge y que el usuario no debería percibir ningún cambio significativo.

Por otra parte, a día de hoy, [Edge tiene sólo 217 extensiones en su store](https://www.microsoft.com/en-us/store/collections/edgeextensions/pc). Aunque podríamos debatir cuantas realmente útiles hay entre las miles y miles de Chrome, lo que es bastante evidente es que hay una variedad mucho más extensa en Chrome. Si el nuevo navegador de Microsoft usa Chromium podrían [ofrecer la instalación de estas extensiones como ya hace Opera. ](https://www.techzim.co.zw/2018/09/heres-how-you-can-install-google-chrome-extensions-in-the-opera-browser/)

También, al simplificar la vida de los desarrolladores web, deberían disfrutar de páginas mejor optimizadas y más rápidas... Todos contentos, ¿no?

### Pero... ¿qué pasa con la neutralidad? ¡Es una mala noticia para el ecosistema de los navegadores!

He visto muchos usuarios en Twitter diciendo que este movimiento es una noticia triste, ya que la salud del ecosistema de los navegadores se verá afectada. Pero... **¿Era mejor que Edge usase su propio motor propietario que usar Chromium que es de código abierto?** No lo sé. Yo diría que no. Creo que todos vamos a coincidir que esta decisión le dará a Google una victoria moral importante pero... ¿de verdad preferíamos, tanto desarrolladores como usuarios, que Microsoft siga usando el motor de Edge que tantas penas nos ha traido?

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="es"><p lang="en" dir="ltr">Yet one less browser engine would be sad news for the Web :/ <a href="https://t.co/ZwZuGgcCIb">https://t.co/ZwZuGgcCIb</a></p>&mdash; Chris Dumez (@chris_dumez) <a href="https://twitter.com/chris_dumez/status/1069825747609575424?ref_src=twsrc%5Etfw">4 de diciembre de 2018</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Pero, lo que es más importante, **¿esto significa que siempre deba ser así?** Quiero decir. ¿Por qué le damos tanta importancia a que Microsoft decida usar Chromium como el motor de su próximo navegador? En su día Chrome utilizó Webkit, que era de código abierto, y tras unos años lanzaron su propio fork, Blink. **¿Por qué no puede hacer Microsoft lo mismo? ¿Eso sería algo malo para el ecosistema? Creo que todo lo contrario.**

> ¿Por qué no puede hacer Microsoft como Google y usar Chromium como punto de partida para su próximo nuevo motor para Edge?

**¿Hubiera sido más justo para equilibrar la balanza que usase Quantum (de Firefox) o Webkit (de Safari)?** Igual poéticamente sí, pero Chromium es el motor del navegador que no sólo está reinando en el mercado de los navegadores sino en aplicaciones web, creo que con datos objetivos sería difícil justificar otra decisión diferente.

## Conclusiones

Entiendo y empatizo con las preocupaciones de la gente. **Sobretodo por el miedo que Google adquiera demasiado poder en un tema tan delicado como Internet.** Pero creo que Webkit y Quantum están para quedarse. Que Chromium es, indiferentemente de lo que haga Microsoft, la plataforma de facto para aplicaciones de escritorio basadas en tecnologías web (Slack, Visual Code...). Y que esta noticia en realidad tiene todo el sentido del mundo para Microsoft y que, de alguna forma, podemos salir todos beneficiados de ello. **Siempre y cuando no se tarden diez años más en eliminar Internet Explorer y el actual Edge del mapa o en realidad ya no serán dos, si no tres los navegadores de Microsoft de los que tendremos que preocuparnos. 🙃** ¿Y tú qué opinas?
