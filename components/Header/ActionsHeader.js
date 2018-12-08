// import GitHubIcon from '../Icons/GitHub'
import TwitterIcon from '../Icons/Twitter'
import YouTubeIcon from '../Icons/YouTube'

export default () => (
  <React.Fragment>
    <a
      href="https://twitter.com/intent/follow?original_referer=http%3A%2F%2Fmidudev.com&amp;ref_src=twsrc%5Etfw&amp;screen_name=midudev&amp;tw_p=followbutton"
      target="_blank"
      rel="noopener nofollow"
    >
      <TwitterIcon />
    </a>
    <a
      href="https://www.youtube.com/channel/UC8LeXCWOalN8SxlrPcG-PaQ"
      target="_blank"
      rel="noopener nofollow"
    >
      <YouTubeIcon />
    </a>
    <style jsx>{`
      a {
        margin-left: 8px;
        transition: opacity 0.3s ease-in-out;
      }
      a:hover {
        opacity: 0.5;
      }
    `}</style>
  </React.Fragment>
)
