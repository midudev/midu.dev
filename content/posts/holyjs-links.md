---
title: React Rendering Strategies resources
date: "2019-11-05"
image: "/images/react-rendering-strategies-cover.png"
description: "Find all the links and resources from the React Rendering strategies talk by Miguel Ángel Durán"
tags:
  - react
  - performance
language: 🇬🇧
type: page
---

## Slides talk

[HolyJS Slides](https://slides.com/miguelangeldurangarcia/holy-js-react-rendering-strategies-getting-the-most-out-of-performance-while-keeping-bots-happy/)<br />HolyJS edition slides for React Rendering Strategies talk.

## Show me the code!

[React Rendering Strategies Repository](https://github.com/midudev/react-rendering-strategies)<br />All examples, all strategies packages, in a single place.

## Interesting links from introduction

[PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)<br />Used in order to retrieve the Lighthouse metrics every 5 minutes and send them over a Datadog.

[Frontend Performance: Measuring & KPIs](https://crystallize.com/blog/frontend-performance-measuring-and-kpis)<br />Good article regarding how to measure frontend performance. I grabbed the comic strip about TTI from here.

[Wordpress Market Share](https://www.isitwp.com/popular-cms-market-share/)<br />According to this website, Wordpress is the most popular CMS with a 60% of market-share. Outside the CMS market, that means Wordpress is used by 33.5% of all websites online.

[SSR with hydration Demo](https://react-rendering.midudev.now.sh/ssr-client-rehydration)<br />Demo website to show Server Side Rendering with (re)hydration demo.

## About Dynamic Rendering
[Yandex Documentation regarding Sites Crawling](https://yandex.com/support/webmaster/recommendations/changing-site-structure.html)<br />Yandex documentation stating that client-side rendering is not supported by their crawlers.

[Dynamic Rendering Guide](https://developers.google.com/search/docs/guides/dynamic-rendering)<br />Guide from Google explaining how to implement Dynamic Rendering strategy by route on your site and how can it help you.

[Googlebot evergreen](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)<br />Announcement regarding the Googlebot update, its new features and what it means for SEO.

[Dynamic Rendering by Component demo](https://react-rendering.midudev.now.sh/dynamic-rendering-component)<br />Demo that shows how Dynamic Rendering at component level works. Change your user-agent in order to get the two different rendering.

[@midudev/react-dynamic-rendering package](https://www.npmjs.com/package/@midudev/react-dynamic-rendering)<br />If your visitor is a bot, like GoogleBot or Yandex, use Server Side Rendering and Client Side Rendering. If it's a client, only use Client Side Rendering.

## About Static Content

[Static Content Demo](https://react-rendering.midudev.now.sh/static-content)<br />Demo of Static Content render strategy usage.

[suppressHydrationWarning prop documentation](https://es.reactjs.org/docs/dom-elements.html#suppresshydrationwarning)<br />Official documentation regarding the `supressHydrationWarning` prop used on Static Content strategy to remove noisy console errors when using this technique.

[@midudev/react-progressive-hydration package](https://www.npmjs.com/package/@midudev/react-progressive-hydration)<br />Server Side Rendering for a component and skip the hydration step on the client but, as soon as it appears on the viewport, hydrate it. Useful for list of items or components that are not visible on the viewport but yet you need to render them for SEO.

## About Progressive Hydration

[Progressive Hydration Demo](https://react-rendering.midudev.now.sh/static-content)<br />Demo of Progressive Hydration.

[@midudev/react-static-content package](https://www.npmjs.com/package/@midudev/react-static-content)<br />Server Side Rendering for a component and skip the hydration step on the client. Useful for components that don't need to use interactivity (like SEO links).

[react-prerendered-component](https://github.com/theKashey/react-prerendered-component)<br />Partial hydration and caching in a pre-suspense era

[react-progressive-hydration](https://github.com/GoogleChromeLabs/progressive-rendering-frameworks-samples/tree/master/react-progressive-hydration)<br />Google experiment regarding using progressive hydration on React applications.

### Implementations in other libraries

[Lazy Hydration](https://github.com/znck/lazy-hydration)<br />Lazy Hydration for Vue SSR

[vue-lazy-hydration](https://github.com/maoberlehner/vue-lazy-hydration)<br />Lazy hydration of server-side rendered Vue.js components

[Angular Progressive Loading future feature](https://speakerdeck.com/mgechev/building-fast-angular-applications-by-default?slide=78)<br />Progressive Rehydration technique on development for Angular.

## Other

[Bundlephobia](https://bundlephobia.com/result?p=@midudev/react-static-content@1.0.3)<br />Awesome tool to check the dependencies and potential bundle size of a package.