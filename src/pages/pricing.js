import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import Features from '../components/home/Features'

import './pricing.sass'
import check from 'images/check.svg'
import tooltip from 'images/info-tooltip-dark.svg'

const b = bem.lock('PricingPage')
const Tooltip = ({ children, hints, code }) => (
  <span className={bem('Tooltip', { })}>
    {children} <img src={tooltip} />
    <span className="Tooltip__hint">
      {hints[code].description}
    </span>
  </span>
)

class PricingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activePlan: 'developer', billing: 'yearly' };
  }

  handleChangePlan(activePlan) {
    this.setState({ activePlan });
  }

  handleBillingChange(billing, e) {
    e.preventDefault()
    this.setState({ billing });
  }

  renderPlanChanger() {
    const { activePlan } = this.state;

    return (
      <div className={b('plan-changer')}>
        <button
          className={b('plan-changer__plan', { active: activePlan === 'developer' })}
          onClick={this.handleChangePlan.bind(this, 'developer')}
        >
          Dev
        </button>
        <button
          className={b('plan-changer__plan', { active: activePlan === 'basic' })}
          onClick={this.handleChangePlan.bind(this, 'basic')}
        >
          Basic
        </button>
        <button
          className={b('plan-changer__plan', { active: activePlan === 'plus' })}
          onClick={this.handleChangePlan.bind(this, 'plus')}
        >
          Plus
        </button>
        <button
          className={b('plan-changer__plan', { active: activePlan === 'max' })}
          onClick={this.handleChangePlan.bind(this, 'max')}
        >
          Max
        </button>
        <button
          className={b('plan-changer__plan', { active: activePlan === 'enterprise' })}
          onClick={this.handleChangePlan.bind(this, 'enterprise')}
        >
          Enterprise
        </button>
      </div>
    );
  }

  renderBillingChanger() {
    return (
      <div className={b('billing')}>
        <div className={b('billing-group')}>
          <a
            href="#"
            onClick={this.handleBillingChange.bind(this, 'monthly')}
            className={b('billing-group-item', { active: this.state.billing === 'monthly' })}
          >
            Monthly
          </a>
          <a
            href="#"
            onClick={this.handleBillingChange.bind(this, 'yearly')}
            className={b('billing-group-item', { active: this.state.billing === 'yearly' })}
          >
            Annual
          </a>
        </div>
        <div className={b('billing-info')}>
          (Up to 20% off on annual plan)
        </div>
      </div>
    );
  }

  render() {
    const { data } = this.props;
    const { activePlan } = this.state;

    const plans = data.plans.edges.map(e => e.node)
    const hints = data.hints.edges.map(e => e.node).reduce((acc, hint) => {
      acc[hint.code] = {
        name: hint.name,
        description: hint.description,
        plans: hint.plans.reduce((acc, plan) => {
          acc[plan.plan.code] = plan.value;
          return acc;
        }, {})
      };
      return acc;
    }, {})
    const hintCodes = data.hints.edges.map(e => e.node.code)

    return (
      <Space both="10">
        <HelmetDatoCms seo={data.page.seoMetaTags} />
        <Wrap>
          <div className={b()}>
            <div className={b('title')}>
              Pricing
            </div>
            {this.renderBillingChanger()}
            {this.renderPlanChanger()}
            <div className={b('recap')}>
              {
                plans.map(plan => (
                  <div key={plan.code} className={b('recap-item', { active: activePlan === plan.code })}>
                    <div className={b('recap-item-plan-name')}>
                      {plan.name}
                    </div>
                    <div className={b('recap-item-for')}>
                      {plan.description}
                    </div>
                    <div className={b('recap-item-price')}>
                      {
                        plan.code === 'developer' &&
                          <div className={b('recap-item-price-free')}>
                            Free
                          </div>
                      }
                      {
                        plan.code === 'enterprise' &&
                          <div className={b('recap-item-price-free')}>
                            Let's talk
                          </div>
                      }
                      {
                        plan.monthlyPrice &&
                          [
                            <div key="amount" className={b('recap-item-price-amount')}>
                              { this.state.billing === 'monthly' ? `€${plan.monthlyPrice}` : `€${plan.yearlyPrice}` }
                            </div>,
                            <div key="period" className={b('recap-item-price-period')}>
                              per site/month
                            </div>
                          ]
                      }
                    </div>
                    <div className={b('recap-item-specs')}>
                      {
                        plan.code === 'enterprise' ?
                          <div className={b('recap-item-everything')}>
                            Everything
                          </div>
                          :
                          <div>
                            <div className={b('recap-item-spec')}>
                              <Tooltip hints={hints} code="invitations">{hints.invitations.plans[plan.code]} invitations</Tooltip>
                            </div>
                            <div className={b('recap-item-spec')}>
                              <Tooltip hints={hints} code="file-storage">200MB file storage</Tooltip>
                            </div>
                            <div className={b('recap-item-spec')}>
                              <Tooltip hints={hints} code="records">100 records</Tooltip>
                            </div>
                          </div>
                      }
                    </div>
                    {
                      plan.code === 'enterprise' ?
                        <a href="mailto:support@datocms.com" className={b('recap-item-cta')}>
                          Get in touch
                        </a>
                        :
                        <a
                          className={b('recap-item-cta')}
                          href="https://dashboard.datocms.com/register"
                        >
                          Sign up
                        </a>
                    }
                  </div>
                ))
              }
            </div>

            <div className={b('reassurance')}>
              Start with free plan. No credit card required. Sign up in 15 seconds.
            </div>

            {this.renderPlanChanger()}

            <table className={b('details')}>
              <tbody>
                <tr className={b('details-header-row')}>
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
                  {
                    plans.map(plan => (
                      <td key={plan.code} className={b('details-plan-name', { active: activePlan === plan.code })} >
                        {plan.name}
                      </td>
                    ))
                  }
                </tr>
                <tr className={b('details-header-row')}>
                  {
                    plans.map(plan => (
                      <td className={b('details-price-cell', { active: activePlan === 'developer' })}>
                        <div className={b('details-price')}>
                          <div className={b('details-price-inner')}>
                            {
                              plan.code === 'developer' &&
                                <div className={b('details-price-free')}>
                                  Free
                                </div>
                            }

                            {
                              plan.code === 'enterprise' &&
                                <div className={b('details-price-free')}>
                                  Let's talk
                                </div>
                            }

                            {
                              plan.monthlyPrice &&
                                [
                                  <div key="1" className={b('details-price-amount')}>
                                    { this.state.billing === 'monthly' ? `€${plan.monthlyPrice}` : `€${plan.yearlyPrice}` }
                                  </div>,
                                  <div key="2" className={b('details-price-period')}>
                                    per site/month
                                  </div>,
                                  <div key="3" className={b('details-price-prorated')}>
                                    Pro-rated daily
                                  </div>
                                ]
                            }
                          </div>
                        </div>
                      </td>
                    ))
                  }
                </tr>
                {
                  hintCodes.map(hintCode => (
                    <tr key={hintCode}>
                      <td className={b('details-feature-name')}>
                        <Tooltip hints={hints} code={hintCode}>
                          {hints[hintCode].name}
                        </Tooltip>
                      </td>
                      {
                        plans.map(plan => (
                          <td key={plan.code} className={b('details-feature-value', { active: activePlan === plan.code })}>
                            {
                              hints[hintCode].plans[plan.code] === ':check:' ?
                                <img src={check} alt="Available feature" />
                                :
                                <span>{hints[hintCode].plans[plan.code]}</span>
                            }
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
                <tr>
                  <td className={b('details-feature-name')}>
                  </td>
                  {
                    plans.map(plan => (
                      plan.code === 'enterprise' ?
                      <td className={b('details-cta', { active: activePlan === 'enterprise' })}>
                        <a href="mailto:support@datocms.com">
                          Get in touch
                        </a>
                      </td>
                      :
                      <td className={b('details-cta', { active: activePlan === plan.code })}>
                        <a href="https://dashboard.datocms.com/register">
                          Sign up
                        </a>
                      </td>
                    ))
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </Wrap>

        <Wrap>
          <div className={b('faq')}>
            <div className={b('faq-title')}>
              Frequently Asked Questions
            </div>
            <div className={b('faq-questions')}>
              {
                data.faqs.edges.map(e => e.node).map((faq) => (
                  <div className={b('faq-item')} key={faq.id}>
                    <div className={b('faq-item-question')}>{faq.question}</div>
                    <div className={b('faq-item-answer')}>{faq.answer}</div>
                  </div>
                ))
              }
            </div>
          </div>
          <Space both={6}>
          </Space>
        </Wrap>
      </Space>
    );
  }
}

export default PricingPage

export const query = graphql`
query PricingPageQuery {
  page: datoCmsPricingPage {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
  }

  faqs: allDatoCmsFaq(sort: { fields: [position] }) {
    edges {
      node {
        question
        answer
      }
    }
  }

  plans: allDatoCmsPlan(sort: {fields: [position]}) {
    edges {
      node{
        code
        name
        description
        monthlyPrice
        yearlyPrice
      }
    }
  }

  hints: allDatoCmsPricingHint(sort: {fields: [position]}) {
    edges {
      node {
        code
        description
        name
        plans {
          plan {
            code
          }
          value
        }
      }
    }
  }
}
`
