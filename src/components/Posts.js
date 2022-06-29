import React from 'react'
import { Link } from 'gatsby'

import { colourCoder } from '../utils/helpers'

export default function Posts({ data }) {
  return (
    <div className={'grid posts with-tags'}>
      {data.map((node) => {
        return (
          <Link to={node.slug} className="row" key={node.id}>
            <div className="cell">
              <div className={colourCoder(node.tags)}>{node.title}</div>
              <time>{node.date}</time>
            </div>
            <div className="cell tags">{node.excerpt}</div>
          </Link>
        )
      })}
    </div>
  )
}
