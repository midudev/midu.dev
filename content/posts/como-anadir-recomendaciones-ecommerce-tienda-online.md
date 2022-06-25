## Enviar trazas

```
npm install search-insights -E
```

En `hooks/useAlgoliaInsights`:

```js
import si from 'search-insights'

si('init', {
  appId: APP_ID,
  apiKey: API_KEY
})
```

```js
import si from 'search-insights'

si('init', {
  appId: '35T510Q9UB',
  apiKey: '7845d79ac90abdc02889c9fcde6efb95'
})

```

## Conseguir queryID

En `performSearch.jsx`:

```js
  const options = {
    hitsPerPage: limit,
    clickAnalytics: true,
```

## Conseguir recomendaciones de un

```
npm install @algolia/recommend-react @algolia/recommend -E
```