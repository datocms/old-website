import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'
import sortBy from 'sort-by'

import bem from 'utils/bem'

import 'prismjs/themes/prism-okaidia.css'
import './docs.sass'

const b = bem.lock('LearnPage')
const g = bem.lock('Guide')
const sg = bem.lock('SmallGuide')

const Guide = ({ bigger, title, children, description, link }) => (
  <div className={b('section-item', { bigger })}>
    <Link className={g({ bigger })} to={link}>
      <div className={g('image')}>
      </div>
      <div className={g('title')}>
        {title}
      </div>
      <div className={g('description')}>
        {children || description}
      </div>
    </Link>
  </div>
)

export default class LearnPage extends React.Component {
  render() {
    return (
      <Space both="10">
        <Wrap>
          <div className={b()}>
            <h1 className={b('title')}>
              Getting started with DatoCMS
            </h1>
            <div className={b('section')}>
              <div className={b('section-items')}>
                <Guide
                  bigger
                  title="Introduction"
                  description="Learn how DatoCMS works and how you can build your administrative area"
                  link="/docs/introduction/"
                />
                <Guide
                  bigger
                  title="Importing data"
                  description="Learn how to import existing content into DatoCMS"
                  link="/docs/import/nodejs/"
                />
                <Guide
                  bigger
                  title="Making backups"
                  description="Make your clients feel safer implementing a full-backup strategy"
                  link="/docs/import/nodejs/"
                />
              </div>
            </div>

            <div className={b('section')}>
              <h3 className={b('section-title')}>
                Integrate DatoCMS with your site
              </h3>

              <div className={b('section-items')}>
                <Guide
                  bigger
                  title="Static websites"
                >
                  <Space bottom={2}>
                    <p>
                      DatoCMS is the perfect companion if you're building a static website:
                    </p>
                  </Space>
                  <ul>
                    <li><Link to="/docs/jekyll/">Jekyll</Link></li>
                    <li><Link to="/docs/gatsby/">Gatsby</Link></li>
                    <li><Link to="/docs/middleman/">Middleman</Link></li>
                    <li><Link to="/docs/hugo/">Hugo</Link></li>
                    <li><Link to="/docs/metalsmith/">Metalsmith</Link></li>
                    <li><Link to="/docs/other/">Other generators</Link></li>
                  </ul>
                  <Space both={2}>
                    <p>
                      You can also configure DatoCMS to trigger a rebuild of your website:
                    </p>
                  </Space>
                  <ul>
                    <li><Link to="/docs/deployment/netlify/">Netlify</Link></li>
                    <li><Link to="/docs/deployment/travis/">Travis</Link></li>
                    <li><Link to="/docs/deployment/gitlab/">Gitlab</Link></li>
                    <li><Link to="/docs/deployment/circleci/">CircleCI</Link></li>
                    <li><Link to="/docs/deployment/custom/">Custom webhooks</Link></li>
                  </ul>
                </Guide>

                <Guide
                  bigger
                  title="Client-side apps"
                >
                  <Space bottom={2}>
                    <p>
                      Use our NPM client to build your frontend app with any technology you want:
                    </p>
                  </Space>
                  <ul>
                    <li><Link to="/docs/jekyll/">Plain JS</Link></li>
                    <li><Link to="/docs/gatsby/">React</Link></li>
                    <li><Link to="/docs/middleman/">Angular</Link></li>
                    <li><Link to="/docs/hugo/">Vue.js</Link></li>
                  </ul>
                </Guide>

                <Guide
                  bigger
                  title="Server-side apps"
                >
                  <Space bottom={2}>
                    <p>
                      Use our Ruby client to integrate your web application with DatoCMS:
                    </p>
                  </Space>
                  <ul>
                    <li><Link to="/docs/jekyll/">Ruby/Rails</Link></li>
                    <li><Link to="/docs/gatsby/">NodeJS/Express</Link></li>
                    <li><Link to="/docs/gatsby/">PHP</Link></li>
                  </ul>
                </Guide>
              </div>
            </div>

            <div className={b('section')}>
              <h3 className={b('section-title')}>
                Extras
              </h3>

              <div className={b('section-items')}>
                <Guide
                  bigger
                  title="API Reference"
                  description="Explore our extensive REST API"
                  link="/api/"
                />
              </div>
            </div>
          </div>
        </Wrap>
      </Space>
    )
  }
}
