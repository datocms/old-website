import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import { Wrap } from 'blocks';

import bem from 'utils/bem';
import Layout from 'components/Layout';
import PageLayout from 'components/PageLayout';
import Img from 'gatsby-image';

import './about.sass';
import x from 'images/x.png';
import y from 'images/y.png';

const b = bem.lock('AboutPage');

const growth = [
  8679, 8698, 8698, 8732, 8820, 8873, 9142, 9142, 9142, 9142, 9157, 9270,
  9500, 9519, 9534, 9558, 9558, 9673, 9927, 9777, 9959, 10068, 10106,
  10077, 10086, 10110, 10216, 10216, 10235, 10254, 10269, 10319, 10351,
  10431, 10535, 10563, 10563, 10578, 10637, 10652, 10667, 10856, 10875,
  10875, 10875, 10856, 10894, 10998, 10998, 11013
];

class AboutPage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Layout>
        <HelmetDatoCms seo={data.page.seoMetaTags} />
        <PageLayout
          title="We build tools that work the way you do"
          subtitle="DatoCMS is here to help you create projects that truly feels yours"
          cta
          noWrap
        >
          <div className={b()}>
            <Wrap>
              <div className={b('section')}>
                <div className={b('section__content')}>
                  <h3>Designed by an agency with your needs in mind</h3>
                  <p>DatoCMS was born in 2015 as an internal tool of our agency, <a href="https://www.leanpanda.com/" target="_blank" rel="noreferrer noopener">LeanPanda</a>, and has grown under our loving care to make our customers happy... and their customers too.</p>
                  <p>We understand the needs of your clients and partners because <span>they are just like ours</span>. We know what worries you because we too choke up the night before the last deploy.</p>
                  <p>We don’t follow trends and we keep our things simple; we design every feature from the practical, real-world needs we see every day in our job.</p>
                </div>
                <div className={b('section__image')}>
                  <img src={x} />
                </div>
              </div>
              <div className={b('quote')}>
                <div className={b('quote__quote')}>
                  “This is precisely what I want: a CMS that's been built by an agency because they know what my clients need.”
                </div>
                <div className={b('quote__author')}>
                  Marc Amman, Matter Supply Co.
                </div>
              </div>
              <div className={b('section')}>
                <div className={b('section__image')}>
                  <img src={y} />
                </div>
                <div className={b('section__content')}>
                  <h3>Slowly and steady</h3>
                  <p>You can call us a bootstrap company, big enough to serve customers all over the world, small enough for a Friday evening spritz together.</p>
                  <p><span>We’re healthy, happy and — excuse our language — profitable.</span></p>
                  <p>We don’t want venture capital funding. We don’t have an outbound sales team. We like dogs more than unicorns, sharing than disrupting and we’re here to stay. We owe only our best efforts to you and ourselves. </p>
                  <p>We've put down our roots and we want them to grow. Slowly but steady.</p>
                </div>
              </div>
              <div className={b('quote')}>
                <div className={b('quote__quote')}>
                  “It's astounding that you're able to listen to everybody's feedback, not just ours, and act on it while still being such a small, bootstrapped company.”
                </div>
                <div className={b('quote__author')}>
                  Jeff Escalante, HashiCorp
                </div>
              </div>
            </Wrap>
            <div className={b('brag')}>
              <Wrap>
                <div className={b('brag__metrics')}>
                  <div className={b('brag__metric')}>
                    <div className={b('brag__metric__value')}>
                      12K
                    </div>
                    <div className={b('brag__metric__description')}>
                      Active subscriptions
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
                      1.5M
                    </div>
                    <div className={b('brag__metric__description')}>
                      Records created
                    </div>
                  </div>
                  <div className={b('brag__metric')}>
                    <div className={b('brag__metric__value')}>
                      450M
                    </div>
                    <div className={b('brag__metric__description')}>
                      Monthly API calls
                    </div>
                  </div>
                </div>
                <div className={b('brag__clients')}>
                  {
                    data.home.whosUsingDatocms.slice(0, 5).map(x => (
                      <img className={b('brag__client')} key={x.name} src={x.logo.url} />
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
                  <p>We're so transparent you can ask us anything. Just choose the right person!</p>
                </div>
              </Wrap>
              <div className={b('team__gallery')}>
                <div className={b('team__gallery__inner')} style={{ width: `${data.team.nodes.length * 450}px` }}>
                  {
                    data.team.nodes.map(member => (
                      <div key={member.id} className={b('team__gallery__item')}>
                        <Img fixed={member.avatar.fixed} />
                        <p className={b('team__member__name')}>{member.name}</p>
                        <p className={b('team__member__role')}>{member.role}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
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
          fixed(width: 400) {
            ...GatsbyDatoCmsFixed
          }
        }
      }
    }
  }
`;
