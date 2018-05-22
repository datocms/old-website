import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Wrap, button, Space, text } from 'blocks'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import bem from 'utils/bem'
import './style.sass'

import BlogAside from 'components/BlogAside'

const b = bem.lock('ArticlePage')

export default class ArticlePage extends React.Component {
  render() {
    const { entry, page } = this.props.data;

    return (
      <BlogAside>
        <HelmetDatoCms seo={page.seoMetaTags} />
        <div className={b()}>
          <Link to="/changelog/" className={b('heading')}>
            From our Changelog
          </Link>
          <div className={b('content')}>
            <div className={b('content-text')}>
              <div dangerouslySetInnerHTML={{ __html: entry.content.markdown.html }} />
            </div>
          </div>
          <div className={b('meta')}>
            Published on <Link to={`/blog/${entry.slug}/`}>{entry.publicationDate}</Link>
          </div>
        </div>
      </BlogAside>
    );
  }
}

export const query = graphql`
  query ChangelogEntryPageQuery($id: String!) {
    page: datoCmsChangelog {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    entry: datoCmsChangelogEntry(id: { eq: $id }) {
      id
      slug
      title
      categories {
        name
        color { hex }
      }
      content: contentNode {
        markdown: childMarkdownRemark {
          html
        }
      }
      publicationDate(formatString: "MMM D, YYYY")
    }
  }
`

