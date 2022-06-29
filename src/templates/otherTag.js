import React, { useMemo } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Search from '../components/Search'
import SEO from '../components/SEO'
import BreadcrumbMenu from '../components/BreadcrumbMenu'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import Posts from '../components/Posts'

export default function TagTemplate({ data }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const crumbs = ['Notes', 'Writings', 'Other']

  return (
    <Layout>
      <Helmet title={`Posts tagged: other | ${config.siteTitle}`} />
      <SEO />
      <BreadcrumbMenu crumbs={crumbs} />
      <section>
        <Posts data={simplifiedPosts} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query OtherTagPage {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          tags: { nin: ["computer-science", "life"] }
          template: { eq: "post" }
        }
      }
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
