import React from 'react'
import PropTypes from 'prop-types'
import Postmate from 'postmate'
import { cx, css, injectGlobal } from 'emotion'

const extractId = (string) => string.match(/\-([0-9]+)/)[1]

export default class DatoEditor extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { active: false };
  }

  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();

    this.context.postmate.emit(
      'editRecord',
      {
        id: extractId(this.props.record.id),
      }
    )
  }

  handleActive(data) {
    this.setState({ active: data });
  }

  handleInactive() {
    this.setState({ active: null });
  }

  componentDidMount() {
    this.unlisten = this.context.addDatoEditorListener(
      extractId(this.props.record.id),
      {
        onActive: this.handleActive.bind(this),
        onInactive: this.handleInactive.bind(this)
      }
    );
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { component = "div", record, ...props } = this.props;
    const { active } = this.state;

    const style = {
      outline: `rgba(0,0,0,.3) dashed 1px`,
      outlineOffset: `8px`,
      boxShadow: `0 0 1px 1px rgba(255, 255, 255, .5)`,
    }

    if (active) {
      style.outline = `2px solid ${active.color}`;
    }

    return React.createElement(
      component,
      {
        ...props,
        style,
        onClick: this.handleClick.bind(this),
      }
    )
  }
}

DatoEditor.contextTypes = {
  postmate: PropTypes.object,
  addDatoEditorListener: PropTypes.func,
}
