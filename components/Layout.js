import Head from 'next/head'

import Favicons from './Head/Favicons'
import GlobalStyles from './GlobalStyles'
import Header from './Header/'
import Preconnect from './Head/Preconnect'
import RegisterServiceWorker from './RegisterServiceWorker'

const GA_TRACKING_ID = 'UA-30525085-8'

const getCanonical = ({base = 'https://midudev.com', url = ''}) => {
  const isFirstCharPath = url[0] === '/'
  const normalizedUrl = isFirstCharPath ? url.substr(1) : url
  return normalizedUrl !== '' ? `${base}/${normalizedUrl}/` : base
}

const DEFAULT_DESCRIPTION =
  'Artículos sobre Frontend, Performance Web, Ingeniería del Software, Javascript, React y CSS por midudev'

const DEFAULT_IMAGE = 'https://midudev.com/static/favicon/mstile-310x150.png'

const DEFAULT_TITLE =
  'Frontend, Web Performance, Architecture, Javascript, React y CSS'

export default ({
  children,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url = '',
  image = DEFAULT_IMAGE
}) => (
  <React.Fragment>
    <GlobalStyles />
    <Head>
      <title>{`${title} | midudev`}</title>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(a,b,c){var d=a.history,e=document,f=navigator||{},g=localStorage,
          h=encodeURIComponent,i=d.pushState,k=function(){return Math.random().toString(36)},
          l=function(){return g.cid||(g.cid=k()),g.cid},m=function(r){var s=[];for(var t in r)
          r.hasOwnProperty(t)&&void 0!==r[t]&&s.push(h(t)+"="+h(r[t]));return s.join("&")},
          n=function(r,s,t,u,v,w,x){var z="https://www.google-analytics.com/collect",
          A=m({v:"1",ds:"web",aip:c.anonymizeIp?1:void 0,tid:b,cid:l(),t:r||"pageview",
          sd:c.colorDepth&&screen.colorDepth?screen.colorDepth+"-bits":void 0,dr:e.referrer||
          void 0,dt:e.title,dl:e.location.origin+e.location.pathname+e.location.search,ul:c.language?
          (f.language||"").toLowerCase():void 0,de:c.characterSet?e.characterSet:void 0,
          sr:c.screenSize?(a.screen||{}).width+"x"+(a.screen||{}).height:void 0,vp:c.screenSize&&
          a.visualViewport?(a.visualViewport||{}).width+"x"+(a.visualViewport||{}).height:void 0,
          ec:s||void 0,ea:t||void 0,el:u||void 0,ev:v||void 0,exd:w||void 0,exf:"undefined"!=typeof x&&
          !1==!!x?0:void 0});if(f.sendBeacon)f.sendBeacon(z,A);else{var y=new XMLHttpRequest;
          y.open("POST",z,!0),y.send(A)}};d.pushState=function(r){return"function"==typeof d.onpushstate&&
          d.onpushstate({state:r}),setTimeout(n,c.delay||10),i.apply(d,arguments)},n(),
          a.ma={trackEvent:function o(r,s,t,u){return n("event",r,s,t,u)},
          trackException:function q(r,s){return n("exception",null,null,null,null,r,s)}}})
          (window,"${GA_TRACKING_ID}",{anonymizeIp:true,colorDepth:true,characterSet:true,screenSize:true,language:true});`
        }}
      />

      <RegisterServiceWorker />

      <Preconnect />
      <Favicons />

      <meta name="description" content={description} />
      <link rel="canonical" href={getCanonical({url})} />

      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={getCanonical({url})} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@midudev" />
      <meta name="twitter:domain" content="midudev.com" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@midudev" />

      <link rel="manifest" href="/static/manifest.json" />
    </Head>
    <main>
      <Header />

      {children}
    </main>

    <style jsx>{`
      main {
        display: block;
        margin: 0 auto;
        max-width: 760px;
        width: 100%;
      }
    `}</style>
  </React.Fragment>
)
