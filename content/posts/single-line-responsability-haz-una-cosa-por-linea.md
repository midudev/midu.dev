---
title: Single Line Responsibility, one line does one thing
date: '2018-12-18'
image: '/images/slr_one_line_one_thing-5395037.png'
description: "Experience and knowledge could help you writing readable, mantainable and clean code but, following the Single Line Responsibility principle will help you to be sure you're doing it."
language: 🇬🇧
tags: ["best-practice"]
---

It is said that **is easier writing understandable code for computers than for humans. And who doesn't believe that?** No matter the name of your variables, code styling, or weird decisions that you could make that, if it compiles, the computer is going to do what it has to do. And that's cool as we are free to throw a bunch of spaghetti to our beloved machines and get the work done.

That said, the main problem is, generally speaking, our code should be read as well by humans. Colleagues, teammates, managers, clients... truth is **our code should be understandable by machines but readable by humans.**

> Some years ago, I asked a teammate why he used single letters as names for variables. He said: "So I will be needed for understanding this code".

There're a lot of patterns and architectures, depending on the programming language, that could help you to write better code. Still, there's a simple yet powerful principle that could help you a lot to achieve this. I call it: **Single Line Responsibility™.** And it has a pretty simple rule: **use each line to do a single thing.**

Let's see some **real production code where the Single Line Responsibility is NOT being used**:

```javascript
/* examples of doing MORE than one thing in one line */
/* (spoiler: you're gonna need horizontal scroll) */

// get an element, add an event and pass the callback with some calculated params
document.querySelector('.js-push-button').addEventListener('click', function () { pushEnabled && pushMessage(JSON.stringify(messages))})

// check condition, concatenate two dots with a substring and assign to a variable
if (value.length > 13) value = value.substring(0,12) + '..';

// let's push to grid a created path with a bunch of params no body understand!
grid.push(paper.path("M0 " + i + " L" + getPaperWidth(i) + " " + i, false))

// feel like there you are a god  
e.innerHTML = t._getDateTime(new Date(), ed.getParam("template_mdate_format", ed.getLang("template.mdate_format")))
```

Does it feel nasty? Oh my, it should feel nasty and that's good. That means that you're willing to know more about the **Single Line Responsibility** advice. 

> Single Line Responsibility is a rule that enforces you to try to do only one thing in each line. 

## Using Single Line Responsibility, for good

While the rule is pretty simple, how to achieve it could be highly subjective. There's plenty of ways to achieve the desired effect. A wrong way to do that could lead to a worse readable code so be careful and try with different things to approach the problem.

In order to help you understand the principle, let's check some examples:

### Avoid creating objects and/or params by calling methods and using conditionals:

