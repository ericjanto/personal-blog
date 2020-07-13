import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import Projects from '../components/Projects'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import projects from '../data/projects'

export default function BlogIndex({ data, ...props }) {
  const latest = data.latest.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])

  const Section = ({ title, children, ...props }) => (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  )

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <section className="lead">
        <div>
          <h1>
            Hi!
          </h1>
          <p>
            This is my personal notepad. I <Link to="/blog">write</Link> about functional programming,
            data structures and other cool stuff. I work off my creativity on
            <Link to="/guides"> side-projects</Link>.
          </p>
        </div>
      </section>
      <Section title="Latest">
        <Posts data={simplifiedLatest} tags />
      </Section>
      <Section title="Projects">
        <Projects data={projects} />
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
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
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
