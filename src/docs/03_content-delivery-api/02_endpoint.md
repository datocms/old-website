---
title: API Endpoint
---

DatoCMS offers a single GraphQL endpoint:

```
https://graphql.datocms.com/
```

The endpoint remains constant no matter what operation you perform, and it's read only — that is, it does not offer any *mutation operation*. You can use our [Content Management API](/content-management-api/) for that.

### Preview endpoint

If you have the [Draft/Published system](/docs/introduction/versioning/#draftpublished-system) active on some of your models, you can use a different endpoint to access records at their latest version available, instead of the currently published: this can be useful on staging environments, or your local development machine:

```
https://graphql.datocms.com/preview
```

Both endpoints offer exactly the same queries, the only thing that will change will be the returned content.

### API Explorer

To see what queries are available in your schema you can use our [API Explorer](https://graphql.datocms.com/graphiql). Type your GraphQL query in the left-most text box and then press Play button:

<iframe src="https://graphql.datocms.com/graphiql?apitoken=faeb9172e232a75339242faafb9e56de8c8f13b735f7090964&query=%7B%0A%20%20allBlogPosts(orderBy%3A%5BpublicationDate_DESC%5D%2C%20first%3A%203)%20%7B%0A%20%20%20%20title%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20publicationDate%0A%20%20%7D%0A%7D%0A"></iframe>

