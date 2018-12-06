import React from 'react'
import Document, {Main} from 'next/document'
import CustomHead from './_customNextHead'
import flush from 'styled-jsx/server'

export default class extends Document {
  static getInitialProps({renderPage}) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    return {html, head, errorHtml, chunks, styles}
  }

  render() {
    return (
      <html lang="es">
        <CustomHead>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0"
          />
        </CustomHead>
        <body>
          <Main />
        </body>
      </html>
    )
  }
}
