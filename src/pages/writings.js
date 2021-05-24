import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Search from '../components/Search'
import SEO from '../components/SEO'

import { useBreadcrumb } from 'gatsby-plugin-breadcrumb'
import CustomBreadcrumb from '../components/CustomBreadcrumb'
  
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function BlogIndex({ data, pageContext, location, ...props }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const { crumbs } = useBreadcrumb({
    location,
    crumbLabel: 'Writings',
  })

  return (
    <Layout>
      <Helmet title={`Writings | ${config.siteTitle}`} />
      <SEO customDescription="Articles, tutorials, snippets, musings, and everything else." />
      <CustomBreadcrumb crumbs={crumbs} />
      <section>
        <Search posts={simplifiedPosts} location={location} { ...props} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" }, categories: {ne: "Books"} } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
