import React, { Component } from 'react'
import { Link } from 'gatsby'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <div>
          <Link to="/contact">Contact</Link>
          <a href="https://www.ericjanto.com/rss.xml" target="_blank" rel="noopener noreferrer">
            RSS
          </a>
        </div>
        <div>
          inspired by&nbsp;
          <a className="in-text" href="https://www.notion.so/customers/personal-websites" title="About Notion" target="_blank" rel="noopener noreferrer">Notion</a>
          , built with&nbsp;
          <a className="in-text" href="https://reactjs.org/" title="Built with React" target="_blank" rel="noopener noreferrer">React</a>
        </div>
      </footer>
    )
  }
}
