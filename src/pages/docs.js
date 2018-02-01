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

const Guide = ({ title, children, description, cta, link }) => (
  link ?
    <Link className={g({ guide: !children })} to={link}>
      <div className={g('image')}>
      </div>
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
      <Space both="10">
        <Wrap>
          <div className={b()}>
            <h1 className={b('title')}>
              Getting started with DatoCMS
            </h1>

            <div className={b('section')}>
              <div className={b('section-items')}>
                <Guide
                  title="Introduction"
                  description="Learn how DatoCMS works and how you can build your next administrative area."
                  link="/docs/introduction/"
                />
                <Guide
                  title="API Reference"
                  description="We offer a complete, strong-consistent REST API that let's you to programmatically build any kind of product."
                  link="/api/"
                  cta="Explore our API"
                />
                <Guide
                  title="Import & Export"
                >
                  <Space bottom={2}>
                    <p>
                      Use our API to import existing content from external sources, or implement a full-backup strategy in no time.
                    </p>
                  </Space>
                  <ul>
                    <li><Link to="/docs/import/nodejs/">Importing data</Link></li>
                    <li><Link to="/docs/gatsby/">Making offline backups</Link></li>
                  </ul>
                </Guide>
              </div>
            </div>

            <div className={b('section')}>
              <h3 className={b('section-title')}>
                Build static websites with DatoCMS
              </h3>

              <div className={b('section-items')}>
                <Guide
                  title="Static websites"
                >
                  <Space bottom={2}>
                    <p>
                      DatoCMS is the best companion if you're building a static website:
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
            </div>

            <div className={b('section')}>
              <h3 className={b('section-title')}>
                Build apps with DatoCMS
              </h3>

              <div className={b('section-items', { center: true })}>
                <Guide
                  title="Client-side apps"
                >
                  <Space bottom={2}>
                    <p>
                      Use our Javascript client to build your app with any frontend technology you want:
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
                  title="Server-side apps"
                >
                  <Space bottom={2}>
                    <p>
                      Stop reinventing the wheel and use DatoCMS to manage your server-side website:
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
          </div>
        </Wrap>
      </Space>
    )
  }
}
