import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Wrap, button, Space, text } from 'blocks'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import bem from 'utils/bem'
import gravatar from 'utils/gravatar'
import './style.sass'

import MarketplaceAside from 'components/MarketplaceAside'

const b = bem.lock('MarketplacePage')

export default class MarketplacePage extends React.Component {
  render() {
    const plugins = this.props.pathContext.group.map(({ node }) => node);
    const { pageCount, first, last, index } = this.props.pathContext;

    return (
      <MarketplaceAside>
        <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
        <div className={b('plugins')}>
          {
            plugins.map((plugin) => (
              <Link to={`/plugin/${plugin.name}/`} key={plugin.name} className={b('plugin')}>
                <div
                  className={b('plugin-image')}
                >
                  <div 
                    className={b('plugin-cover')}
                    style={{ backgroundImage: `url(https://github.com/datocms/plugins/raw/master/${plugin.name.replace(/datocms-plugin-/, '')}/docs/cover.jpg)` }}
                  />
                  <img
                    className={b('plugin-author-image')}
                    src={gravatar(plugin.publisher.email, { s: 80, d: 'retro' })}
                  />
                </div>
                <div className={b('plugin-body')}>
                  <h3 className={b('plugin-title')}>
                    {plugin.datoCmsPlugin.title}
                  </h3>
                  <div className={b('plugin-author')}>
                    v{plugin.version} by {plugin.publisher.username}
                  </div>
                  <div className={b('plugin-excerpt')}>
                    {plugin.description}
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
        {
          !first &&
            <Link to={index === 2 ? '/plugins/' : `/plugins/${index-1}/`} className={b('previous')}>
              See next plugins &raquo;
            </Link>
        }
        {
          !last &&
            <Link to={`/plugins/${index+1}/`} className={b('previous')}>
              &laquo; See previous plugins
            </Link>
        }
      </MarketplaceAside>
    );
  }
}

export const query = graphql`
query MarketplacePageQuery {
  page: datoCmsMarketplace {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
  }
}
`
