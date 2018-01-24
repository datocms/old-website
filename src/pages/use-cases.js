import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Masonry from 'react-masonry-component'

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import Browser from 'components/Browser'

import './use-cases.sass'

const b = bem.lock('UseCasesPage')

class UseCasesPage extends React.Component {
  render() {
    const { data } = this.props;
    const websites = data.websites.edges.map(e => e.node);

    return (
      <div>
        <Space both="10">
          <div className={b()}>
            <div className={b('title')}>
              Use Cases
            </div>
            <div className={b('content')}>
              <Wrap>
                <Masonry
                  options={{
                    columnWidth: '.UseCasesPage__grid-sizer',
                    gutter: '.UseCasesPage__gutter-sizer',
                    itemSelector: '.UseCasesPage__website',
                    percentPosition: true
                  }}
                >
                  <div className={b('grid-sizer')} />
                  <div className={b('gutter-sizer')} />
                  {
                    websites.map((website, i) => (
                      <a href={website.url} className={b('website', { [`type-${i % 2}`]: true })} key={website.id}>
                        <Browser
                          small
                          title={website.title}
                          address={website.url}
                        >
                            <div className={b('website-name')}>
                              {website.title}
                            </div>
                            <div
                              className={b('screen')}
                              style={{
                                backgroundImage: `url(${website.image.resize.src})`
                              }}
                            />
                        </Browser>
                      </a>
                    ))
                  }
                </Masonry>
              </Wrap>
            </div>
          </div>
        </Space>
      </div>
    );
  }
}

export default UseCasesPage

export const query = graphql`
query UseCasesQuery {
  websites: allDatoCmsWebsite {
    edges {
      node {
        id
        title
        url
        image {
          resize(width: 700, imgixParams: { fm: "jpg", q: 90 }) {
            src
          }
        }
      }
    }
  }
}
`
