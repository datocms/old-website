import React from 'react'

const SVG = ({ src }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: src.replace(/Colfax\-Regular/g, "colfax-web")
      }}
    />
  );
}

export default SVG;
