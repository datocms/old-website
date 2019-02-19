import React from 'react';
import { Link } from 'gatsby';

export default function NormalizedLink({
  to,
  activeClassName,
  children,
  ...other
}) {
  let finalTo = to;

  if (!to.includes('://') && !to.startsWith('#')) {
    const chunks = to.split(/#/);
    const path = chunks[0];
    const hash = chunks[1];

    finalTo = '';

    if (path !== '/' && path.endsWith('/')) {
      finalTo += path.slice(0, -1);
    } else {
      finalTo += path;
    }

    if (hash) {
      finalTo += `#${hash}`;
    }
  }

  const internal = /^\/(?!\/)/.test(finalTo);

  if (internal) {
    return (
      <Link to={finalTo} activeClassName={activeClassName} {...other}>
        {children}
      </Link>
    );
  }

  return (
    <a href={finalTo} {...other}>
      {children}
    </a>
  );
}
