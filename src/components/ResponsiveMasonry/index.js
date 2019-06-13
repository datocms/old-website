import React from 'react';
import MediaQuery from 'react-responsive';
import Masonry from 'react-masonry-component';

export default function ResponsiveMasonry({ minWidth, children, ...other }) {
  return (
    <MediaQuery minWidth={minWidth}>
      {matches => {
        if (matches) {
          return <Masonry {...other}>{children}</Masonry>;
        } else {
          return children;
        }
      }}
    </MediaQuery>
  );
}
