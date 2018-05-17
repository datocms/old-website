---
position: 3
title: Querying the API
---

### Query a single record

For every model there is one query to fetch a specific record. For example if you want to get the `hero_title` field from the single-instance model called `homepage`, the following request can be used:

```graphql
query {
  homepage {
    heroTitle
  }
}
```

The query response can be further controlled by supplying `filter` and `orderBy` arguments. For example, if the `artist` model has a `name` field, you can use this query to get a specific record:

```graphql
query {
  artist(filter: { name: { eq: { "Blank Banshee" } } }) {
    name
    genre
  }
}
```

Please refer to the [next section](/docs/graphql/filters/) of this guide to understand how to use the `filters` and `orderBy` arguments.

### Query multiple records

The API contains automatically generated queries to fetch all records of a certain model. For example, for the `artist` model the top-level query `allArtists` will be generated.

A few examples for query names:

* Model API identifier: `artist`, query name: `allArtists`
* Model API identifier: `track`, query name: `allTracks` 
* Model API identifier: `use_case`, query name: `allUseCases`

A query which fetches all records from the `artist` model could look like the following:

```graphql
query {
  allArtists {
    id
    name
  }
}
```

Note: The query name approximates the plural rules of the English language. If you are unsure about the actual query name, explore available queries in your [API Explorer](http://site-api.datocms.com/graphiql).

The query response of a query fetching multiple records can be further controlled by supplying different query arguments to order, filter and paginate results. In the [next section](/docs/graphql/filters/) of this guide we'll see how to achieve that.

