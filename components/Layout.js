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
          __html: `
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', '${GA_TRACKING_ID}', 'auto');
            ga('send', 'pageview');
        `
        }}
      />
      <script async src={`https://www.google-analytics.com/analytics.js`} />

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
