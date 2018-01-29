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

const Guide = ({ bigger, title, description, link }) => (
  <div className={b('section-item', { bigger })}>
    <Link className={g({ bigger })} to={link}>
      <div className={g('image')}>
      </div>
      <div className={g('title')}>
        {title}
      </div>
      <div className={g('description')}>
        {description}
      </div>
    </Link>
  </div>
)

const SmallGuide = ({ title, description, link }) => (
  <Link className={sg()} to={link}>
    <div className={sg('image')}>
    </div>
    <div className={sg('title')}>
      {title}
    </div>
    <div className={sg('description')}>
      {description}
    </div>
  </Link>
)

export default class LearnPage extends React.Component {
  render() {
    return (
      <div>
        <Wrap>
          <div className={b()}>
            <div className={b('section')}>
              <h3 className={b('section-title')}>
                Getting started
              </h3>
              <div className={b('section-items')}>
                <Guide
                  bigger
                  title="Introduction"
                  description="Learn how DatoCMS works and how you can build administrative area"
                  link="/docs/introduction/"
                />
                <Guide
                  bigger
                  title="API Reference"
                  description="Learn how you can use our API"
                  link="/api/"
                />
                <Guide
                  bigger
                  title="Importing data"
                  description="Learn how to import existing content into DatoCMS"
                  link="/docs/import/nodejs/"
                />
              </div>
            </div>

            <div className={b('grid')}>
              <div className={b('grid-item')}>
                <div className={b('section')}>
                  <h3 className={b('section-title')}>
                    Integrate DatoCMS with your site
                  </h3>
                  <SmallGuide
                    title="Jekyll"
                    description="Learn how to integrate DatoCMS with your own Jekyll website"
                    link="/docs/jekyll/"
                  />
                  <SmallGuide
                    title="Hugo"
                    description="Learn how to integrate DatoCMS with your own Hugo website"
                    link="/docs/hugo/"
                  />
                  <SmallGuide
                    title="Middleman"
                    description="Learn how to integrate DatoCMS with your own Middleman website"
                    link="/docs/middleman/"
                  />
                  <SmallGuide
                    title="Gatsby"
                    description="Learn how to integrate DatoCMS with your own Gatsby website"
                    link="/docs/gatsby/"
                  />
                  <SmallGuide
                    title="Metalsmith"
                    description="Learn how to integrate DatoCMS with your own Metalsmith website"
                    link="/docs/metalsmith/"
                  />
                  <SmallGuide
                    title="Other generators"
                    description="Learn how to integrate DatoCMS with any alternative static website generator"
                    link="/docs/other/"
                  />
                </div>
              </div>
              <div className={b('grid-item')}>
                <div className={b('section')}>
                  <h3 className={b('section-title')}>
                    Deploy your DatoCMS-powered site
                  </h3>

                  <SmallGuide
                    title="Netlify"
                    description="Learn how to integrate DatoCMS with Netlify"
                    link="/docs/deployment/netlify/"
                  />
                  <SmallGuide
                    title="Travis"
                    description="Learn how to integrate DatoCMS with Travis"
                    link="/docs/deployment/travis/"
                  />
                  <SmallGuide
                    title="Gitlab"
                    description="Learn how to integrate DatoCMS with Gitlab"
                    link="/docs/deployment/gitlab/"
                  />
                  <SmallGuide
                    title="CircleCI"
                    description="Learn how to integrate DatoCMS with CircleCI"
                    link="/docs/deployment/circleci/"
                  />
                  <SmallGuide
                    title="Custom webhooks"
                    description="Learn how to integrate DatoCMS with any alternative CI using our webhooks"
                    link="/docs/deployment/custom/"
                  />
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </div>
    )
  }
}
