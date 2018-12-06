import React, {useEffect, useRef} from 'react'

const st = 'scrollTop'
const sh = 'scrollHeight'

export default React.memo(() => {
  const domEl = useRef(null)

  const handler = () => {
    const h = document.documentElement
    const b = document.body
    const scroll =
      ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
    domEl.current.style.setProperty('--scroll', scroll + '%')
  }

  useEffect(() => {
    document.addEventListener('scroll', handler)
    return () => document.removeEventListener('scroll', handler)
  })

  return (
    <React.Fragment>
      <div ref={domEl} />
      <style jsx>
        {`
          div {
            background: linear-gradient(
              to right,
              #09f var(--scroll),
              transparent 0
            );
            background-repeat: no-repeat;
            left: 0;
            position: fixed;
            width: 100%;
            height: 1px;
            top: 0;
            z-index: 1;
          }
        `}
      </style>
    </React.Fragment>
  )
})
