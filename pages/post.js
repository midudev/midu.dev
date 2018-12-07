import React from 'react'
import withPost, {Content} from 'nextein/post'

import ArticleInfo from '../components/ArticleInfo'
import Layout from '../components/Layout'
import ShareArticle from '../components/ShareArticle'

const PageBreakIcon = () => (
  <React.Fragment>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path d="M17.5 9h-15C1.673 9 1 8.327 1 7.5v-6a.5.5 0 0 1 1 0v6a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 1 1 0v6c0 .827-.673 1.5-1.5 1.5zM1.5 11h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zM4.5 11h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zM7.5 11h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zM10.5 11h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zM13.5 11h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zM16.5 11h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zM19.5 11h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zM18.5 20a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 0-.5-.5h-15a.5.5 0 0 0-.5.5v6a.5.5 0 0 1-1 0v-6c0-.827.673-1.5 1.5-1.5h15c.827 0 1.5.673 1.5 1.5v6a.5.5 0 0 1-.5.5z" />
    </svg>
    <style jsx>{`
      svg {
        display: block;
        fill: #aaa;
        margin: 16px auto;
      }
    `}</style>
  </React.Fragment>
)

export default withPost(({post}) => {
  const {data, raw} = post
  return (
    <Layout {...data}>
      <article>
        <section>
          <h1>{data.title}</h1>
          <ArticleInfo data={data} rawContent={raw} />
          <strong>{data.description}</strong>
        </section>
        <div id="article">
          <PageBreakIcon />
          <Content {...post} />
        </div>
        <ShareArticle title={data.title} />
      </article>
      <style jsx>{`
        h1 {
          color: #000;
          font-weight: 400;
          font-size: 40px;
          line-height: 100%;
          padding-bottom: 16px;
        }
        strong {
          color: #555;
          display: block;
          font-size: 16px;
          margin-top: 16px;
          font-weight: 500;
          line-height: 150%;
        }
        section {
          display: block;
          padding: 16px 16px 0;
        }
      `}</style>
    </Layout>
  )
})
