---
title: CURSO EXPRESS gratis de GraphQL, React Apollo y Apollo Server
date: "2019-07-13"
image: "/images/curso-express-graphql.png"
description: "Aprender gratis sobre GraphQL. Una introducción en español sobre como conectarlo con React usando Apollo Client y crear tu propio servidor con Apollo Server."
tags:
  - graphql
  - react

toc: true
---

En mi [canal de @midudev en Youtube](https://www.youtube.com/c/midudev?sub_confirmation=1) he subido un curso express completamente gratuito sobre GraphQL, React Apollo y Apollo Server gracias a la colaboración de [Horacio Herrera](https://twitter.com/hhg2288) y [React GraphQL Academy](https://reactgraphql.academy/).

## ¿Qué es GraphQL?

En la primera clase hacemos una introducción sobre GraphQL. **GraphQL es un lenguaje para hacer consultas que creó Facebook** para ayudarle con su problema de escalabilidad a la hora de tomar datos para su aplicación.

Facebook, como sabéis, es una red social. Los grupos sociales son un grafo, no estamos todos conectados de forma jerárquica como un árbol. Esto hace que recuperar la información necesaria para mostrarla en la UI con los métodos convencionales (REST API, por ejemplo) no fuese lo ideal y tuvieramos que hacer complejas llamadas anidadas para recuperar los datos que necesitamos.

{{< youtube id="KRV46iZ844s" >}}

## Haciendo queries y GraphiQL con la API de Rick & Morty

En la segunda clase vemos cómo podemos realizar queries en GraphQL y para ello usaremos el playground GraphiQL con [la API abierta de Rick & Morty](https://rickandmortyapi.com) que **nos ofrece la posibilidad de consultarla usando REST o GraphQL.**

Una query en GraphQL se asemeja mucho a un objeto en Javascript y, tiene sentido, ya que la respuesta que nos dará seguirá exactamente la misma estructura que la query. **Esto es lo que hace que GraphQL sea tan predecible.**

Aquí tenemos un ejemplo, dónde queremos recuperar los characteres de la segunda página donde su nombre sea `rick`. Además, de estos, queremos recuperar sólo los campos de `id` y `name` de `results`.

```
query {
  characters(page: 2, filter: { name: "rick" }) {
    results {
      id
      name
    }
  }
}
```

Lo mejor que puedes hacer es ir directamente [al playground de Rick & Morty API donde os dejo un par de pestañas con las queries.](https://graphqlbin.com/v2/x2kpuJ)

{{< youtube id="5BwmvekYCpY">}}

## GraphQL en React con Apollo Client

Ya habremos visto toda la potencia de GraphQL y sus queries pero ahora nos gustaría poder utilizar todas sus cualidades en un proyecto real de React. Para ello **vamos a utilizar Apollo Client**, el conector más famoso que nos va a permitir de forma fácil y rápida consultar un servidor GraphQL (como la API de Rick & Morty) en nuestra aplicación de React.

**Son cuatro pasos.** Primero, instalas las dependencais necesarias:

```
npm install apollo-boost react-apollo graphql
```

Después, importas el cliente y creas una instancia pasándole la URL con el servidor al que quieres apuntar:

```javascript
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
});
```

Ahora, envolvemos nuestra aplicación con el Provider de Apollo, para poder acceder desde cualquier punto del árbol de nuestra aplicación a este cliente:

```javascript
import { ApolloProvider } from "react-apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
```

Y, finalmente, importamos el componente `Query` de react-apollo junto con el paquete `gql` de `apollo-boost` para usar la técnica de las render props y hacer nuestra primera query:

```javascript
const CharactersQuery = () => {
  return (
    <Query
      query={gql`
        {
          characters {
            results {
              id
              name
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.characters.results.map(character => (
          <p>{character.name}</p>
        ));
      }}
    </Query>
  );
};
```

Con esto, hemos creado un componente `CharactersQuery` que, al usarlo, renderizará diferentes cosas dependiendo si estamos cargando, hay un error o ya tenemos los datos disponibles.

Puedes ver el Code Sandbox con todo el código necesario, pero **te recomiendo que veas el vídeo para seguir paso a paso, y con todo lujo de detalles, cómo puedes conseguirlo:**

{{< youtube id="4ULxq_Bp0RY">}}

## Crea tu servidor de GraphQL con Apollo Server

Ahora que sabemos cómo usar desde el cliente una API con GraphQL... **¿qué tal si descubrimos cómo crear nuestro propio servidor GraphQL?** Pues bien, lo vamos a conseguir utilizando Apollo Server y vamos a ver qué sencillo es empezar a tener nuestra API funcionando.

En esta clase vamos [a seguir uno de los ejercicios del repositorio de React GraphQL Academy.](https://github.com/reactgraphqlacademy/rest-to-graphql-workshop).

Después de inicializar nuestro proyecto e instalar la dependencia con `npm install apollo-server`, la importamos:

```javascript
const { ApolloServer, gql } = require("apollo-server");
```

Ahora vamos a crear las definiciones de nuestros datos, paso imprescindible, ya que GraphQL es un lenguaje tipado y necesita verificar que los datos que devuelve la consulta, y las propias consultas, siguen las reglas establecidas. Así que creamos las definiciones usando la utilidad `gql`:

```javascript
const typeDefs = gql`
  type Book {
    title: String # title será un string
    author: String # author será un string
  }

  # definimos las queries
  type Query {
      books: [Book] # es un array de tipo Book
  }
```

Ahora que tenemos las definiciones, es el momento también de indicarle al servidor Apollo Server cómo vamos a resolver la información que el cliente puede pedirnos con una query, para eso tenemos que crear los `resolvers`.

```javascript
const resolvers = {
  Query: {
    books: () => {
      // devolvemos un array con dos objetos
      return [
        {
          title: "Harry Potter and the Chamber of Secrets",
          author: "J.K. Rowling",
          year: 1998
        },
        {
          title: "Jurassic Park",
          author: "Michael Crichton",
          year: 1990
        }
      ]
  }
}
```

Ya sólo nos queda crear el servidor de Apollo usando la clase `ApolloServer` que hemos importado al principio pasándole como parámetro un objeto con las definiciones que hemos creado y los resolvers:

```javascript
const server = new ApolloServer({ typeDefs, resolvers });
```

Tras esto, sólo tenemos que iniciar nuestro servidor de la siguiente forma:

```javascript
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

Estos son los pasos, pero **si quieres conocer al detalle todo el proceso y recibir algunos consejos interesantes de parte de Horacio, no te lo pierdas en vídeo**:

{{< youtube id="zDrKmi9ph2Q" >}}

## Conectando nuestro servidor de Apollo con una REST API

La clase anterior nos enseñó como crear un servidor de Apollo pero sólo vimos como podíamos devolver información que ya teníamos en el archivo. No parece que sea muy interesante, ¿verdad? Lo realmente potente es que en nuestro servidor de Apollo podemos recuperar la información desde diferentes fuentes de datos o repositorios como, por ejemplo, una API REST.

Esto es uno de los puntos por lo que es importante explicar que GraphQL no viene a sustituir nuestras API REST si no, más bien, a complementarlas y ofrecernos una forma más humana de utilizarlas o agregar datos de diferentes.

Para ver cómo hacemos esto vamos a usar la API de Rick & Morty y, con ello, vamos a tener que modificar nuestras definiciones de tipos para nuestro servidor de GraphQL.

```javascript
const typeDefs = gql`
  type Character {
    id: ID
    name: String
    status: String
  }

  type Query {
    characters: [Character]
  }
```

Ahora, tenemos que cambiar cómo resolvemos los datos para poder tener la información necesaria para esta query. 

```javascript
const resolvers = {
  Query: {
    // Esto resuelve el campo "characters" de la query
    characters: () => fetchCharacters()
  }
}
```

¿Qué es lo que hace el método `fetchCharacters`? Pues hacer una petición a [la API Rest de Rick & Morty para poder recupera la información de todos los cáracteres.](https://rickandmortyapi.com/documentation/#rest)

```javascript
// import fetch from 'node-fetch' 
function fetchCharacters() {
  return fetch('https://rickandmortyapi.com/api/character/')
    .then(res => res.json())
    .then(json => json.results)
}
```

¿Quieres descubrir más formas de hacerlo? ¿Qué tal si además pudieramos hacer una query para un personaje en concreto? Pues muchos más comentarios, detalles y ejercicios en el vídeo disponible con la última clase del curso express gratuito de GraphQL con React y Apollo:

{{< youtube id="iR6FV9N3UqQ" >}}

## ¡Suscríbete y no te pierdas el siguiente!

**¿Te gusta el frontend? ¿Te gustaría aprender más cosas como GraphQL y React?** ¿Aprender sobre las posibilidades de Javascript? Pues no dejes de suscribirte a mi canal donde voy publicando regularmente nuevos vídeos para seguir aprendiendo.

**[¡Suscríbete a mi canal de Youtube!](https://www.youtube.com/c/midudev?sub_confirmation=1)**
