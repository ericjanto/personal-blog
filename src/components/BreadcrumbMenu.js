import React from 'react'
import { Link } from 'gatsby'
import { linkify, slugify } from '../utils/helpers'

const BreadcrumbMenu = ({ crumbs }) => {
  const crumbNum = crumbs.length
  const crumbSeparator = " / "
  const homeCrumb = "Eric Janto"

  return (
    <div className="breadCrumbs reversedLink">
      <div style={{ display: "inline"}}>
         <Link
          className={"homeBreadcrumb"}
          to="/"
         >
          {homeCrumb}
         </Link>
         {crumbSeparator}
      </div>
      {crumbs.map((crumb, i) => {
        if (i + 1 == crumbNum) {
          return (
            <div style={{ display: "inline"}}>
              {crumb}
            </div>
          )
        } else {
          return (
            <div style={{ display: "inline"}}>
              <Link
                className="reversedLink"
                to={"/" + linkify({ crumb })}
              >
                {crumb}
              </Link>
              {crumbSeparator}
            </div>
          )
        }
      })}
    </div>
  )
}

export default BreadcrumbMenu