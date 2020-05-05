import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import ProjectListing from '../components/ProjectListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import projects from '../../data/projectsAll'

export default class Index extends Component {
  render() {

    return (
      <Layout>
        <Helmet title={`Projects – ${config.siteTitle}`} />
        <SEO />
        <div className="container front-page">
          <section className="section">
            <h2>My Projects</h2>
            <ProjectListing projects={projects} />
          </section>
        </div>
      </Layout>
    )
  }
}
