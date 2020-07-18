import React from 'react'
import { Link } from 'gatsby'

export default function Footer() {
  return (
    <footer className="footer container">
      <section className="flex">
        <nav className="footer-links">
          <Link to="/me">About</Link>
          <Link to="/cv">CV</Link>
        </nav>
        <nav className="footer-links">
          <Link to="/contact">Contact</Link>
          <Link to="/rss.xml">RSS feed</Link>
        </nav>
      </section>
    </footer>
  )
}
