import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import bem from 'utils/bem';

import { Space } from 'blocks';
import Layout from 'components/Layout';
import PageLayout from 'components/PageLayout';
import Search from 'components/Search';

import './support.sass';

const b = bem.lock('SupportPage');

class Support extends React.Component {
  render() {
    const page = this.props.data.datoCmsSupportPage;

    return (
      <Layout>
        <HelmetDatoCms seo={page.seoMetaTags} />
        <PageLayout title={page.title}>
          <div className={b()}>
            <div className={b('people')}>
              {page.people.map((person) => (
                <img
                  alt={person.name}
                  src={`${person.avatar.url}?w=300&h=300&fit=crop&crop=faces`}
                  className={b('person')}
                  key={person.name}
                />
              ))}
            </div>

            <div className="content-body">
              <h4>{page.documentationTitle}</h4>
              <span
                dangerouslySetInnerHTML={{
                  __html: page.documentationText.markdown.html,
                }}
              />
              <div className={b('search-line')}>
                <span>{page.searchIntro}</span>
                <Search small placeholder={page.searchPlaceholder} />
              </div>

              <h4>{page.communityTitle}</h4>
              <div className={b('community-text')}
                dangerouslySetInnerHTML={{
                  __html: page.communityText.markdown.html,
                }}
              />
              <img
                  className={b('community-image')}
                  alt={page.communityTitle}
                  src={`${page.communityImage.url}?w=300&h=300&fit=crop&crop=faces`}
                />

              <p className={b('before-form')}>{page.beforeForm}</p>
              
              <h2>{page.formTitle}</h2>

              <Space bottom={2}>
                <form
                  method="POST"
                  name="fa-form-1"
                  action={page.formAction}
                  enctype="multipart/form-data"
                  accept-charset="utf-8"
                  className="form"
                >
                  <fieldset className="fieldset">
                    {page.form.map((field) => (
                      <div class="form__field">
                        <label for={`_${field.inputName}`} class="form__label">
                          {field.label}
                          {field.required && (
                            <span class="form__field__required"> Required</span>
                          )}
                        </label>
                        {this.renderField(field)}
                        <div class="form__hint">{field.hint}</div>
                      </div>
                    ))}

                    <div className={b('form__send')}>
                      <input type="submit" value="Send" className="button button--red button--normal-big button--expand" />
                    </div>
                  </fieldset>
                </form>
              </Space>

              <div
                dangerouslySetInnerHTML={{
                  __html: page.bottomContent.markdown.html,
                }}
              />
            </div>
          </div>
        </PageLayout>
      </Layout>
    );
  }

  renderField(field) {
    switch(field.inputType) {
      case 'text':
      case 'email':
        return (
          <input id={`${field.inputName}`} name={`${field.inputName}`} placeholder={field.placeholder} size="30" type={field.inputType} required={field.required} />
        )
      case 'textarea':
        return (
          <textarea cols="40" id={`${field.inputName}`} name={`${field.inputName}`} rows="15" required={field.required}></textarea>
        )
      case 'file':
        return (
          <input id={`${field.inputName}`} name={`${field.inputName}`} type="file" multiple="" required={field.required} />
        )
      case 'select':
        return (
          <select id={`${field.inputName}`} name={`${field.inputName}`} required={field.required}>
            <option value="">Please select one...</option>
            {field.placeholder.split('\n').map(e => e.split('|')).map( entry => (
              <option value={entry[0]}>{entry[1]}</option>
            ))}
          </select>
        )
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
      people {
        name
        avatar {
          url
        }
      }
      documentationTitle
      documentationText: documentationTextNode {
        markdown: childMarkdownRemark {
          html
        }
      }
      searchIntro
      searchPlaceholder
      communityTitle
      communityText: communityTextNode {
        markdown: childMarkdownRemark {
          html
        }
      }
      communityImage {
        url
      }
      beforeForm
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
      bottomContent: bottomContentNode {
        markdown: childMarkdownRemark {
          html
        }
      }
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
