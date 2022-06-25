---
title: Hablar es barato. ¡Enséñame el código!, reflexión sobre las palabras de Linus Torvalds
date: "2022-02-04"
description: "Pequeña reflexión sobre las palabras de Linus Torvalds y qué podemos aprender de ellas en programación."
tags:
  - me
---

A Linus Torvalds seguramente lo conoces por muchas cosas. Este ingenierio finlandés es el **creador del kernel de Linux y de Git**. Podría pasarme un podcast entero seguramente hablándote de él pero, en su lugar, voy a utilizar una de sus frases más famosas:

> "Hablar es barato. Muéstrame el código." En inglés: Talk is cheap. Show me the code.

Esta frase fue la contestación de Linus en una acalorada discusión con *Jamie Lokier*. Estaban hablando sobre cómo mejorar la creación de hilos en Linux. Tras intercambiar algunos mensajes y después de una extensa contestación de *Jamie Lokier*, entonces Linus dijo esa famosa frase: **Hablar es barato. Muéstrame el código.**

Lo cierto es que esta frase sirve para muchas cosas en la vida. Por ejemplo, **hablar es muy fácil pero pasar a la acción, normalmente, nos cuesta bastante más.** Sólo tienes que pensar cuántas veces has dicho que vas a hacer deporte o vas a comer mejor y, al final, no has pasado a la acción.

Obviamente, estamos hablando de programación. Y, a mi, personalmente, me gusta mucho usar esta frase en las Pull Requests. Y, de hecho, es un consejo que te doy para que pongas en práctica.

## Empatiza al dar feedback en las Pull Requests

Además de todas las buenas prácticas que deberías tener en cuenta a la hora de revisar el código de otra persona, empezando por supuesto con empatizar con ella, es importante que claves en tu mente la frase de Linus.

Muchas veces, cuando damos nuestra opinión, en lugar de ofrecer una solución, en realidad, estamos causando un bloqueo. Por ejemplo, cuantas veces has recibido o has puesto un comentario, pidiendo que se cambie el nombre de una variable. Suena una tontería pero... a veces pasa.

En esos casos, muchas veces, la gente ni siquiera se preocupa a ofrecer una alternativa. Lo cual, si me preguntas, está muy feo. Si es algo que haces, por favor, deja de hacerlo. **Si no ofreces soluciones entonces, mejor, no comentes.**

De hecho, si estás usando GitHub, que en algún caso seguro que es así, debes saber que cuando haces un comentario también puedes sugerir un cambio en el código. Sería algo así como una pequeña Pull Request dentro de una Pull Request. Esto ayuda bastante a desbloquear a la persona que la ha creado y ha recibido los comentarios.

Ahora bien, no sólo quiero comentarte esta buena práctica que considero que deberías estar haciendo YA...

La frase de Linus también encuentra su sitio en muchas discusiones que, al menos yo, he vivido en primera persona.

## No infravalores el posible trabajo de tareas que parecen simples

Cuando se hacen estimaciones de tiempo, que no se debería, o de esfuerzo, que es una forma también enmascarada de hablar de tiempo... muchas veces solemos infravalorar el trabajo que hay detrás. Especialmente, estoy seguro, que te ha pasado cuando un compañero o compañera que no sabe programar se pone a opinar sobre cómo de difícil es hacer algo.

Por ejemplo: *"Hay que cambiar este botón de sitio"*. Puede sonar a algo simple, sencillo y que, sin contexto, cualquier persona diría que es fácil.

Pero a veces confundimos deseo con realidad y, **la realidad, es que existen variables que pueden hacer que una tarea sencilla sea, a la postre, algo un poquito más complicado.**

Siempre recordaré el día que estaba en una startup noruega. Teníamos una tarea que consistía en migrar una biblioteca de una versión a otra. Parecía sencillo pero, en realidad, era una tarea muy complicada ya que todos los componentes dependían de ella y habíamos construido mucho sobre unas características que, en la nueva versión, desaparecían.

Un compañero, seguramente con toda su buena intención dijo que no había que preocuparse. Que iba a completar la tarea, dijo textualmente, **mientras se calentaba la comida en el microondas.**

No quiero ahora invocar al karma ni a un poder superior que le castigó por sus palabras pero... lo cierto, es que después de terminar de calentar su comida en el microondas... **todavía le quedaron meses por delante** para terminar la tarea para que, además, el desarrollo fuese demasiado complicado por intentar crear un fork de la librería. Vamos, un desastre.

Al final, con lo que quiero que te quedes y que yo, al menos, intento hacerlo, es siempre intentar no ser, lo que se diría, un *bocachancla*. Vamos, hablar de más y luego hacer más bien poco. Es útil considerar todos los problemas que tendría una implementación real porque, por fácil que suenan las cosas, luego hay que tener en cuenta otros trabajos que quizás no hemos previsto.

Por eso, si alguien tiene reparos, igual está bien escuchar y atender a las posibilidades que expone. Y, si tan claro lo tenemos, pues intentar desbloquear a la gente con implementaciones concretas porque... ya sabes, que **hablar es barato y lo que hay que hacer es enseñar el código.**
