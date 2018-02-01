import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import Features from '../components/home/Features'

import './pricing.sass'
import check from 'images/check.svg'
import tooltip from 'images/info-tooltip-dark.svg'

const b = bem.lock('PricingPage')

const tooltips = {
  invitations: 'The number of editors/marketers you can invite inside your administrative area to manage content.',
  fileStorage: 'Any image/file you upload to DatoCMS counts towards this limit.',
  records: 'A record represents a single piece of information you store within a site. Think of it like a database-like entry. It can be anything: a blog post, a category, an image gallery, etc.',
  indexablePages: 'If you use DatoCMS with a static website and you want to use our "Google Search"-like feature, that\'s the number of pages in your frontend website that we\'ll scrape and index.',
  imgix: 'Every image you upload in DatoCMS is stored on Imgix, a super-fast CDN optimized for image delivery. By adding some parameters to your image URL you can apply multiple transformations (resize, crop, compress, etc.)',
  languages: 'For an international website, that\'s the number of different languages you can specify your content.',
  customDomain: 'The ability to access your administrative area using a custom domain (ie. admin.yoursite.com).',
  revisionHistory: 'View the complete history of changes made to every stored content, and restore them when needed.',
  s3: 'The ability to use a custom AWS S3 bucket and Imgix account, that you own, to store every image/file your editors upload to DatoCMS.',
  otp: 'Enforce two-factor authentication to your editors using the Google Authenticator app.',
  sla: 'SLA packages provide legally binding service availability and support response time guarantees.',
  saml: 'Ability to provision, deprovision and manage privileges of Contentful users through a SAML-based Identity Provider (IdP) of your choice.',
  bandwidth: 'Amount of asset data transferred between our Asset CDN and content consumers.',
  backups: 'Nightly copies of your content to your own Amazon S3 buckets.'
}

const Tooltip = ({ children, code }) => (
  <span className={bem('Tooltip', { })}>
    {children} <img src={tooltip} />
    <span className="Tooltip__hint">
      {tooltips[code]}
    </span>
  </span>
)

