
// show rrss in mobile view
const $rrssButton = document.getElementById('rrss-button')
const $rrssWrapper = document.getElementById('wrapper-rrss')
const $logoImg = document.getElementById('logo').querySelector('img')
const desktopBreakPoint = matchMedia("(min-width: 600px)");

function checkMedia() {
  if (desktopBreakPoint.matches) {
    $logoImg.src = '/logo.png';
    $rrssWrapper.classList.remove('floating')
    $rrssButton.classList.remove('open')
  } else {
    $logoImg.src = '/logo-mobile.png';
  }
}

$rrssButton.addEventListener('click', () => {
  $rrssButton.classList.toggle('open')
  $rrssWrapper.classList.toggle('floating')
})

desktopBreakPoint.addEventListener('change', checkMedia)

// when start page
checkMedia();





// youtube functionality
function createYoutubeFrame(id) {
  var html =
    "<div id='lightbox'><a href='#'><svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#fff' stroke-width='1' stroke-linecap='square' stroke-linejoin='arcs'><line x1='18' y1='6' x2='6' y2='18'></line><line x1='6' y1='6' x2='18' y2='18'></line></svg></a> <section> <div> <iframe src='https://www.youtube.com/embed/" +
    id +
    "?autoplay=1' width='560' height='315' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div></section></div>";
  var fragment = document.createRange().createContextualFragment(html);
  document.body.appendChild(fragment);

  document.querySelector("#lightbox a").addEventListener(
    "click",
    function(e) {
      e.preventDefault();
      var lightbox = document.getElementById("lightbox");
      lightbox.parentNode.removeChild(lightbox);
    },
    { once: true }
  );
}

document.querySelectorAll(".youtube-link").forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    var id = this.getAttribute("data-id");
    createYoutubeFrame(id);
  });
});

