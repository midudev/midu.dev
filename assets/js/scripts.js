// Minimal Analytics
(function(a, b, c) {
  var d = a.history,
    e = document,
    f = navigator || {},
    g = localStorage,
    h = encodeURIComponent,
    i = d.pushState,
    k = function() {
      return Math.random().toString(36);
    },
    l = function() {
      return g.cid || (g.cid = k()), g.cid;
    },
    m = function(r) {
      var s = [];
      for (var t in r)
        r.hasOwnProperty(t) && void 0 !== r[t] && s.push(h(t) + "=" + h(r[t]));
      return s.join("&");
    },
    n = function(r, s, t, u, v, w, x) {
      var z = "https://www.google-analytics.com/collect",
        A = m({
          v: "1",
          ds: "web",
          aip: c.anonymizeIp ? 1 : void 0,
          tid: b,
          cid: l(),
          t: r || "pageview",
          sd:
            c.colorDepth && screen.colorDepth
              ? screen.colorDepth + "-bits"
              : void 0,
          dr: e.referrer || void 0,
          dt: e.title,
          dl: e.location.origin + e.location.pathname + e.location.search,
          ul: c.language ? (f.language || "").toLowerCase() : void 0,
          de: c.characterSet ? e.characterSet : void 0,
          sr: c.screenSize
            ? (a.screen || {}).width + "x" + (a.screen || {}).height
            : void 0,
          vp:
            c.screenSize && a.visualViewport
              ? (a.visualViewport || {}).width +
                "x" +
                (a.visualViewport || {}).height
              : void 0,
          ec: s || void 0,
          ea: t || void 0,
          el: u || void 0,
          ev: v || void 0,
          exd: w || void 0,
          exf: "undefined" != typeof x && !1 == !!x ? 0 : void 0
        });
      if (f.sendBeacon) f.sendBeacon(z, A);
      else {
        var y = new XMLHttpRequest();
        y.open("POST", z, !0), y.send(A);
      }
    };
  (d.pushState = function(r) {
    return (
      "function" == typeof d.onpushstate && d.onpushstate({ state: r }),
      setTimeout(n, c.delay || 10),
      i.apply(d, arguments)
    );
  }),
    n(),
    (a.ma = {
      trackEvent: function o(r, s, t, u) {
        return n("event", r, s, t, u);
      },
      trackException: function q(r, s) {
        return n("exception", null, null, null, null, r, s);
      }
    });
})(window, "UA-30525085-8", {
  anonymizeIp: true,
  colorDepth: true,
  characterSet: true,
  screenSize: true,
  language: true
});

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

// lit youtube
class LiteYTEmbed extends HTMLElement {
  constructor() {
    super();

    this.videoId = encodeURIComponent(this.getAttribute("videoid"));
    this.posterUrl = `https://i.ytimg.com/vi/${this.videoId}/maxresdefault.jpg`;
    // Warm the connection for the poster image
    LiteYTEmbed.addPrefetch("preload", this.posterUrl, "image");
    // TODO: support dynamically setting the attribute via attributeChangedCallback
  }

  connectedCallback() {
    this.style.backgroundImage = `url("${this.posterUrl}")`;

    const playBtn = document.createElement("div");
    playBtn.classList.add("lty-playbtn");
    this.append(playBtn);

    // On hover (or tap), warm up the TCP connections we're (likely) about to use.
    this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
      once: true
    });

    // Once the user clicks, add the real iframe and drop our play button
    // TODO: In the future we could be like amp-youtube and silently swap in the iframe during idle time
    //   We'd want to only do this for in-viewport or near-viewport ones: https://github.com/ampproject/amphtml/pull/5003
    this.addEventListener("click", e => this.addIframe());
  }

  // // TODO: Support the the user changing the [videoid] attribute
  // attributeChangedCallback() {
  // }

  /**
   * Add a <link rel={preload | preconnect} ...> to the head
   */
  static addPrefetch(kind, url, as) {
    const linkElem = document.createElement("link");
    linkElem.rel = kind;
    linkElem.href = url;
    if (as) {
      linkElem.as = as;
    }
    linkElem.crossorigin = true;
    document.head.append(linkElem);
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
    LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com");
    // The botguard script is fetched off from google.com
    LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");

    // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
    LiteYTEmbed.addPrefetch(
      "preconnect",
      "https://googleads.g.doubleclick.net"
    );
    LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");

    LiteYTEmbed.preconnected = true;
  }

  addIframe() {
    const iframeHTML = `
<iframe width="560" height="315" frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
  src="https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1"
></iframe>`;
    this.insertAdjacentHTML("beforeend", iframeHTML);
    this.classList.add("lyt-activated");
  }
}
// Register custome element
customElements.define("lite-youtube", LiteYTEmbed);

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
