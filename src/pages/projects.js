import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Projects from '../components/Projects'
import SEO from '../components/SEO'
import config from '../utils/config'

import BreadcrumbMenu from '../components/BreadcrumbMenu'

import projects from '../data/projects'

export default function BlogProjects() {
  const Section = ({ title, children, ...props }) => (
    <section {...props}>{children}</section>
  )
  const crumbs = ['Notes', 'Projects']

  return (
    <Layout>
      <Helmet title={`Projects | ${config.siteTitle}`} />
      <SEO />
      <BreadcrumbMenu crumbs={crumbs} />
      <Section title="Projects">
        <Projects data={projects} />
      </Section>
    </Layout>
  )
}
