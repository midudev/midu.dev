const CodeIcon = () => (
  <React.Fragment>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path d="M5 15a.502.502 0 0 1-.354-.146l-4-4a.5.5 0 0 1 0-.707l4-4a.5.5 0 0 1 .707.707L1.707 10.5l3.646 3.646a.5.5 0 0 1-.354.853zM15 15a.5.5 0 0 1-.354-.853l3.646-3.646-3.646-3.646a.5.5 0 0 1 .707-.707l4 4a.5.5 0 0 1 0 .707l-4 4a.498.498 0 0 1-.354.146zM7.5 15a.5.5 0 0 1-.424-.765l5-8a.5.5 0 0 1 .848.53l-5 8A.5.5 0 0 1 7.5 15z" />
    </svg>
    <style jsx>{`
      svg {
        background: #0099ff;
        border-radius: 16px;
        display: inline-block;
        fill: #fff;
        margin-right: 8px;
        padding: 4px;
        transform: scale(1.1);
      }
    `}</style>
  </React.Fragment>
)

export default () => (
  <React.Fragment>
    <a href="/">
      <CodeIcon />
      <span>midudev</span>
    </a>
    <style jsx>{`
      a {
        color: #000;
        display: flex;
        font-size: 24px;
        font-weight: 300;
        justify-content: center;
        line-height: 28px;
        overflow: hidden;
        padding: 16px;
        transition: opacity 0.3s ease;
      }
      a:hover {
        opacity: 0.65;
      }
    `}</style>
  </React.Fragment>
)
