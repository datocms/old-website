import React from 'react';
import Link from 'components/Link';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './style.sass';
import { Wrap, button } from 'blocks';

import InlineSVG from 'components/InlineSVG';
import bem from 'utils/bem';

const b = bem.lock('HomeFeatures');

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={500} classNames={b('fade')}>
    {children}
  </CSSTransition>
);

class HomeFeatures extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selected: 0,
    };
  }

  render() {
    const { data } = this.props;
    const selectedFeature = data[this.state.selected];

    return (
      <div className={b()}>
        <Wrap>
          <div>
            <div className={b('title')}>Everything you need from a CMS</div>
            <div className={b('container')}>
              <div className={b('left')}>
                <div className={b('toc')}>
                  {data.map(({ title, description }, i) => (
                    <div key={i} className={b('toc-item')}>
                      <button
                        className={b('toc-item-button', {
                          selected: i === this.state.selected,
                        })}
                        onClick={() => this.setState({ selected: i })}
                      >
                        {title}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className={b('right')}>
                <TransitionGroup className={b('feature-container')}>
                  <Fade key={selectedFeature.id}>
                    <div className={b('feature')}>
                      <div className={b('feature-image')}>
                        {selectedFeature.image && (
                          <InlineSVG image={selectedFeature.image} />
                        )}
                      </div>
                      <div className={b('feature-content')}>
                        <h5 className={b('feature-title')}>
                          {selectedFeature.title}
                        </h5>
                        <div
                          className={b('feature-description')}
                          dangerouslySetInnerHTML={{
                            __html: selectedFeature.description.markdown.html,
                          }}
                        />
                        <Link to="/features/" className={button({ red: true })}>
                          See all features
                        </Link>
                      </div>
                    </div>
                  </Fade>
                </TransitionGroup>
              </div>
            </div>
          </div>
        </Wrap>
      </div>
    );
  }
}

export default HomeFeatures;
