import React from 'react'
import { Link } from 'gatsby'

export default function Footer() {
  return (
    <footer className="footer container">
      <section className="flex">
        <nav className="footer-links">
          <Link to="/rss.xml">Contact</Link>
          <Link to="/rss.xml">RSS</Link>
          <Link to="/me">About</Link>
          <a
            href="https://taniarascia.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
        </nav>
      </section>
    </footer>
  )
}
