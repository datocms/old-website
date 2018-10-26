import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'
import sortBy from 'sort-by'
import MarketplaceAside from 'components/MarketplaceAside'

import bem from 'utils/bem'

import './style.sass'

const b = bem.lock('PluginPage')

const PageLink = ({ to, children }) => (
  <Link
    exact
    to={to}
    activeClassName="is-active"
  >
    {children}
  </Link>
)

export default class PluginPage extends React.Component {
  render() {
    const { data } = this.props;
    const plugin = data.plugin;

    const previewUrl = plugin.datoCmsPlugin.previewImage &&
      `https://unpkg.com/${plugin.name}@${plugin.version}/${plugin.datoCmsPlugin.previewImage}`;

    const coverUrl = `https://github.com/datocms/plugins/raw/master/${plugin.name.replace(/datocms-plugin-/, '')}/docs/cover.jpg`;

    return (
      <MarketplaceAside>
        <div className={b()}>
          <div className={b('header')}>
            <div className={b('header-content')}>
              <h1 className={b('title')}>
                {plugin.datoCmsPlugin.title}
              </h1>
              <h1  className={b('description')}>
                {plugin.description}
              </h1>
            </div>
            <div className={b('header-avatar')}>
              <div
                className={b('avatar')}
                style={{ backgroundImage: `url(https://github.com/datocms/plugins/raw/master/${plugin.name.replace(/datocms-plugin-/, '')}/docs/cover.jpg)` }}
              />
            </div>
          </div>
          {
            previewUrl &&
              <div className={b('gallery')}>
                <div className={b('gallery-title')}>
                  Plugin preview
                </div>
                <div className={b('preview')}>
                  <img src={previewUrl} />
                </div>
              </div>
          }
          <div className={b('content-body-title')}>
            Plugin readme
          </div>
          <div
            className={b('content-body')}
            dangerouslySetInnerHTML={{ __html: plugin.readme.md.html }}
          />
        </div>
      </MarketplaceAside>
    );
  }
}

export const query = graphql`
  query PluginPageQuery($name: String!) {
    plugin(name: { eq: $name }) {
      name
      version
      publisher {
        username
        email
      }
      homepage
      description
      keywords
      license
      datoCmsPlugin {
        title
        previewImage
        fieldTypes
        pluginType
      }
      readme: readmeNode {
        md: childMarkdownRemark {
          html
        }
      }
    }
  }
`

