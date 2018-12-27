export default () => (
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
      h4,
      p,
      ul,
      li {
        margin: 0;
        padding: 0;
      }
      a {
        text-decoration: none;
      }
      img {
        width: 100%;
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
      pre {
        background: #282c34;
        color: #979db4;
        color: white;
        margin: 0 0 16px 0;
        overflow: auto;
        padding: 16px;
      }
      code {
        font-size: 14px;
      }
      pre::selection,
      code::selection {
        background: #09f;
        text-shadow: none;
        opacity: 0.3;
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
      ul {
        padding: 0 16px 0 32px;
      }
      /* Inline code */
      :not(pre) > code {
        background: #fff8c3;
        border-radius: 2px;
        color: #1a1a1a;
        padding: 2px 4px 1px;
        white-space: normal;
      }

      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: #5c6370;
      }

      .token.punctuation {
        color: #abb2bf;
      }

      .token.selector,
      .token.tag {
        color: #e06c75;
      }

      .token.property,
      .token.boolean,
      .token.number,
      .token.constant,
      .token.symbol,
      .token.attr-name,
      .token.deleted {
        color: #d19a66;
      }

      .token.string,
      .token.char,
      .token.attr-value,
      .token.builtin,
      .token.inserted {
        color: #98c379;
      }

      .token.operator,
      .token.entity,
      .token.url,
      .language-css .token.string,
      .style .token.string {
        color: #56b6c2;
      }

      .token.atrule,
      .token.keyword {
        color: #c678dd;
      }

      .token.function {
        color: #61afef;
      }

      .token.regex,
      .token.important,
      .token.variable {
        color: #c678dd;
      }

      .token.important,
      .token.bold {
        font-weight: bold;
      }

      .token.italic {
        font-style: italic;
      }

      .token.entity {
        cursor: help;
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
        color: #004572;
        font-size: 18px;
        padding: 16px;
      }

      #article h4 {
        color: #067df7;
        font-size: 16px;
        text-transform: uppercase;
      }

      #article a {
        color: #09f;
      }

      #article iframe {
        margin-bottom: 16px;
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
)
