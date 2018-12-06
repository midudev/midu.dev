import Head from 'next/head'
import Preconnect from './Head/Preconnect'
import Favicons from './Head/Favicons'

const GA_TRACKING_ID = 'UA-30525085-8'

const CodeIcon = () => (
  <React.Fragment>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path d="M5 15a.502.502 0 0 1-.354-.146l-4-4a.5.5 0 0 1 0-.707l4-4a.5.5 0 0 1 .707.707L1.707 10.5l3.646 3.646a.5.5 0 0 1-.354.853zM15 15a.5.5 0 0 1-.354-.853l3.646-3.646-3.646-3.646a.5.5 0 0 1 .707-.707l4 4a.5.5 0 0 1 0 .707l-4 4a.498.498 0 0 1-.354.146zM7.5 15a.5.5 0 0 1-.424-.765l5-8a.5.5 0 0 1 .848.53l-5 8A.5.5 0 0 1 7.5 15z" />
    </svg>
    <style jsx>{`
      svg {
        fill: #0099ff;
        margin-right: 4px;
      }
    `}</style>
  </React.Fragment>
)

const GoHomeIcon = () => (
  <React.Fragment>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path d="M19.871 12.165l-8.829-9.758A1.392 1.392 0 0 0 10 1.937c-.397 0-.767.167-1.042.47L.129 12.165a.5.5 0 0 0 .741.67l2.129-2.353V18.5c0 .827.673 1.5 1.5 1.5h11c.827 0 1.5-.673 1.5-1.5v-8.018l2.129 2.353a.499.499 0 1 0 .741-.671zM12 19H8v-4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V19zm4-.5a.5.5 0 0 1-.5.5H13v-4.5c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5V19H4.5a.5.5 0 0 1-.5-.5V9.377l5.7-6.3c.082-.091.189-.141.3-.141s.218.05.3.141l5.7 6.3V18.5z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path d="M.646 10.146l6-6a.5.5 0 0 1 .707.707L2.207 9.999H18.5a.5.5 0 0 1 0 1H2.207l5.146 5.146a.5.5 0 0 1-.708.707l-6-6a.5.5 0 0 1 0-.707z" />
    </svg>
    <style jsx>{`
      svg {
        margin-right: 4px;
      }
      svg + svg {
        margin-right: 16px;
      }
    `}</style>
  </React.Fragment>
)

const DEFAULT_DESCRIPTION =
  'Artículos sobre Frontend, Performance Web, Ingeniería del Software, Javascript, React y CSS por midudev'

const DEFAULT_IMAGE = 'https://midudev.com/static/favicon/mstile-310x150.png'

const DEFAULT_TITLE =
  'Frontend, Web Performance, Architecture, Javascript, React y CSS'

