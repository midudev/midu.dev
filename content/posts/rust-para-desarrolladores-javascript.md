---
title: "Curso de Rust para desarrolladores JavaScript"
date: '2023-01-10'
description: "Aprende Rust usando todos tus conocimientos que ya tienes de JavaScript"
tags:
  - rust
---

Este es un **curso de Rust pensado especialmente para personas con conocimientos en JavaScript**, de forma que encontrarás muchas analogías útiles entre ambos lenguajes de programación, su sintaxis e incluso su ecosistema.

## Introducción a Rust para desarrolladores JavaScript

### ¿Qué es Rust?

**Rust es un lenguaje de programación de propósito general** desarrollado originalmente por *Mozilla* en 2010 y ahora mantenido por la Fundación Rust. Al igual que *JavaScript* es **multiparadigma**, por lo que puedes usar programación funcional, imperativa o incluso orientada a objetos, entre otras.

A diferencia de JavaScript, para poder ejecutar un programa en Rust, primero debes compilarlo. Esto es debido a que Rust es un lenguaje de programación **compilado**, mientras que JavaScript es un lenguaje de programación **interpretado** (aunque en realidad existe un paso de compilación interno a nivel de motor de JavaScript).

En cuanto al **tipado de Rust es estático y fuerte**, todo lo contrario a *JavaScript* que **es dinámico y débil**. Esto significa que las variables se declaradan con un tipo de dato (o detecta automáticamente el tipo con inferencia) y que no se pueden cambiar de tipo de dato durante la ejecución del programa (esto es que su tipado es fuerte).

**Rust** ha sido diseñado para ser **seguro** y **rápido**, por lo que es un lenguaje de programación muy adecuado para el desarrollo de aplicaciones de alto rendimiento, como por ejemplo, servidores web, aplicaciones de escritorio, sistemas embebidos, etc. JavaScript, aunque también se puede usar para muchas de ellas, en realidad **fue diseñado para añadir interactividad a las webs.**

### ¿Por qué aprender Rust?

**Rust ha ganado popularidad en los últimos años** y se está convirtiendo en un lenguaje que, cada vez, se usa en más empresas y están surgiendo más oportunidades laborales. En el mundo de JavaScript, muchas herramientas están migrando de JavaScript a Rust (por paradógico que parezca) gracias a su velocidad.

Algunos ejemplos son [SWC](https://swc.rs/) (alternative a Babel), [Rome](https://rome.tools/) (alternative a Eslint y Prettier) o [Turbopack](https://turbo.build/pack) (alternativa a Webpack).

Además, si ya sabes programar en JavaScript, seguramente estés buscando un lenguaje de programación para seguir mejorando tus habilidades. **Rust es un lenguaje más avanzado que JavaScript en muchos aspectos** y, seguramente, será un reto dominarlo... pero al hacerlo vas a mejorar tus conocimientos de programación en general y tu perfil será mucho más atractivo de cara a encontrar trabajo o mejorar tu salario.

### Cómo instalar Rust

Si te encuentras en Linux o macOS, puedes instalar Rust con el siguiente comando:

```sh
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Al ejecutarlo, se descargará un *script* que instalará *rustup*. Para que te hagas una idea, *rustup* sería el equivalente a *nvm* para poder instalar y administrar diferentes versiones de *Node* en tu sistema.

> Si lo prefieres, puedes **probar Rust sin instalarlo** con [este playground.](https://play.rust-lang.org/)

Ahora, vamos a revisar que la instalación ha sido correcta y que ya podemos ejecutar el compilador de Rust:

```sh
$ rustc --version
rustc 1.66.0 (69f9c33d7 2022-12-12)
```

> Si te aparece que el comando no ha sido encontrado, seguramente la instalación no ha dejado correctamente el binario en el PATH. Prueba a cerrar la terminal y abrirla de nuevo, a veces eso lo soluciona. Si no, puedes añadir la ruta a mano con `export PATH="$PATH:$HOME/.cargo/bin"`.

Como ves, en **Rust tenemos un compilador oficial** mientras que en *JavaScript* no tenemos (ya que son los entornos de ejecución de los navegadores, Node, Deno y similares que compilan y evalúan al vuelo nuestro código).

### Hola mundo en Rust

Para trabajar con Rust en el editor Visual Studio Code, te recomiendo que instales [la extensión Rust Analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer). Esta extensión nos proporciona autocompletado, linting, formateo y muchas cosas más que te facilitarán la vida trabajando con el lenguaje de programación.

Ahora que ya la tienes, vamos a escribir nuestro primer programa en Rust. Para ello, crea un fichero llamado `hello-world.rs` y escribe el siguiente código:

```rust
fn main() {
  println!("Hello World");
}
```

Ahora, para compilarlo, ejecuta el siguiente comando:

```sh
$ rustc hello-world.rs
```

Si todo ha ido bien, se habrá generado un fichero ejecutable llamado `hello-world` en la misma carpeta, que puedes ejecutar con el siguiente comando:

```sh
$ ./hello-world
Hello World
```

Este es **tu primer programa con Rust**. Ahora, vamos a diseccionar el código para entenderlo mejor.

### La función `main`

Nuestro código comienza con un `fn`. Esta es la forma en la que se declaran las funciones en Rust. Después indicamos el nombre de la función como `main`. Este nombre no es una casualidad y es que **cualquier aplicación o programa que escribamos en Rust debe tener siempre una función `main`**.

Es el punto de entrada de nuestra aplicación y será la primera función que se llamará al ejecutar el binario que hemos compilado. Esta es una gran diferencia respecto a JavaScript ya que no tiene este concepto.

En cualquier caso, si intentas compilar el código anterior sin la función `main` o con otro nombre, obtendrás el siguiente error:

```sh
rustc hello-world.rs
error[E0601]: `main` function not found in crate `hello_world`
 --> hello-world.rs:3:2
  |
3 | }
  |  ^ consider adding a `main` function to `hello-world.rs`

