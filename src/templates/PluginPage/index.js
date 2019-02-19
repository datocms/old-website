import React from 'react';
import { graphql } from 'gatsby';
import Link from 'components/Link';
import { Wrap, Space } from 'blocks';
import AutoupdateTime from 'components/AutoupdateTime';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import Sticky from 'react-stickynode';
import gravatar from 'utils/gravatar';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import Layout from 'components/Layout';
import bem from 'utils/bem';

import './style.sass';

const b = bem.lock('PluginPage');

const getHost = url => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('a');
    link.href = url;
    return link.hostname;
  } else {
    return require('url').parse(url).hostname;
  }
};

function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce((xs, x) => xs.concat([sep, x]), [arr[0]]);
}

export default class PluginPage extends React.Component {
  render() {
    const { data } = this.props;
    const plugin = data.plugin;

    return (
      <Layout>
        <Space both={10}>
          <Wrap>
            <HelmetDatoCms seo={plugin.seoMetaTags} />
            <div className={b('header')}>
              {plugin.coverImage && (
                <div
                  className={b('avatar')}
                  style={{
                    backgroundImage: `url(${
                      plugin.coverImage.url
                    }?auto=format&w=180&h=180&fit=crop)`,
                  }}
                />
              )}
              <h1 className={b('title')}>{plugin.title}</h1>
              <h1 className={b('description')}>{plugin.description}</h1>
            </div>
            <div className={b()}>
              <div className={b('body')}>
                {' '}
                {plugin.previewImage && (
                  <div className={b('preview-block')}>
                    <div className={b('preview-block-title')}>
                      Plugin preview
                    </div>
                    <div className={b('preview-block-image')}>
                      <div
                        style={{
                          paddingTop: `${(plugin.previewImage.height /
                            plugin.previewImage.width) *
                            100}%`,
                        }}
                      />
                      <img alt="Preview" src={plugin.previewImage.url} />
                    </div>
                  </div>
                )}
                <div className={b('readme-block')}>
                  <div className={b('readme-block-title')}>Readme</div>
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
                      href={`https://dashboard.datocms.com/projects/redirect-to-project?path=/admin/plugins/install/${
                        plugin.packageName
                      }`}
                      className="button button--expand button--normal-big button--red"
                    >
                      Install
                    </a>
                  </div>
                  <div className={b('info-groups')}>
                    <div className={b('info-group')}>
                      <p className={b('info')}>
                        <strong>NPM package name</strong>
                        <a
                          rel="noopener noreferrer"
                          target="_blank"
                          href={`https://www.npmjs.com/package/${
                            plugin.packageName
                          }`}
                        >
                          {plugin.packageName}
                        </a>
                      </p>
                      <p className={b('info')}>
                        <strong>Published by</strong>
                        <img
                          alt="Author gravatar"
                          src={gravatar(plugin.author.email, {
                            s: 40,
                            d: 'retro',
                          })}
                        />
                        {plugin.author.name}
                      </p>
                      {plugin.homepage && (
                        <p className={b('info')}>
                          <strong>Homepage</strong>
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={plugin.homepage}
                          >
                            {getHost(plugin.homepage)}
                          </a>
                        </p>
                      )}
                    </div>
                    <div className={b('info-group')}>
                      <p className={b('info')}>
                        <strong>Plugin type</strong>
                        <Link to={`/plugins/${plugin.pluginType.code}`}>
                          {plugin.pluginType.name}
                        </Link>
                      </p>
                      <p className={b('info')}>
                        <strong>Compatible with fields</strong>
                        {intersperse(
                          plugin.fieldTypes.map(f => (
                            <Link key={f.code} to={`/plugins/${f.code}`}>
                              {f.name}
                            </Link>
                          )),
                          ', ',
                        )}
                      </p>
                      <p className={b('info')}>
                        <strong>Tags</strong>
                        {intersperse(
                          plugin.tags.map(f => (
                            <Link key={f.tag} to={`/plugins/${f.tag}`}>
                              #{f.tag}
                            </Link>
                          )),
                          ', ',
                        )}
                      </p>
                    </div>
                    <div className={b('info-group')}>
                      <p className={b('info')}>
                        <strong>First released</strong>
                        {format(parse(plugin.releasedAt), 'MMMM do, YYYY')}
                      </p>
                      <p className={b('info')}>
                        <strong>Current version</strong>
                        {plugin.version}
                      </p>
                      <p className={b('info')}>
                        <strong>Last update</strong>
                        <AutoupdateTime value={parse(plugin.lastUpdate)} />
                      </p>
                    </div>
                  </div>
                </Sticky>
              </div>
            </div>
          </Wrap>
        </Space>
      </Layout>
    );
  }
}

export const query = graphql`
  query PluginPageQuery($packageName: String!) {
    plugin: datoCmsPlugin(packageName: { eq: $packageName }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      packageName
      version
      author {
        name
        email
      }
      homepage
      description
      tags {
        tag
      }
      title
      coverImage {
        url
      }
      previewImage {
        url
        width
        height
      }
      fieldTypes {
        name
        code
      }
      pluginType {
        name
        code
      }
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
`;
