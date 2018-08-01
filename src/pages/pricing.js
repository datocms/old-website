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
import { parse } from 'flatted/cjs';
import { camelize } from 'humps';

const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];

function prettyBytes(num) {
  if (isNaN(parseFloat(num)) || !isFinite(num)) {
    return '-';
  }

  if (num === 0) {
    return '0 bytes';
  }

  const number = Math.floor(Math.log(num) / Math.log(1024));

  return `${(num / (1024 ** Math.floor(number))).toFixed(0)} ${units[number]}`;
}

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const b = bem.lock('PricingPage')
const Tooltip = ({ children, hints, apiId }) => (
  <span className={bem('Tooltip', { })}>
    {children} <img src={tooltip} />
    <span className="Tooltip__hint">
      {hints[apiId].description}
    </span>
  </span>
)

const formatValue = (name, value) => {
  if (name.endsWith("Bytes")) {
    return prettyBytes(value);
  }

  if (Number.isInteger(value)) {
    return numberWithCommas(value);
  }

  return value;
}

const ValueForLimit = ({ apiId, plan, datoPlan, hint }) => {
  if (datoPlan && datoPlan.attributes.hasOwnProperty(apiId)) {
    const value = datoPlan.attributes[apiId];

    if (value === null) {
      return (
        <span>Unlimited</span>
      );
    }

    if (value === true) {
      return (
        <img src={check} alt="Available feature" />
      );
    }

    return (
      <span>{formatValue(apiId, value)}</span>
    );
  }

  const value = hint.plans[plan.apiId];

  if (value === ':check:') {
    return <img src={check} alt="Available feature" />;
  }

  if (value === undefined) {
    return (
      <span>
        Unlimited
      </span>
    );
  }

  return <span>{value}</span>;
}

class PricingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activePlan: '1', billing: 'yearly' };
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
    const { data } = this.props;

    const plans = data.plans.edges.map(e => e.node);
    const datoPlans = parse(data.datoPlans.body);

    return (
      <div className={b('plan-changer')}>
        {
          plans.map(plan => {
            const datoPlan = datoPlans.find(p => p.id === plan.apiId);

            return (
              <button
                key={plan.apiId}
                className={b('plan-changer__plan', { active: activePlan === plan.apiId })}
                onClick={this.handleChangePlan.bind(this, plan.apiId)}
              >
                {plan.name === 'Developer' ? 'Dev' : plan.name}
              </button>
            )
          })
        }
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

  renderPlanRecap(hints, plan) {
    const { activePlan } = this.state;

    const datoPlans = parse(this.props.data.datoPlans.body);
    const datoPlan = datoPlans.find(p => p.id === plan.apiId);

    const isEnterprise = !datoPlan;
    const isFree = datoPlan && datoPlan.attributes.monthlyPrice === 0;

    return (
      <div key={plan.apiId} className={b('recap-item', { active: activePlan === plan.apiId })}>
        <div className={b('recap-item-plan-name')}>
          {plan.name}
        </div>
        <div className={b('recap-item-for')}>
          {plan.description}
        </div>
        <div className={b('recap-item-price')}>
          {
            isFree &&
              <div className={b('recap-item-price-free')}>
                Free
              </div>
          }
          {
            isEnterprise &&
              <div className={b('recap-item-price-free')}>
                Let's talk
              </div>
          }
          {
            !isFree && !isEnterprise &&
              [
                <div key="amount" className={b('recap-item-price-amount')}>
                  { this.state.billing === 'monthly' ? `€${datoPlan.attributes.monthlyPrice}` : `€${parseInt(datoPlan.attributes.yearlyPrice / 12)}` }
                </div>,
                <div key="period" className={b('recap-item-price-period')}>
                  per site/month
                </div>
              ]
          }
        </div>
        <div className={b('recap-item-specs')}>
          {
            isEnterprise ?
              <div className={b('recap-item-everything')}>
                Everything
              </div>
              :
              <div>
                <div className={b('recap-item-spec')}>
                  <Tooltip hints={hints} apiId="users">
                    <ValueForLimit
                      apiId="users"
                      hint={hints.users}
                      plan={plan}
                      datoPlan={datoPlans.find(p => p.id === plan.apiId)}
                    /> invitations
                  </Tooltip>
                </div>
                <div className={b('recap-item-spec')}>
                  <Tooltip hints={hints} apiId="uploadableBytes">
                    <ValueForLimit
                      apiId="uploadableBytes"
                      hint={hints.uploadableBytes}
                      plan={plan}
                      datoPlan={datoPlans.find(p => p.id === plan.apiId)}
                    /> file storage
                  </Tooltip>
                </div>
                <div className={b('recap-item-spec')}>
                  <Tooltip hints={hints} apiId="items">
                    <ValueForLimit
                      apiId="items"
                      hint={hints.items}
                      plan={plan}
                      datoPlan={datoPlans.find(p => p.id === plan.apiId)}
                    /> records
                  </Tooltip>
                </div>
              </div>
          }
        </div>
        {
          isEnterprise ?
            <a href="mailto:support@datocms.com" className={b('recap-item-cta')}>
              Get in touch
            </a>
            :
            <a
              className={b('recap-item-cta')}
              href="https://dashboard.datocms.com/signup"
            >
              Sign up
            </a>
        }
      </div>
    );
  }

  renderTablePriceRow(plan) {
    const { activePlan } = this.state;

    const datoPlans = parse(this.props.data.datoPlans.body);
    const datoPlan = datoPlans.find(p => p.id === plan.apiId);

    const isEnterprise = !datoPlan;
    const isFree = datoPlan && datoPlan.attributes.monthlyPrice === 0;

    return (
      <td key={plan.apiId} className={b('details-price-cell', { active: activePlan === plan.apiId })}>
        <div className={b('details-price')}>
          <div className={b('details-price-inner')}>
            {
              isFree &&
                <div className={b('details-price-free')}>
                  Free
                </div>
            }

            {
              isEnterprise &&
                <div className={b('details-price-free')}>
                  Let's talk
                </div>
            }

            {
              !isFree && !isEnterprise &&
                [
                  <div key="1" className={b('details-price-amount')}>
                    { this.state.billing === 'monthly' ? `€${datoPlan.attributes.monthlyPrice}` : `€${parseInt(datoPlan.attributes.yearlyPrice / 12)}` }
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
    );
  }

  render() {
    const { data } = this.props;
    const { activePlan } = this.state;

    const plans = data.plans.edges.map(e => e.node)
    const hints = data.hints.edges.map(e => e.node).reduce((acc, hint) => {
      acc[camelize(hint.apiId)] = {
        name: hint.name,
        description: hint.description,
        plans: hint.plans.reduce((acc, plan) => {
          acc[plan.plan.apiId] = plan.value;
          return acc;
        }, {})
      };
      return acc;
    }, {})

   const hintKeys = Object.keys(hints);

    const datoPlans = parse(this.props.data.datoPlans.body);


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
              {plans.map(this.renderPlanRecap.bind(this, hints))}
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
                      <td key={plan.apiId} className={b('details-plan-name', { active: activePlan === plan.apiId })} >
                        {plan.name}
                      </td>
                    ))
                  }
                </tr>
                <tr className={b('details-header-row')}>
                  {plans.map(this.renderTablePriceRow.bind(this))}
                </tr>
                {
                  hintKeys.map(hintKey => (
                    <tr key={hintKey}>
                      <td className={b('details-feature-name')}>
                        <Tooltip hints={hints} apiId={hintKey}>
                          {hints[hintKey].name}
                        </Tooltip>
                      </td>
                      {
                        plans.map(plan => (
                          <td key={plan.apiId} className={b('details-feature-value', { active: activePlan === plan.apiId })}>
                            <ValueForLimit
                              apiId={hintKey}
                              hint={hints[hintKey]}
                              plan={plan}
                              datoPlan={datoPlans.find(p => p.id === plan.apiId)}
                            />
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
                      <td className={b('details-cta', { active: activePlan === plan.apiId })}>
                        <a href="mailto:support@datocms.com">
                          Get in touch
                        </a>
                      </td>
                      :
                      <td className={b('details-cta', { active: activePlan === plan.apiId })}>
                        <a href="https://dashboard.datocms.com/signup">
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
        apiId
        name
        description
      }
    }
  }

  hints: allDatoCmsPricingHint(sort: {fields: [position]}) {
    edges {
      node {
        apiId
        name
        description
        plans {
          plan { apiId }
          value
        }
      }
    }
  }

  datoPlans: plans {
    body
  }
}
`