error: aborting due to previous error
```

Así que es imposible que se te pueda olvidar esta regla.

> En Rust también existe algo similar a las Arrow Function, que se llama Closure. Lo veremos más adelante en el curso.

### Mostrando mensajes en la consola con `println!`

Mientras que en JavaScript usamos el mítico método `console.log`, en Rust usamos `println!`. El objetivo es similar pero la particularidad es que `println!` no es una función. Es un *macro*.

Aunque más adelante exploraremos este concepto, un *macro* no es nada más que una forma de generar código en tiempo de compilación. Como en JavaScript no tenemos compilación, tampoco existe este concepto, pero lo más parecido, si sabes algo de React, sería pensar en JSX. Tu escribes código JSX y React lo transforma en código JavaScript en un paso de compilación (con Babel, SWC o TypeScript):

```jsx
const App = () => <h1>Hello World</h1>

// compila en:
var _jsxRuntime = require("react/jsx-runtime");
const App = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
  children: "Hello World"
});
```

En Rust, el compilador transforma el código que escribimos en código que puede ejecutar el sistema operativo. Por eso, cuando escribimos `println!`, el compilador genera el código necesario para mostrar el mensaje en la consola.

Para diferenciar un *macro* de una función, sólo tienes que fijarte en la exclamación antes de los paréntesis.

### Cadenas de texto

En Rust, las cadenas de texto se declaran entre comillas dobles `"`. Las comillas simples `'` se usan sólo para declarar caracteres por lo que no pueden usarlas para declarar cadenas de texto (algo que en JavaScript sí está permitido).

