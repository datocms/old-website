const query = `
{
  articles: allDatoCmsBlogPost(sort: { fields: [publicationDate], order: DESC }, limit: 10) {
    edges {
      node {
        slug
        title
        coverImage {
          url
        }
        publicationDate
        author {
          name
          avatar {
            url
          }
        }
        excerpt: excerptNode {
          markdown: childMarkdownRemark {
            excerpt(pruneLength: 100000)
          }
        }
        content {
          ... on DatoCmsTypeform {
            id
            model { apiKey }
            typeform
          }
          ... on DatoCmsText {
            id
            model { apiKey }
            text: textNode {
              markdown: childMarkdownRemark {
                html
              }
            }
          }
          ... on DatoCmsImage {
            id
            model { apiKey }
            image {
              url
            }
          }
          ... on DatoCmsInternalVideo {
            id
            model {
              apiKey
            }
            thumbTimeSeconds
            video {
              video {
                duration
                thumbnailUrl
              }
            }
          }
          ... on DatoCmsVideo {
            id
            model { apiKey }
            video {
              url
              title
              providerUid
            }
          }
          ... on DatoCmsQuote {
            id
            model { apiKey }
            quote: quoteNode {
              markdown: childMarkdownRemark {
                html
              }
            }
            author
          }
          ... on DatoCmsQuestionAnswer {
            id
            model { apiKey }
            question: questionNode {
              markdown: childMarkdownRemark {
                html
              }
            }
            answer: answerNode {
              markdown: childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  }
}`;

module.exports = {
  query,
  title: 'DatoCMS Blog',
  description: 'Where we post product updates and publish articles on topics such as digital publishing, content strategy, and software development.',
  setup: ({ title, description }) => {
    return { title, description };
  },
  serialize: ({ query: { site, articles } }) => {
    return articles.edges.map(({ node: article }) => {
      return {
        title: article.title,
        date: new Date(article.publicationDate),
        description: article.excerpt.markdown.excerpt,
        url: `https://www.datocms.com/blog/${article.slug}/`,
        guid: `https://www.datocms.com/blog/${article.slug}/`,
        language: 'en',
        custom_elements: [
          {
            "content:encoded": article.content.map((block) => {
              if (block.model.apiKey === 'text') {
                return block.text.markdown.html;
              }

              if (block.model.apiKey === 'quote') {
                return block.quote.markdown.html;
              }

              if (block.model.apiKey === 'internal_video') {
                return `<img src="${block.video.video.thumbnailUrl}?time=${block.thumbTimeSeconds || (block.video.video.duration / 2)}&width=900" />`;
              }

              if (block.model.apiKey === 'question_answer') {
                return block.question.markdown.html + block.answer.markdown.html;
              }

              if (block.model.apiKey === 'image') {
                return `<img src="${block.image.url}?auto=format&w=900" />`;
              }

              if (block.model.apiKey === 'typeform') {
                return '';
              }
            }).join("\n")
          }
        ],
      };
    });
  },
  output: "/blog.xml",
}

