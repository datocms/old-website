import React from 'react';
import { graphql } from 'gatsby';
import Link from 'components/Link';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import slugify from 'slugify';

import Layout from 'components/Layout';
import PageLayout from 'components/PageLayout';
import bem from 'utils/bem';
import gravatar from 'utils/gravatar';
import './style.sass';

const b = bem.lock('PluginsPage');

const toPath = function(pluginType, fieldType) {
  let path = '/plugins/';

  if (pluginType) {
    path += pluginType + '/';
  }

  if (fieldType) {
    path += fieldType + '/';
  }

  return path;
};

export default class PluginsPage extends React.Component {
  render() {
    const plugins = this.props.pageContext.group.map(({ node }) => node);
    const pluginTypes = [{ code: null, name: 'All plugin types' }].concat(
      this.props.data.pluginTypes.edges.map(({ node }) => node),
    );
    const fieldTypes = [{ code: null, name: 'All field types' }].concat(
      this.props.data.fieldTypes.edges.map(({ node }) => node),
    );

    const {
      first,
      last,
      index,
      additionalContext: { pluginType, fieldType, combosWithResults },
    } = this.props.pageContext;

    const pluginTypeCats = pluginTypes
      .filter(({ code, name }) => {
        const path = toPath(code, fieldType);
        return !!combosWithResults[path];
      })
      .map(({ code, name }) => {
        const path = toPath(code, fieldType);

        return (
          <li key={path}>
            <Link to={path} exact activeClassName="active">
              {name} <span>({combosWithResults[path].plugins.length})</span>
            </Link>
          </li>
        );
      });

    const fieldTypeCats = fieldTypes
      .filter(({ code, name }) => {
        const path = toPath(pluginType, code);
        return !!combosWithResults[path];
      })
      .map(({ code, name }) => {
        const path = toPath(pluginType, code);

        return (
          <li key={path}>
            <Link exact to={path} activeClassName="active">
              {name} <span>({combosWithResults[path].plugins.length})</span>
            </Link>
          </li>
        );
      });

    return (
      <Layout>
        <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
        <PageLayout
          bg
          title="Plugins"
          subtitle="Extend the functionality of DatoCMS"
        >
          <div className={b()}>
            <div className={b('content')}>
              <div className={b('sidebar')}>
                <div className={b('cats')}>
                  <div className={b('cats__title')}>By plugin type</div>
                  <ul>{pluginTypeCats}</ul>
                </div>
                <div className={b('cats')}>
                  <div className={b('cats__title')}>By field type</div>
                  <ul>{fieldTypeCats}</ul>
                </div>
              </div>
              <div className={b('body')}>
                <div className={b('plugins')}>
                  {plugins.map(plugin => (
                    <Link
                      to={`/plugins/i/${slugify(plugin.packageName)}/`}
                      key={plugin.name}
                      className={b('plugin')}
                    >
                      <div className={b('plugin-image')}>
                        {plugin.coverImage &&
                          plugin.coverImage.format !== 'svg' && (
                            <Img fluid={plugin.coverImage.fluid} />
                          )}
                        {plugin.coverImage &&
                          plugin.coverImage.format === 'svg' && (
                            <div className="gatsby-image-wrapper">
                              <div
                                className="svg"
                                style={{
                                  backgroundImage: `url(${
                                    plugin.coverImage.url
                                  })`,
                                }}
                              />
                            </div>
                          )}
                        <img
                          alt="Author gravatar"
                          className={b('plugin-author-image')}
                          src={gravatar(plugin.author.email, {
                            s: 80,
                            d: 'retro',
                          })}
                        />
                      </div>
                      <div className={b('plugin-body')}>
                        <h3 className={b('plugin-title')}>{plugin.title}</h3>
                        <div className={b('plugin-author')}>
                          v{plugin.version} by {plugin.author.name}
                        </div>
                        <div className={b('plugin-excerpt')}>
                          {plugin.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {!first && (
                  <Link
                    to={index === 2 ? '/plugins/' : `/plugins/${index - 1}/`}
                    className={b('previous')}
                  >
                    See next plugins &raquo;
                  </Link>
                )}
                {!last && (
                  <Link
                    to={`/plugins/${index + 1}/`}
                    className={b('previous')}
                  >
                    &laquo; See previous plugins
                  </Link>
                )}
              </div>
            </div>
          </div>
        </PageLayout>
      </Layout>
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
    pluginTypes: allDatoCmsPluginType(sort: { fields: [name], order: ASC }) {
      edges {
        node {
          name
          code
        }
      }
    }
    fieldTypes: allDatoCmsPluginFieldType(
      sort: { fields: [name], order: ASC }
    ) {
      edges {
        node {
          name
          code
        }
      }
    }
  }
`;