export default ({
  children,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE
}) => (
  <React.Fragment>
    <Head>
      <title>{`${title} | midudev`}</title>

      {/* Preload here */}

      <Preconnect />
      <Favicons />

      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `
        }}
      />

      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      <meta name="description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@midudev" />
      <meta name="twitter:domain" content="midudev.com" />
      <meta name="twitter:creator" content="@midudev" />
      <meta name="twitter:title" content={title} />
      <meta name="og:image" content={image} />
      <meta name="twitter:image" content={image} />
      <link rel="manifest" href="/static/manifest.json" />
    </Head>
    <main>
      <a href="/">
        <span>
          <GoHomeIcon /> midudev
        </span>
        <div>
          <CodeIcon />frontend, performance & more...
        </div>
      </a>
      {children}
    </main>
    <style jsx global>
      {`
        html {
          box-sizing: border-box;
        }
        *:after,
        *:before {
          box-sizing: inherit;
        }
        *::selection {
          background: rgba(6, 125, 247, 0.15);
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        }
        body,
        h1,
        h2,
        h3,
        p,
        ul,
        li {
          margin: 0;
          padding: 0;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        hr {
          background: #ccc;
          border: 0;
          height: 1px;
          margin-bottom: 16px;
        }

        code,
        pre {
          font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New,
            monospace;
          hyphens: none;
          line-height: 1.5;
          overflow: auto;
          tab-size: 2;
          text-align: left;
          white-space: pre;
          word-break: normal;
          word-spacing: normal;
          word-wrap: normal;
        }

        /* Code blocks */
        pre {
          background: #011627;
          border-radius: 10px;
          color: white;
          overflow: auto;
          padding: 16px;
        }

        /* Text Selection colour */
        pre::selection,
        pre ::selection,
        code::selection,
        code ::selection {
          text-shadow: none;
          background: hsla(0, 0%, 93%, 0.15);
        }

        p + pre {
          margin-top: -12px;
        }

        /* Inline code */
        :not(pre) > code {
          background: rgba(0, 153, 255, 0.2);
          border-radius: 2px;
          color: #1a1a1a;
          padding: 2px 4px 1px;
          white-space: normal;
        }

        .token.attr-name {
          color: rgb(173, 219, 103);
          font-style: italic;
        }

        .token.comment {
          color: rgb(99, 119, 119);
        }

        .token.string,
        .token.url {
          color: rgb(173, 219, 103);
        }

        .token.variable {
          color: rgb(214, 222, 235);
        }

        .token.number {
          color: rgb(247, 140, 108);
        }

        .token.builtin,
        .token.char,
        .token.constant,
        .token.function {
          color: rgb(130, 170, 255);
        }

        .token.punctuation {
          color: rgb(199, 146, 234);
        }

        .token.selector,
        .token.doctype {
          color: rgb(199, 146, 234);
          font-style: 'italic';
        }

        .token.class-name {
          color: rgb(255, 203, 139);
        }

        .token.tag,
        .token.operator,
        .token.keyword {
          color: #ffa7c4;
        }

        .token.boolean {
          color: rgb(255, 88, 116);
        }

        .token.property {
          color: rgb(128, 203, 196);
        }

        .token.namespace {
          color: rgb(178, 204, 214);
        }

        pre[data-line] {
          padding: 1em 0 1em 3em;
          position: relative;
        }

        blockquote p {
          color: #555;
          font: italic 100 24px/130% 'Georgia', serif;
          position: relative;
        }

        blockquote p:before {
          content: '❛❛';
          font-size: 96px;
          margin-left: -32px;
          left: 0;
          opacity: 0.15;
          position: absolute;
          top: 16px;
        }

        article p {
          padding: 0 16px 16px;
        }

        svg {
          vertical-align: middle;
        }

        blockquote p {
          font-size: 24px;
        }

        #article h2,
        #article h3,
        #article h4,
        #article h5 {
          color: #333;
          font-weight: 500;
          padding: 0 16px 8px;
        }

        #article h3 {
          color: #067df7;
          font-size: 16px;
          text-transform: uppercase;
        }

        p,
        li {
          color: #333;
          font-size: 16px;
          line-height: 150%;
          padding-bottom: 24px;
        }

        li {
          color: #555;
        }

        p + ul {
          padding: 0 16px 0 32px;
        }

        #article a {
          color: #09f;
          text-decoration: none;
        }

        #article a:hover {
          text-decoration: underline;
        }

        twitter-widget {
          margin: 0 auto;
        }
        .img {
          padding-bottom: 16px;
        }
        .img-left {
          float: left;
          max-width: 50%;
          padding-right: 16px;
        }
        .img-left p {
          padding: 0;
        }
        .img-left img {
          height: auto;
          width: 100%;
        }
        .img::after {
          color: #666;
          content: attr(alt);
          display: block;
          font-size: 14px;
          font-style: italic;
          text-align: center;
        }
      `}
    </style>
    <style jsx>{`
      main {
        display: block;
        margin: 0 auto;
        max-width: 760px;
        width: 100%;
      }
      a {
        color: #000;
        display: block;
        font-size: 24px;
        font-weight: 300;
        line-height: 20px;
        overflow: hidden;
        padding: 16px;
        text-decoration: none;
      }
      a:hover span {
        transform: translateX(0px);
      }
      div {
        align-items: center;
        color: #09f;
        display: flex;
        font-size: 12px;
        height: 20px;
      }
      span {
        display: block;
        transform: translateX(-65px);
        transition: all 0.3s ease-in-out;
      }
    `}</style>
  </React.Fragment>
)
