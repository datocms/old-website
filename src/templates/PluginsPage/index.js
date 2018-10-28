import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'

import bem from 'utils/bem'
import gravatar from 'utils/gravatar'
import './style.sass'

import PluginsAside from 'components/PluginsAside'

const b = bem.lock('PluginsPage')

export default class PluginsPage extends React.Component {
  render() {
    const plugins = this.props.pathContext.group.map(({ node }) => node);
    const { pageCount, first, last, index } = this.props.pathContext;

    return (
      <PluginsAside>
        <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
        <div className={b('plugins')}>
          {
            plugins.map((plugin) => (
              <Link to={`/plugin/${plugin.packageName}/`} key={plugin.name} className={b('plugin')}>
                <div
                  className={b('plugin-image')}
                >
                  {
                    plugin.coverImage &&
                      <Img sizes={plugin.coverImage.sizes} />
                  }
                  <img
                    className={b('plugin-author-image')}
                    src={gravatar(plugin.author.email, { s: 80, d: 'retro' })}
                  />
                </div>
                <div className={b('plugin-body')}>
                  <h3 className={b('plugin-title')}>
                    {plugin.title}
                  </h3>
                  <div className={b('plugin-author')}>
                    v{plugin.version} by {plugin.author.name}
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
      </PluginsAside>
    );
  }
}

export const query = graphql`
query PluginsPageQuery {
  page: datoCmsPluginsPage {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
  }
}
`
