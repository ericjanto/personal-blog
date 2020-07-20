import React from 'react'
import { Link } from 'gatsby'

import CV from '../../content/files/cv.pdf'

export default function Footer() {
  return (
    <footer className="footer container">
      <section className="flex">
        <nav className="footer-links">
          <Link to="/me">About</Link>
          <a href={CV} target="_blank" rel="noopener noreferrer">
            CV
          </a>
        </nav>
        <nav className="footer-links">
          <Link to="/contact">Contact</Link>
          <Link to="/rss.xml">RSS feed</Link>
        </nav>
      </section>
    </footer>
  )
}

// To rewrite cv link: add new cv (with other file name than old one) to footer,
// click on absolute link in localhost, change the static link in redirects file accordingly.
