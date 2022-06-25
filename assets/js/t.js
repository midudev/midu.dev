/* eslint-disable */
window.fathom = function() {
    var fathomScript = document.currentScript || document.querySelector('script[src*="script.js"][site]') || document.querySelector("script[data-site]") || document.querySelector("script[site]"),
      attr = attribute => fathomScript.getAttribute(attribute)
      , siteId = attr("data-site") || attr("site")
      , honorDNT = !1
      , auto = !0
      , canonical = !0
      , excludedDomains = []
      , allowedDomains = [];
    "true" == (attr("data-honor-dnt") || attr("honor-dnt")) && (honorDNT = "doNotTrack"in navigator && "1" === navigator.doNotTrack),
    "false" == (attr("data-auto") || attr("auto")) && (auto = !1),
    "false" == (attr("data-canonical") || attr("canonical")) && (canonical = !1),
    (attr("data-excluded-domains") || attr("excluded-domains")) && (excludedDomains = (attr("data-excluded-domains") || attr("excluded-domains")).split(",")),
    attr("data-included-domains") || attr("included-domains") ? allowedDomains = (attr("data-included-domains") || attr("included-domains")).split(",") : (attr("data-allowed-domains") || attr("allowed-domains")) && (allowedDomains = (attr("data-allowed-domains") || attr("allowed-domains")).split(","));
    function trackPageview() {
        window.fathom.trackPageview()
    }
    function spaHistory() {
        var pushState;
        void 0 !== history && (pushState = history.pushState,
        history.pushState = function() {
            var ret = pushState.apply(history, arguments);
            return window.dispatchEvent(new Event("pushstate")),
            window.dispatchEvent(new Event("locationchangefathom")),
            ret
        }
        ,
        window.addEventListener("popstate", function() {
            window.dispatchEvent(new Event("locationchangefathom"))
        }),
        window.addEventListener("locationchangefathom", trackPageview))
    }
    function spaHash() {
        window.addEventListener("hashchange", trackPageview)
    }
    if (attr("data-spa") || attr("spa"))
        switch (attr("data-spa") || attr("spa")) {
        case "history":
            spaHistory();
            break;
        case "hash":
            spaHash();
            break;
        case "auto":
            (void 0 !== history ? spaHistory : spaHash)()
        }
    var scriptUrl, trackerUrl = "https://img3.usefathom.com/";
    function encodeParameters(params) {
        return params.cid = Math.floor(1e8 * Math.random()) + 1,
        "?" + Object.keys(params).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
        }).join("&")
    }
    function qs() {
        for (var pair, data = {}, pairs = window.location.search.substring(window.location.search.indexOf("?") + 1).split("&"), i = 0; i < pairs.length; i++)
            pairs[i] && (pair = pairs[i].split("="),
            -1 < ["keyword", "q", "ref", "s", "utm_campaign", "utm_content", "utm_medium", "utm_source", "utm_term", "action", "name", "pagename", "tab"].indexOf(decodeURIComponent(pair[0])) && (data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])));
        return data
    }
    function trackingEnabled() {
        var fathomIsBlocked = !1;
        try {
            fathomIsBlocked = window.localStorage && window.localStorage.getItem("blockFathomTracking")
        } catch (err) {}
        var prerender = "visibilityState"in document && "prerender" === document.visibilityState
          , clientSideBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent)
          , isExcludedDomain = -1 < excludedDomains.indexOf(window.location.hostname)
          , isAllowedDomain = !(0 < allowedDomains.length) || -1 < allowedDomains.indexOf(window.location.hostname);
        return !(fathomIsBlocked || prerender || clientSideBot || honorDNT || isExcludedDomain) && isAllowedDomain
    }
    function getLocation(params) {
        var a, location = window.location;
        return void 0 === params.url ? canonical && document.querySelector('link[rel="canonical"][href]') && ((a = document.createElement("a")).href = document.querySelector('link[rel="canonical"][href]').href,
        location = a) : (location = document.createElement("a")).href = params.url,
        location
    }
    return fathomScript.src.indexOf("midu.dev") < 0 && ((scriptUrl = document.createElement("a")).href = fathomScript.src,
    trackerUrl = "https://waterboa.midu.dev/"),
    auto && setTimeout(function() {
        window.fathom.trackPageview()
    }),
    {
        send: function(params) {
            var img;
            trackingEnabled() && ((img = document.createElement("img")).setAttribute("alt", ""),
            img.setAttribute("aria-hidden", "true"),
            img.style.position = "absolute",
            img.src = trackerUrl + encodeParameters(params),
            img.addEventListener("load", function() {
                img.parentNode.removeChild(img)
            }),
            img.addEventListener("error", function() {
                img.parentNode.removeChild(img)
            }),
            document.body.appendChild(img))
        },
        beacon: function(params) {
            trackingEnabled() && navigator.sendBeacon(trackerUrl + encodeParameters(params))
        },
        trackPageview: function(params) {
            var hostname, pathnameToSend, location = getLocation(params = void 0 === params ? {} : params);
            "" !== location.host && (hostname = location.protocol + "//" + location.hostname,
            pathnameToSend = location.pathname || "/",
            "hash" == attr("data-spa") && (pathnameToSend += location.hash),
            this.send({
                p: pathnameToSend,
                h: hostname,
                r: params.referrer || (document.referrer.indexOf(hostname) < 0 ? document.referrer : ""),
                sid: siteId,
                qs: JSON.stringify(qs())
            }))
        },
        trackGoal: function(code, cents) {
            var location = getLocation({})
              , hostname = location.protocol + "//" + location.hostname;
            this.beacon({
                gcode: code,
                gval: cents,
                qs: JSON.stringify(qs()),
                p: location.pathname || "/",
                h: hostname,
                r: document.referrer.indexOf(hostname) < 0 ? document.referrer : "",
                sid: siteId
            })
        },
        trackEvent: function(name, payload={}) {
            var location = getLocation({})
              , hostname = location.protocol + "//" + location.hostname;
            this.beacon({
                name: name,
                payload: JSON.stringify(payload),
                p: location.pathname || "/",
                h: hostname,
                r: document.referrer.indexOf(hostname) < 0 ? document.referrer : "",
                sid: siteId,
                qs: JSON.stringify(qs())
            })
        },
        blockTrackingForMe: function() {
            window.localStorage ? (window.localStorage.setItem("blockFathomTracking", !0),
            alert("You have blocked Fathom for yourself on this website")) : alert("Your browser doesn't support localStorage.")
        },
        enableTrackingForMe: function() {
            window.localStorage && (window.localStorage.removeItem("blockFathomTracking"),
            alert("Fathom has been enabled for your device"))
        }
    }
}();
