import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function TagTemplate({ data }) {
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? ' post found.' : ' posts found.'

  return (
    <Layout>
      <Helmet title={`Posts tagged: other | ${config.siteTitle}`} />
      <SEO />
      <section>
        <h1>
          Tag: <u>{`other`}</u>
        </h1>
        <p class="subtitle">
          <span className="count">{totalCount}</span>
          {message}
        </p>
      </section>
      <section>
        <Posts data={simplifiedPosts} tags />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query OtherTagPage {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { nin: ["computer-science", "life"] }, template: { eq: "post" } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            tags
            excerpt
          }
        }
      }
    }
  }
`
