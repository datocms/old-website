---
position: 2
title: Discovering the GraphQL API
---

The schema of each administrative is different, and depends on the models it contains.

GraphQL is [introspective](http://graphql.org/learn/introspection/). This means you can query a GraphQL schema for details about itself. 

Query `__schema` to list all types defined in the schema and get details about each:

```graphql
__schema {
  types {
    name
    kind
    description
    fields {
      name
    }
  }
}
```
