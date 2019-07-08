import React from 'react';
import Link from 'components/Link';
import { graphql } from 'gatsby';

import bem from 'utils/bem';
import { Wrap, Space } from 'blocks';
import Layout from 'components/Layout';

import './support.sass';

const b = bem.lock('SupportPage');

class Support extends React.Component {
  handleOpenChat(e) {
    e.preventDefault();
    window.kayako.maximize();
  }

  render() {
    const { authors } = this.props.data;

    return (
      <Layout>
        <Space both="10">
          <Wrap>
            <div className={b()}>
              <div className={b('left')}>
                <div className={b('logo')}>
                  {authors.edges.map(({ node: author }) => (
                    <img
                      alt={author.name}
                      src={`${author.avatar.url}?w=300&h=300&fit=crop&crop=faces`}
                      className={b('person')}
                      key={author.name}
                    />
                  ))}
                </div>
                <div className={b('title')}>We're here to help!</div>

                <div className={b('content')}>
                  <Space bottom={2}>
                    Start in our{' '}
                    <Link
                      to="https://community.datocms.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      community forum
                    </Link>{' '}
                    searching for existing information or asking your question.
                  </Space>

                  <Space bottom={2}>
                    Check our{' '}
                    <Link
                      to="https://status.datocms.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      status page
                    </Link>{' '}
                    to get a full picture on how our systems are going and on their performance on the past month.
                  </Space>

                  <Space bottom={2}>
                    For account specific questions or commercial inquiries you can use{' '}
                    <button onClick={this.handleOpenChat.bind(this)}>
                      the chat widget
                    </button>{' '}
                    or send us a mail at{' '}
                    <a href="mailto:support@datocms.com">support@datocms.com</a>,
                    we'll get back to you as soon as possible.
                  </Space>

                  You can also find help in our awesome{' '}
                  <Link to="/slack/">Slack channel</Link>.
                </div>
                <div className={b('info')}>
                  Higher priority will be given to customers with plans with
                  guarantees of faster response times.
                </div>
              </div>
            </div>
          </Wrap>
        </Space>
      </Layout>
    );
  }
}

export default Support;

export const query = graphql`
  query SupportQuery {
    authors: allDatoCmsTeamMember {
      edges {
        node {
          name
          avatar {
            url
          }
        }
      }
    }
  }
`;
