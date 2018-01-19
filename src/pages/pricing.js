import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import Features from '../components/home/Features'

import './pricing.sass'
import check from 'images/check.svg'

const b = bem.lock('PricingPage')

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
                    No invitations
                  </div>
                  <div className={b('recap-item-spec')}>
                    200MB file storage
                  </div>
                  <div className={b('recap-item-spec')}>
                    100 records
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
                    2 invitations
                  </div>
                  <div className={b('recap-item-spec')}>
                    1GB file storage
                  </div>
                  <div className={b('recap-item-spec')}>
                    500 records
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
                    5 invitations
                  </div>
                  <div className={b('recap-item-spec')}>
                    3GB file storage
                  </div>
                  <div className={b('recap-item-spec')}>
                    2.000 records
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
                    Unlimited invitations
                  </div>
                  <div className={b('recap-item-spec')}>
                    Unlimited file storage
                  </div>
                  <div className={b('recap-item-spec')}>
                    Unlimited records
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
                  Invitations
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
                  File storage
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
                  Records
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
                  Indexable pages
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
                  Image manipulations
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
                  Languages
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
                  Custom admin domain
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
                  Revision history
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
                  Use your own S3 for file uploads
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
                  Two-factor authentication
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
                  Priority chat/email support
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
                  SAML Single Sign-on
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
                  Contract SLAs
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
            </table>

          </div>
        </Wrap>
      </Space>
    );
  }
}

export default PricingPage

