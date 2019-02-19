import React from 'react'
import { Link } from 'gatsby';

export default function NormalizedLink({ to, ...props }) {
  let finalTo = to;

  if (!to.includes('://') && !to.startsWith('#')) {
    const chunks = to.split(/#/);
    const path = chunks[0];
    const hash = chunks[1];

    finalTo = '';

    if (path.endsWith('/')) {
      finalTo += path.slice(0, -1);
    } else {
      finalTo += path;
    }

    if (hash) {
      finalTo += `#${hash}`;
    }
  }

  return <Link to={finalTo} {...props} />;
}
