---
title: 'Estrategia de Git: Ship / Show / Ask'
date: '2022-04-06'
description: >-
  Estrategia para trabajar con Git y equipos a la hora de llevar código a producción y fusionar cambios.
tags:
  - git
---

## Ship / Show / Ask

*Ship / Show / Ask* es una estrategia de ramas que combina la idea de crear Pull Request con la habilidad de seguir publicando cambios rápidamente. Fue [presentada por Rousan Wilsenach en el blog del mítico Martin Fowler](https://martinfowler.com/articles/ship-show-ask.html).

Los cambios que creamos en el repositorio se categorizan en tres:

- *Ship*: Se fusiona en la rama principal sin revisión
- *Show*: Abre una petición de cambios para que sean revisados por CI pero se fusiona inmediatamente
- *Ask*: Abre una PR para discutir los cambios antes de fusionarlos

![Las tres posibles categorías que pueden tener tus cambios son los que dan nombre a la estrategia.](/images/ship-show-ask.png)

### Ship

*Ship* significa que vamos a hacer un cambio **directamente a la rama principal.** No esperamos revisiones de código, ni integración. Vamos **directos a producción** (aunque antes del despliegue sí se harán los tests o checks pertinentes para evitar errores)

![El commit va directamente a producción, sin pasar por Pull Request](/images/ship.png)

*Pensado para:*

- He añadido una nueva funcionalidad con un patrón establecido.
- He arreglado de forma sencilla un bug por un error.
- Actualizaciones de documentación.
- Mejora de código por *feedback* del equipo o la comunidad.
- Se añaden nuevos *tests* para evitar errores.

### Show

En este caso sí usamos *Pull Request* pero no esperamos revisiones manuales del código. Es decir, **esperamos que los tests automatizados**, pruebas de cobertura y validación de código sean exitosos **pero no que otra persona revise el código.**

![En Show creamos Pull Request para validar que las pruebas automáticas pasan pero no esperamos opiniones de otras personas del equipo](/images/show.png)

**Esto no quiere decir que no ocurran conversaciones sobre el código.** La diferencia es que ocurrirán después de hacer la fusion de los cambios. 

La idea es que el trabajo fluya hacia adelante, con el menor número de bloqueos, pero que sigan existiendo espacios dónde se pueda hablar y discutir sobre cómo mejorar las prácticas de desarrollo y el código que se crea.

El equipo es notificado que se creó una Pull Request, la revisan posteriormente y después se hacen las observaciones que sean necesarias. Lo interesante es que hace que esa PR queda fácilmente identificable y separada.

> Las *Pull Request* muchas veces se usan como una forma de **forzar la conversación dentro del equipo y compartir conocimiento**. A veces, puede ser buena idea. Pero **nunca deben ser una sustitución** a buenas dinámicas de trabajo en equipo y usar programación a pares o en grupo.

*Pensado para:*

- Hacer arreglos necesarios para bugs y dejar constancia para que se aprenda.
- Crear pequeñas mejoras de código o *refactors*.
- Añadir nuevas funcionalidades siguiendo estructuras ya acordadas.
- Funcionalidades con pruebas automáticas.

### Ask

Esta categoría es similar a *Show* pero aquí **sí esperamos al feedback de nuestro equipo** ante de fusionar la rama. Lo hacemos porque existe algo de incertidumbre: bien porque la solución es complicada, no sabemos implementarla, existen dudas...

La idea es que la rama dure el mínimo tiempo posible para no bloquear el trabajo de otros miembros del equipo

![Con Ask sí esperamos que el equipo revise la Pull Request. No esperamos aprobación, esperamos conversación para eliminar la incertidumbre.](/images/ask.png)

Una cosa importante a destacar que decidir usar la categoría de *Ask* no quiere decir que esperemos la aprobación de nuestros colegas. Estamos abriendo una vía de conversación y debate antes de fusionar la rama ya que existe algún bloqueo o duda, pero es posible que no estemos buscando una revisión general de los cambios (si es así, deberíamos indicarlo).

*Pensado para:*

- Cuando es un trabajo muy grande y se necesita ayuda.
- Hay dudas sobre cómo hacerlo funcionar o la calidad del código.
- Existe incertidumbre sobre lo que estamos haciendo.
- Estamos esperando a que algo ocurra para poder fusionar la rama.

### Las reglas de Ship / Show / Ask

Obviamente, poder llegar a seguir algunas de las categorías requiere algunas reglas.

1. Tenemos un buen sistema de *CI/CD*, fiable y rápido, que hace que la rama principal siempre sea desplegable y que evite que lleguen errores no deseados a producción.
2. Confiamos en el equipo y existen buenas prácticas de desarrollo. Pair programming, mob programming, seniority... y, sobretodo, existe responsabilidad. **La persona se responsabiliza de decidir la categoría de su cambio**. Un gran poder, poder hacer *merge* de tus propias Pull Request, conlleva una gran responsabilidad (no romper producción).
3. Las revisiones de código no son requerimientos para que las PRs sean fusionadas.
4. Las ramas son lo más pequeñas posibles, tienen un tiempo de vida corto y siempre salen directamente desde la rama principal.
5. El equipo ha sabido lidiar con el ego individual, confia en el resto del equipo y considera que la rama principal puede no contener código perfecto siempre y cuando las pruebas automáticas pasan.

### Últimas palabras sobre *Ship / Show / Ask*

Creo que la idea detrás de esta estrategia, en realidad, es la de **responsabilizar a cada persona con su trabajo, empoderar al equipo, darle autonomía y tratar a la gente que lo integra por igual.**

También está que el desarrollo sea **más rápido** y la entrega sea más continua, pero para poder lograrlo se va a necesitar mucha confianza. Algo que, seguramente, **no todos los equipos estén preparados de inicio.**

En cualquier caso creo que *Ship / Show / Ask* podría ser una mezcla de estrategias que ya hemos visto anteriormente... simplemente deja la puerta abierta a que cada persona decida por sí misma cuál es la mejor categoría para cada cambio y le pone nombre.
