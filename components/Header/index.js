import LogoHeader from './LogoHeader'
import ActionsHeader from './ActionsHeader'

export default () => (
  <React.Fragment>
    <header>
      <div>
        <LogoHeader />
      </div>
      <div>
        <ActionsHeader />
      </div>
    </header>
    <style jsx>{`
      header {
        display: flex;
        justify-content: space-between;
      }
      header div:nth-child(2) {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-right: 16px;
      }
    `}</style>
  </React.Fragment>
)
