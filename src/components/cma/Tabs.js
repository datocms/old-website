import React from 'react';

export class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  handleClick(index, e) {
    e.preventDefault();
    this.setState({ activeIndex: index });
  }

  renderHandle(child, index) {
    if (!child) {
      return undefined;
    }

    const className = ['Tabs__handle'];

    if (index === this.state.activeIndex) {
      className.push('is-active');
    } else if (child.props.invalid) {
      className.push('is-invalid');
    }

    return (
      <a
        key={index}
        href="#"
        onClick={this.handleClick.bind(this, index)}
        className={className.join(' ')}
      >
        {child.props.title}
      </a>
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
        style={{ display: (index === this.state.activeIndex ? 'block' : 'none') }}
      >
        {child.props.children}
      </div>
    );
  }

  render() {
    const { children, className, extraInfo } = this.props;

    return (
      <div className={`Tabs ${className || ''}`}>
        <div className="Tabs__handles">
          {React.Children.map(children, this.renderHandle.bind(this))}
          {
            extraInfo &&
              <div className="Tabs__extra-info">
                {extraInfo}
              </div>
          }
        </div>
        {React.Children.map(children, this.renderContent.bind(this))}
      </div>
    );
  }
}

export function Tab() {
  return null;
}

