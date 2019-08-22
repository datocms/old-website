import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import bem from 'utils/bem';

import { Space, Wrap } from 'blocks';
import Layout from 'components/Layout';
import PageLayout from 'components/PageLayout';
import Search from 'components/Search';
import Link from 'components/Link';
import Textarea from 'react-autosize-textarea';

import './support.sass';

const b = bem.lock('SupportPage');
const d = bem.lock('Docs');

class Support extends React.Component {
  state = {
    components: [],
    categories: [],
  };

  async componentDidMount() {
    await Promise.all([this.fetchTopics(), this.fetchStatus()]);
  }

  async fetchTopics() {
    const response = await fetch(
      'https://community.datocms.com/categories.json',
    );
    const body = await response.json();
    this.setState({ categories: body.category_list.categories });
  }

  async fetchStatus() {
    const response = await fetch(
      'https://status.datocms.com/.netlify/functions/componentsStatus?days=1',
    );
    const body = await response.json();
    this.setState({ components: body });
  }

  render() {
    const { components, categories } = this.state;
    const page = this.props.data.datoCmsSupportPage;

    return (
      <Layout>
        <HelmetDatoCms seo={page.seoMetaTags} />
        <PageLayout
          noWrap
          title={page.title}
          subtitle={page.subtitle}
        >
          <Wrap>
            <div className={d()}>
              <div className={d('blocks')}>
                <Search big />
                <div className={d('blocks__inner')}>
                  <div className={d('block')}>
                    <Link to="/docs" className={d('block__body')}>
                      <div className={d('block__title')}>{page.documentationTitle}</div>
                      <div className={d('block__description')}>
                        {page.documentationText}
                      </div>
                      <div className={d('block__read-more')}>
                        Go to documentation
                      </div>
                    </Link>
                    <div className={d('block__items')}>
                      <div className={d('block__items__title')}>
                        Most requested resources...
                      </div>
                      <Link
                        to="/docs/general-concepts"
                        className={d('block__item')}
                      >
                        <span className={d('block__item__main')}>
                          General DatoCMS concepts
                        </span>
                      </Link>
                      <Link
                        to="/docs/general-concepts/pricing"
                        className={d('block__item')}
                      >
                        <span className={d('block__item__main')}>
                          Plans, pricing and billing
                        </span>
                      </Link>
                      <Link
                        to="/docs/content-delivery-api"
                        className={d('block__item')}
                      >
                        <span className={d('block__item__main')}>
                          GraphQL Content Delivery API reference
                        </span>
                      </Link>
                      <Link
                        to="/docs/content-management-api"
                        className={d('block__item')}
                      >
                        <span className={d('block__item__main')}>
                          REST Content Management API reference
                        </span>
                      </Link>
                      <Link to="/docs/guides" className={d('block__item')}>
                        <span className={d('block__item__main')}>
                          Other guides & tutorials
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className={d('block')}>
                    <Link
                      to="/docs/content-modelling"
                      className={d('block__body')}
                    >
                      <div className={d('block__title')}>{page.communityTitle}</div>
                      <div className={d('block__description')}>
                        {page.communityText}
                      </div>
                      <div className={d('block__read-more')}>Ask a question</div>
                    </Link>
                    <div className={d('block__items')}>
                      <div className={d('block__items__title')}>
                        Browse our forum channels...
                      </div>
                      {[
                        ['18', 'General channel'],
                        ['19', 'Suggest a new feature'],
                        ['13', 'REST and GraphQL APIs'],
                        ['5', 'Integrate with other tools'],
                        ['16', 'Propose & request plugins'],
                      ].map(([id, label]) => {
                        const category = categories.find(
                          ({ id: x }) => x.toString() === id,
                        );
                        return (
                          <Link
                            key={id}
                            to={`https://community.datocms.com/c/${category &&
                              category.slug}`}
                            className={d('block__item')}
                          >
                            <span className={d('block__item__main')}>
                              <span
                                className={d('block__item__circle')}
                                style={
                                  category && {
                                    backgroundColor: `#${category.color}`,
                                  }
                                }
                              />
                              {label}
                            </span>
                            {category && category.topics_all_time > 1 && (
                              <span className={d('block__item__detail')}>
                                {category.topics_all_time} discussions
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className={d('block')}>
                    <Link
                      to="https://status.datocms.com"
                      className={d('block__body')}
                    >
                      <div className={d('block__title')}>{page.statusTitle}</div>
                      <div className={d('block__description')}>
                        {page.statusText}
                      </div>
                      <div className={d('block__read-more')}>
                        Visit Status page
                      </div>
                    </Link>
                    <div className={d('block__items')}>
                      <div className={d('block__items__title')}>
                        System components
                      </div>
                      {[
                        ['cda', 'Content Delivery API'],
                        ['cma', 'Content Management API'],
                        ['assets', 'Assets CDN'],
                        ['administrativeAreas', 'Administrative interface'],
                        ['dashboard', 'Dashboard interface'],
                      ].map(([id, label]) => {
                        const component = components.find(
                          ({ id: x }) => x === id,
                        );
                        const status = component ? component.status : 'loading';
                        const statusLabel = {
                          up: 'Operational',
                          down: 'Down',
                          loading: 'Checking...',
                        };
                        return (
                          <div key={id} className={d('block__item')}>
                            <span className={d('block__item__main')}>
                              {label}
                            </span>
                            <span
                              className={d('block__item__detail', { status })}
                            >
                              {statusLabel[status]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Wrap>
          <div className={b()}>
            <Wrap>
              <div className={b('inner')}>
                <h4 className={b('title')}>{page.formTitle}</h4>
                <div className={b('description')}>
                  <div dangerouslySetInnerHTML={{ __html: page.formText.markdown.html }} />
                </div>

                <Space bottom={2}>
                  <form
                    method="POST"
                    name="fa-form-1"
                    action={page.formAction}
                    enctype="multipart/form-data"
                    accept-charset="utf-8"
                    className={b('form')}
                  >
                    <fieldset className={b('fieldset')}>
                      {page.form.map(field => (
                        <div className={b('field')}>
                          <label for={`_${field.inputName}`} className={b('label')}>
                            {field.label}
                            {field.required && (
                              <>
                                &nbsp;<span className={b('required')}> Required</span>
                              </>
                            )}
                          </label>
                          <div className={b('hint')}>{field.hint}</div>
                          {this.renderField(field)}
                        </div>
                      ))}

                      <input
                        type="submit"
                        value="Submit this support request"
                        className="button button--red button--normal-big button--expand"
                      />
                      <div className={b('footnote')}>
                        {page.formFootnote}
                      </div>
                    </fieldset>
                  </form>
                </Space>
              </div>
            </Wrap>
          </div>
        </PageLayout>
      </Layout>
    );
  }

  renderField(field) {
    switch (field.inputType) {
      case 'text':
      case 'email':
        return (
          <input
            id={`${field.inputName}`}
            name={`${field.inputName}`}
            placeholder={field.placeholder}
            size="30"
            type={field.inputType}
            required={field.required}
          />
        );
      case 'textarea':
        return (
          <Textarea
            async
            id={`${field.inputName}`}
            name={`${field.inputName}`}
            required={field.required}
            placeholder={field.placeholder}
            rows={5}
          />
        );
      case 'file':
        return (
          <input
            id={`${field.inputName}`}
            name={`${field.inputName}`}
            type="file"
            multiple=""
            required={field.required}
          />
        );
      case 'select':
        return (
          <select
            id={`${field.inputName}`}
            name={`${field.inputName}`}
            required={field.required}
          >
            <option value="">Please select one...</option>
            {field.placeholder
              .split('\n')
              .map(e => e.split('|'))
              .map(entry => (
                <option value={entry[0]}>{entry[1]}</option>
              ))}
          </select>
        );
      default:
        break;
    }
  }
}

export default Support;

export const query = graphql`
  query SupportQuery {
    datoCmsSupportPage {
      title
      subtitle

      documentationTitle
      documentationText

      communityTitle
      communityText

      statusTitle
      statusText

      formTitle
      formText: formTextNode {
        markdown: childMarkdownRemark {
          html
        }
      }

      formTitle
      formAction
      form {
        label
        placeholder
        hint
        inputType
        inputName
        required
      }
      formFootnote
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
