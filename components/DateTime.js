function formatDate(date) {
  const d = new Date(date)
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
}

export default ({date}) => (
  <React.Fragment>
    <time>
      <em>{formatDate(date)}</em>
    </time>
    <style jsx>{`
      em {
        margin-left: 4px;
      }
      time {
        padding-left: 4px;
      }
    `}</style>
  </React.Fragment>
)
