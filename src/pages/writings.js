import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Search from '../components/Search'
import SEO from '../components/SEO'

import BreadcrumbMenu from '../components/BreadcrumbMenu'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function BlogIndex({ data, pageContext, location, ...props }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  const crumbs = ['Notes', 'Writings']

  return (
    <Layout>
      <Helmet title={`Writings | ${config.siteTitle}`} />
      <SEO customDescription="Articles, tutorials, snippets, musings, and everything else." />
      <BreadcrumbMenu crumbs={crumbs} />
      <section className="leadText">
        {`I write about `}
        <Link
          to={`/tags/computer-science`}
          className="colour-category-computer-science"
        >
          computer science
        </Link>
        {`, `}
        <Link to={`/tags/life`} className="colour-category-life">
          life
        </Link>
        {`, and various `}
        <Link to={`/tags/other`} className="colour-category-other">
          other things
        </Link>
        {`.`}
      </section>
      <section>
        <Search posts={simplifiedPosts} location={location} {...props} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
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
            category
          }
        }
      }
    }
  }
`
