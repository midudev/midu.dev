---
title: Personaliza el prompt de la terminal de macOS
date: '2019-01-22'
image: '/images/customiza-prompt-terminal.png'
description: 'Por defecto, la terminal de sistemas como UNIX y macOS traen bash pero su aspecto no es el más bonito. Y las apariencias importan. ¡Vamos a arreglarlo!'
topic: terminal
tags:
- terminal
---

Si eres un usuario regular de la Terminal, como lo soy yo en macOS, y todavía no te ha dado por personalizarla, puedes empezar por la parte más sencilla para dejarlo un poco más a tu gusto: **cambiar el prompt.**

El prompt, básicamente, es un conjunto de carácteres que aparecen en la terminal para indicarte que está a la espera de comandos por tu parte. Por defecto, normalmente, **en su aspecto se recoge el usuario actual, el directorio en el que te encuentras y el hostname.**

{{< img src="/images/custom_prompt_default.png" alt="El aspecto por defecto del Prompt en macOS es funcional pero no muy agradable a la vista" align="center">}}

Pero no os preocupéis porque se puede cambiar y de una forma muy sencilla. Solo tendremos que crear, o modificar, un archivo de perfil para [Bash](https://es.wikipedia.org/wiki/Bash), que es el intérprete que viene instalado por defecto tanto en sistemas Unix como macOS de Apple.

## Cambiando el Prompt por defecto de bash

En primer lugar, os recomiendo que hagáis un backup de los archivos que váis a modificar.

```terminal
cp ~/.bash_profile ~/.bash_profile.bak
```

Es posible que no exista ese archivo y también es posible que en lugar del archivo `.bash_profile` tengáis uno llamado `.bashrc` que, esencialmente, hace lo mismo. Sea el que sea que usáis, si está disponible en la carpeta `~` **os recomiendo que hagáis una copia de seguridad.**

Ahora, ya podéis usar vuestro editor favorito para modificar el archivo que tengáis (si no lo tenéis, lo creará al guardar los cambios). En mi ejemplo voy a usar Visual Studio Code pero podéis usar `nano` o `vi` si lo preferís.

```terminal
code ~/.bash_profile
```

Dentro del archivo vamos a exportar una variable de entorno llamada `PS1` que tendrá cómo valor un string. Este string es el que se mostrará siempre en la línea de comandos cuando esté a la espera de órdenes.

```
# contenido del archivo .bash_profile
export PS1="midudev> "
```

Después de guardar los cambios, volvemos a la terminal y ejecutamos el comando `source` para indicarle que debe cargar el nuevo perfil que hemos creado.

```
source ~/.bash_profile
```

Inmediamente deberíamos ver el nuevo prompt en nuestra terminal.

> Si te estás preguntando por qué `PS1` esto es porque son las siglas de Prompt String 1. Existe hasta `PS4` y cada número tiene utilidades diferentes. El que nos interesa, `PS1` es el que se mostrará siempre para que la terminal nos indique que está a la espera de nuevos comandos.

## Secuencias de escape

Hemos dejado la terminal bastante aburrida y, lo peor, es que no nos indica en qué carpeta estamos, por lo que es un poco lioso. Para hacer que nuestro prompt nos dé este tipo de información, podemos utilizar las secuencias de escape. Aquí os dejo una pequeña lista de [todas las disponibles en Bash](http://tldp.org/HOWTO/Bash-Prompt-HOWTO/bash-prompt-escape-sequences.html):

```
\d – Fecha actual
\t – Hora actual
\h – Hostname
\u – Username
\W – Directorio actual (ejemplo: codigo/)
\w – Directorio actual con toda la ruta(ejemplo: /Users/midudev/codigo/)
```

Vamos a volver a abrir el archivo con nuestro editor favorito y **vamos a utilizar un par de secuencias de escape** para añadir algo de información valiosa. Y no sólo eso, además **vamos a añadir un emoji** para que nos acompañe en nuestras horas jugando con la terminal.

```
# contenido del archivo .bash_profile
export PS1="\W@\u 👾 > "
```

Después de guardar los cambios, volvemos a ejecutar el comando `source` con el archivo profile de bash, para poder ver los cambios:

```
source ~/.bash_profile
```

Y este es el resultado final:
{{< img src="/images/cambiando_el_prompt.png" alt="El nuevo prompt queda bastante más personalizado y hasta podemos usar emojis" align="center">}}

## Más allá de personalizar el prompt

Obviamente, tenéis la posibilidad de instalar uno de los muchos prompts que existen ahí fuera (como [Sexy Bash Prompt](https://github.com/twolfson/sexy-bash-prompt)), que ya vienen preparados para ser usados y ofrecen un look'n'feel bastante atractivo. Eso, o **directamente cambiar el shell que usa (que por defecto es bash) y pasarse a alguno más moderno como [zsh](https://ohmyz.sh/) o [fish](https://fishshell.com/).**

También os recomiendo que dejéis la aplicación de la terminal que viene por defecto y optéis por otras soluciones como [iTerm2](https://www.iterm2.com/) o [Hyper](https://hyper.is/). **Ambas son totalmente gratuitas**, tienes un montón de opciones de personalización y ofrecen una mejor experiencia de uso.

Pero si por ahora queréis empezar con lo más sencillo, y con este artículo os he animado a probar, en el siguiente vídeo podéis ver cómo hago todo el proceso en **macOS** paso a paso, de forma que si tenéis ese sistema operativo sólo tenéis que seguir las indicaciones:

{{< youtube id="CN6nOeOTeJg" >}}

Por cierto, **si estáis animados a customizarlo,** os recomiendo una aplicación web llamada [Ezprompt](http://ezprompt.net/) que te permite crear tu propio prompt arrastrando cajas y seleccionando los colores deseados, además de ofrecerte una previsualización de cómo quedaría y ofreciéndote el código a pegar bastante mascadito.