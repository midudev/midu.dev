import Calendar from './Icons/Calendar'
import IconsCategories from './Icons/Categories'
import Timer from './Icons/Timer'

import readTime from 'read-time'

function getReadTime({rawContent}) {
  const {m} = readTime(rawContent)
  return `${m}min.`
}

export default ({category, rawContent = ''}) => (
  <React.Fragment>
    <section>
      {category && (
        <span>
          <IconsCategories category={category} />
        </span>
      )}
      <span>
        <Timer />
        <em>{getReadTime({rawContent})}</em>
      </span>
      <span>
        <Calendar />
        <time>
          <em>Hoy</em>
        </time>
      </span>
    </section>
    <style jsx>{`
      section {
        align-items: center;
        display: flex;
        opacity: 0.75;
      }
      section span:last-child {
        padding-right: 0;
      }
      em {
        margin-left: 4px;
      }
      time {
        padding-left: 4px;
      }
      span {
        align-items: center;
        display: flex;
        font-size: 12px;
        padding-right: 32px;
      }
    `}</style>
  </React.Fragment>
)
