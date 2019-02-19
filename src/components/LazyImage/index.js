import React from 'react';
import Waypoint from 'react-waypoint';
import bem from 'utils/bem';
import loadImage from 'image-promise';
import './style.sass';

const b = bem.lock('LazyImage');

export default class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  handleAppear() {
    loadImage(`${this.props.image.url}?w=800&auto=format`).then(() =>
      this.setState({ visible: true }),
    );
  }

  render() {
    const { image, slow, height } = this.props;

    return (
      <Waypoint topOffset="-100px" onEnter={this.handleAppear.bind(this)}>
        <div
          className={b()}
          style={{
            height: `${height}px`,
            opacity: this.state.visible ? 1 : 0,
            backgroundImage: this.state.visible
              ? `url(${image.url}?w=800&auto=format)`
              : '',
            transitionDuration: `${(image.height / image.width) *
              (slow ? 1.5 : 1)}s, 250ms`,
          }}
        />
      </Waypoint>
    );
  }
}