/**
 * A lightweight youtube embed. Still should feel the same to the user, just MUCH faster to initialize and paint.
 *
 * Thx to these as the inspiration
 *   https://storage.googleapis.com/amp-vs-non-amp/youtube-lazy.html
 *   https://autoplay-youtube-player.glitch.me/
 *
 * Once built it, I also found these:
 *   https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube (👍👍)
 *   https://github.com/Daugilas/lazyYT
 *   https://github.com/vb/lazyframe
 */
 class LiteYTEmbed extends HTMLElement {
  async connectedCallback() {
      this.videoId = this.getAttribute('videoid');

      let playBtnEl = this.querySelector('.lty-playbtn');
      // A label for the button takes priority over a [playlabel] attribute on the custom-element
      this.playLabel = (playBtnEl && playBtnEl.textContent.trim()) || this.getAttribute('playlabel') || 'Play';

      /**
       * Lo, the youtube placeholder image!  (aka the thumbnail, poster image, etc)
       *
       * See https://github.com/paulirish/lite-youtube-embed/blob/master/youtube-thumbnail-urls.md
       *
       * TODO: Do the sddefault->hqdefault fallback
       *       - When doing this, apply referrerpolicy (https://github.com/ampproject/amphtml/pull/3940)
       */
      const isWebpSupported = await LiteYTEmbed.checkWebPSupport()

      this.posterUrl = isWebpSupported
        ? `https://i.ytimg.com/vi_webp/${this.videoId}/hqdefault.webp`
        : `https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`;
  
      // Warm the connection for the poster image
      LiteYTEmbed.addPrefetch('preload', this.posterUrl, 'image');

      this.style.backgroundImage = `url("${this.posterUrl}")`;

      // Set up play button, and its visually hidden label
      if (!playBtnEl) {
          playBtnEl = document.createElement('button');
          playBtnEl.type = 'button';
          playBtnEl.classList.add('lty-playbtn');
          this.append(playBtnEl);
      }
      if (!playBtnEl.textContent) {
          const playBtnLabelEl = document.createElement('span');
          playBtnLabelEl.className = 'lyt-visually-hidden';
          playBtnLabelEl.textContent = this.playLabel;
          playBtnEl.append(playBtnLabelEl);
      }

      // On hover (or tap), warm up the TCP connections we're (likely) about to use.
      this.addEventListener('pointerover', LiteYTEmbed.warmConnections, {once: true});

      // Once the user clicks, add the real iframe and drop our play button
      // TODO: In the future we could be like amp-youtube and silently swap in the iframe during idle time
      //   We'd want to only do this for in-viewport or near-viewport ones: https://github.com/ampproject/amphtml/pull/5003
      this.addEventListener('click', e => this.addIframe());
  }

  // // TODO: Support the the user changing the [videoid] attribute
  // attributeChangedCallback() {
  // }

  /**
   * Add a <link rel={preload | preconnect} ...> to the head
   */
  static addPrefetch(kind, url, as) {
      const linkEl = document.createElement('link');
      linkEl.rel = kind;
      linkEl.href = url;
      if (as) {
          linkEl.as = as;
      }
      document.head.append(linkEl);
  }

  /**
   * Check WebP support for the user
   */
  static checkWebPSupport() {
    if (typeof LiteYTEmbed.hasWebPSupport !== 'undefined')
      return Promise.resolve(LiteYTEmbed.hasWebPSupport);

    return new Promise(resolve => {
      const resolveAndSaveValue = value => {
        LiteYTEmbed.hasWebPSupport = value;
        resolve(value);
      }

      const img = new Image();
      img.onload = () => resolveAndSaveValue(true);
      img.onerror = () => resolveAndSaveValue(false);
      img.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    })
  }

  /**
   * Begin pre-connecting to warm up the iframe load
   * Since the embed's network requests load within its iframe,
   *   preload/prefetch'ing them outside the iframe will only cause double-downloads.
   * So, the best we can do is warm up a few connections to origins that are in the critical path.
   *
   * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http://crbug.com/593267
   * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
   */
  static warmConnections() {
      if (LiteYTEmbed.preconnected) return;

      // The iframe document and most of its subresources come right off youtube.com
      LiteYTEmbed.addPrefetch('preconnect', 'https://www.youtube-nocookie.com');
      // The botguard script is fetched off from google.com
      LiteYTEmbed.addPrefetch('preconnect', 'https://www.google.com');

      // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
      LiteYTEmbed.addPrefetch('preconnect', 'https://googleads.g.doubleclick.net');
      LiteYTEmbed.addPrefetch('preconnect', 'https://static.doubleclick.net');

      LiteYTEmbed.preconnected = true;
  }

  addIframe() {
      const params = new URLSearchParams(this.getAttribute('params') || []);
      params.append('autoplay', '1');

      const iframeEl = document.createElement('iframe');
      iframeEl.width = 560;
      iframeEl.height = 315;
      // No encoding necessary as [title] is safe. https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#:~:text=Safe%20HTML%20Attributes%20include
      iframeEl.title = this.playLabel;
      iframeEl.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframeEl.allowFullscreen = true;
      // AFAIK, the encoding here isn't necessary for XSS, but we'll do it only because this is a URL
      // https://stackoverflow.com/q/64959723/89484
      iframeEl.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${params.toString()}`;
      this.append(iframeEl);

      this.classList.add('lyt-activated');

      // Set focus for a11y
      this.querySelector('iframe').focus();
  }
}
// Register custome element
customElements.define('lite-youtube', LiteYTEmbed);

// Show share only when needed
var intersectionObserverOptions = {
  rootMargin: "0px",
  threshold: 1.0
};

var $share = document.getElementById("share");

if ($share) {
  var $articlePagination = document.getElementById("article-pagination")
  var $footer = document.querySelector("footer")
  var elementToObserve = $articlePagination || $footer

  var onIntersect = function(entries) {
    const [entry] = entries;
    const hide = entry.boundingClientRect.top <= 0 || entry.isIntersecting;
    $share.classList.toggle("u-none", hide);
  };

  var observer = new IntersectionObserver(
    onIntersect,
    intersectionObserverOptions
  );

  observer.observe(elementToObserve);
}

var firstLoad = true
var ALGOLIA_APPLICATION_ID = 'QK9VV9YO5F'
var ALGOLIA_SEARCH_ONLY_API_KEY = '247bb355c786b6e9f528bc382cab3039'
var algoliaClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_ONLY_API_KEY);

var searchClient = {
  ...algoliaClient,
  search(requests) {
    if (firstLoad === true) {
      firstLoad = false
      return
    }
    return algoliaClient.search(requests)
  }
}

var search = instantsearch({
  indexName: 'prod_blog_content',
  numberLocale: 'es',
  searchClient
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Buscar...'
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: 'Sin resultados',
      item: `<a href='{{ link }}'>
        {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
        <div>
          <small>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</small>
        </div>
      </a>`,
    },
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 3
  }),
]);

search.start()

// var firstLoad = true
// var algoliaClient = algoliasearch('N06USNNE94', '8fda6182324461e914064bf7574fe362');

// var searchClient = {
//   ...algoliaClient,
//   search(requests) {
//     if (firstLoad === true) {
//       firstLoad = false
//       return
//     }
//     return algoliaClient.search(requests)
//   }
// }

// var search = instantsearch({
//   indexName: 'midudev_blog',
//   numberLocale: 'es',
//   searchClient
// });

// search.addWidgets([
//   instantsearch.widgets.configure({
//     hitsPerPage: 3
//   }),

//   instantsearch.widgets.searchBox({
//     container: '#searchbox',
//     placeholder: 'Buscar...'
//   }),

//   instantsearch.widgets.hits({
//     container: '#hits',
//     templates: {
//       item: `<a href='{{ href }}'>
//         {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
//       </a>`,
//     },
//   })
// ]);

// search.start()