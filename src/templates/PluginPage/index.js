import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'
import sortBy from 'sort-by'
import PluginsAside from 'components/PluginsAside'
import AutoupdateTime from 'components/AutoupdateTime'
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import distanceInWords from 'date-fns/distance_in_words';
import Sticky from 'react-stickynode'
import Img from 'gatsby-image'

import bem from 'utils/bem'

import './style.sass'

const b = bem.lock('PluginPage')

export default class PluginPage extends React.Component {
  render() {
    const { data } = this.props;
    const plugin = data.plugin;

    const l = document.createElement("a");
    l.href = plugin.homepage;

    return (
      <Space both={10}>
        <Wrap>
          <div className={b('header')}>
            {
              plugin.coverImage &&
                <div
                  className={b('avatar')}
                  style={{ backgroundImage: `url(${plugin.coverImage.url}?w=90&h=90&fit=crop)` }}
                />
            }
            <h1 className={b('title')}>
              {plugin.title}
            </h1>
            <h1  className={b('description')}>
              {plugin.description}
            </h1>
          </div>
          <div className={b()}>
            <div className={b('body')}> {
                plugin.previewImage &&
                  <div className={b('preview-block')}>
                    <div className={b('preview-block-title')}>
                      Plugin preview
                    </div>
                    <div className={b('preview-block-image')}>
                      <div style={{ paddingTop: `${(plugin.previewImage.height / plugin.previewImage.width * 100)}%` }} />
                      <img src={plugin.previewImage.url} />
                    </div>
                  </div>
              }
              <div className={b('readme-block')}>
                <div className={b('readme-block-title')}>
                  Readme
                </div>
                <div
                  className={b('readme-block-readme')}
                  dangerouslySetInnerHTML={{ __html: plugin.readme.md.html }}
                />
              </div>
            </div>
            <div className={b('sidebar')}>
              <Sticky top={50} bottomBoundary={`.PluginPage`}>
                <div href="" className={b('install')}>
                  <a
                    href={`https://dashboard.datocms.com/projects/redirect-to-project?path=/admin/plugins/install/${plugin.packageName}`}
                    className="button button--expand button--normal-big button--red"
                  >
                    Install
                  </a>
                </div>
                <div>
                  <p className={b('info')}>
                    <strong>NPM package name</strong>
                    <a target="_blank" href={`https://www.npmjs.com/package/datocms-client`}>
                      {plugin.packageName}
                    </a>
                  </p>
                  {
                    plugin.homepage &&
                      <p className={b('info')}>
                        <strong>Homepage</strong>
                        <a target="_blank" href={plugin.homepage}>{l.hostname}</a>
                      </p>
                  }
                  <p className={b('info')}>
                    <strong>Version</strong>
                    {plugin.version}
                  </p>
                  <p className={b('info')}>
                    <strong>Plugin type</strong>
                    {plugin.pluginType.name}
                  </p>
                  <p className={b('info')}>
                    <strong>Compatible with fields</strong>
                    {plugin.fieldTypes.map(f => f.name).join(', ')}
                  </p>
                  <p className={b('info')}>
                    <strong>Released at</strong>
                    {format(parse(plugin.releasedAt), 'MMMM do, YYYY')}
                  </p>
                  <p className={b('info')}>
                    <strong>Last update</strong>
                    <AutoupdateTime value={parse(plugin.lastUpdate)} />
                  </p>
                  <p className={b('info')}>
                    <strong>Published by</strong>
                    {plugin.author.name}
                  </p>
                </div>
              </Sticky>
            </div>
          </div>
        </Wrap>
      </Space>
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
      coverImage {
        url
      }
      previewImage {
        url
        width
        height
      }
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

