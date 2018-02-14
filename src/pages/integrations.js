import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import groupBy from 'group-by';
import cartesianProduct from 'cartesian-product';

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import './integrations.sass'

const b = bem.lock('IntegrationsPage')

class IntegrationsPage extends React.Component {
  render() {
    const { data } = this.props;

    const integrations = data.integrations.edges
      .map(edge => edge.node)
      .map(integration => ({
        slug: integration.slug,
        type: integration.type.slug,
        name: integration.name
      }));

    const byType = groupBy(integrations, 'type');

    return (
      <Space both="10">
        <Wrap>
          <div className={b()}>
            <div className={b('title')}>
              Integrations
            </div>
            <div className={b('content')}>
              {
                byType['static-generator'].map(({ slug, name }, i) => (
                  <Link className={b('link')} key={i} to={`/cms/${slug}/`}>
                    {name}
                  </Link>
                ))
              }

              {
                byType['language'].map(({ slug, name }, i) => (
                  <Link className={b('link')} key={i} to={`/cms/${slug}/`}>
                    {name}
                  </Link>
                ))
              }

              {
                byType['framework'].map(({ slug, name }, i) => (
                  <Link className={b('link')} key={i} to={`/cms/${slug}/`}>
                    {name}
                  </Link>
                ))
              }

              {
                cartesianProduct([
                  byType['static-generator'],
                  byType['cdn'].concat(byType['git']).concat(byType['ci'])
                ]).map(([{ slug: ssgSlug, name: ssgName }, { slug: cdnSlug, name: cdnName }], i) => (
                  <Link className={b('link')} key={i} to={`/cms/${ssgSlug}/${cdnSlug}/`}>
                    {ssgName} + {cdnName}
                  </Link>
                ))
              }
            </div>
          </div>
        </Wrap>
      </Space>
    );
  }
}

export default IntegrationsPage

export const query = graphql`
query IntegrationsQuery {
  integrations: allDatoCmsIntegration {
    edges {
      node {
        slug
        name
        type: integrationType {
          slug
        }
      }
    }
  }
}
`

