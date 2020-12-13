// import React, { useMemo } from 'react'
// import { graphql, Link } from 'gatsby'
// import Helmet from 'react-helmet'

// import Layout from '../components/Layout'
// import Books from '../components/Books'
// import SEO from '../components/SEO'

// import { getSimplifiedPosts } from '../utils/helpers'
// import config from '../utils/config'

// export default function BlogIndex({ data }) {
//   const posts = data.allMarkdownRemark.edges
//   const simplifiedPosts = useMemo(
//     () => getSimplifiedPosts(posts, { thumbnails: true }),
//     [posts]
//   )

//   return (
//     <Layout>
//       <Helmet title={`Book Notes | ${config.siteTitle}`} />
//       <SEO />
//       <section>
//         <h1>Book Notes</h1>
//         <p className="subtitle">Notes, Summaries, and Thoughts</p>
//         <p className="medium">
//           Below you can find my book notes. I always try to follow{` `}
//           <a href="https://www.nateliason.com/" target="_blank">Nat Eliason</a>'s approach:
//         </p>
//         <p className="medium">
//           <blockquote className="quotation">
//             <p>
//               "The notes and summaries are meant to be concise, reminding me of
//               high-level concepts and not trying to recreate the whole book. You
//               can use them to remind yourself of something you read or to decide
//               on something new to read."
//             </p>
//             <p>
//               <cite>
//                 – <a href="https://www.nateliason.com/" target="_blank">Nat Eliason</a><em></em>
//               </cite>
//             </p>
//           </blockquote>
//         <p>
//         Here are a few basic rules if you want to get into the habit of reading yourself:
//           <ul>
//             <li>Read every day at least 30min.</li>
//             <li>Let reading be the first or last thing you do in a day.</li>
//             <li>Follow a{` `}<Link to="/reading-list">reading list</Link>.</li>
//           </ul>
//         </p>
//           <br />
//           <br />
//         </p>
//         <Books data={simplifiedPosts} />
//       </section>
//     </Layout>
//   )
// }

// export const pageQuery = graphql`
//   query BooksQuery {
//     allMarkdownRemark(
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: { frontmatter: { categories: { in: "Books" } } }
//     ) {
//       edges {
//         node {
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             author
//             date(formatString: "MMMM DD, YYYY")
//             thumbnail {
//               childImageSharp {
//                 fixed(width: 125, height: 190) {
//                   ...GatsbyImageSharpFixed
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
