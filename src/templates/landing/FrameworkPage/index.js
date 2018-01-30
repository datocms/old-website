import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'

import bem from 'utils/bem'

import '../style.sass'

const b = bem.lock('LandingPage')

export default class FrameworkPage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        {data.framework.name}
      </div>
    );
  }
}

export const query = graphql`
  query FrameworkPageQuery($slug: String!) {
    framework: datoCmsIntegration(slug: { eq: $slug }) {
      name
      logo { url }
      projectUrl
      documentationUrl
      slug
    }
  }
`

