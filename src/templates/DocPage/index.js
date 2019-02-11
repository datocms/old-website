import React from 'react'
import Layout from 'components/Layout'
import DocAside from 'components/DocAside';
import { graphql } from 'gatsby'

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

