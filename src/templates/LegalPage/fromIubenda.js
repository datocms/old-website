import { graphql } from 'gatsby';
import Component from './Component';

export default Component;

export const query = graphql`
  query LegalPageQueryFromIubenda($id: String!) {
    page: iubendaDoc(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
