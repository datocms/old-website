import React from 'react';
import { Link } from 'gatsby';

function isActive(
  exact,
  className,
  activeClassName,
  { href, location },
) {
 var hrefWithoutQuery = href.split('?')[0];
 var isCurrent = location.pathname === hrefWithoutQuery;
 var isPartiallyCurrent = location.pathname.startsWith(hrefWithoutQuery);

  const normalAndActive = [className, activeClassName].filter(x => x).join(' ');

  if (exact && isCurrent) {
    return { className: normalAndActive };
  }

  if (!exact && isPartiallyCurrent) {
    return { className: normalAndActive };
  }

  return { className };
}

export default function NormalizedLink({
  to,
  activeClassName,
  exact,
  className,
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
      <Link
        to={finalTo}
        getProps={isActive.bind(this, exact, className, activeClassName)}
        {...other}
      >
        {children}
      </Link>
    );
  }

  return (
    <a href={finalTo} className={className} {...other}>
      {children}
    </a>
  );
}
