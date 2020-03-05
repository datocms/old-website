import React from 'react';
import Link from 'components/Link';
import { graphql } from 'gatsby';
import { Wrap } from 'blocks';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import bem from 'utils/bem';

import './docs.sass';

import PageLayout from 'components/PageLayout';
import Layout from 'components/Layout';
import Search from 'components/Search';

const b = bem.lock('Docs');

export default class LearnPage extends React.Component {
  render() {
    const { data } = this.props;
    const integrationsBySlug = data.integrations.edges
      .map(e => e.node)
      .reduce((acc, i) => Object.assign(acc, { [i.slug]: i }), {});

    return (
      <Layout>
        <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
        <PageLayout
          noWrap
          docsBg
          title="Documentation"
          subtitle="Get the most out of DatoCMS following our guides, tutorials and demos"
          headerClass="Docs__header"
        >
          <div className={b()}>
            <div className={b('blocks')}>
              <Wrap>
                <Search big />
                <div className={b('blocks__inner')}>
                  <div className={b('block')}>
                    <Link
                      to="/docs/general-concepts"
                      className={b('block__body')}
                    >
                      <div className={b('block__title')}>General concepts</div>
                      <div className={b('block__description')}>
                        Explore the building blocks of DatoCMS, from
                        localization to roles & permissions.
                      </div>
                      <div className={b('block__read-more')}>Read more</div>
                    </Link>
                    <div className={b('block__items')}>
                      <div className={b('block__items__title')}>
                          Suggested reads...
                      </div>
                      <Link
                        to="/docs/general-concepts"
                        className={b('block__item')}
                      >
                        <span className={b('block__item__main')}>What is DatoCMS?</span>
                      </Link>
                      <Link
                        to="/docs/general-concepts/roles-and-permission-system"
                        className={b('block__item')}
                      >
                        <span className={b('block__item__main')}>Roles and permissions</span>
                      </Link>
                      <Link
                        to="/docs/general-concepts/draft-published"
                        className={b('block__item')}
                      >
                        <span className={b('block__item__main')}>Draft/published system</span>
                      </Link>
                    </div>
                  </div>
                  <div className={b('block')}>
                    <Link
                      to="/docs/content-modelling"
                      className={b('block__body')}
                    >
                      <div className={b('block__title')}>Content modelling</div>
                      <div className={b('block__description')}>
                        Give structure and organization to your project's models
                        and fields.
                      </div>
                      <div className={b('block__read-more')}>Read more</div>
                    </Link>
                    <div className={b('block__items')}>
                      <div className={b('block__items__title')}>
                          Suggested reads...
                      </div>
                      <Link
                        to="/docs/content-modelling"
                        className={b('block__item')}
                      >
                        <span className={b('block__item__main')}>Models and fields</span>
                      </Link>
                      <Link
                        to="/docs/content-modelling/single-instance"
                        className={b('block__item')}
                      >
                        <span className={b('block__item__main')}>Single instance models</span>
                      </Link>
                      <Link
                        to="/docs/content-modelling/modular-content"
                        className={b('block__item')}
                      >
                        <span className={b('block__item__main')}>The modular content field</span>
                      </Link>
                    </div>
                  </div>
                  <div className={b('block')}>
                    <Link to="/docs/guides" className={b('block__body')}>
                      <div className={b('block__title')}>
                        Guides & Tutorials
                      </div>
                      <div className={b('block__description')}>
                        In-depth guides for to help you use DatoCMS more
                        effectively.
                      </div>
                      <div className={b('block__read-more')}>Read more</div>
                    </Link>
                    <div className={b('block__items')}>
                      <div className={b('block__items__title')}>
                          Popular guides
                      </div>
                      <Link
                        to="/docs/guides/building-plugins"
                        className={b('block__item')}
                      >
                        <span className={b('block__item__main')}>Develop a DatoCMS plugin</span>
                      </Link>
                      <Link
                        to="/docs/guides/installing-site-search"
                        className={b('block__item')}
                      >
                        <span className={b('block__item__main')}>Setup DatoCMS Site Search</span>
                      </Link>
                      <Link
                        to="/blog/wordpress-importer/"
                        className={b('block__item')}
                      >
                        <span className={b('block__item__main')}>Import an existing Wordpress site</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Wrap>
            </div>
            <Wrap>
              <div className={b('section', { inverse: true })}>
                <div className={b('section__title')}>API Reference</div>
                <div className={b('api__cols')}>
                  <div className={b('api__col')}>
                    <div className={b('api__item')}>
                      <Link
                        to="/docs/content-delivery-api"
                        className={b('api__item__body')}
                      >
                        <div className={b('api__item__title')}>
                          Content Delivery API
                        </div>
                        <div className={b('api__item__description')}>
                          Retrieve content using using our CDN-powered GraphQL
                          API.
                        </div>
                        <div className={b('api__item__read-more')}>
                          Read more
                        </div>
                      </Link>
                      <div className={b('api__item__links')}>
                        <Link
                          to="/docs/content-delivery-api#why-graphql"
                          className={b('api__item__link')}
                        >
                          <span className={b('block__item__main')}>Why GraphQL?</span>
                        </Link>
                        <Link
                          to="/docs/content-delivery-api/authentication"
                          className={b('api__item__link')}
                        >
                          <span className={b('block__item__main')}>Authentication</span>
                        </Link>
                        <Link
                          to="/docs/content-delivery-api/first-request"
                          className={b('api__item__link')}
                        >
                          <span className={b('block__item__main')}>Your first request</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className={b('api__col')}>
                    <div className={b('api__item')}>
                      <Link
                        to="/docs/content-management-api"
                        className={b('api__item__body')}
                      >
                        <div className={b('api__item__title')}>
                          Content Management API
                        </div>
                        <div className={b('api__item__description')}>
                          Programmatically update schema and content with
                          our REST API.
                        </div>
                        <div className={b('api__item__read-more')}>
                          Read more
                        </div>
                      </Link>
                      <div className={b('api__item__links')}>
                        <Link
                          to="/docs/content-management-api/authentication"
                          className={b('api__item__link')}
                        >
                          <span className={b('block__item__main')}>Authentication</span>
                        </Link>
                        <Link
                          to="/docs/content-management-api/js-client"
                          className={b('api__item__link')}
                        >
                          <span className={b('block__item__main')}>Using the JS client</span>
                        </Link>
                        <Link
                          to="/docs/content-management-api/ruby-client"
                          className={b('api__item__link')}
                        >
                          <span className={b('block__item__main')}>Using the Ruby client</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={b('section')}>
                <div className={b('section__title')}>
                  Available integrations
                </div>
                <div className={b('integrations')}>
                  {[
                    'react',
                    'gatsbyjs',
                    'hugo',
                    'jekyll',
                    'middleman',
                    'metalsmith',
                    'netlify',
                    'zeit',
                    'travis',
                    'gitlab',
                    'circleci',
                  ].map(slug => (
                    <Link
                      key={slug}
                      className={b('integrations__item')}
                      to={integrationsBySlug[slug].documentationUrl}
                    >
                      <img
                        alt={integrationsBySlug[slug].name}
                        className={b('integrations__item__image')}
                        src={
                          integrationsBySlug[slug].squareLogo
                            ? integrationsBySlug[slug].squareLogo.url
                            : integrationsBySlug[slug].logo.url
                        }
                      />
                      <div className={b('integrations__item__title')}>
                        {integrationsBySlug[slug].name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Wrap>
          </div>
        </PageLayout>
      </Layout>
    );
  }
}

export const query = graphql`
  query Docs2PageQuery {
    page: datoCmsLearnPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    integrations: allDatoCmsIntegration(
      filter: { integrationType: { slug: { in: ["ci", "static-generator", "framework"] } } }
    ) {
      edges {
        node {
          slug
          name
          documentationUrl
          logo {
            url
          }
          squareLogo {
            url
          }
        }
      }
    }
  }
`;
