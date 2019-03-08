import React from 'react';
import { graphql } from 'gatsby';
import Link from 'components/Link';
import Img from 'gatsby-image';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Masonry from 'react-masonry-component';

import bem from 'utils/bem';
import './style.sass';

import Layout from 'components/Layout';
import PageLayout from 'components/PageLayout';

const b = bem.lock('BlogPage');

export default class BlogPage extends React.Component {
  render() {
    const articles = this.props.pageContext.group.map(({ node }) => node);
    const { first, last, index } = this.props.pageContext;

    return (
      <Layout>
        <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
        <PageLayout
          title="Blog"
          subtitle="News, tips, highlights, and other updates from the team at DatoCMS."
        >
          <div className={b()}>
            <div className={b('masonry')}>
              <Masonry
                options={{
                  columnWidth: '.BlogPage__grid-sizer',
                  gutter: '.BlogPage__gutter-sizer',
                  itemSelector: '.BlogPage__article',
                  percentPosition: true,
                }}
              >
                <div className={b('grid-sizer')} />
                <div className={b('gutter-sizer')} />
                {articles.map(article => (
                  <Link
                    to={`/blog/${article.slug}/`}
                    key={article.slug}
                    className={b('article')}
                  >
                    {article.coverImage && (
                      <Img
                        className={b('article-image')}
                        alt={article.coverImage.alt}
                        fluid={article.coverImage.fluid}
                      />
                    )}
                    <div className={b('article-body')}>
                      <h3 className={b('article-title')}>{article.title}</h3>
                      <div className={b('article-excerpt')}>
                        <p>{article.excerpt.markdown.excerpt}</p>
                      </div>
                      <div className={b('article-meta')}>
                        <div className={b('article-meta-left')}>
                          <Img
                            className={b('article-author-image')}
                            fluid={article.author.avatar.fluid}
                          />
                        </div>
                        <div className={b('article-meta-right')}>
                          <p>{article.author.name}</p>
                          <p>{article.publicationDate}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Masonry>
            </div>
            {!first && (
              <Link
                to={index === 2 ? '/blog/' : `/blog/${index - 1}/`}
                className={b('previous')}
              >
                See next posts &raquo;
              </Link>
            )}
            {!last && (
              <Link to={`/blog/${index + 1}/`} className={b('previous')}>
                &laquo; See previous posts
              </Link>
            )}
          </div>
        </PageLayout>
      </Layout>
    );
  }
}

export const query = graphql`
  query BlogPageQuery {
    page: datoCmsBlog {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    author: datoCmsAuthor {
      name
      avatar {
        url
        fluid(maxWidth: 80) {
          ...GatsbyDatoCmsFluid
        }
      }
    }
  }
`;
