---
title: ¿Cómo eliminar el código de las PropTypes antes de subir a producción?
date: '2020-04-03'
image: '/images/og/react-como-eliminar-el-codigo-de-las-proptypes-en-produccion.png'
description: Las PropTypes nos ayudan a detectar problemas de tipos al usar props en nuestros componentes de React pero... son inútiles en producción. Aprende a eliminar su código.
tags:
- react
---

### ¿Qué son las PropTypes?

Las *PropTypes* de *React* nos pemiten verificar los tipos de las props de nuestros componentes. De esta forma, **en desarollo**, podemos saber si estamos pasándole al componente los tipos de datos correctos.

Antiguamente, las PropTypes estaban incluidas en el propio paquete de React pero **desde la versión 15.5 de React hay que instalar la biblioteca `prop-types` a parte**:

```
npm install prop-types
```

Una vez instalado, podemos importarlo en nuestro componente e indicar para prop que recibe el componente de qué tipo es y si es obligatoria:

```javascript
import PropTypes from 'prop-types';

const Component = props => { //... }

Component.propTypes = {
  results: PropTypes.array.isRequired,
  isReady: PropTypes.bool,
  onChange: PropTypes.func,
  numOfResults: PropTypes.number,
}
```

Esto es sólo un ejemplo de las diferentes *PropTypes* que hay. Podéis encontrar una **[lista completa de posibles PropTypes en la documentación de React](https://es.reactjs.org/docs/typechecking-with-proptypes.html#proptypes).**

Una vez tengamos nuestras *PropTypes* definidas recibiremos **en consola** una advertencia si no cumplimos con ese contrato. **Esta advertencia, sin embargo, sólo funciona en desarrollo.**

Entonces, ¿qué sentido tiene que este código llegue a producción? Y, lo más importante, **¿cómo evitamos que llegue a producción y así ahorremos un poco en ancho de banda?**

### Cómo eliminar el código de las PropTypes en producción

Para conseguirlo podemos utilizar el plugin de *babel* `babel-plugin-transform-react-remove-prop-types`, y lo podemos instalar de esta forma:

```
npm install --save-dev babel-plugin-transform-react-remove-prop-types
```

Ahora, sólo nos quedaría configurar nuestro `.babelrc` de forma que nos aseguremos que el transpilador utiliza esta transformación. Además, **nos aseguramos que sólo ocurra en producción**, ya que queremos que en desarrollo nos siga mostrando en consola los posibles errores al pasarle props a nuestros componentes.

```json
{
  "env": {
    "production": {
      "plugins": ["transform-react-remove-prop-types"]
    }
  }
}
```

Y, para ver la diferencia, os dejo con el código antes y después de utilizar este plugin:

```javascript
import PropTypes from 'prop-types';
const Component = props => { //... }
```

Como ves, el `import` de las `prop-types` no ha desaparecido y es que, por defecto, este es el comportamiento del plugin que deja el import de la librería. Lo hace porque, es posible, que algunos componentes usen directamente la librería para otro tipo de cosas y que el plugin no lo haya detectado.

Normalmente esto es suficiente pero, si quieres, puedes seguir leyendo para conocer más opciones que tiene el plugin para afinar su  funcionamiento.

### Más opciones de `transform-react-remove-prop-types`

A veces queremos mantener las PropTypes porque, por ejemplo, en realidad es un componente que vamos a publicar y, por lo tanto, no vamos a consumirlo nada más compilarlo. Piensa en, por ejemplo, un componente que tengas en GitHub y quieras que otra persone use. Si lo publicas sin PropTypes, de alguna forma, estás quitándole funcionalidad muy útil.

Para arreglar esto, existe una opción llamada `mode` donde puedes usar el valor `wrap`. Por defecto el valor es `remove`, que las elimina, pero usando `wrap` conseguiremos mantenerlas y que se envuelvan en un condicional que si el `NODE_ENV` es `production` no se evaluen.

```json
{
  "env": {
    "production": {
      "plugins": [
        ["transform-react-remove-prop-types", {
          "mode": "wrap"
        }]
      ]
    }
  }
}
```

Y, al compilar, quedarían así:

```javascript
import PropTypes from 'prop-types';

const Component = props => { //... }

if (process.env.NODE_ENV !== "production") {
  Component.propTypes = {
    results: PropTypes.array.isRequired,
    isReady: PropTypes.bool,
    onChange: PropTypes.func,
    numOfResults: PropTypes.number,
  }
}
```

Seguramente te estés preguntando... **¿No estamos en realidad añadiendo más código?** Sí y no. Te explico. Por un lado, esto hará que el código funcione correctamente en entornos que no sean de producción y, por lo tanto, si no usamos las *PropTypes* que el componente espera, al menos en desarrollo, veremos una advertencia en la consola.

**¿Y en producción?** Si llevamos este código tal cúal el código no se evalua pero sí seguirá allí. Sin embargo si usas ciertas herramientas como *Webpack*, *Rollup* o *Uglify*, este código será eliminado ya que mirará estáticamente el valor de `NODE_ENV`  y cambiará la condición a su valor. Si la condición nunca se cumple, entonces elimina el código. 👇

```javascript
// primera pasada con NODE_ENV = 'production'
import PropTypes from 'prop-types';

const Component = props => { //... }

if (false) { // evalua la condición interna y lo cambia por su valor
  Component.propTypes = {
    results: PropTypes.array.isRequired,
    isReady: PropTypes.bool,
    onChange: PropTypes.func,
    numOfResults: PropTypes.number,
  }
}
```

```javascript
// segunda pasada
import PropTypes from 'prop-types';
const Component = props => { //... }

// se elimina el código porque es una "rama muerta"
```

Esta no es la única opción interesante que tiene. Por ejemplo, puedes forzar a eliminar el import de la librería `prop-types` usando la opción `removeImport: true`.

### Conclusiones

Con este artículo espero haberte ayudado a conocer una forma de eliminar las PropTypes de tu código de producción. Esta en concreto nos funciona en producción en mi empresa sin ningún problema pero puede existir algún problema si estás usando la librería `prop-types` para algo que no es su uso esperado. Sólo tenlo en cuenta y **pruébalo en tus aplicaciones antes de llevarlo a producción.** Pero eh, ¡Eso no creo que hiciera falta que te lo dijese! 😜

### Referencias

[babel-plugin-transform-react-remove-prop-types](https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types)
