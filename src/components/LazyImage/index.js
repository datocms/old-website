import React from 'react'
import Waypoint from 'react-waypoint'
import bem from 'utils/bem'
import loadImage from 'image-promise';

const b = bem.lock('LazyImage')

import './style.sass'

export default class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  handleAppear() {
    loadImage(this.props.image.resize.src)
    .then(() => this.setState({ visible: true }));
  }

  render () {
    const { image, slow, height } = this.props;

    return (
      <Waypoint
        topOffset="-100px"
        onEnter={this.handleAppear.bind(this)}
      >
        <div
          className={b()}
          style={{
            height: `${height}px`,
            opacity: this.state.visible ? 1 : 0,
            backgroundImage: this.state.visible ? `url(${image.resize.src})` : '',
            transitionDuration: `${image.height / image.width * (slow ? 1.5 : 1)}s, 250ms`,
          }}
        />
      </Waypoint>
    );
  }
}


