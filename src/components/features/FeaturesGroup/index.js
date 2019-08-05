import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './style.sass';
import { Wrap } from 'blocks';

import bem from 'utils/bem';

const b = bem.lock('FeaturesGroup');

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={500} classNames={b('fade')}>
    {children}
  </CSSTransition>
);

class FeaturesGroup extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selected: 0,
    };
  }

  render() {
    const { featuresGroup, evenOdd } = this.props;
    const features = featuresGroup.features;
    const selectedFeature = features[this.state.selected];

    return (
      <div className={b()}>
        <Wrap>
          <div>
            <div className={b('title')}>{featuresGroup.pageTitle}</div>
            <div className={b('subtitle')}>{featuresGroup.pageSubtitle}</div>
            <div className={b('container')}>
              <div className={b('toc')}>
                {features.map(({ title }, i) => (
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
              <TransitionGroup className={b('feature-container')}>
                <Fade key={selectedFeature.id}>
                  <div className={b('feature') + ' ' + b('feature--' + evenOdd)}>
                    <div className={b('feature-image')}>
                      {selectedFeature.image && (
                        <img src={selectedFeature.image.url} alt=" " />
                      )}
                    </div>
                    <div className={b('feature-content')}>
                      <div
                        className={b('feature-description')}
                        dangerouslySetInnerHTML={{
                          __html: selectedFeature.description.markdown.html,
                        }}
                      />
                    </div>
                  </div>
                </Fade>
              </TransitionGroup>
            </div>
          </div>
        </Wrap>
      </div>
    );
  }
}

export default FeaturesGroup;
