import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import BreadcrumbMenu from '../components/BreadcrumbMenu'

import config from '../utils/config'

export default function PageTemplate({ data }) {
  const post = data.markdownRemark

  // Maybe resolve the "would need custom page for each page" problem
  // by passing something to page metadata and accessing it?
  const crumbs = [""]

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO />
      <BreadcrumbMenu crumbs={crumbs} />
      <article>
        <section className="medium">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
