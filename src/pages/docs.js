import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'
import sortBy from 'sort-by'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import bem from 'utils/bem'

import 'prismjs/themes/prism-okaidia.css'
import './docs.sass'

import Search from 'components/Search';

const b = bem.lock('LearnPage')
const g = bem.lock('Guide')
const sg = bem.lock('SmallGuide')

const Guide = ({ title, children, description, cta, link }) => (
  link ?
    <Link className={g({ guide: !children })} to={link}>
      <div className={g('title')}>
        {title}
      </div>
      <div className={g('description')}>
        {children || description}
        {
          !children &&
            <div className={g('read')}>
              { cta || 'Read the guide' }
            </div>
        }
      </div>
    </Link>
    :
    <div className={g()}>
      <div className={g('image')}>
      </div>
      <div className={g('title')}>
        {title}
      </div>
      <div className={g('description')}>
        {children || description}
      </div>
    </div>
)

export default class LearnPage extends React.Component {
  render() {
    return (
      <Space top="10">
        <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
        <div className={b()}>
          <h1 className={b('title')}>
            Documentation
          </h1>
          <p className={b('subtitle')}>
            Get the most out of DatoCMS following our guides, tutorials and demos
          </p>

          <Wrap>
            <Search />
          </Wrap>

          <div>
            <div className={b('section')}>
              <Wrap>
                <h3 className={b('section-title')}>
                  The Basics
                </h3>

                <div className={b('section-items')}>
                  <Guide
                    title="Introduction"
                    description="Learn how DatoCMS works and how you can build your next administrative area."
                    link="/docs/introduction/"
                  />
                  <Guide
                    title="API Reference"
                  >
                    <Space bottom={2}>
                      <p>
                        We offer a complete, strong-consistent API that let's you to programmatically build any kind of product.
                      </p>
                    </Space>
                    <ul>
                      <li><Link to="/docs/content-delivery-api/">Content Delivery API</Link></li>
                      <li><Link to="/content-management-api/">Content Management API</Link></li>
                    </ul>
                  </Guide>
                  <Guide
                    title="Import & Export"
                  >
                    <Space bottom={2}>
                      <p>
                        Use our API to import existing content from external sources, or implement a full-backup strategy in no time.
                      </p>
                    </Space>
                    <ul>
                      <li><Link to="/docs/import/">Importing data</Link></li>
                      <li><Link to="/docs/backups/">Making offline backups</Link></li>
                    </ul>
                  </Guide>
                </div>
              </Wrap>
            </div>

            <div className={b('section')}>
              <Wrap>
                <h3 className={b('section-title')}>
                  Examples
                </h3>

                <div className={b('section-items')}>
                  {
                    this.props.data.demoCategories.edges.map(({ node: cat }) => (
                      <Guide
                        key={cat.id}
                        title={`${cat.name} examples`}
                      >
                        <Space bottom={2}>
                          <p>
                            {cat.description} (<a href={cat.demoUrl} target="_blank">see it live</a>)
                          </p>
                        </Space>
                        <ul>
                          {
                            cat.templates.map((template) => (
                              <li key={template.code}>
                                <a target="_blank" href={`https://dashboard.datocms.com/projects/new-from-template/${cat.code}/${template.code}`}>
                                  <img src={(template.technology.squareLogo || template.technology.logo).url} />
                                  {template.technology.name}
                                </a>
                              </li>
                            ))
                          }
                        </ul>
                      </Guide>
                    ))
                  }
                </div>
              </Wrap>
            </div>

            <div className={b('section')}>
              <Wrap>
                <h3 className={b('section-title')}>
                  Integrating with static websites
                </h3>

                <div className={b('section-items')}>
                  <Guide
                    title="Static website generators"
                  >
                    <Space bottom={2}>
                      <p>
                        DatoCMS is the best companion if you're building a static website:
                      </p>
                    </Space>
                    <ul>
                      <li><Link to="/docs/static-websites/">Introduction</Link></li>
                      <li><Link to="/docs/jekyll/">Jekyll</Link></li>
                      <li><Link to="/docs/gatsby/">Gatsby</Link></li>
                      <li><Link to="/docs/middleman/">Middleman</Link></li>
                      <li><Link to="/docs/hugo/">Hugo</Link></li>
                      <li><Link to="/docs/metalsmith/">Metalsmith</Link></li>
                      <li><Link to="/docs/other/">Other generators</Link></li>
                    </ul>
                  </Guide>
                  <Guide
                    title="Deploying"
                  >
                    <Space bottom={2}>
                      <p>
                        You can also configure DatoCMS to trigger a rebuild of your website:
                      </p>
                    </Space>
                    <ul>
                      <li><Link to="/docs/deployment/introduction/">General concepts</Link></li>
                      <li><Link to="/docs/deployment/netlify/">Netlify</Link></li>
                      <li><Link to="/docs/deployment/travis/">Travis</Link></li>
                      <li><Link to="/docs/deployment/gitlab/">Gitlab</Link></li>
                      <li><Link to="/docs/deployment/circleci/">CircleCI</Link></li>
                      <li><Link to="/docs/deployment/custom/">Custom webhooks</Link></li>
                    </ul>
                  </Guide>
                  <Guide
                    title="Site search"
                    description="Learn how you can easily offer pertinent results to your visitors integrating with our Google Search clone."
                    link="/docs/search/"
                  />
                </div>
              </Wrap>
            </div>

          </div>
        </div>
      </Space>
    )
  }
}

export const query = graphql`
query DocsPageQuery {
  page: datoCmsLearnPage {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
  }
  demoCategories: allDatoCmsTemplateCategory(sort:{fields:[position]}) {
    edges {
      node {
        id
        name
        code
        description
        demoUrl
        templates {
          name
          code
          technology {
            name
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
  }
}
`
