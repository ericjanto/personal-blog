import React, { Component } from 'react'
import Helmet from 'react-helmet'
import SEO from '../components/SEO'
import config from '../utils/config'

export default class Index extends Component {
  render() {

    return (
      <Layout>
        <Helmet title={`Projects – ${config.siteTitle}`} />
        <SEO />
        <div className="container">
          <Section title="Projects">
            <h2>My Projects</h2>
            <Projects data={projects} />
          </Section>
        </div>
      </Layout>
    )
  }
}