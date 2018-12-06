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
      p,
      ul,
      li {
        margin: 0;
        padding: 0;
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

      ul {
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
)
