import React from 'react'
import withPosts from 'nextein/posts'

import ArticleInfo from '../components/ArticleInfo'
import Layout from '../components/Layout'

export default withPosts(({posts}) => {
  return (
    <Layout>
      {posts.map(({data, raw}, index) => (
        <a href={`${data.url}/#article`} key={`post-${index}`}>
          <h2>{data.title}</h2>
          <ArticleInfo
            date={data.date}
            category={data.topic}
            rawContent={raw}
          />
          <p>{data.description}</p>
        </a>
      ))}
      <style jsx>{`
        h2 {
          font-weight: 400;
          margin-bottom: 8px;
        }

        a {
          border-left: 1px solid #ddd;
          color: #111;
          display: block;
          line-height: 1;
          margin-bottom: 16px;
          padding: 16px;
          position: relative;
          transition: all 0.3s ease-in-out;
        }

        a:hover {
          border-left-color: #09f;
          opacity: 0.65;
        }

        p {
          color: #777;
          font-size: 14px;
          line-height: 20px;
          padding: 16px 0 0;
        }
      `}</style>
    </Layout>
  )
})