class PricingPage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Space both="10">
        <Wrap>
          <div className={b()}>
            <div className={b('title')}>
              Pricing
            </div>
            <div className={b('recap')}>

              <div className={b('recap-item')}>
                <div className={b('recap-item-plan-name')}>
                  Developer
                </div>
                <div className={b('recap-item-for')}>
                  Test the product and use it for small websites
                </div>
                <div className={b('recap-item-price')}>
                  <div className={b('recap-item-price-free')}>
                    Free
                  </div>
                </div>
                <div className={b('recap-item-specs')}>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="invitations">No invitations</Tooltip>
                  </div>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="fileStorage">200MB file storage</Tooltip>
                  </div>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="records">100 records</Tooltip>
                  </div>
                </div>
                <a
                  className={b('recap-item-cta')}
                  href="https://dashboard.datocms.com/register"
                >
                  Sign up
                </a>
              </div>

              <div className={b('recap-item')}>
                <div className={b('recap-item-plan-name')}>
                  Basic
                </div>
                <div className={b('recap-item-for')}>
                  Perfect for the average brochure site
                </div>
                <div className={b('recap-item-price')}>
                  <div className={b('recap-item-price-amount')}>
                    €9
                  </div>
                  <div className={b('recap-item-price-period')}>
                    per site/month
                  </div>
                  <div className={b('recap-item-price-prorated')}>
                    Pro-rated daily
                  </div>
                </div>
                <div className={b('recap-item-specs')}>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="invitations">2 invitations</Tooltip>
                  </div>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="fileStorage">1GB file storage</Tooltip>
                  </div>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="records">500 records</Tooltip>
                  </div>
                </div>
                <a
                  className={b('recap-item-cta')}
                  href="https://dashboard.datocms.com/register"
                >
                  Sign up
                </a>
              </div>

              <div className={b('recap-item')}>
                <div className={b('recap-item-plan-name')}>
                  Plus
                </div>
                <div className={b('recap-item-for')}>
                  Build big static websites for your clients
                </div>
                <div className={b('recap-item-price')}>
                  <div className={b('recap-item-price-amount')}>
                    €25
                  </div>
                  <div className={b('recap-item-price-period')}>
                    per site/month
                  </div>
                  <div className={b('recap-item-price-prorated')}>
                    Pro-rated daily
                  </div>
                </div>
                <div className={b('recap-item-specs')}>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="invitations">5 invitations</Tooltip>
                  </div>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="fileStorage">3GB file storage</Tooltip>
                  </div>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="records">2.000 records</Tooltip>
                  </div>
                </div>
                <a
                  className={b('recap-item-cta')}
                  href="https://dashboard.datocms.com/register"
                >
                  Sign up
                </a>
              </div>

              <div className={b('recap-item')}>
                <div className={b('recap-item-plan-name')}>
                  Max
                </div>
                <div className={b('recap-item-for')}>
                  For high-volume sites with a large team of editors
                </div>
                <div className={b('recap-item-price')}>
                  <div className={b('recap-item-price-amount')}>
                    €150
                  </div>
                  <div className={b('recap-item-price-period')}>
                    per site/month
                  </div>
                  <div className={b('recap-item-price-prorated')}>
                    Pro-rated daily
                  </div>
                </div>
                <div className={b('recap-item-specs')}>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="invitations">Unlimited invitations</Tooltip>
                  </div>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="fileStorage">Unlimited file storage</Tooltip>
                  </div>
                  <div className={b('recap-item-spec')}>
                    <Tooltip code="records">Unlimited records</Tooltip>
                  </div>
                </div>
                <a
                  className={b('recap-item-cta')}
                  href="https://dashboard.datocms.com/register"
                >
                  Sign up
                </a>
              </div>

              <div className={b('recap-item')}>
                <div className={b('recap-item-plan-name')}>
                  Enterprise
                </div>
                <div className={b('recap-item-for')}>
                  For mission critical projects
                </div>
                <div className={b('recap-item-price')}>
                  <div className={b('recap-item-price-free')}>
                    Let's talk
                  </div>
                </div>
                <div className={b('recap-item-specs')}>
                  <div className={b('recap-item-everything')}>
                    Everything
                  </div>
                </div>
                <a href="mailto:support@datocms.com" className={b('recap-item-cta')}>
                  Get in touch
                </a>
              </div>

            </div>

            <div className={b('reassurance')}>
              No credit card required. Sign up in 15 seconds. 30 days free trial.
            </div>

            <table className={b('details')}>
              <tbody>
                <tr>
                  <td className={b('details-header-cell')} rowSpan="2">
                    <div className={b('details-header')}>
                      <div className={b('details-header-inner')}>
                        <div className={b('details-header-title')}>
                          Feature comparison
                        </div>
                        <div className={b('details-header-description')}>
                          Choose the best for you and get in touch for any help
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={b('details-plan-name')}>
                    Dev
                  </td>
                  <td className={b('details-plan-name')}>
                    Basic
                  </td>
                  <td className={b('details-plan-name')}>
                    Plus
                  </td>
                  <td className={b('details-plan-name')}>
                    Max
                  </td>
                  <td className={b('details-plan-name')}>
                    Enterprise
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className={b('details-price')}>
                      <div className={b('details-price-inner')}>
                        <div className={b('details-price-free')}>
                          Free
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={b('details-price')}>
                      <div className={b('details-price-inner')}>
                        <div className={b('details-price-amount')}>
                          €9
                        </div>
                        <div className={b('details-price-period')}>
                          per site/month
                        </div>
                        <div className={b('details-price-prorated')}>
                          Pro-rated daily
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={b('details-price')}>
                      <div className={b('details-price-inner')}>
                        <div className={b('details-price-amount')}>
                          €25
                        </div>
                        <div className={b('details-price-period')}>
                          per site/month
                        </div>
                        <div className={b('details-price-prorated')}>
                          Pro-rated daily
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={b('details-price')}>
                      <div className={b('details-price-inner')}>
                        <div className={b('details-price-amount')}>
                          €150
                        </div>
                        <div className={b('details-price-period')}>
                          per site/month
                        </div>
                        <div className={b('details-price-prorated')}>
                          Pro-rated daily
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={b('details-price')}>
                      <div className={b('details-price-inner')}>
                        <div className={b('details-price-free')}>
                          Let's talk
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    Support
                  </td>
                  <td className={b('details-feature-value')}>
                    Low-priority
                  </td>
                  <td className={b('details-feature-value')}>
                    Standard
                  </td>
                  <td className={b('details-feature-value')}>
                    Advanced
                  </td>
                  <td className={b('details-feature-value')}>
                    Advanced
                  </td>
                  <td className={b('details-feature-value')}>
                    Premium
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="invitations">Invitations</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                    0
                  </td>
                  <td className={b('details-feature-value')}>
                    2
                  </td>
                  <td className={b('details-feature-value')}>
                    5
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="fileStorage">File storage</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                    200 MB
                  </td>
                  <td className={b('details-feature-value')}>
                    1 GB
                  </td>
                  <td className={b('details-feature-value')}>
                    3 GB
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="bandwidth">Bandwidth</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                    1 TB
                  </td>
                  <td className={b('details-feature-value')}>
                    1 TB
                  </td>
                  <td className={b('details-feature-value')}>
                    1 TB
                  </td>
                  <td className={b('details-feature-value')}>
                    1 TB
                  </td>
                  <td className={b('details-feature-value')}>
                    Custom
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="records">Records</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                    100
                  </td>
                  <td className={b('details-feature-value')}>
                    500
                  </td>
                  <td className={b('details-feature-value')}>
                    2.000
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="indexablePages">Indexable pages</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                    20
                  </td>
                  <td className={b('details-feature-value')}>
                    1.000
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="imgix">Image manipulations</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="languages">Languages</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                  <td className={b('details-feature-value')}>
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="customDomain">Custom admin domain</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>

                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="revisionHistory">Revision history</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>

                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="s3">Use your own S3 for file uploads</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="otp">Two-factor authentication</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="saml">SAML Single Sign-on</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="sla">Contract SLAs</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                    <Tooltip code="backups">Offline backups</Tooltip>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                  </td>
                  <td className={b('details-feature-value')}>
                    <img src={check} alt="Available feature" />
                  </td>
                </tr>
                <tr>
                  <td className={b('details-feature-name')}>
                  </td>
                  <td>
                    <a
                      className={b('details-cta')}
                      href="https://dashboard.datocms.com/register"
                    >
                      Sign up
                    </a>
                  </td>
                  <td>
                    <a
                      className={b('details-cta')}
                      href="https://dashboard.datocms.com/register"
                    >
                      Sign up
                    </a>
                  </td>
                  <td>
                    <a
                      className={b('details-cta')}
                      href="https://dashboard.datocms.com/register"
                    >
                      Sign up
                    </a>
                  </td>
                  <td>
                    <a
                      className={b('details-cta')}
                      href="https://dashboard.datocms.com/register"
                    >
                      Sign up
                    </a>
                  </td>
                  <td>
                    <a
                      className={b('details-cta')}
                      href="mailto:support@datocms.com"
                    >
                      Get in touch
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Wrap>
      </Space>
    );
  }
}

export default PricingPage

