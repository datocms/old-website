import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'

import bem from 'utils/bem'

import '../style.sass'

const b = bem.lock('LandingPage')

export default class LanguagePage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        {data.language.name}
      </div>
    );
  }
}

export const query = graphql`
  query LanguagePageQuery($slug: String!) {
    language: datoCmsIntegration(slug: { eq: $slug }) {
      name
      logo { url }
      projectUrl
      documentationUrl
      slug
    }
  }
`


