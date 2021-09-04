import React from 'react'
import { Link } from 'gatsby'
import { linkify, categoriser, catPrettyPrint } from '../utils/helpers'

const BreadcrumbMenu = ({ crumbs, page }) => {

  const crumbSeparator = " / "
  const homeCrumb = "Eric Janto"

  if (page) {
    if (page.frontmatter.template === "post") {
      const cat = categoriser(page.frontmatter.tags)
      return (
        <div className="breadCrumbs reversedLink">
          <div style={{ display: "inline" }}>
            <Link
              className={"homeBreadcrumb"}
              to="/"
            >
              {homeCrumb}
            </Link>
            {crumbSeparator}
            <Link
              to="/writings"
            >
              Writings
            </Link>
            {crumbSeparator}
            <Link
              to={"/tags/" + cat}
            >
              {catPrettyPrint(cat)}
            </Link>
            {crumbSeparator}
            {page.frontmatter.date}
          </div>
        </div>
      )
    }
    else if (page.frontmatter.template === "page") {
      if (page.frontmatter.crumbs) {
        const lCrumbs = page.frontmatter.crumbs
        const lCrumbNum = lCrumbs.length

        return (
          <div className="breadCrumbs reversedLink">
            <div style={{ display: "inline" }}>
              <Link
                className={"homeBreadcrumb"}
                to="/"
              >
                {homeCrumb}
              </Link>
              {crumbSeparator}
              {lCrumbs.map((crumb, i) => {
              if (i + 1 == lCrumbNum) {
                return (
                  <div style={{ display: "inline" }}>
                    {page.frontmatter.title}
                  </div>
                )
              } else {
                return (
                  <div style={{ display: "inline" }}>
                    <Link
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
          </div>
        )
      } else {
        return (
          <div className="breadCrumbs reversedLink">
            <div style={{ display: "inline" }}>
              <Link
                className={"homeBreadcrumb"}
                to="/"
              >
                {homeCrumb}
              </Link>
              {crumbSeparator}
              {page.frontmatter.title}
            </div>
          </div>
        )
      }
    }
  } else {
    return (
      <div className="breadCrumbs reversedLink">
        <div style={{ display: "inline" }}>
          <Link
            className={"homeBreadcrumb"}
            to="/"
          >
            {homeCrumb}
          </Link>
          {crumbSeparator}
        </div>
        {crumbs.map((crumb, i) => {
          if (i + 1 == crumbs.length) {
            return (
              <div style={{ display: "inline" }}>
                {catPrettyPrint(crumb)}
              </div>
            )
          } else {
            return (
              <div style={{ display: "inline" }}>
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
}

export default BreadcrumbMenu