```javascript
// ❌ we're creating a searchUrlValueObject but for each key we
// have some special logic to create its values
return SearchFactory.searchUrlValueObject({
  featureLiteral:
    featureIds && featureIds.length === 1
      ? this._findFeatureByValue(featureIds[0])
      : undefined,
  // is the template string really necessary? hard to know!
  urlPattern: `${this._config('routing')[isMap ? 'map' : 'search']}`
})

// ✅ refactored following the Single Line Responsibility™
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

<br />

### Template strings are powerful just don't bloat them with logic.

```javascript
// ❌ logic in the template string and using it as a parameter  
writeFile(
    COMPONENT_PACKAGE_JSON_FILE,
    `{
  "name": "${packageName}",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  ${
    repository.url
      ? `
  "repository": {
    "type": "${repository.type}",
    "url": "${repository.url}"
  },`
      : ''
  }${
      homepage
        ? `
    "homepage": "${homepage.replace('/master', `/master${COMPONENT_DIR}`)}",`
        : ''
    }
  "keywords": [],
  "author": "",
  "license": "MIT"
}`
    
// ✅ refactored following the Single Line Responsibility™
const createHomePageSection = homepage => {
  if (!homepage) return ''

  const homepageValue = homepage.replace('/master', `/master${COMPONENT_DIR}`)
  return `"homepage": "${homepageValue}",`
}

const createRepositorySection = ({url, type}) => {
  if (!url) return ''

  return `"repository": {
    "type": "${type}",
    "url": "${url}"
  },`
}

const fileContent = `{
  "name": "${packageName}",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  ${createRepositorySection(repository)}
  ${createHomePageSection(homepage)}
  "keywords": [],
  "author": "",
  "license": "MIT"
}`

writeFile(COMPONENT_PACKAGE_JSON_FILE, fileContent)
```

<br />

### Chaining could be good, just use it separating per line:

```javascript
// ❌ reading could be a bit difficult
listOfNumbers.filter(n => n % 2 === 0).map(n => n * n).some(n => n > 30)

// ✅ separate each line, linter could help you with this!
listOfNumbers
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .some(n => n > 30)
```

<br />

### Destructuring is nice. Just, don't make it ugly:

```javascript
// ❌ I'm scared
const { result: { realEstates: { count = 0 } = {} } = { realEstates: {} } } = props

// ✅ not the best but I'll sleep at night
const { results = {} } = props
const { realEstates = {} } = results
const { count = 0 } = realEstates
```

<br />

### It works for React components as well!

```javascript
// ❌ it's like the callback hell! 🔥
render() {
  const {showCardSubscription} = this.state
  const {appName, i18n} = this.props

  return (
    <div>
      {this._hasFailed(this.props.errorMessage) && this._isRegistered() && (
        <SuiCardSubscription
          checkboxLabel={
            <span
              className="mt-CardSubscription-checkboxLabel"
              dangerouslySetInnerHTML={{
                __html: i18n.t(
                  `CARD_SUBSCRIPTION_${appName}_CHECKBOX_LABEL`
                )
              }}
            />
          }
          checkboxErrorMessage={i18n.t(
            'CARD_SUBSCRIPTION_CHECKBOX_ERROR_MESSAGE'
          )}
          checkboxIcons={{
            checked: IconCheckboxChecked,
            unchecked: IconCheckboxUnchecked
          }}
        />
      )}
    </div>
  )
}

// ✅ separate in methods and avoid doing too many things inside the component
const CHECKBOX_ICONS = { // outside the render, they're not changing never
  checked: IconCheckboxChecked,
  unchecked: IconCheckboxUnchecked
}

// render methods could be even separate and reusable React components
renderCardSubscription () {
  const { i18n } = this.props
  const checkboxErrorMessage = i18n.t('CARD_SUBSCRIPTION_CHECKBOX_ERROR_MESSAGE')

  return (
    <SuiCardSubscription
      checkboxErrorMessage={checkboxErrorMessage}
      checkboxIcons={CHECKBOX_ICONS}
      checkboxLabel={this.renderCheckboxLabel()}
    />
  )
}

renderCheckboxLabel () {
  const { appName, i18n } = this.props
  const innerHTML = i18n.t(`CARD_SUBSCRIPTION_${appName}_CHECKBOX_LABEL`)

  return (
    <span
      className="mt-CardSubscription-checkboxLabel"
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    />
  )
}

render () {
  const {errorMessage} = this.props
  // calculate if we have to show the card and don't do it in the render
  const showCardSubscription = this._hasFailed(errorMessage) && this._isRegistered()

  return (
    <div>
      {showCardSubscription && this._renderCardSubscription()}
    </div>
  )
}
```

<br /><br />
## Frequently asked questions 🤔

### Should I use it ALWAYS?
**Nope.** The rule is not meant to be strict but a guide to try to follow as much of possible. Sometimes could be possible that one line is more appropriate for doing more things but still **following SLR could surface the possibility of extracting a useful function.**

```javascript
// a typical simple example of doing two things in the same line that could make sense
const result = numbers.map(n => n * 2)

// using SLR™
const multiplyBy2 = n => n * 2 // extract the function, could be used again
const result = numbers.map(multiplyBy2)
```

Anyway, the idea behind the Single Line Responsibility is to do your best effort to not creating code hard to read by concatenating stuff in a single line. It could make sense in a specific context, just keep it in mind.

<br />

### But I've seen you are doing more than one thing per line! Liar!

As I said, **let's not being pedantic about SLR.** The idea behind SLR is trying as much of possible of doing one thing per line but, sometimes, could be good enough to try to limit the things to do in one line. In the next case I'm accessing a position of the array featureIds and using it as a param:

```javascript
this._findFeatureByValue(featureIds[0])
```

Surely, we could do the next thing:

```javascript
const featureValue = featureIds[0]
this._findFeatureByValue(featureValue)
```

But, what happens when we want to do that inside a conditional in order to check if featureIds have at least one position in order to know if we should extract it? Well, there're plenty of solutions (extracting to a method, control `undefined` values...). The idea is not trying to achieve everything in one line but sometimes is just fine having an exception.

<br />

### But I'm sure there's some kind of performance penalty!

**Make it work. Make it right. Make it fast.** But not THAT fast. If your code is not understandable and maintainable, nobody cares if is a little bit faster. Even though **performing a lot of actions in a single line surely could be more performant but on a micro scale.** Don't sacrifice readability for micro-optimizations. Instead, focus on real performance boost with better algorithms and implementations. If your code should be micro-optimized (for size, for memory, for whatever) then, feel free to put aside this rule.

> Sometimes when I ask somebody about why they're using a single line for doing a bunch of actions they generally answer me: it's faster. But, is it? Is the user going to perceive it? Worth it?

<br />

### My code is going to be too verbose!

Is it? To be honest, I've never have had problems with my code being too verbose but I've found problems with the opposite. Obviously, is still your responsibility to make sense of following this rule. Again, this is a rule and, as all the rules, they're exceptions. **Be clever and responsible.** ☝️

<br />

### Dude, this is NOT new. I do it all the time!

I know. Tons of programmers are good boys and try to do their best to make their code readable, maintainable and clean. But I liked the idea of giving a name for it. If you want your coworkers to improve their codes, please, feel free to share this article within your company or your social networks. **Let's do lines of code great again!**
