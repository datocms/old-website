import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import { Wrap } from 'blocks';
import parse from 'html-react-parser';

import bem from 'utils/bem';
import Layout from 'components/Layout';
import PageLayout from 'components/PageLayout';
import Img from 'gatsby-image';

import './about.sass';

const b = bem.lock('AboutPage');

class AboutPage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Layout>
        <HelmetDatoCms seo={data.page.seoMetaTags} />
        <PageLayout
          title={data.about.title}
          subtitle={data.about.subtitle}
          cta
          noWrap
        >
          <div className={b()}>
            <Wrap>
              {
                data.about.content.map(block => (
                  <React.Fragment key={JSON.stringify(block)}>
                    {
                      block.__typename === 'DatoCmsTextImage' &&
                        <div className={b('section')}>
                          <div className={b('section__content')}>
                            {parse(block.text.md.html)}
                          </div>
                          <div className={b('section__image')}>
                            <img src={block.image.url} alt={block.image.alt}/>
                          </div>
                        </div>
                    }
                    {
                      block.__typename === 'DatoCmsQuote' &&
                        <div className={b('quote')}>
                          <div className={b('quote__quote')}>
                            {parse(block.quote.md.html)}
                          </div>
                          <div className={b('quote__author')}>
                            {block.author}
                          </div>
                        </div>
                    }
                  </React.Fragment>
                ))
              }
            </Wrap>
            <div className={b('brag')}>
              <Wrap>
                <div className={b('brag__metrics')}>
                  <div className={b('brag__metric')}>
                    <div className={b('brag__metric__value')}>
                      1,600
                    </div>
                    <div className={b('brag__metric__description')}>
                      Paying customers
                    </div>
                  </div>
                  <div className={b('brag__metric')}>
                    <div className={b('brag__metric__value')}>
                      15%
                    </div>
                    <div className={b('brag__metric__description')}>
                      Month-over-month revenue growth
                    </div>
                  </div>
                  <div className={b('brag__metric')}>
                    <div className={b('brag__metric__value')}>
                      2.7M
                    </div>
                    <div className={b('brag__metric__description')}>
                      Records created
                    </div>
                  </div>
                  <div className={b('brag__metric')}>
                    <div className={b('brag__metric__value')}>
                      800M
                    </div>
                    <div className={b('brag__metric__description')}>
                      Monthly API calls
                    </div>
                  </div>
                </div>
                <div className={b('brag__clients')}>
                  {
                    data.home.whosUsingDatocms.slice(0, 5).map(x => (
                      <img className={b('brag__client')} key={x.name} alt={x.name} src={x.logo.url} />
                    ))
                  }
                </div>
              </Wrap>
            </div>
            <div className={b('team')}>
              <Wrap>
                <div className={b('team__content')}>
                  <h3>Ask us anything!</h3>
                  <p>At DatoCMS we believe in beauty, harmony and sustainable growth. We love sharing knowledge, developing skills, and giving our team room to pursue personal projects.</p>
                </div>
                <div className={b('team__gallery')}>
                  {
                    data.team.nodes.map(member => (
                      <div key={member.id} className={b('team__gallery__item')}>
                        <Img fluid={member.avatar.fluid} />
                        <p className={b('team__member__name')}>{member.name}</p>
                        <p className={b('team__member__role')}>{member.role}</p>
                      </div>
                    ))
                  }
                </div>
              </Wrap>
            </div>
          </div>
        </PageLayout>
      </Layout>
    );
  }
}

export default AboutPage;

export const query = graphql`
  query AboutPage {
    page: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    home: datoCmsHomePage {
      whosUsingDatocms {
        name
        logo {
          url
        }
      }
    }
    team: allDatoCmsTeamMember(sort: { fields: [position], order: ASC }) {
      nodes {
        id
        name
        role
        avatar {
          fluid(maxWidth: 400) {
            ...GatsbyDatoCmsFluid
          }
        }
      }
    }
    about: datoCmsAboutPage {
      title
      subtitle
      content {
        __typename
        ... on DatoCmsTextImage {
          text: textNode {
            md: childMarkdownRemark {
              html
            }
          }
          image {
            url
            alt
          }
        }
        ... on DatoCmsQuote {
          quote: quoteNode {
            md: childMarkdownRemark {
              html
            }
          }
          author
        }
      }
    }
  }
`;
