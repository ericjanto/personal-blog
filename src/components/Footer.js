import React, { Component } from 'react'
import { Link } from 'gatsby'
import react from '../../content/images/react.png'
import gatsby from '../../content/images/gatsby.png'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <div>
          <Link to="/newsletter#contact--more">Contact</Link>
          <a href="https://www.ericjanto.com/rss.xml" target="_blank" rel="noopener noreferrer">
            RSS
          </a>
        </div>
        <div>
          A&nbsp;
          <a className="in-text" href="https://www.notion.so/customers/personal-websites" title="About Notion" target="_blank" rel="noopener noreferrer">Notion</a>
          &nbsp;inpired blog,&nbsp;
          <a className="in-text" href="https://github.com/ericjanto/personal-blog" title="Open-source on GitHub" target="_blank" rel="noopener noreferrer">built</a>
          &nbsp;with&nbsp;
          <a className="in-text" href="https://reactjs.org/" title="Built with React" target="_blank" rel="noopener noreferrer">
            <img
              src={react}
              className="footer-img"
              alt="React"
            />
          </a>
          &nbsp;and&nbsp;&nbsp;
          <a href="https://www.gatsbyjs.org/" title="Built with Gatsby" target="_blank" rel="noopener noreferrer">
            <img
              src={gatsby}
              className="footer-img"
              alt="Gatsby"
            />
          </a>
        </div>
      </footer>
    )
  }
}
