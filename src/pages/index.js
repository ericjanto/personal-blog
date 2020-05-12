import React, { Component } from 'react'
import Helmet from 'react-helmet'
import GitHubButton from 'react-github-btn'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import ProjectListing from '../components/ProjectListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import projects from '../../data/projectsSelected'
import portrait from '../../content/images/portrait.png'

export default class Index extends Component {
  render() {
    const { data } = this.props

    const latestPostEdges = data.latest.edges
    // eslint-disable-next-line no-lone-blocks
    {/* const popularPostEdges = data.popular.edges */}

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Student`} />
        <SEO />
        <div className="container">
          <div className="lead">
            <div className="elevator">
              <h1>{`Hey, I'm Eric 👋`} </h1>
              <p>
                {`I'm a Computer Science & AI student, `}
                <Link to="/blog">writing</Link>{` `}
                {`about functional programming,
                Swift development and other cool stuff. I work off my creativity
                on `}
                <Link to="/projects">side-projects</Link>
                .
              </p>
              <div className="social-buttons">
                <GitHubButton
                  href="https://github.com/ericjanto"
                  data-size="large"
                  data-show-count="false"
                >
                  ericjanto
                </GitHubButton>
              </div>
            </div>
            <div className="newsletter-section">
              <img src={portrait} className="newsletter-avatar" alt="Eric" />
              <div>
                <h3>Email Newsletter</h3>
                <p>
                  Stay up to date by signing up to my newsletter.
                </p>
                <Link to="/newsletter" className="button">
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container front-page">
          <section className="section">
            <h2>
              Latest Articles
              <Link to="/blog" className="view-all">
                View all
              </Link>
            </h2>
            <PostListing simple postEdges={latestPostEdges} />
          </section>

          {/* <section className="section">
            <h2>
              Most Popular
              <Link to="/categories/popular" className="view-all">
                View all
              </Link>
            </h2>
            <PostListing simple postEdges={popularPostEdges} />
          </section> */}

          <section className="section">
            <h2>Latest Projects
              <Link to="/projects" className="view-all">
                View all
              </Link>
            </h2>
            <ProjectListing projects={projects} />
          </section>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 9
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`
