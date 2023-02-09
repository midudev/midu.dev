---
title: "Curso de Rust para desarrolladores JavaScript"
date: '2023-01-10'
description: "Aprende Rust usando todos tus conocimientos que ya tienes de JavaScript"
tags:
  - rust
toc: true
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

En *Rust*, las cadenas de texto se declaran entre comillas dobles `"`. Las comillas simples `'` se usan sólo para declarar caracteres por lo que no pueden usarlas para declarar cadenas de texto (algo que en JavaScript sí está permitido).

En Rust puedes escapar las comillas dobles con `\`:

```rust
fn main() {
  println!("Hello \"World\"");
}
```

Algo muy interesante de las cadenas de texto en *Rust* es que, igual que los template string de *JavaScript*, respeta los saltos de línea dentro de la cadena de texto.

Prueba a compilar y ejecutar este código y fíjate en la salida:

```rust
fn main() {
  println!("Hello
  
    World");
}
```

Más adelante hablaremos más de las cadenas de texto en *Rust* porque vienen con un montón de diferencias con *JavaScript* que no se aprecian en la superficie...

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

*Rust* es un lenguaje con tipado estático por lo que debe, en tiempo de compilación, el tipo de cualquier valor que uses en el código.

Como hemos visto en ejemplos anteriores, a veces no es necesario indicar el tipo ya que Rust lo puede *inferir* gracias al valor que le estamos asignando. Pero en otros casos sí es necesario.

### Tipos de datos primitivos

Igual que en *JavaScript*, en Rust también tenemos **datos primitivos**. Se le llaman así porque estos datos son la construcción básica de los lenguajes de programación. Son **los tipos de datos más simples que existen y que no se pueden descomponer en otros más pequeños.**

Sin embargo, en Rust estos primitivos se dividen en dos grupos: los *escalares* y los *compuestos*.

#### Tipos escalares

En este grupo tienes todos los tipos que representan un único valor y Rust tiene cuatro:

- *bool*: Para guardar un valor cierto o falso con *true* o *false* respectivamente.
- *char*: Un carácter Unicode de 4 bytes envuelto en comillas simples.
- *integers*: Un número entero (que puede ser de diferentes tamaños).
- *float*: Un número decimal (que puede ser de diferentes tamaños).

Antes de entrar a detallar cada uno, ya podemos ver algunas diferencias con JavaScript.

Primero, **en Rust la cadena de texto no es un tipo escalar** (aunque sí es un primitivo). Esto es porque, como ves, existe el escalar a nivel de caracter (`char`) por lo que una cadena de texto es una construcción a base de caracteres. Por eso está en el grupo de los compuestos.

También, **en Rust no tenemos un sólo tipo de número**. En JavaScript tenemos un único tipo de número que es el `number` y que puede ser entero o decimal. En Rust tenemos dos tipos de números: `integers` y `floats` y cada uno tiene diferentes tamaños en bytes como veremos a continuación.

Tampoco hay rastro de los tipos `null` y `undefined` que existen en JavaScript. **En Rust no hay valores nulos**. Si quieres representar un valor nulo, puedes usar el tipo `Option` que veremos más adelante.

##### Booleanos

Los booleanos son los valores `true` y `false` que representan la verdad y la falsedad. Ocupan un solo *byte* y en Rust se representan con el tipo `bool`:

```rust
fn main() {
  // indicar el tipo es opcional
  // ya que Rust lo puede inferir
  let is_active = true;
  // pero también podemos indicarlo
  // si lo preferimos
  let is_greater: bool = 10 > 5;
}
```

Este tipo escalar funciona de forma idéntica a JavaScript. Por ejemplo, podemos usarlo en una condición:

```rust
fn main() {
  let is_active = true;
  if is_active {
    println!("Está activo");
  }
}
```

##### Caracteres

Los caracteres son los valores que representan un carácter Unicode y ocupan 4 bytes. Se debe envolver con comillas simples.  En Rust se representan con el tipo `char`:

```rust
fn main() {
  // indicar el tipo es opcional
  // ya que Rust lo puede inferir
  let letter = 'a';
  // pero también podemos indicarlo
  // si lo preferimos
  let letter: char = 'a';
}
```

Este es un tipo de dato que no existe en JavaScript, donde solo tenemos cadenas de texto. Así que en Rust ya ves que las comillas simples se usan para caracteres y las dobles para cadenas de texto.

##### Números enteros

Representa un número entero (un número que no tiene decimales). Como Rust es un lenguaje pensado para tener el mejor rendimiento, **los números enteros pueden ser de diferentes tamaños en bytes**.

Así que a la hora de tipar un número deberemos tomar dos decisiones:

- El **número de bytes que queremos que ocupe el número entero**.
- Si queremos que el número sea **positivo o negativo**.

Los tipos disponibles para representar números enteros en Rust se representan con los tipos `i8`, `i16`, `i32`, `i64`, `i128` y `isize` (para números enteros positivos y negativos) o `u8`, `u16`, `u32`, `u64`, `u128` y `usize` (para números enteros positivos).

Por ejemplo, con `i8` podremos representar números que van del -128 al 127. Con `u8` podremos representar números que van del 0 al 255. Con `i32` podremos representar números que van del -2.147.483.648 al 2.147.483.647. Con `u32` podremos representar números que van del 0 al 4.294.967.295.

`isize` y `usize` son tipos que dependen de la arquitectura de la máquina donde se ejecute el programa. En una máquina de 64 bits, `isize` y `usize` serán de 64 bits.

```rust
fn main() {
  // si dejamos que Rust infiera el tipo
  // lo hará como i32
  let number = 10;
  // pero podemos indicar el tipo nosotros
  // si sabemos qué números representaremos
  let number: u8 = 10;
}
```

Como ves, **en Rust no existe un único tipo de número entero**. En JavaScript tenemos `number` que puede ser entero o decimal. En Rust tenemos `integers` y `floats` y cada uno tiene diferentes tamaños en bytes.

##### Punto flotante

Los números con punto flotante nos permite representar números con mayor precisión y, por lo tanto, pueden contener fracciones (decimales).

En este caso sólo podemos tener de 32 y 64 bits con los tipos `f32` y `f64`.

```rust
fn main() {
  // si dejamos que Rust infiera el tipo
  // lo hará como f64 por defecto
  let number = 10.5;
  // pero podemos indicar el tipo nosotros
  // si sabemos qué números representaremos
  let number: f32 = 10.5;
}
```

Con `f32` puedes represntar números que van del -3.4028235e+38 al 3.4028235e+38. Con `f64` puedes representar números que van del -1.7976931348623157e+308 al 1.7976931348623157e+308.

### Tipos compuestos

Dentro de los tipos primitivos, también tenemos los tipos compuestos. Estos tipos nos permiten agrupar valores de otros tipos y tenemos dos tipos de datos compuestos: los arrays y las tuplas.

#### Arrays

Los Arrays en JavaScript y Rust son similares. En ambos casos, son estructuras de datos que nos permiten crear una lista de elementos.

El siguiente código es válido en ambos lenguajes de programación:

```javascript
let avengers = ["Iron Man", "Thor", "Hulk", "Captain America"];
```

Sin embargo hay dos diferencias clave entre los arrays de *JavaScript* y los arrays de *Rust*:

- En *JavaScript*, los Arrays son dinámicos, es decir, podemos cambiar su longitud en cualquier momento. En Rust los Arrays tienen un tamaño fijo y una vez creados no se pueden modificar.
- En *JavaScript* los Arrays pueden contener elementos de diferentes tipos. En *Rust* los Arrays solo pueden contener elementos de un mismo tipo.

```rust
// ❌ este código es incorrecto
// ya que un Array en Rust necesita
// que todos sus elementos sean del mismo tipo
fn main() {
  let avengers = ["Iron Man", 2, "Black Widow"];
}
```

Si intentas compilar el código anterior, verás que Rust te mostrará un error de compilación `error[E0308]: mismatched types`.

##### Mutabilidad de Array

Como hemos visto antes, las variables que creamos con `let` en Rust son inmutables por defecto. Esto también se aplica a los Arrays. Si intentamos modificar un elemento de un Array, Rust nos mostrará un error de compilación.

```rust
// ❌ Este código es incorrecto porque
// intentamos modificar un elemento de un Array
// que es inmutable
fn main() {
  let midu = ["Miguel", "Duran"];
  midu[0] = "Miguel Ángel";
}
```

Pero podemos crear Arrays mutables usando la palabra clave `mut`:

```rust
// ✅ Este código es correcto porque
// creamos un Array mutable
fn main() {
  let mut midu = ["Miguel", "Duran"];
  midu[0] = "Miguel Ángel";
}
```

Como ves, para acceder a una posición de un Array usamos la misma notación que en JavaScript: `array[index]`.

##### Tamaño de Array

En JavaScript, la longitud de un Array se puede obtener usando la propiedad `length`. En Rust, para obtener el tamaño de un Array usamos la función `len()`:

```rust
fn main() {
  let fav_movies = ["Avengers", "Iron Man", "Thor"];
  println!("Tengo {} películas favoritas", fav_movies.len()); 
}
```

#### Tuplas

Las tuplas son un tipo de dato que nos permite agrupar valores de distintos tipos. Al igual que los *Array*, las tuplas tienen un tamaño fijo y una vez creadas no se pueden modificar.

Es un tipo de dato que no existe en JavaScript (lo más parecido sería un *Array* de tamaño fijo y de distintos tipos de elementos).

```rust
fn main() {
  // indicar el tipo es opcional
  // ya que Rust lo puede inferir
  let videoconsole = ("PS5", 550, true);

  // pero también podemos indicarlo
  // si lo preferimos:
  let videoconsole: (&str, i32, bool) = ("PS5", 550, true);
}
```

Para acceder a los valores de una tupla podemos usar la notación de punto y el índice del valor que queremos obtener:

```rust
fn main() {
  let videoconsole = ("PS5", 550, true);
  let name = videoconsole.0;
  let price = videoconsole.1;
  let is_latest = videoconsole.2;
}
```

Igual que en los Arrays, si creamos la variable con `mut` podremos modificar los valores de la tupla. Pero, recuerda, no podemos modificar su tamaño ni guardar un elemento de un tipo distinto al que ya tenía esa posición.

```rust
fn main() {
  let mut videoconsole = ("PS5", 550, true);
  videoconsole.0 = "Xbox Series X";
  videoconsole.1 = 499;
  videoconsole.2 = true;
  // ❌ la siguiente línea sería incorrecta
  // ya que estamos intentando guardar un valor
  // de tipo &str en una posición que ya tiene
  // un valor de tipo i32
  videoconsole.1 = "Mucho dinero";
}
```

#### Desestructuración de tuplas y Arrays

Al igual que en JavaScript, podemos desestructurar tuplas y Arrays para obtener sus valores de forma más sencilla.

```rust
fn main() {
  // desestructuración de una tupla
  let game = ("God of War", 70);
  let (game_name, game_price) = game;

  println!("El juego {game_name} cuesta {game_price}€");

  // desestructuración de un Array
  let languagues = ["JavaScript", "Rust", "Python"];
  let [js, rust, python] = languagues;

  println!("Los lenguajes son {js}, {rust} y {python}");
}
```

A veces, no nos interesa obtener todos los valores de una tupla o un Array, sino solo algunos. En estos casos podemos usar la desestructuración y usar `_` para indicar que no nos interesa ese valor:

```rust
fn main() {
  // desestructuración de una tupla
  let game = ("God of War", 70);
  let (_, game_price) = game;

  println!("El juego cuesta {game_price}");

  // desestructuración de un Array
  let languagues = ["JavaScript", "Rust", "Python"];
  let [js, _, python] = languagues;

  println!("Aprende {js} y {python}");
}
```

> Cuando usamos `_` en una desestructuración, Rust no crea una variable para ese valor. Es como si no estuviera ahí.

¿Qué pasa si sólo quieres obtener el primer valor de una tupla o un Array? Aquí hay una diferencia importante con JavaScript: en Rust siempre debemos indicar qué hacemos con el resto de valores. Si no lo hacemos, Rust nos mostrará un error de compilación.

```rust
fn main() {
  // ❌ Esto es incorrecto porque no indicamos
  // qué hacemos con el resto de valores
  let game = ("God of War", 70);
  let (game_name) = game;

  // ✅ Esto es correcto porque indicamos
  // qué hacemos con el resto de valores
  let game = ("God of War", 70);
  let (game_name, _) = game;
}
```

Seguramente te estarás preguntando... ¿Qué pasa si la Tupla o Array tiene más valores? ¿Tengo que usar `_` para todos ellos? ¿Y qué pasa si no conozco exactamente el tamaño de la Tupla o Array?

En estos casos, podemos usar `..` para indicar que no nos interesa el resto de valores

```rust
fn main() {
  // desestructuración de una tupla
  let game = ("God of War", 70, "PS4");
  let (game_name, ..) = game;

  println!("El juego es {game_name}");

  // desestructuración de un Array
  let languagues = ["JavaScript", "Rust", "Python", "Java"];
  let [js, ..] = languagues;

  println!("Aprende {js}");
}
```

Con `..` estamos indicando que el resto de valores no nos interesan. Pero, ¿qué pasa si queremos obtener el último valor de una tupla o un Array? En este caso, podemos usar `..` al final de la desestructuración:

```rust
fn main() {
  // desestructuración de una tupla
  let game = ("God of War", 70, "PS4");
  let (.., game_platform) = game;

  println!("El juego es para {game_platform}");

  // desestructuración de un Array
  let languagues = ["JavaScript", "Rust", "Python", "PHP"];
  let [.., php] = languagues;

  println!("Aprende {php}");
}
```

## Funciones

En Rust, las funciones se definen con la palabra reservada `fn` y ya hemos visto algunos ejemplos:

```rust
fn main() {
  // aqui va el código de la función
}
```

Mientras que en JavaScript usamos la palabra `function`, aquí usamos `fn`. Por lo demás, es muy similar.

Vamos a crear nuestra primera función fuera de `main` que al recibir un número, nos devuelva el doble de ese número:

```rust
fn multiply_by2(number: i32) -> i32 {
  return number * 2
}
```

Ya empezamos a ver más diferencias importantes respecto a JavaScript.

En Rust, como en JavaScript, las funciones pueden recibir parámetros. Pero aquí necesitamos indicar el tipo de dato que reciben. En este caso, la función `multiply_by2` recibe un número entero (`i32`).

También **es obligatorio que indiquemos el tipo de dato que devuelve la función**. En este caso, la función `multiply_by2` devuelve un número entero (`i32`).

Así que sí, para que nuestras funciones de Rust funcionen necesitamos indicar los tipos de los parámetros y del resultado.

> En Rust, las funciones siempre deuvuelven algo. Por defecto, si no indicamos nada, devuelven `()`, una tupla vacía que se le conoce como `unit`.

Vamos a usar nuestra función `multiply_by2` en `main`:

```rust
fn multiply_by2(number: i32) -> i32 {
  return number * 2
}

fn main() {
  let result = multiply_by2(5);
  println!("El resultado es {result}");
}
```

> ¿Por qué no hemos usado camelCase para el nombre de la función? En Rust, el estilo de nombrado de funciones recomendado es con snake_case.

### Múltiples parámetros

En Rust, las funciones pueden recibir múltiples parámetros. En este caso, la función `multiply` recibe dos números enteros (`i32`) y devuelve un número entero (`i32`):

```rust
fn multiply(number1: i32, number2: i32) -> i32 {
  return number1 * number2
}

fn main() {
  let result = multiply(5, 2);
  println!("El resultado es {result}");
}
```

La separación de parámetros se hace con `,`, igual que en JavaScript. Pero en Rust debemos indicar el tipo de dato de cada parámetro.

### Retorno implícito

En Rust, las funciones pueden devolver el resultado sin usar la palabra reservada `return`. En este caso, el resultado de la función es el último valor que se evalúa en la función:

```rust
fn multiply(number1: i32, number2: i32) -> i32 {
  number1 * number2
}
```

Fíjate que en este caso, no hemos usado `return` **ni tampoco hemos terminado la función con `;`**. No debes usar `;` al final de la sentencia, de lo contrario Rust no sabrá que el resultado de la función es el último valor que se evalúa.

```rust
fn multiply(number1: i32, number2: i32) -> i32 {
  number1 * number2; // ❌ Esto es incorrecto 
}
```

> ¿Existen las funciones anónimas y arrow function en Rust? Existe algo parecido llamado closures, pero no es exactamente lo mismo. Lo veremos más adelante cuando hablemos de la programación funcional en Rust.

## Flujo de ejecución

En ocasiones necesitamos controlar el flujo de ejecución de nuestro código.

A veces, queremos que se ejecute una parte de código si se cumple una condición y otra parte de código si no se cumple.

Otras veces, queremos que se ejecute una parte de código tantas veces como se cumpla una condición.

Esto lo logarmos con condicionales y bucles.

## Condicionales con `if`

Igual que en JavaScript, en Rust podemos controlar el flujo de ejecución con `if`:

```rust
fn main() {
  let number = 5;

  if number > 5 {
    println!("El número es mayor que 5");
  } else if number < 5 {
    println!("El número es menor que 5");
  } else {
    println!("El número es 5");
  }
}
```

Una de las diferencias más importantes es que en Rust no necesitamos usar paréntesis para indicar la condición del `if`. En este caso, la condición es `number > 5`.

Puedes usar paréntesis si lo prefieres, pero no es obligatorio y no es recomendable (el compilador te dará una advertencia ya que por defecto está configurado para que no los uses).

```sh
warning: unnecessary parentheses around `if` condition
 --> src/main.rs:4:6
  |
4 |   if (number > 5) {
  |      ^          ^
  |
  = note: `#[warn(unused_parens)]` on by default
```

La otra gran diferencia respecto a JavaScript es que `if` en Rust es una expresión (en JavaScript es una declaración que no devuelve un resultado).

Esto significa que podemos usar `if` para, por ejemplo, asignar un valor a una variable:

```rust
fn check_is_odd_or_even(number: i32) {
  let result = if number % 2 == 0 { "par" } else { "impar" };
  println!("El número es {result}");
}

fn main() {
  check_is_odd_or_even(10)
}
```

Como ves, hemos asignado a la variable `result` el resultado de la expresión `if`. En este caso, el resultado es un `string`.

En *JavaScript*, para lograr algo similar, necesitamos usar una ternaria:

```js
// JavaScript
const checkIsOddOrEven = (number) => {
  const result = number % 2 === 0 ? 'par' : 'impar'
  console.log(`El número es ${result}`)
}
```

### En Rust no existe `switch`, existe `match`

En Rust existe el operador `match` que viene a sustituir al `switch` de JavaScript. En este caso, vamos a comprobar si un número es par o impar:

```rust
fn check_is_odd_or_even(number: i32) {
  match number % 2 {
    0 => println!("El número es par"),
    1 => println!("El número es impar"),
    _ => println!("El número no es ni par ni impar"),
  }
}

fn main() {
  check_is_odd_or_even(10)
}
```

La sintaxis de `match` es similar a la de `if` y mucho más agradable que la de `switch` de JavaScript. Además, es mucho más declarativa.

El `match` es una expresión que evalúa el valor que le pasamos como parámetro y compara con los valores que le pasamos en cada uno de los casos.

En este caso, el valor que le pasamos es `number % 2` y comparamos con los valores `0` y `1`.

Si el valor que le pasamos es `0`, se ejecuta el código que está dentro del primer caso (`0 => println!("El número es par")`).

Si el valor que le pasamos es `1`, se ejecuta el código que está dentro del segundo caso (`1 => println!("El número es impar")`).

Si el valor que le pasamos no es ni `0` ni `1`, se ejecuta el código que está dentro del tercer caso (`_ => println!("El número no es ni par ni impar")`).

> ¿Qué es el `_`? Es un placeholder que se usa para indicar que el valor puede ser cualquier cosa. En este caso, si el valor que le pasamos no es ni `0` ni `1`, se ejecuta el código que está dentro del tercer caso.

También `match` devuelve el valor que le indiquemos y es muy útil para asignarlo a una variable:

```rust
fn check_is_odd_or_even(number: i32) -> String {
  match number % 2 {
    0 => "par".to_string(),
    1 => "impar".to_string(),
    _ => "no es ni par ni impar".to_string(),
  }
}
```

## Bucles en Rust

En Rust tenemos tres formas de crear bucles: `loop`, `while` y `for`.

### `loop`

El bucle `loop` es similar a `while (true)` en JavaScript. Se ejecuta hasta que se rompe con `break`. En el siguiente ejemplo, vamos a imprimir por consola los números del 1 al 5 y, al llegar a 5, paramos el bucle:

```rust
fn main() {
  let mut number = 0;

  loop {
    println!("El número es {number}");
    number += 1;

    if number == 5 {
      break;
    }
  }
}
```

Igual que con el `if`, podemos devolver un valor en el `loop` y asignarlo a una variable:

```rust
fn main() {
  let mut number = 1;

  let result = loop {
    number += 1;

    if number == 5 {
      break "El número es 5";
    }
  };

  println!("{result}");
}
```

En este ejemplo hemos usado `break` con un valor. Esto hace que el bucle se rompa y se devuelva el valor que hemos indicado. Este valor, que es una cadena de texto, lo hemos asignado a la variable `result`.

Así que al usar `println!` con la variable `result`, se imprimirá por consola `El número es 5`.

### `while`

El bucle `while` es similar a `while` en JavaScript. Se ejecuta mientras la condición sea verdadera. En el siguiente ejemplo, vamos a imprimir por consola los números del 1 al 5:

```rust
fn main() {
  let mut number = 0;

  while number < 5 {
    println!("El número es {number}");
    number += 1;
  }
}
```

La diferencia con JavaScript, al igual que el `if`, es que no necesita paréntesis para indicar la condición.

### `for in`

A la hora de iterar sobre una colección de elementos, podemos usar un índice con `while`:

```rust
fn main() {
  let numbers = [1, 2, 3, 4, 5];

  let mut index = 0;

  while index < numbers.len() {
    println!("El número es {numbers[index]}");
    index += 1;
  }
}
```

Esto es similar a lo que hacemos en JavaScript con `while` de esta manera:

```js
// JavaScript
const numbers = [1, 2, 3, 4, 5]

let index = 0
while (index < numbers.length) {
  console.log(`El número es ${numbers[index]}`)
  index += 1
}
```

Sin embargo, el código queda demasiado verboso y, además, nos obliga a crear una variable `index` que no vamos a usar más que para iterar.

En Rust, podemos usar `for` para iterar sobre una colección de elementos. Este `for` es similar al `for...of` de JavaScript:

```rust
fn main() {
  let numbers = [1, 2, 3, 4, 5];

  for number in numbers {
    println!("El número es {number}");
  }
}
```

Esto genera una variable `number` que toma el valor de cada elemento de la colección `numbers` en cada iteración. En este caso, la variable `number` toma los valores `1`, `2`, `3`, `4` y `5` en cada una de las itearciones. En JavaScript, esto sería similar a:

```js
// JavaScript
const numbers = [1, 2, 3, 4, 5]

for (const number of numbers) {
  console.log(`El número es ${number}`)
}
```

Otra forma de usar `for` es indicando un rango de números. Lo podemos indicar con `..`. Por ejemplo si queremos los números del 1 al 6, podemos usar `1..6`. Los números del 1 al 6 son: 1, 2, 3, 4, 5.

Sé que puede parecer un poco raro que le digamos hasta el 6 y no lo incluya (así también funciona el método `.slice` de JavaScript) así que si lo prefieres, puedes usar `..=` para indicar que el último elemento también debe incluirlo.

Así que si queremos los números `1`, `2`, `3`, `4` y `5`, podemos usar `1..=5`:

```rust
fn main() {
  // for number in 1..6 {
  for number in 1..=5 {
    println!("El número es {number}");
  }
}
```

Así que `1..6` y `1..=5` son equivalentes.

Con esto ya puedes hacer una cuenta atrás gracias al método `rev()` de las tuplas (parecido al `.reverse` de los Array en JavaScript):

```rust
fn main() {
  for second in (1..=10).rev() {
    println!("Despegue en {second}...");
  }
  println!("Despegue!!!");
}
```

## Enums

Los Enums nos permite definir constantes nombradas y son útiles cuando queremos definir un conjunto de valores que son posibles para una variable. Por ejemplo, para el día de la semana:

```rust
enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
```

Tiene sentido que `Day` sea un *enum* ya que sus valores son finitos, constantes y pueden ser nombrados. Si queremos usarlo, podemos crear una variable de tipo `Day` y asignarle un valor:

```rust
fn main() {
  let day = Day::Monday;
}
```

> Si compilas el código verás que te muestra advertencias. Esto es porque no estamos usando todas las variantes del *enum*. Para evitar esto, podríamos usar el atributo `#[allow(dead_code)]` antes de la definición del *enum*.

Para acceder a los valores de un *enum*, usamos el operador `::` y el nombre del valor. En este caso, `Day::Monday`.

En JavaScript no existen los *enums* pero podemos simularlos con objetos:

```js
// JavaScript
const Day = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday',
}
```

Donde sí existen los *enums* son en *TypeScript* que funcionan de forma muy similar a los de Rust e incluso su sintaxis es idéntica.

### Variantes

Cada valor de un *enum* se llama *variante*. Lo interesante de las variantes es que también pueden ser dinámicas. Con los días ya sabemos de antemano sus nombres y sabemos que son finitos. Pero también podríamos tener variantes dinámicas.

Imagina que queremos representar los colores. En un sistema `RGB` tenemos los colores `Red`, `Green` y `Blue`. Pero también podríamos tener un color `Rgb` que es un color compuesto por los valores `Red`, `Green` y `Blue` en una escala de 0 a 255.

```rust
enum Color {
  Red,
  Green,
  Blue,
  Rgb(u8, u8, u8)
}

fn main() {
  let red = Color::Red;
  let dark_blue = Color::Rgb(0, 0, 100);
}
```

En este caso, `Color::Red` es una variante estática y `Color::Rgb(0, 0, 100)` es una variante dinámica que hemos creado con los valores `0`, `0` y `100`.

El tipo de dato es `u8` ya que los valores RGB van del 0 al 255 y `u8` es un tipo de dato que representa un número entero sin signo de 8 bits (0 a 255).

[Sígueme en Twitch para saber cuanto llega la próxima entrega.](https://www.twitch.tv/midudev)

## De vuelta con los Strings

Ya hemos trabajado anteriormente con los *Strings* en Rust y hemos visto que, visualmente, son muy similares a los Strings de JavaScript. Sin embargo, existen diferencias más profundas que debes conocer...

Para empezar, cuando hablamos de *Strings* en Rust hay que diferenciar entre dos tipos de Strings: `&str` y `String`.

### `&str`

En este caso hablamos de una cadena de texto inmutable, con la longitud fija y que no puede ser modificada. Y este es el tipo de dato que hemos visto hasta ahora.

```rust
fn main() {
  // Aquí inferimos el tipo de la cadena de texto
  let hello = "Hola";
  // Y lo que estamos infiriendo es un &str
  let world : &str = "Mundo";
  let hello_world = hello + " " + world;
  println!("{}", hello_world);
}
```

A este tipo de dato se le conoce como *String Slice*, en español sería como *Trozo de String*.

Como hemos visto, podemos concatenar dos *String Slices* con el operador `+` y el resultado es un nuevo *String Slice*, pero en ningún momento hemos modificado los *String Slices* originales.

Su comportamiento es muy parecido a los *String* de *JavaScript* de tipo primitivo, ya que tampoco podemos mutarlo una vez creado y siempre tenemos que crear un nuevo String.

```javascript
const hello = "Hola";
const world = "Mundo";
const helloWorld = hello + " " + world;
console.log(helloWorld);
```

> Por ahora no te preocupes por el símbolo `&` que aparece delante del tipo de dato. Lo veremos más adelante.

### `String`

El segundo tipo es `String` y es un tipo de dato que representa una cadena de texto mutable, con la longitud variable y que puede ser modificada.

```rust
fn main() {
  // Creamos un String a partir del String Slice
  let mut hello = String::from("Hola");
  // Vamos a modificar la longitud de la cadena de texto
  hello.push_str(", Mundo!");
  // Mostramos en pantalla el String
  println!("{hello}");
}
```

Vamos a ver qué está pasando en este código paso a paso:

```rust
let mut hello = String::from("Hola");
```

Creamos una variable `let` llamada `hello` y le asignamos un valor de tipo `String`. Para crear un `String` usamos el método `from` del tipo `String` y le pasamos un `&str` como parámetro.

¿Qué es el `::`? Es un operador que nos permite acceder a un `namespace` y acceder a sus métodos. En este caso, estamos accediendo al `namespace` `String` y al método `from`.

Además, fíjate que estamos creando la variable como mutable, es decir, que podemos modificarla. Si no la creamos como mutable, obtendremos un error, ya que más adelante estamos intentando modificar el valor de la variable con el `push_str`.

```rust
hello.push_str(", Mundo!");
```

El método `push_str` nos permite añadir un `&str` al final del `String`. En este caso, estamos añadiendo la cadena de texto `", Mundo!"`. Gracias a que la variable es `mut`, no tenemos ningún problema en modificar el valor de la variable.

```rust
println!("{hello}")
```

Y finalmente, mostramos en pantalla el valor de la variable `hello`.

Para que veas la diferencia entre un `&str` y un `String`, vamos a ver un ejemplo:

```rust
// ❌ Código incorrecto
fn main() {
  let mut hello: &str = "Hola";
  hello.push_str(", Mundo!");
  println!("{hello}");
}
```

Este código no compilará, ya que no podemos modificar un `&str` y no tiene el método `push_str`. Si queremos modificar un `&str`, tenemos que convertirlo a `String`:

```rust
// ✅ Código correcto
fn main() {
  let str: &str = "Hola";
  let mut hello = String::from(str);
  hello.push_str(", Mundo!");
  println!("{hello}");
}
```

Resumen: cuando hablamos de cadenas de texto en Rust debemos diferenciar entre dos tipos. Tenemos el tipo `&str` que se llama *Slice String*, que es un tipo de dato inmutable y que no podemos modificar, similar al *String* de *JavaScript*. Por otro lado, tenemos el tipo `String` en Rust, que es un tipo de dato mutable y que podemos modificar para cambiar su contenido y su longitud.

> No confundas que la variable sea mutable con que el tipo de dato es mutable. Si usas `let mut hello = "Hello"` estás creando una variable mutable y, por lo tanto, podrás reasignar la variable. Pero el tipo de dato es `&str` y no podrás modificar el valor. Reasignar la variable no es lo mismo que modificar el valor.

## Structs

En *JavaScript* cuando queremos agrupar un conjunto de datos que definen un objeto podemos usar `class`:

```js
// JavaScript
class Animal {
  constructor(name, specie, age) {
    this.name = name;
    this.specie = specie;
    this.age = age;
  }
}
```

Ahora podemos crear un objeto de tipo `Animal` pasando los parámetros necesarios:

```js
// JavaScript
const dog = new Animal("Zeus", "Perro", 3);
```

En *Rust* no existen las clases pero sí los *Structs*. Los *Structs* son una forma de agrupar datos complejos que definen algo. Por ejemplo, podemos crear un *Struct* para definir un `Animal`, tal y como hemos hecho antes:

```rust
// Rust
struct Animal {
  name: String,
  specie: String,
  age: u8,
}
```

Al crear un `struct` es necesario que definamos los tipos de datos de cada uno de los campos. En este caso, hemos definido que el campo `name` es de tipo `String`, el campo `specie` es de tipo `String` y el campo `age` es de tipo `u8`.

Ahora podemos crear un `Animal`:

```rust
// Rust
let dog = Animal {
  name: String::from("Zeus"),
  specie: String::from("Perro"),
  age: 3,
};
```

También puedes usar la notación corta para crear un `struct`, similar a la que usamos en *JavaScript*, si ya tienes una variable con el mismo nombre que el campo:

```rust
// Rust
let name = String::from("Zeus");
let specie = String::from("Perro");
let age = 3;
let dog = Animal { name, specie, age };
```

Para acceder a los campos de un `struct` podemos usar la notación de punto:

```rust
// Rust
println!("El nombre del perro es {}", dog.name);
```

### Mostrar Structs en consola

Ahora, ¿Cómo podemos mostrar el valor de un `struct` en la consola? En *JavaScript* podemos usar `console.log`:

```js
// JavaScript
console.log(dog);
```

En *Rust* ya hemos visto que hay que usar `println!` para mostrar el valor de una variable en la consola. Si intentamos usar `println!` con un `struct` nos dará un error:

```rust
println!("El perro es {dog}");

// ❌: `Animal` cannot be formatted with the default formatter
```

Si no queremos ir propiedad por propiedad y queremos mostrar todo el objeto, vamos a necesitar hacer dos cosas.

1. Indicarle al compilador que queremos usar la macro `println!` con el formato `Debug`.
2. Usar un placeholder para indicarle al compilador que queremos mostrar el valor de un `struct`.

Para lograr la primera, hay que añadir la anotación `#[derive(Debug)]` antes de la definición del `struct`:

```rust
// Rust
#[derive(Debug)]
struct Animal {
  name: String,
  specie: String,
  age: u8,
}
```

Para lograr la segunda, tenemos que usar el placeholder `:?`:

```rust
// Rust
println!("El perro es {:?}", dog);
```

Si ejecutamos el programa, veremos el siguiente resultado:

```bash
El perro es Animal { name: "Zeus", specie: "Perro", age: 3 }
```

### Crea un nuevo Struct a partir de otro

En *JavaScript* podemos usar el operador *spread* `...` para crear un nuevo objeto a partir de otro objeto:

```js
// JavaScript
const dog = { name: "Zeus", specie: "Perro", age: 3 };
const dog2 = { ...dog, age: 4 };
```

En *Rust* el operador `..` es parecido aunque tiene alguna diferencia que es importante apuntar. Lo usaremos así:

```rust
// Rust
let dog = Animal {
  name: String::from("Zeus"),
  specie: String::from("Perro"),
  age: 3,
};

let dog2 = Animal { age: 4, ..dog };
```

También fíjate que hemos usado el `..dog` al final, después de los campos que queremos sobreescribir.

El operador `..` se usa para indicar el *struct* base que queremos usar y siempre se tiene que usar al final. Si intentamos usar el `..` en otra posición nos dará un error de sintaxis. Esto es muy diferente a *JavaScript*, ya que la posición del operador *spread* puede ser cualquiera y su posición cambiará el resultado. En *Rust*, siempre va al final.

### Tuple Structs

Los *tuple structs* son una variante de los `structs` que no tienen nombres de campo. En lugar de tener nombres de campo, los `structs` tienen tipos de datos. Los *tuple structs* son útiles cuando queremos dar un nombre a una tupla.

```rust
struct ColorRGB(i8, i8, i8);
struct LatLng(f64, f64);
```

Para crear una instancia de un *tuple struct* tenemos que usar la misma sintaxis que para crear una tupla:

```rust
let red = ColorRGB(255, 0, 0);
let barcelona_marker = LatLng(41.3851, 2.1734);
```

Lo bueno de los *tuple structs* es aunque no tienen nombres de campo, hace que nuestro código sea mucho más legible.

Para acceder a los valores de un *tuple struct* tenemos que usar la misma sintaxis que para acceder a los valores de una tupla:

```rust
let red = ColorRGB(255, 0, 0);
let red_r = red.0;
let red_g = red.1;
let red_b = red.2;
```

Pero también podemos usar destructuring para acceder a los valores de un *tuple struct*, tal y como haríamos en *JavaScript* pero usando la sintaxis de *Rust* con paréntesis:

```rust
let red = ColorRGB(255, 0, 0);
let (red_r, red_g, red_b) = red;
```

### Métodos en Structs

Una vez que tenemos definido un *Struct* en *Rust*, podemos añadir métodos a ese *Struct*. Los métodos son funciones que están definidas dentro de un *Struct* y que tienen acceso a los datos del *Struct*.

Ahora, la sintaxis para definir métodos en *Rust* es un poco diferente a la que estamos acostumbrados en *JavaScript*. En *Rust* los métodos se definen dentro de un bloque `impl`.

Vamos a crear un método al struct `Animal` que nos permita crear una nueva instancia de `Animal`. Para ello, vamos a crear un método llamado `new` que reciba los datos necesarios para crear una nueva instancia de `Animal` y que devuelva una nueva instancia de `Animal`.

```rust
impl Animal {
  fn new(name: String, specie: String, age: u8) -> Animal {
    Animal {
      name,
      specie,
      age,
    }
  }
}
```

No es el método más útil del mundo porque ya hemos visto lo fácil que es crear una nueva instancia de `Animal` usando el *struct literal* pero es un ejemplo para que veáis cómo se definen los métodos en *Rust* en los *structs* (además que podrías hacer aquí cosas más interesantes, como comprobar que el nombre no está vacío, por ejemplo o transformar los datos).

Ahora, para usar este método, tenemos que llamarlo usando la sintaxis de *Rust* para llamar a métodos:

```rust
let animal = Animal::new("Paco".to_string(), "Perro".to_string(), 5);
```

Fíjate que para llamar al método `new` tenemos que usar la sintaxis `::` para indicar que el método `new` está definido en el *struct* `Animal`.

Además, como los campos `name` y `specie` son *String*, usamos la cadena de texto con comillas dobles (que es un *&str* como hemos visto antes) y usamos el método `to_string()` para convertirlo a *String*.

Vamos a ver otro ejemplo de método en un *struct*, esta vez para poder recuperar el nombre del animal:

```rust
impl Animal {
  fn get_name(&self) -> &String {
    &self.name
  }
}
```

¡Ah! Esto tiene una pinta muy rara, ¿verdad? ¿Qué es ese `&` que hemos puesto delante de `self`? ¿Y ese `&` que hemos puesto delante de `String`? ¿Y ese `&` que hemos puesto delante de `self.name`? ¡Muchos `&` que seguro no esperabas!

Por ahora, no te preocupes por los `&` y simplemente piensa que es la forma de indicar una referencia. Así que no devolvemos un *String*, si no una referencia a uno.

Lo más interesante es el *self*, que se refiere al propio `struct` de `Animal` y que nos permite acceder a sus datos. Es un parámetro que se pasa implícitamente a todos los métodos de un *struct*, no tienes que pasárselo explícitamente.

Ahora vamos a ver cómo usar este método:

```rust
let animal = Animal::new("Paco".to_string(), "Perro".to_string(), 5);
let name = animal.get_name();
println!("{name}") // -> Paco
```

También podemos tener un método para modificar los datos de un *struct*. Por ejemplo, vamos a crear un método para modificar la edad del animal:

```rust
impl Animal {
  fn set_age(&mut self, age: u8) {
    self.age = age;
  }
}
```

Te dejo aquí todo el código del ejemplo para que puedas entenderlo con todo el contexto y puedas ejecutarlo y jugar con él:

```rust
#[derive(Debug)]
struct Animal {
  name: String,
  specie: String,
  age: u8,
}

impl Animal {
  fn new(name: String, specie: String, age: u8) -> Animal {
    Animal {
      name,
      specie,
      age,
    }
  }
  
  fn get_name(&self) -> &String {
    &self.name
  }

}

fn main() {
    let animal = Animal::new("Paco".to_string(), "Perro".to_string(), 5);
    let name = animal.get_name();

    println!("{name} tiene {} años", animal.age);
}
```

## Ownership

Una de las características más especiales de *Rust* es el concepto de *Ownership*. Este concepto es muy importante... y no existe en *JavaScript* por lo que no se puede crear una analogía directa.

### ¿Qué es el Ownership?

El *Ownership* son una serie de reglas que nos permite controlar el acceso a los datos de una forma muy estricta y, además, liberar la memoria de forma automática cuando ya no la necesitamos. Las 3 reglas del *Ownership* son:

1. Cada valor en *Rust* tiene un *dueño* (owner).
2. Sólo puede haber un *dueño* a la vez.
3. Cuando el *dueño* sale del ámbito, el valor se descarta.

#### Inicio de *Ownership* y *move*

En Rust, como en muchos otros lenguajes como JavaScript, usamos el símbolo de igual `=` para asignar un valor a una variable. Sin embargo, en *Rust* están pasando más cosas de las que parece.

```rust
let num = 5;
```

Al hacer esto, estamos iniciando el *Ownership* de la variable `num`. Esto significa que la variable `num` es el *dueño* del valor `5`.

¿Esto significa que no se puede usar más el valor `5`? No. Los tipos primitivos como `i32` o `bool` se copian cuando se asignan a una variable. Esto significa que podemos seguir usando el valor `5` sin problemas:

```rust
let num = 5;
let num2 = num; // Se copia el valor de num a num2
println!("{num} {num2}"); // -> 5 5
```

Pero esto no es así con otros tipos compuestos como *String* o *Vec*. En estos casos, cuando reasignamos un valor a una variable, lo que realmente estamos haciendo es cambiar el *ownership* sobre ese valor.

```rust
// Creamos un String a partir del String Slice
let name = String::from("Miguel");
// Reasignamos el valor de name a name2
let name2 = name;
// Intentamos mostrar el valor de name
println!("{name}"); // -> Error: value borrowed here after move
```

¿Qué ha pasado aquí? Pues que cuando hacemos una reasignación no estamos haciendo una copia del valor, si no que estamos cambiando el *dueño* del valor. Esto significa que el valor ya no pertenece a la variable `name` y, por lo tanto, no podemos usarla desde ahí. Ahora el *dueño* es la variable `name2`.

A este proceso se le llama *move* y es una de las características más importantes de *Rust*.

> Como has visto, Rust es muy agresivo a la hora de liberar los recursos. En JavaScript contamos con un Garbage Collector pero Rust incorpora este sistema de *Ownership* que libera el recurso automáticamente cuando el dueño sale del ámbito. Esto no evita que puedan existir *memory leaks* pero sí que se minimizan.

#### *Ownership* y funciones

Hay veces que puede ser un reto detectar cuando se produce un *move* en *Rust* ya que también ocurre cuando usamos la variable como argumento de una función. Por ejemplo, vamos a crear una función que recibe un *String* y lo pasa a todo minúsculas:

```rust
fn to_lowercase(name: String) -> String {
  name.to_lowercase()
}

fn main() {
  let name = String::from("Miguel");
  let lower_case_name = to_lowercase(name);

  // ¡name ya no existe!
  println!("{name}"); // -> Error: value borrowed here after move
}
```

Vamos a ver qué ha pasado aquí paso a paso.

1. Creamos una variable `name` y le asignamos un valor de tipo *String*.
2. Llamamos a la función `to_lowercase` pasándole la variable `name` como argumento.
3. En este punto, estamos haciendo un *move* de la variable `name` a la función `to_lowercase`. Esto significa que la variable `name` ya no existe en el ámbito de la función `main` y que el *dueño* del valor es la función `to_lowercase`.
4. La función `to_lowercase` devuelve un valor de tipo *String* que se asigna a la variable `lower_case_name`.
5. Intentamos mostrar el valor de la variable `name` pero no podemos porque ya no existe. El *dueño* del valor era la función `to_lowercase`.

Este suele ser un problema muy común en *Rust* ya que, por defecto, las funciones toman la propiedad de los valores que recibe como argumentos. Esto es muy útil para evitar que se modifiquen los valores que se pasan a la función. Sin embargo, hay veces que no queremos que esto ocurra y, en esos casos, tenemos que indicar explícitamente que no queremos que se produzca el *move*.

Ten en cuenta que este problema no existe con los tipos primitivos ya que estos se copian cuando se pasan como argumento a una función. Por ejemplo, vamos a crear una función que recibe un `i32` y lo duplica:

```rust
fn double(num: i32) -> i32 {
  num * 2
}

fn main() {
  let num = 5;
  let double_num = double(num);

  // num sigue existiendo
  println!("{num}"); // -> 5
}
```

> ¿Por qué los tipos primitivos sí los copia? De los tipos como `i32`, Rust conoce su tamaño en tiempo de compilación y, por lo tanto, puede copiarlos sin problemas. Sin embargo, los tipos compuestos como *String* o *Vec* no pueden ser copiados de esta forma ya que no sabemos su tamaño en tiempo de compilación.

#### Copia de valores

Así que ya sabemos que tipos como `i32` o `bool` se copian automáticamente con reasignaciones o al pasarlos como argumento a una función. Pero, ¿qué pasa con los tipos compuestos? ¿Cómo podemos copiarlos? Existen diferentes estrategias para poder lograrlo. A la hora de trabajar con *String*, por ejemplo, podemos usar el método `clone`:

```rust
let name = String::from("Miguel");
let name2 = name.clone();

// name sigue existiendo
println!("{name} {name2}"); // -> Miguel Miguel
```

...
