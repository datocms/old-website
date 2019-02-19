import React from 'react';
import { withState } from 'recompose';
import './style.sass';

class RealTabs extends React.Component {
  handleClick(index, e) {
    e.preventDefault();
    this.props.onChange(index);
  }

  renderHandle(child, index) {
    if (!child) {
      return undefined;
    }

    const className = ['Tabs__handle'];

    if (this.props.handlesAsCode) {
      className.push('is-code');
    }

    if (index === this.props.activeIndex) {
      className.push('is-active');
    } else if (child.props.invalid) {
      className.push('is-invalid');
    }

    return (
      <button
        key={index}
        onClick={this.handleClick.bind(this, index)}
        className={className.join(' ')}
      >
        <span>{child.props.title}</span>
      </button>
    );
  }

  renderContent(child, index) {
    if (!child) {
      return undefined;
    }

    return (
      <div
        key="content"
        className="Tabs__content"
        style={{ display: index === this.props.activeIndex ? 'block' : 'none' }}
      >
        {child.props.children}
      </div>
    );
  }

  render() {
    const { children, forwardedRef } = this.props;

    return (
      <div className="Tabs" ref={forwardedRef}>
        <div className="Tabs__handles">
          {React.Children.map(children, this.renderHandle.bind(this))}
        </div>
        {React.Children.map(children, this.renderContent.bind(this))}
      </div>
    );
  }
}

export const ControlledTabs = React.forwardRef((props, ref) => (
  <RealTabs {...props} forwardedRef={ref} />
));

export const Tabs = withState('activeIndex', 'onChange', 0)(RealTabs);

export function Tab() {
  return null;
}
