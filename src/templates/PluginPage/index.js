import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'
import sortBy from 'sort-by'
import PluginsAside from 'components/PluginsAside'

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

    return (
      <PluginsAside>
        <div className={b()}>
          <div className={b('header')}>
            <div className={b('header-content')}>
              <h1 className={b('title')}>
                {plugin.title}
              </h1>
              <h1  className={b('description')}>
                {plugin.description}
              </h1>
            </div>
            {
              plugin.coverImage &&
                <div className={b('header-avatar')}>
                  <div
                    className={b('avatar')}
                    style={{ backgroundImage: plugin.coverImage.url }}
                  />
                </div>
            }
          </div>
          <div>
            <p>Version: {plugin.version}</p>
            <p>Plugin type: {plugin.pluginType.name}</p>
            <p>Fields: {plugin.fieldTypes.map(f => f.name).join(', ')}</p>
            <p>Installs: {plugin.installs}</p>
            <p>Released at: {plugin.releasedAt}</p>
            <p>Last update: {plugin.lastUpdate}</p>
            <p>Author: {plugin.author.name}</p>
          </div>
          {
            plugin.previewImage &&
              <div className={b('gallery')}>
                <div className={b('gallery-title')}>
                  Plugin preview
                </div>
                <div className={b('preview')}>
                  <img src={plugin.previewImage.url} />
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
      </PluginsAside>
    );
  }
}

export const query = graphql`
  query PluginPageQuery($packageName: String!) {
    plugin: datoCmsPlugin(packageName: { eq: $packageName }) {
      packageName
      version
      author { name email }
      homepage
      description
      tags { tag }
      title
      coverImage { url }
      previewImage { url }
      fieldTypes { name }
      pluginType { name }
      releasedAt
      lastUpdate
      installs
      readme: readmeNode {
        md: childMarkdownRemark {
          html
        }
      }
    }
  }
`

