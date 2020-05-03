---
title: Entrevista con Guillermo Rauch, CEO de Vercel ▲ (ZEIT)
date: "2020-05-01"
description: Charla completa con Guillermo Rauch sobre el presente y futuro de la plataforma Vercel, las novedades de NextJS, curiosidades de React y lo que esperamos del frontend.
tags:
  - vercel
language: 🇪🇸
---

**Guillermo Rauch** es una de las personas más influyentes en el mundo del desarrollo web. Actualmente es **CEO y co-fundador de Vercel ▲** (hasta hace muy poco ZEIT), una plataforma que te permite desplegar tus aplicaciones de forma rápida y sencilla. Además, mantiene y escribe sus pensamientos e ideas en [rauchg.com](http://rauchg.com/).

Pero su historia no empieza aquí: creador de [Socket.io](https://socket.io/) y [Mongoose](https://mongoosejs.com/). Contribuidor de **Mootools** por más de siete años. Fundador de *LearnBoost* y *Clodup*, que adquirió *Automattic* (la empresa detrás de Wordpress)...

**He podido hablar con él sobre Vercel, Next.js, React, el futuro del frontend y muchas cosas más.** Si interesa, puedes ver la entrevista completa en formato vídeo:

{{< youtube id="CmZEJcDCBxM" >}}

Si lo prefieres, aquí te dejo extractos literales de la entrevista. No está completa y sirve a modo de resumen:

## Extracto de la entrevista con Guillermo Rauch

**La primera pregunta es casi obligada. ¿Cómo llevas el confinamiento? Porque estamos pasando todos por esto...**

Sí, mira, últimamente en San Francisco está la cosa más fácil, porque han levantado algunas de las restricciones. Cuando salgo a correr noto que hay más actividad, más gente corriendo, mucho uso de mascarilla creo que la gente lo está llevando bien, de forma responsable.

Mi opinión medio controversial es que me parece que tuvimos una *overcorrection*, un poco, porque en San Francisco particular, hubo muy muy pocos casos por suerte. Pero bueno, se lleva adelante como se puede.

Nosotros como compañía remota, la verdad, es que lo llevamos muy bien. Al principio, obviamente, con todo lo sorprendente que fue todo nos costó un poquito reacomodarnos a pesar de que, físicamente, no nos teníamos que acomodar tanto. Tenemos una oficina acá, en San Francisco, con muy poca gente y, después, todo el *team* es remoto. Entonces re-acomodarse era más mental, *reacomadamiento* *mental*. Pero colaboramos muy bien de forma remota así que, por ahora, todo muy bien.

**Guillermo es que lo lleváis tan bien, tan bien, que me gustaría felicitarte a ti y a todo tu equipo por los 21 millones de dólares de inversión, que bueno, me parece espectacular. Que estamos aquí todos confinados y salís con esta pedazo noticia, así que enhorabuena y muchas felicidades**

Sí, cuando fue la peor semana de la pandemia en Estados Unidos, que los mercados estaban prendidos fuego. Nosotros estábamos mirando nuestras propias métricas y era todo lo contrario, era récord de uso, los builds, de concurrencia, tráfico... Entonces era, siempre nos pasó esto, por un lado, obviamente, diferentes sectores de la economía están muy impactos pero, lo que hacemos nosotros que es, de alguna forma, hacer que la gente es, incluso en muchos casos, salvar costos.

Hablamos con muchísima gente que convierte su frontend en JAMStack con NextJS y ahorra muchísimo dinero que antes lo tenían en servidores. Entonces, siempre tuvimos esta dualidad de que, por suerte, somos una compañía que estamos muy bien parada yendo a una situación como esta. Igual no tanto como Zoom que parece que esta semana ha crecido hasta cien veces, que fue como diseñado para la pandemia (risas) pero semejante, con el tema de los hyperlinks, la colaboración más rápida, ahorrar costes en servidor.

**Totalmente, de hecho, en mi propia empresa, una de las primeras acciones al comenzar la pandemia era. ¿Dónde podemos recortar para minimizar costes?**

Seguro, seguro. Pasa mucho con las clouds que tiene muchos modelos on-demand como AWS. Ahora hay compañías enteras dedicadas a cómo optimizar los costos de AWS porque se te va de las manos. Eso es un feedback que recibimos mucho en la compañía.

Nosotros arrancamos con ese modelo on-demand, pero el feedback que recibimos es que a la gente le daba estrés estar todo el día mirando si vas a tener un *spike*. Eso es el arma de doble filo con respecto a serverless, que puedes recibir cualquier *spike*, todo escala. Ahí es cuando pensamos en el nuevo pricing.

Entonces, con esto le ahorramos estrés a la gente. Ese estrés que hoy en día que estamos viendo el surgimiento de una nueva industria para ver cómo optimizo y compañías que te ponen en un dashboard cómo evolucionan los costos. Nosotros los tenemos que usar, obviamente, pero por suerte nuestros clientes no.

**Me gusta esto que comentas del pricing y está muy bien porque justamente creo que uno de los grandes éxitos que ha tenido, en su momento ZEIT y ahora Vercel, es justamente ese pricing que empieza en 0 euros y que ha ayudado a tantos miles de proyectos, y a mi mismo personalmente, y a muchos frontend a publicar su proyecto. Grandes proyectos han empezado así como puede ser *Carbon*. De alguna forma habéis empujando a una comunidad entera a publicar realmente páginas**

Sí, por eso, una de las cosas que nos dijimos es cuando usas sitios como *GitHub* o *Gitlab*. Cuando estás en tu ámbito personal o de experimentación es gratuito e infinito. Entonces, cuando lo llevas a un ámbito profesional o trabajar con un equipo, bueno, ahí es realmente cuando pagas. Entonces, con el nuevo pricing, eso es justamente lo que queríamos.

De hecho, una de las cosas que estamos planeando es este de poder compartir tus proyectos que has creado, como si fuera tu portfolio. Que es algo similar a lo que hace Figma con los diseñadores, nosotros queremos hacerlo con los developers.

**Volviendo al tema de la inversión, me gustaría comentar, una cosa que me ha sorprendido mucho y son nombres propios en la ronda de inversión. Tenemos a los creadores de *React* y el *CEO* de *GitHub* apostando por Vercel. Esto suena a una verificación que realmente la plataforma Vercel es la forma de integrar proyectos de React que tengan su código en GitHub. ¿Qué te parece?**

Fue un voto de confianza muy grande y, por ejemplo, *Jordan Walke* es el creador de React y es una de las mentes más brillantes del mundo. Pero lo de *Pete Hunt* es muy interesante también porque él fue la persona que tomó React y lo usó para crear una aplicación entera, creando *Instagram Web*. Y fíjate que le ha llevado años llevar React para todo *Facebook*, que es lo que están haciendo ahora con el nuevo y todavía estoy casi seguro que no lo tienen todos los usuarios.

Eso fue lo mismo que pensamos con NextJS. React tiene que ser la tecnología que corre todo. No sólo un pequeño componente. Un widget. Un botón. Para mi React es tan bueno como tecnología que lo tiene que correr todo. Entonces, eso fue una gran validación ya que Pete es una persona que fue pionera en eso diciendo "mirad, yo me la juego por React de que puede correr todo Instagram". Y eso que Instagram es un producto con billones de usuarios.

Y fíjate que Instagram tiene un modelo *JAMStack*. Cuando entras en Instagram.com, lo primero que ves es el loguito de la cámara de Instagram. Te dió un payload estático. Entonces cuando alguien se hace la pregunta. ¿JAMStack escala? Sólo hace falta ver e ir a Instagram. Y si se pregunta. ¿React escala? Sólo hace falta ir a Twitter.com o Instagram.com. Eso fue una gran validación de la parte del equipo de inversión y obviamente, esta gente no invierte para hacerse ricos, que en muchos casos ya son increíblemente ricos. Si no quieren ver ese producto que ellos mismos querrían usar, quieren ver ese producto que sus compañías querrían usar.

Otra cosa que te comentaba, es que GitHub es uno de nuestros clientes. Incluso ellos mismos quieren usar NextJS y lo están usando para cosas nuevas. Por ejemplo, la UI de GitHub Actions está potenciada por NextJS.

**Hay una cosita que ha venido con la inversión ha venido también un cambio de nombre. Me imagino que te lo han preguntado ochenta veces...**

¿Ochenta? (risas) Ochenta por minuto.

**Ochenta mil. (risas) Creo, que es una de las cosas que demuestra el cariño que la comunidad le tenía a ZEIT. Y es que Twitter se ha llenado de mensajes y memes tristes por el cambio de nombre. Hasta el creador de Javascript Brendan Eich**

Sí, yo me imaginaba que iba a dar para hablar pero no me imaginaba que iba a tener ese tipo de impacto. Pero tu apreciación es 100% acertada y demuestra esa *conviction* que la gente tenía sobre nosotros.

Mira, como muy bien dijiste en esta entrevista, dijiste *ZEIT*, dijiste *now*... y este nombre da para hablar. Hay una parte creativa y una parte táctica.

La parte táctica, que a mi me encanta, buscamos algo que trajese esa simplicidad que tiene el producto a una marca simplificada. Ahora en lugar de *ZEIT*, y *ZEIT now*, ahora todo es Vercel. Porque la realidad es que nuestro producto tiene dos partes: NextJS son como el cliente open source y después hay una plataforma, totalmente distribuida a través del mundo y el negocio está basado en la escalabilidad de esa plataforma.

Así que uno de los grandes valores que tenemos compañía es reliability. La fortaleza de la plataforma. Y muchísimo de lo que hemos hecho no se ve. No se ve la cantidad de código que hemos escrito para lidiar con spikes de tráfico, resolver ataques, firewall, etc. Y el nombre en si mismo tenía que llevar y transmitir ese valor.

Y los nombres en si mismo tienen reliability. Y cuando piensas como escribir y escuchas un nombre, en diferentes idiomas en el mundo... queríamos que ese valor de reliability fuera persistido con el nombre. Entonces, el nombre anterior no encajaba con esa filosofía, de transmitir que esta compañía es una roca sólida de simpleza, facilidad y escalabilidad... y al mismo tiempo, lo escuche y no sé escribirlo.

El nuevo nombre fue analizado en cinco idiomas, cinco expertos linguistas de distintas lenguas del mundo. Es parte arte y parte ingeniera, que es justamente lo que queremos hacer con la compañía.

**En Noviembre de 2015 nació ZEIT (que ahora es Vercel) y casi cinco años después es , yo diría, la mejor plataforma para hacer despliegues de proyectos de frontend, y tenéis NextJS que es usado por más de 300.000 proyectos y lo usan grandes marcas como AirBnB, Nike, Tripadvisor... ¿Qué pensabas hace cinco años? ¿Cuál era tu visión en realidad?**

Imposible. Imposible. Lo bueno es que la visión fue muy consistente. Yo estaba seguro, era como una intuición, estaba seguro que el deployment no podía ser difícil como lo era en ese momento. Y estaba seguro que hacer una página con React no tenía que requerir tener un *degree* con *Webpack*.

Y tenía algunas intuiciones que iban un poco contra la marea. El tema de pre-rendering, muchísima gente en ese momento me decía que no. Que el futuro no tenía eso de mezclar la data con el HTML. Y me lo decían muchísimos expertos.

Me lo decía incluso, y esto no lo he contado mucho y lo cuento para tu comunidad... yo tuve bastantes roces incluso con Facebook porque yo tenía ideas muy firmes y medio raras para ellos que, hoy en día, Dan Abramov tuiteó el otro día, la inspiración para mucho de lo que hace React es el camino recorrido por NextJS.

Lo cuál es... el timeline es rarísimo. React lo inventa. NextJS lo lleva al siguiente nivel. Y ahora muchas ideas de NextJS inspiran a React mismo. Una retroalimentación increíble y eso yo no me lo podía haber imaginado.

**Es super paradójico, Guillermo, que os estáis convirtiendo en la plataforma de facto para miles de proyectos de frontend y está construida en muchísimo trabajo de infraestructura y backend**

Exacto. Es bastante irónico pero de alguna forma, te está sacando ese trabajo de backend. Lo cuál está bueno. Nosotros tenemos una conferencia que se llama Backendless. Que obviamente es un nombre provocativo porque, obviamente, los backends siempre van a existir.

Pero hay muchísimo trabajo que está desapareciendo de backend. Por ejemplo. Una de las features que tenemos que genera páginas estáticas incrementales. Ejecuta, utiliza funciones de Lambda, que el usuario nunca escribió. Es alucinante. Cuando usas `getStaticProps` estás escribiendo el código que se ejecuta en build time, para traer la data y generar la página estática y después nosotros agarramos ese código y automáticamente creamos una función que puede ser ejecutada por nuestros sistemas para actualizar el contenido de esa página. Eso es código que nadie escribió, que fue automatizado. 

**Hace cinco años empezó ZEIT. Dentro de cinco años, ojalá tengamos esta misma conversación y podamos estar hablando de esto mismo. Pero... ¿de qué estaremos hablando Guillermo dentro de cinco años?**

Va a ser alucinante. Va a ser alucinante. Mira, algo que yo creo muy firmemente y es como arrancó la compañía y creo que va a estar ahí hasta el final de los tiempos es esa idea de la URL. Que es debes poder correr un comando, en ese momento era `now` ahora es `git push`, porque estamos más integrados en los sistemas de Git, pero es la misma idea: ejecutas un comando y recibes una URL.

La URL como nexo de la comunicación de todo el mundo, ya sea desarrolladores de frontend, ya sea entre sistemas estamos empezando a ver robots hablando uno con el otro. Uno de los partnerships que estamos haciendo es una web llamada Check.ly. Nosotros le damos la URL y ellos van a ejecutar tests automatizados de End-to-End simulando navegadores web a esos frontend. Nosotros hoy en día usamos esa tecnología para probar nuestro frontend y nuestro backend, de forma tal, que estamos simulando el tráfico del mundo antes de *rollear* un deploy.

Y también una de las cosas que estamos observando muy de cerca es cómo podemos traer la interfaz del cambio de las páginas más cerca del cliente. Una de las integraciones que estamos haciendo hoy en día con [Sanity](https://www.sanity.io/docs/build-with-sanity) va a permitirle el cliente cambiar el frontend desde el frontend.

Yo comento a mucha gente que hoy en día, la gente que hace memes, abre las Dev Tools, escribe, cambia una página y es un meme popular. Hoy en día la tecnología ya existe para hacer esos cambios instantáneos, obviamente no va a ser a través de las Dev Tools y con screenshots pero esa es la ventaja de la web, la podemos manipular de forma directa. Y ya tenemos la infraestructura para hacerlo. Tenemos React y NextJS y nosotros ya sabemos los puntos de inserción de los cambios.

¿Te acuerdas del atributo `contenteditable`? Imagina que yo pudiera ir a cualquier componente de React y decir: este componente tiene que ser editable por mi director de Márketing. Este es el sueño de las agencias. Sin necesidad de crear un ticket y que el desarrollador tenga que iterar el contenido. Y la verdad es que esto estamos muy cerca, si vas a [next-preview.now.sh](https://next-preview.now.sh/) uno ya puedo testear un prototipo que está en producción que escala infinito.

**Tengo una anécdota contigo Guillermo que igual, no lo sabes, pero el caso es que coincidimos en la HolyJS de Moscow. Allí diste la primera charla, de inicio de la conferencia, que por cierto me gustó mucho, pero el caso es que yo estaba asustadísimo porque mi charla iba justo después y parecía que íbamos a hablar de temas muy similares. Al final por suerte la tuya iba más sobre JAMStack y yo hablé de cómo evitar la hidratación en el cliente con diferentes estrategias...**

Sí, eso es muy importante para nosotros. Estoy de acuerdo, el coste de hidratarlo todo. Tiene mucho trabajo. De vuelta, es esta idea, que si tienes páginas estáticas, por supuesto la idea es que puedas hacerlo para la parte del *tree*. Porque para qué rehidratar si sólo hay un componente dentro que es dinámico, por qué no hacemos que eso sea un React Root...

**Exacto, esa era la idea. Envolver la parte de un árbol de componentes con un componente de React que indique que a partir de ahí el contenido es estático. El caso es que tengo que decirte que cómo lo petas. Porque estuviste por allí y cuando fui a saludarte después de la charla estabas rodeado de un montón de gente. Y pensé, madre mía, cómo lo petas hasta en Moscú.**

Yo trato de hacer eso es las conferencias. Me pierdo las charlas, que al final se puede consumir online igual, y trato de pasar tiempo con la comunidad y con la gente. Esa conferencia fue excelente porque muchas de las preguntas fueron relacionadas, no sólo con static, que al final uno eso lo aprende yendo a un sitio web.

De hecho, hace poco rehicimos NextJS Learn que es para enseñárle a la gente cómo utilizar NextJS y lo rehicimos de cero; y pudimos explicar bien esto de empezar con static y cuando luego después cuando uso cosas más dynamic. Eso se puede explicar online.

Entonces, ¿cuál es el propósito final de esas conferencias? Para nosotros termino siendo darle a la gente la posibilidad de preguntar cosas que uno no puede preguntar online. Me preguntaron sobre cómo progresar en la carrera de uno, cómo dejar un trabajo de 9 a 5. Hacer cosas menos tradicionales, más de emprendedurismo y fue una gran experiencia. Me encantó ver que en todo el mundo está este sentimiento, esa iniciativa y el emprendedurismo. Son preguntas que escuchas en Sillicon Valley y hace las mismas preguntas la gente de Moscú.

**Para ir terminando. A lo mejor hay gente que no lo sabe pero empezaste en 2005 y durante 7 años estuviste trabajando en Mootools. En aquél momento, aquella competición de jQuery... Entonces. Tu trayectoría ha sido espectacular y siempre muy cerca del desarrollo. Y, la verdad, en proyectos que siempre han tenido un impacto en la comunidad de frontend y creo que ahora multiplicado por cien. Entonces, ¿qué consejos le darías a alguien con toda esa experiencia que tienes?**

Para mi siempre lo más importante fue la idea del hipervínculo. Yo siempre digo el hipervínculo es una tecnología de liberación. Cuando vos haces un demo copado que yo he visto muchísimos de los tuyos y creo que así es como yo te conozco. Por haber visto tus hipervínculos. Esa capacidad de poder mostrar tu trabajo de forma funcional para mi es alucinante. Es la tecnología que le permite a alguien de nada a que tu trabajo esté visto por Tim Cook en Apple.

Para mi, en su momento tenía un blog llamado Dev Thoughs que permitía mostrar ese trabajo. Hice un proyecto llamado Fancy Menu, que era un menú que parecía que estaba hecho en Flash pero era Javascript, porque en aquél momento había que redocar a Flash. Y yo así le llegaba al mundo. Yo estaba en Argentina y no me conocía ni el vecino (risas) especialmente el vecino porque yo estaba todo el día en casa en la computadora.

El caso es que no me conocía nadie, pero yo estaba ahí sacando esos hipervínculos. Mientras sea algo muy pequeño pero, en Argentina no se dice esta palabra pero, *muy guay*, muy cool. (risas) Ya hablo Español en distintas lenguas. Como decía, ya sea que puedas sacar eso, es increíble los vínculos y las posibilidades que genera. Por ejemplo el hashtag #100DaysOfCode y la comunidad de gente que puede conectarse y mostrar las cosas que están haciendo de forma inmediata.

### Agradecimiento a Guillermo

Desde aquí, me gustaría darle las **gracias infinitas a Guillermo** por dedicarme una hora de su tiempo. No sólo me ha encantado conocerle, si no que he aprendido muchísimo y me ha parecido muy inspirador. Espero que a vosotros os haya parecido igual. **Os dejo aquí la entrevista en vídeo, para que no os perdáis ningún detalle.**

{{< youtube id="CmZEJcDCBxM" >}}