import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Projects from '../components/Projects'
import SEO from '../components/SEO'
import config from '../utils/config'

import projects from '../data/projects'

export default function BlogProjects() {

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
      <Section title="Projects">
        <Projects data={projects} />
      </Section>
    </Layout>
  )
}