import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'

import bem from 'utils/bem'

import '../style.sass'

const b = bem.lock('LandingPage')

export default class SsgCdnGitPage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        {data.ssg.name}
        {data.cdn.name}
        {data.git.name}
      </div>
    );
  }
}

export const query = graphql`
  query SsgCdnGitPageQuery($ssgSlug: String!, $cdnSlug: String!, $gitSlug: String!) {
    ssg: datoCmsIntegration(slug: { eq: $ssgSlug }) {
      name
      logo { url }
      projectUrl
      documentationUrl
      slug
    }
    cdn: datoCmsIntegration(slug: { eq: $cdnSlug }) {
      name
      logo { url }
      projectUrl
      documentationUrl
      slug
    }
    git: datoCmsIntegration(slug: { eq: $gitSlug }) {
      name
      logo { url }
      projectUrl
      documentationUrl
      slug
    }
  }
`
