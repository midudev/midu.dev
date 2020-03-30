---
title: ¿Cómo eliminar el código de las PropTypes antes de subir a producción?
date: '2020-03-23'
image: '/images/react-prop-types-en-produccion.jpg'
description: Las PropTypes nos ayudan a detectar problemas de tipos al usar props en nuestros componentes de React pero... son inútiles en producción. Aprende a eliminar su código.
language: 🇪🇸
tags:
- react
- react hooks
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

Una vez tengamos nuestras *PropTypes* definidas recibiremos **en consola** una advertencia si no cumplimos con ese contrato. **Esta advertencia, sin embargo, sólo funciona en producción.**

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

```json
{
  "env": {
    "production": {
      "plugins": [
        ["transform-react-remove-prop-types", {
          "mode": "wrap",
          "ignoreFilenames": ["node_modules"]
        }]
      ]
    }
  }
}
```