En Rust puedes escapar las comillas dobles con `\`:

```rust
fn main() {
  println!("Hello \"World\"");
}
```

Algo muy interesante de las cadenas de texto en Rust es que, igual que los template string de JavaScript, respeta los saltos de línea dentro de la cadena de texto.

Prueba a compilar y ejecutar este código y fíjate en la salida:

```rust
fn main() {
  println!("Hello
  
    World");
}
```

### Puntos y coma

**En Rust, los puntos y coma no son opcionales** (a diferencia de JavaScript). Todas las sentencias de Rust deben terminar con un punto y coma... con una excepción que veremos más adelante en el curso.

### Comentarios

Como es tu primera vez escribiendo código en Rust, vamos a utilizar a lo largo del curso anotaciones para que puedas entender qué hace cada línea. Y, para ello, vamos a usar *comentarios* en el código.

Los comentarios son **muy similares a JavaScript**, son **anotaciones que no interfieren en la ejecución del programa** y podemos describir lo que hace nuestro código o dar un mejor contexto del mismo.

En Rust podemos usar **la misma sintaxis que JavaScript** para crear comentarios de una línea con `//` y multilínea con `/* */`:

```rust
fn main() {
  // Esto es un comentario de una línea
  // Y podemos describir que mostramos
  // Hello World en la consola
  println!("Hello World");
  /*
    Esto es un comentario
    de varias líneas
  */
}
```

Más adelante veremos otro tipo de comentarios específicos de Rust que nos ayudará a **documentar** nuestros programas pero, por ahora, usaremos sólo estos tipos.

## Variables

Como cualquier lenguaje de programación, en Rust también podemos crear variables y, aunque la sintaxis nos puede parecer muy similar a JavaScript, debemos de tener cuidado porque el comportamiento puede ser muy distinto.

### let

Para crear una variable en Rust podemos usar la palabra clave `let`, igual que en JavaScript.

```rust
fn main() {
  let name = "midu";
}
```

Como ves, no hemos tenido que indicar el tipo de la variable. Rust es un lenguaje de tipado estático y el compilador puede **inferir** el tipo de la variable en tiempo de compilación. **Lo mismo que hace TypeScript.**

Sin embargo, **`let` no funciona igual en Rust que JavaScript** y debes tener cuidado. La diferencia es que **en Rust las variables que creamos son inmutables por defecto**. Esto quiere decir que no puedes reasignar el valor de una variable después de asignarle uno.

Por ejemplo, el siguiente código no compilará y te dará un error:

```rust
// filename: let.rs
// este código no compila y sirve sólo de ejemplo
fn main() {
  let name = "midu";
  name = "midudev";
}
```

```sh
$ rustc let.rs

error[E0384]: cannot assign twice to immutable variable `name`
 --> let.rs:3:3
  |
2 |   let name = "midu";
  |       ----
  |       |
  |       first assignment to `name`
  |       help: consider making this binding mutable: `mut name`
3 |   name = "midudev";
  |   ^^^^^^^^^^^^^^^^ cannot assign twice to immutable variable
```

> Además del error indicando que la variable es inmutable, también verás dos advertencias indicando que estás creando una variable pero no la estás usando. Para que veas lo potente que es el compilador de Rust y cómo nos ayuda a hacer nuestro código más óptimo.

Como ves, por defecto, no puedes reasignar el valor de una variable `let`. Pero, ¿qué pasa si quieres crear una variable que sí que pueda ser reasignada? En el mensaje de error ya nos indica que podemos añadir la palabra clave `mut` para que la variable sea mutable:

```rust
fn main() {
  let mut name = "midu";
  name = "midudev";
}
```

Este código es válido, ya que le estamos indicando que la variable es mutable y luego le estamos reasignando otra cadena de texto.

#### Asignar más tarde

Al crear nuestras variables, no es obligatorio que hagamos la asignación desde el principio. Si no usamos `mut`, sólo podremos hacer la asignación una vez pero no significa que tengamos que hacer la asignación justamente cuando declaramos la variable. Por ejemplo, este código es válido:

```rust
fn main() {
  // declaramos la variable
  let name;
  // asignamos el valor después
  name = "midudev";
}
```

#### Tipado estático y fuerte

Tienes que tener en cuenta que, aunque uses `mut`, no puedes cambiar el tipo de dato de una variable al reasignarla. Eso siempre será un error. Si al principio le asignaste un número y después intentas asignarle una cadena de texto, el compilador de dará problemas:

```rust
fn main() {
  // creamos una variable mutable
  // y le asignamos un número
  let mut name = 1;
  // después una cadena de texto
  name = "midudev";
}
```

Al compilar nos indicará que el tipo de dato de la variable no es el mismo que el que le estamos asignando:

```sh
$ rustc let.rs
error[E0308]: mismatched types
 --> let.rs:3:10
  |
2 |   let mut name = 1;
  |                  - expected due to this value
3 |   name = "midudev";
  |          ^^^^^^^^^ expected integer, found `&str`

error: aborting due to previous error
```

### const

En *Rust* también existen las constantes pero, de nuevo, su comportamiento es muy diferente al de JavaScript.

Cuando creas una constante con `const` en Rust estás creando un valor constante en tiempo de compilación. Esto significa que no hay forma de cambiar o mutar su valor en tiempo de ejecución (algo que sí es posible en JavaScript al, por ejemplo, añadir una propiedad a un objeto que creaste con `const`).

Al ser valores que quedan fijados en tiempo de compilación, Rust tampoco infiere el tipo y es obligatorio que indiquemos de qué tipo de dato se trata.

```rust
// filename: constant.rs
const LUCKY_NUMBER = 7;

fn main() {
  println!("El número es {LUCKY_NUMBER}");
}
```

Si intentamos compilar este código, el compilador nos indicará que no hemos indicado el tipo de dato de la constante y nos dará una pista de cómo arreglarlo:

```sh
$ rustc constant.rs

error: missing type for `const` item
 --> constant.rs:1:19
  |
1 | const LUCKY_NUMBER = 7;
  |                   ^ help: provide a type for the constant: `: i32`

error: aborting due to previous error
```

Vamos a arreglar el problema indicando que es un tipo `i32`. Significa que se trata de **un entero de 32 bits que puede tener valores positivos y negativos**. Más adelante veremos que existen otro tipo de datos mejores para este caso pero por ahora usaremos este:

```rust
// filename: constant.rs
const LUCKY_NUMBER: i32 = 7;

fn main() {
  println!("El número es {LUCKY_NUMBER}");
}
```

Si compilamos y ejecutamos el código, veremos que ahora la consola nos indica:

```sh
El número es 7
```

### Interpolación de variables

En el código anterior has visto que hemos usado la interpolación de variables para mostrar el valor de la constante en la consola. En *Rust* la interpolación de variables se hace con llaves (`{}`) y dentro de ellas el nombre de la variable:

```rust
fn main() {
  let name = "midu";
  println!("Hola, {name}");
}
```

Si ejecutamos el código, veremos que la consola nos indica:

```sh
Hola, midu
```

También podemos hacer la interpolación dejando *placeholders* usando las llaves vacías (`{}`) y luego indicando el valor de la variable en el método `println!` como segundo argumento:

```rust
fn main() {
  let name = "midu";
  println!("Hola, {}", name);
}
```

Puedes usarlo tantas veces como quieras:

```rust
const LUCKY_NUMBER: i32 = 7;

fn main() {
  let name = "midu";
  println!("El número de la suerte de {} es {}", name, LUCKY_NUMBER);
}
```

Al ejecutarlo, veremos que la consola nos indica:

```sh
El número de la suerte de midu es 7
```

## Tipos de datos

Próximamente...

[Sígueme en Twitch para saber cuanto llega la próxima entrega.](https://www.twitch.tv/midudev)