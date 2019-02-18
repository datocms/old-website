import React from 'react';
import './Tabs.sass';

const store = {
  listeners: [],
  activeIndex: 0,
  setActiveIndex(index) {
    this.activeIndex = index;
    this.listeners.forEach(cb => cb(index));
  },
  subscribe(cb) {
    this.listeners.push(cb);
    return () => this.listeners = this.listeners.filter(c => c !== cb);
  }
};

export class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: store.activeIndex };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe((activeIndex) => {
      this.setState({ activeIndex });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleClick(index, e) {
    e.preventDefault();

    const previousY = this.el.getBoundingClientRect().top;

    store.setActiveIndex(index);

    setTimeout(() => {
      const currentY = this.el.getBoundingClientRect().top;
      window.scrollBy(0, currentY - previousY);
      window.dispatchEvent(new Event('resize'));
    }, 20);
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
      <button
        ref={(el) => this.el = el}
        key={index}
        onClick={this.handleClick.bind(this, index)}
        className={className.join(' ')}
      >
        {child.props.title}
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

