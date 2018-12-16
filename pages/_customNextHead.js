/*
*  This Next.js custom Head component adds a flag to enable/disable the
*  insertion of link preload for the JS files.
*
*  Basically it's a copy/paste from "next.js/packages/next/pages/_document.js"
*  (source: https://github.com/zeit/next.js) in which I've extracted the Head component.
*  
*  Tries to solve https://github.com/zeit/next.js/issues/4634
*
*  Next.js version 7.0.2
*/

import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Head extends Component {
  static contextTypes = {
    _documentProps: PropTypes.any
  }

  render() {
    const {head, styles} = this.context._documentProps

    let children = this.props.children
    // show a warning if Head contains <title> (only in development)
    if (process.env.NODE_ENV !== 'production') {
      children = React.Children.map(children, child => {
        if (child && child.type === 'title') {
          console.warn(
            "Warning: <title> should not be used in _document.js's <Head>. https://err.sh/next.js/no-document-title"
          )
        }
        return child
      })
    }

    return (
      <head {...this.props}>
        {head}
        {styles || null}
        {children}
      </head>
    )
  }
}

export default Head
