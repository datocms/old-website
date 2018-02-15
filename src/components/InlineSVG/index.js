import React from 'react'
import md5 from 'blueimp-md5'
import { withPrefix } from 'gatsby-link'

export default class InlineSVG extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageBody: null };
  }

  componentDidMount() {
    const { image } = this.props;
    const url = `/features/${md5(image.url)}.svg`;

    fetch(url)
    .then(response => response.text())
    .then(body => this.setState({ imageBody: body }));
  }

  render() {
    const { image } = this.props;

    return this.state.imageBody ?
      <div dangerouslySetInnerHTML={{ __html: this.state.imageBody }} /> :
      <div />;
  }
}
