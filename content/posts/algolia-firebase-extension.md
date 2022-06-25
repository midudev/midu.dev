---
title: Algolia + Firebase. ¡La extensión perfecta para hacer búsquedas en Firestore!
date: '2021-07-05'
description: Aprende a integrar la base de datos Firestore de Google Firebase con la búsqueda de Algolia de forma fácil y rápida 
topic: firebase
toc: true
tags:
- firebase
---

{{< youtube id="eD1CUWs_3_k" >}}

**Firestore** es la famosisíma **base de datos NoSQL de Firebase**. Tiene multitud de ventajas: lista para escalar muy fácilmente, una estructura basada en objetos similar a JSON, sincronización entre servidor y cliente...

Sin embargo, esta base de datos tiene un PERO muy grande y es que **no tiene una forma fácil de realizar búsquedas de texto libre** en sus documentos. Para ello tenías que recurrir a [crear tu propia integración con servicios de terceros](https://effbada.hashnode.dev/full-text-search-with-firebase-on-android-using-algolia-part-1-c86fc6e1c632). **Hasta ahora.**

## Algolia + Firebase. La extensión perfecta para búsquedas

**[Algolia](https://utm.io/udih1)**, por si no lo conoces, es una plataforma que ofrece búsquedas muy rápidas y un sistema de recomendaciones. Ya se podía conectar en Firebase anteriormente pero se requería multitud de pasos para conseguir la conexión deseada.

Ahora, sin embargo, esto es mucho más sencillo con [una extensión que será activar y listo. ](https://firebase.google.com/products/extensions/firestore-algolia-search)Un click y ya tendremos la posibilidad de hacer búsquedas entre nuestros documentos de Firestore.

## ¿Cómo funciona?

Al activar la extensión, esta **nos creará una Cloud Funciton** que se ejecutará cada vez que se añada, elimine o modifique un documento en nuestra colección de Firestore.

{{< img align="center" src="https://blog-api.algolia.com/wp-content/uploads/2021/05/image1-3.png" alt="En este pequeño esquema podemos ver el funcionamiento de la extensión" >}}

Esta función **se asegurará de sincronizar el índice de Algolia con la nueva información**. Si añades un documento, lo añade al índice. Si lo borras, lo elimina del índice de Algolia. Y si modificas un documento, lo actualiza.

## ¿Cómo puedo activar la extensión?

Antes de empezar, ten en cuenta que necesitarás lo siguiente:

- Una cuenta de *Algolia* (puede ser gratuita) con un índice creado.
- Una cuenta y proyecto de *Firebase* (con el plan Braze activado)
- Una cuenta en *Google Cloud Platform*

Ahora vamos al catálogo de extensiones de **Firebase** y le damos a [*Search with Algolia*](https://firebase.google.com/products/extensions/firestore-algolia-search).

1. `Collection Path`. La colección de tu base de datos en Firestore.
2. `Fields`. Los campos que quieres enviar al índice de Algolia.
3. `Algolia Application ID`. La ID de tu aplicación en Algolia (la encuentras en tu sección de API Key).
4. `Algolia Index Name`. El nombre del índice de [Algolia](https://utm.io/udih1) que has debido crear previamente.
5. `Algolia API Key`. La API Key. Lo recomendable es que crees una *API Key* especial para este caso. **NO uses la API Key de Admin.**
6. `Location`. La región donde quieres desplegar la *Cloud Function*. Lo ideal sería que fuese lo más cerca posible de la región que has seleccionado para tu índice.

Una vez hecho esto... **ten en cuenta que los documentos que ya tenías en la colección no serán enviados al índice de [Algolia](https://utm.io/udih1).** En este caso tienes dos opciones:
- Ejecutar manualmente la *Cloud Function* para que envíe todos los documentos que ya están en la colección.
- Modificar todos los documentos para que la *Cloud Function* se ejecute y los envié.

Obviamente lo ideal sería tener la extensión activada antes de haber empezado a guardar documentos en la colección... Pero al menos tienes dos opciones en el caso que eso ya no sea posible. :)

También ten en cuenta que **puedes activar la extensión para más de una colección diferente**. Por ejemplo, podrías activarla para la colección `posts` y la colección `comments`. Tendrías que configurarla dos veces pero podrías reutilizar la `API Key`, por ejemplo, o incluso el índice si quisieras (aunque también puedes enviarlo a índices diferentes).

## ¿Qué hay del precio? A tener en cuenta...

Aunque lo he mencionado anteriormente, es importante que tengas en cuenta que para poder utilizar esta extensión (y cualquier extensión de Firebase), tendrás que estar en el modo `Blaze` de Firebase. El modo `Blaze` es la modalidad de pago por uso.

Esta modalidad **no quiere decir que tengas que pagar seguro** (si no superas unos límites, Firebase ofrece una generosa cantidad de recursos sin coste) pero sí tendrás que configurar el pago por si fuese necesario.

También, **cuando instales o reconfigures la extensión Firebase cobra unos 0.10$ como "peaje"** ya que se deben ejecutar una serie de funciones en la nube.