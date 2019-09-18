import React from 'react';
import { graphql } from 'gatsby';
import DocAside from 'components/DocAside';

class DocPage extends React.Component {
  render() {
    return (
      <DocAside 
        {...this.props}
        pageContext={{
          ...this.props.pageContext,
          html: this.props.data.pageHtml.html,
        }}
      />
    );
  }
}

export default DocPage;

export const query = graphql`
  query DocPageQuery($htmlFileAbsolutePath: String!) {
    pageHtml: markdownRemark(fileAbsolutePath: {eq: $htmlFileAbsolutePath}) {
      html
    }
  }
`;
