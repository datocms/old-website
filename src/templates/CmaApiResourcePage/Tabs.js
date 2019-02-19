import React from 'react';
import { ControlledTabs as InnerTabs, Tab as InnerTab } from 'components/Tabs';

const store = {
  listeners: [],
  activeIndex: 0,
  setActiveIndex(index) {
    this.activeIndex = index;
    this.listeners.forEach(cb => cb(index));
  },
  subscribe(cb) {
    this.listeners.push(cb);
    return () => (this.listeners = this.listeners.filter(c => c !== cb));
  },
};

export class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = { activeIndex: store.activeIndex };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(activeIndex => {
      this.setState({ activeIndex });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(index) {
    const previousY = this.ref.current.getBoundingClientRect().top;

    store.setActiveIndex(index);

    setTimeout(() => {
      const currentY = this.ref.current.getBoundingClientRect().top;
      window.scrollBy(0, currentY - previousY);
      window.dispatchEvent(new Event('resize'));
    }, 20);
  }

  render() {
    return (
      <InnerTabs
        {...this.props}
        ref={this.ref}
        onChange={this.handleChange.bind(this)}
        activeIndex={this.state.activeIndex}
      />
    );
  }
}

export const Tab = InnerTab;
