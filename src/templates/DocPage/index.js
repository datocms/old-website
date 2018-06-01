import React from 'react'
import DocAside from 'components/DocAside';

export default DocAside;

export const query = graphql`
  query DocPageQuery {
    pages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/.*docs.*/" } }
    ) {
      edges {
        node {
          path: fileAbsolutePath
          frontmatter {
            title
            copyFrom
            position
          }
        }
      }
    }
  }
`

