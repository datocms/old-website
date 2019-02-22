import React from 'react';
import Link from 'components/Link';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import bem from 'utils/bem';
import './style.sass';
import 'components/DocAside/content.sass';

import Layout from 'components/Layout';
import PageLayout from 'components/PageLayout';

const b = bem.lock('GuidesPage');

export default class GuidesPage extends React.Component {
  render() {
    return (
      <Layout>
        <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
        <PageLayout
          bg2
          title="Guides & tutorials"
          subtitle="Walk through specific problems and use cases"
        >
          <div className={b()}>
            {this.props.pageContext.guides.map(guide => (
              <div className={b('cell')}>
                <Link to={guide.path} className={b('guide')} key={guide.path}>
                  <div className={b('guide__type')}>Guide</div>
                  <h6 className={b('guide__title')}>{guide.title}</h6>
                  <div className={b('guide__excerpt')}>{guide.excerpt}</div>
                </Link>
              </div>
            ))}
            {this.props.pageContext.tutorials.map(guide => (
              <div className={b('cell')}>
                <Link to={guide.url} className={b('guide')} key={guide.url}>
                  <div className={b('guide__type')}>Tutorial</div>
                  <h6 className={b('guide__title')}>{guide.title}</h6>
                  <div className={b('guide__excerpt')}>{guide.excerpt}</div>
                </Link>
              </div>
            ))}
            <div className={b('cell', { placeholder: true })}><div /></div>
            <div className={b('cell', { placeholder: true })}><div /></div>
            <div className={b('cell', { placeholder: true })}><div /></div>
            <div className={b('cell', { placeholder: true })}><div /></div>
            <div className={b('cell', { placeholder: true })}><div /></div>
          </div>
        </PageLayout>
      </Layout>
    );
  }
}

export const query = graphql`
  query GuidesPageQuery {
    page: datoCmsLearnPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
