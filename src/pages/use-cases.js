import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Masonry from 'react-masonry-component'
import loadImage from 'image-promise';
import Waypoint from 'react-waypoint'
import Sticky from 'react-stickynode';

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import Browser from 'components/Browser'

import './use-cases.sass'

const b = bem.lock('UseCasesPage')

class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  handleAppear() {
    loadImage(this.props.website.image.resize.src)
    .then(() => this.setState({ visible: true }));
  }

  render () {
    const { website } = this.props;

    return (
      <Waypoint
        topOffset="-100px"
        onEnter={this.handleAppear.bind(this)}
      >
        <div
          className={b('screen')}
          style={{
            opacity: this.state.visible ? 1 : 0,
            backgroundImage: this.state.visible ? `url(${website.image.resize.src})` : '',
            transitionDuration: `${website.image.height / website.image.width * (website.highlighted ? 1.5 : 1)}s, 250ms`,
          }}
        />
      </Waypoint>
    );
  }
}

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
                          .map((website, i) => (
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
                                  <LazyImage website={website} />
                                  <div className={b('website-technologies')}>
                                    {
                                      website.technologies.map(tech => (
                                        <div className={b('website-technology')} key={tech.name}>
                                          <img src={tech.logo.url} className={b('website-technology-logo')} />
                                          <div className={b('website-technology-name')}>
                                            {tech.name}
                                          </div>
                                        </div>
                                      ))
                                    }
                                  </div>
                              </Browser>
                            </a>
                          ))
                        }
                      </Masonry>
                    </div>
                  </div>
                ))
              }
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
