import React from 'react'
import PropTypes from 'prop-types'
import Postmate from 'postmate'

Postmate.debug = true

export default class DatoProvider extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { postmate: null };
    this.listeners = {};
  }

  componentDidMount() {
    new Postmate.Model({
      editingRecord: this.handleEditingRecord.bind(this),
    }).then(postmate => {
      this.setState({ postmate });
    });
  }

  handleEditingRecord(data) {
    Object.entries(this.listeners).forEach(([id, listeners]) => {
      if (data.id === id) {
        listeners.forEach(listener => listener.onActive(data));
      } else {
        listeners.forEach(listener => listener.onInactive());
      }
    })
  }

  getChildContext() {
    return {
      postmate: this.state.postmate,
      addDatoEditorListener: (id, callback) => {
        this.listeners[id] = this.listeners[id] || [];
        this.listeners[id].push(callback);
        return () => {
          this.listeners[id] = this.listeners[id].filter(c => c !== callback);
        };
      }
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

DatoProvider.childContextTypes = {
  postmate: PropTypes.object,
  addDatoEditorListener: PropTypes.func,
}

