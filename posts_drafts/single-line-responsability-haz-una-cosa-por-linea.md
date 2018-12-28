---
title: Single Line Responsability™, one line does one thing
date: '2018-12-18'
image: 'https://midudev.com/static/images/analytics.png'
description: 'Experience and knowledge could help you writing readable, mantainable and clean code but, following the Single Line Responsability principle will help you to be sure you're doing it.'
topic: bestpractices
language: 🇪🇸
---

It is said that **is easier writting understandable code for computers than for humans. And who doesn't believe that?** No matter the name of your variables, code styling, or weird decisions that you could make that, if it compiles, computer is going to do what it has to do. And that's cool as we are free to throw a bunch of spaghetti to our beloved machines and get the work done.

That said, the main problem is, generally speaking, our code should be read as well by humans. Colleagues, team mates, managers, clients... truth is **our code should be understandable by machines but readable by humans.**

> Some years ago, I asked a teammate why he used single letters as names for variables. He said: "So I will be needed for understanding this code".

There're a lot of patterns and architectures, depending on the programming language, that could help you to write a better codee. Still, there's a simple yet powerful principle that could help you a lot to achieve this. I call it: **Single Line Responsability™.** And it has a pretty simple rule: **use each line to do a single thing.**




Let's see some real example with actual code in production.

```javascript
// we're creating a searchUrlValueObject but for each key we
// have some special logic to create its values
return SearchFactory.searchUrlValueObject({
  featureLiteral:
    featureIds && featureIds.length === 1
      ? this._findFeatureByValue(featureIds[0])
      : undefined,
  // is the template string really necessary? hard to know!
  urlPattern: `${this._config('routing')[isMap ? 'map' : 'search']}`
})

// refactored following the Single Line Responsability™
// create a const for the featureLiteral
const featureLiteral = featureIds && featureIds.length === 1
  ? this._findFeatureByValue(featureIds[0])
  : undefined
// extract the ternary in a const to use later
const routingType = isMap ? 'map' : 'search'
// remove the unnecesary template string and use the routingType
const urlPattern = this._config('routing')[routingType]
// use short-hand for key-value object and return the searchUrlValueObject
return SearchFactory.searchUrlValueObject({featureLiteral, urlPattern})
```

It works for React components as well!
```js
function RecommendationsList ({baseClass, onContact, recommendations}) {
  return (
    <div className={`${baseClass}-properties`}>
      {recommendations.map(property => (
        <CardRecommendations
          key={property.id}
          {...property}
          onOneClickContact={e => { onContact(e, property.id)}}
        />
      ))}
    </div>
  )
}

function mapCardRecommendationsForList ({ onContact, property }) {
  const {id} = property
  const onOneClickContact = e => { onContact(e, id) }

  return (
    <CardRecommendation
      key={id}
      {...property}
      onOneClickContact={onOneClickContact}
  )
}

function RecommendationsList ({baseClass, onContact, recommendations}) {
  const className = `${baseClass}-properties`
  return (
    <div className={className}>
      {recommendations.map(mapCardRecommendationsForList)}
    </div>
  )
}

```

### FAQ
#### Should I use it ALWAYS?
Nope. The rule is not meant to be strict but a guide to try to follow as much of possible. Sometimes could be possible that one line is more appropiate for doing more things but still following SLR could surface the possibility of extracting a useful function.

```js
// typical simple example of doing two things in the same line
const result = numbers.map(n => n * 2)

// using SLR™
const multiplyBy2 = n => n * 2 // extract the function
const result = numbers.map(multiplyBy2)
```

####



> Sometimes when I ask somebody about why they're using a single line for doing a bunch of actions they generally answer me: it's faster. But, is it?
