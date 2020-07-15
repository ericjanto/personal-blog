import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

export default function Books({ data }) {
  return (
    <div className="grid guide">
      {data.map((guide) => {
        return (
          <Link to={guide.slug} key={guide.id}>
            <Img fixed={guide.thumbnail} />
            <h2>{guide.title}</h2>
            <p>{guide.author}</p>
          </Link>
        )
      })}
    </div>
  )
}
