import React from "react"
import { Link } from "gatsby"

const CustomBreadcrumb = ({ crumbs }) => {
  const crumbNum = crumbs.length
  const crumbSeparator = " / "

  return (
    <div>
      {crumbs.map((crumb, i) => {
        if (i + 1 == crumbNum) {
          return (
            <div style={{ display: "inline" }}>
                {crumb.crumbLabel}
            </div>
          )
        } else {
          return (
            <div style={{ display: "inline" }}>
              <Link
                to={crumb.pathname}
                style={{ ...crumb.crumbStyle }}
                activeStyle={{ ...crumb.crumbActiveStyle }}
              >
                {crumb.crumbLabel}
              </Link>
              {crumbSeparator}
            </div>
          )
        }
      })}
    </div>
  )
}

export default CustomBreadcrumb