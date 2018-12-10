const ShareIcon = () => (
  <React.Fragment>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path d="M18.5 18h-17C.673 18 0 17.327 0 16.5v-13C0 2.673.673 2 1.5 2h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h17a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 1 1 0v7c0 .827-.673 1.5-1.5 1.5z" />
      <path d="M19.354 6.146l-4-4a.5.5 0 0 0-.707.707l3.146 3.146H11.5c-1.721 0-3.346.62-4.575 1.747C5.684 8.884 5 10.394 5 11.999v.5a.5.5 0 0 0 1 0v-.5c0-2.757 2.467-5 5.5-5h6.293l-3.146 3.146a.5.5 0 0 0 .708.707l4-4a.5.5 0 0 0 0-.707z" />
    </svg>
    <style jsx>{`
      svg {
        margin-right: 16px;
      }
    `}</style>
  </React.Fragment>
)

export default ({title}) => (
  <React.Fragment>
    <div>
      <ShareIcon />
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        className="twitter-share-button"
        data-dnt="true"
        data-related="midudev"
        data-show-count="false"
        data-size="large"
        data-text={`Me ha gustado el artículo "${title}"`}
        data-via="midudev"
      >
        Tweet
      </a>
      <script async src="https://platform.twitter.com/widgets.js" />
    </div>
    <style jsx>{`
      div {
        align-items: center;
        display: flex;
        justify-content: center;
        padding: 32px 16px;
      }
    `}</style>
  </React.Fragment>
)
