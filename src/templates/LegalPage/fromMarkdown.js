import { graphql } from 'gatsby';
import Component from './Component';

export default Component;

export const query = graphql`
  query LegalPageQueryFromMarkdown($sourcePath: String!) {
    page: markdownRemark(fileAbsolutePath: { eq: $sourcePath }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
