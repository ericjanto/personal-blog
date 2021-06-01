import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Suggested from '../components/Suggested'
import SEO from '../components/SEO'
import { slugify } from '../utils/helpers'

import { useBreadcrumb } from 'gatsby-plugin-breadcrumb'
import CustomBreadcrumb from '../components/CustomBreadcrumb'

import config from '../utils/config'

require(`katex/dist/katex.min.css`)

export default function PostTemplate({ data, pageContext, ...props }) {
  const post = data.markdownRemark
  const { previous, next } = pageContext
  const { thumbnail } = post.frontmatter
  const { crumbs } = useBreadcrumb({
    location,
    crumbLabel: post.frontmatter.title,
  })

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />
      <CustomBreadcrumb crumbs={crumbs} />
      <section className="grid post">
        <article>
          <header className="article-header medium">
            {thumbnail && (
              <Img
                fixed={thumbnail.childImageSharp.fixed}
                className={
                  post.frontmatter.category
                    ? `guide-thumbnail`
                    : `post-thumbnail`
                }
              />
            )}
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        category
        thumbnail {
          childImageSharp {
            fixed(width: 75, height: 75) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
