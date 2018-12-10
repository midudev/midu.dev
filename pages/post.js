import React from 'react'
import withPost, {Content} from 'nextein/post'

import ArticleInfo from '../components/ArticleInfo'
import Layout from '../components/Layout'
import ShareArticle from '../components/ShareArticle'

export default withPost(({post}) => {
  const {data, raw} = post

  return (
    <Layout {...data}>
      <article>
        <section>
          <h1>{data.title}</h1>
          <ArticleInfo
            category={data.topic}
            date={data.date}
            rawContent={raw}
          />
          <strong>{data.description}</strong>
        </section>
        <div id="article">
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
        div {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px dashed #ddd;
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
