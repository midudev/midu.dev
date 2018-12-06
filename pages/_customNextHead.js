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

  static propTypes = {
    nonce: PropTypes.string,
    preload: PropTypes.bool
  }

  getCssLinks() {
    const {assetPrefix, files} = this.context._documentProps
    if (!files || files.length === 0) {
      return null
    }

    return files.map(file => {
      // Only render .css files here
      if (!/\.css$/.exec(file)) {
        return null
      }

      return (
        <link
          key={file}
          nonce={this.props.nonce}
          rel="stylesheet"
          href={`${assetPrefix}/_next/${file}`}
        />
      )
    })
  }

  getPreloadDynamicChunks() {
    const {dynamicImports, assetPrefix} = this.context._documentProps
    return dynamicImports.map(bundle => {
      return (
        <link
          rel="preload"
          key={bundle.file}
          href={`${assetPrefix}/_next/${bundle.file}`}
          as="script"
          nonce={this.props.nonce}
        />
      )
    })
  }

  getPreloadMainLinks() {
    const {assetPrefix, files} = this.context._documentProps
    if (!files || files.length === 0) {
      return null
    }

    return files.map(file => {
      // Only render .js files here
      if (!/\.js$/.exec(file)) {
        return null
      }

      return (
        <link
          key={file}
          nonce={this.props.nonce}
          rel="preload"
          href={`${assetPrefix}/_next/${file}`}
          as="script"
        />
      )
    })
  }

  render() {
    function getPagePathname(page) {
      if (page === '/') {
        return '/index.js'
      }

      return `${page}.js`
    }
    const {
      head,
      styles,
      assetPrefix,
      __NEXT_DATA__
    } = this.context._documentProps
    const {page, buildId} = __NEXT_DATA__
    const pagePathname = getPagePathname(page)

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
        {this.props.preload && (
          <>
            {page !== '/_error' && (
              <link
                rel="preload"
                href={`${assetPrefix}/_next/static/${buildId}/pages${pagePathname}`}
                as="script"
                nonce={this.props.nonce}
              />
            )}
            <link
              rel="preload"
              href={`${assetPrefix}/_next/static/${buildId}/pages/_app.js`}
              as="script"
              nonce={this.props.nonce}
            />
            <link
              rel="preload"
              href={`${assetPrefix}/_next/static/${buildId}/pages/_error.js`}
              as="script"
              nonce={this.props.nonce}
            />
            {this.getPreloadDynamicChunks()}
            {this.getPreloadMainLinks()}
          </>
        )}

        {this.getCssLinks()}
        {styles || null}
        {children}
      </head>
    )
  }
}

export default Head
