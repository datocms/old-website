import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Masonry from 'react-masonry-component'
import Sticky from 'react-stickynode';

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import Browser from 'components/Browser'
import LazyImage from 'components/LazyImage'

import './use-cases.sass'

const b = bem.lock('UseCasesPage')

class UseCasesPage extends React.Component {
  render() {
    const { data } = this.props;
    const websites = data.websites.edges.map(e => e.node).filter(w => w.image);

    return (
      <div>
        <Space both="10">
          <div className={b()}>
            <div className={b('title')}>
              Use Cases
            </div>
            <div className={b('content')}>
              <Wrap>
                {
                  data.useCases.edges.map(({ node: useCase }) => (
                    <div className={b('use-case')} key={useCase.id}>
                      <div className={b('use-case-content')} id={`use-case-content-${useCase.id}`}>
                        <Sticky top={50} bottomBoundary={`#use-case-content-${useCase.id}`}>
                          <div className={b('use-case-content-inner')}>
                            <h3 className={b('use-case-title')}>
                              {useCase.title}
                            </h3>
                            <div
                              className={b('use-case-description')}
                              dangerouslySetInnerHTML={{ __html: useCase.description.markdown.html }}
                            />
                          </div>
                        </Sticky>
                      </div>
                      <div className={b('use-case-gallery')}>
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
                            websites
                            .filter(website => website.useCase.id === useCase.id)
                            .map((website, i) => {
                              const tech = website.technologies.find(x => x.type.slug === 'static-generator');

                              return (
                                <a
                                  href={website.url}
                                  className={b('website', { highlighted: website.highlighted })}
                                  key={website.id}
                                >
                                  <Browser
                                    small
                                    title={website.title}
                                    address={website.url}
                                  >
                                      <LazyImage
                                        height={i % 2 === 0 ? 300 : 200}
                                        image={website.image}
                                        slow={website.highlighted}
                                      />
                                  </Browser>

                                  {
                                    tech &&
                                      <div className={b('website-technologies')}>
                                        <div className={b('website-technology')} key={tech.name}>
                                          <img src={tech.logo.url} className={b('website-technology-logo')} />
                                          <div className={b('website-technology-name')}>
                                            Made with {tech.name}
                                          </div>
                                        </div>
                                      </div>
                                  }
                                </a>
                              )
                            })
                          }
                        </Masonry>
                      </div>
                    </div>
                  ))
                }
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
  useCases: allDatoCmsUseCase(sort: { fields: [position] }) {
    edges {
      node {
        id
        title
        description: descriptionNode {
          markdown: childMarkdownRemark {
            html
          }
        }
      }
    }
  }

  websites: allDatoCmsWebsite(sort: { fields: [position] }) {
    edges {
      node {
        id
        title
        url
        highlighted
        technologies {
          name
          logo {
            url
          }
          type: integrationType {
            slug
          }
        }
        useCase {
          id
        }
        image {
          width
          height
          resize(width: 700, imgixParams: { fm: "jpg", q: 90 }) {
            src
          }
        }
      }
    }
  }
}
`
