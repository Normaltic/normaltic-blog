import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from '../components/postcard';

const IndexPage = () => {

  const data = useStaticQuery(LatestPostListQuery);

  return (
    <Layout>
      <SEO title='' />
      {data.allMarkdownRemark.edges.map( ({node: { id, excerpt, frontmatter: { title, date, url } }}) => (
        <PostCard
          key={id}
          url={url || title.replace(/\s/gi, '-')}
          title={title}
          date={date}
          excerpt={excerpt}
        />
      ))}
    </Layout>
  )
}

const LatestPostListQuery = graphql`
  query LatestPostListQuery {
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          excerpt(truncate: true, pruneLength: 200)
          frontmatter {
            title,
            date(formatString: "YYYY.MM.DD"),
            url,
          }
          id
        }
      }
    }
  }
`

export default IndexPage
