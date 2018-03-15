---
position: 1
title: GraphQL API
---

DatoCMS offer

## Querying the API

DatoCMS offers two different GraphQL endpoints:

Is the Preview API for previewing unpublished content as though it were published. It maintains the same behaviour and parameters as the CDA, but delivers the latest draft for entries and assets.

* https://site-api.datocms.com/graphql
* https://site-api.datocms.com/graphql/preview

This URL can be used by clients like Apollo, Lokka or simple curl-request. For example if you wan't to query the title of all posts within your project you could use the following curl command:

curl 'https://api.graphcms.com/simple/v1/$YOUR_PROJECT_ID$' -H 'content-type: application/json' --data-binary '{"query":"query {allPosts {title}}"}' --compressed
