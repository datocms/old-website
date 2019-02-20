import React from 'react';
import Link from 'components/Link';
import bem from 'utils/bem';

const b = bem.lock('ChangelogPage');

export default function Entry({ article }) {
  return (
    <div key={article.slug} className={b('article')}>
      <div className={b('article-meta')}>{article.publicationDate}</div>
      <div className={b('article-body')}>
        <div className={b('article-categories')}>
          {article.categories.map(cat => (
            <div
              key={cat.name}
              className={b('article-category')}
              style={{ backgroundColor: cat.color.hex }}
            >
              {cat.name}
            </div>
          ))}
        </div>
        <Link to={`/changelog/${article.slug}`} className={b('article-title')}>
          {article.title}
        </Link>
        <div className={b('article-content')}>
          <div
            className="content-body"
            dangerouslySetInnerHTML={{
              __html: article.content.markdown.html,
            }}
          />
        </div>
      </div>
    </div>
  );
}
