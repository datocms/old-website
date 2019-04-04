import React from 'react';
import MediaQuery from 'react-responsive';
import Sticky from 'react-stickynode';

export default function ResponsiveSticky({ minWidth, children, ...other }) {
  return (
    <MediaQuery minWidth={minWidth}>
      {matches => {
        if (matches) {
          return <Sticky {...other}>{children}</Sticky>;
        } else {
          return children;
        }
      }}
    </MediaQuery>
  );
}
