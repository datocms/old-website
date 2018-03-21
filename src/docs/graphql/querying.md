---
position: 3
title: Querying the API
---

### Query a single record

For every model there is one query to fetch a specific record. You have to pass a selector as an argument to this query, to retrieve the right record. You can either pass the record ID or any scalar field within this model. 

For example if you want to get the `name` and the `created_at` fields from the model `artist`, the following request can be used:

```graphql
query {
  artist(filter: { id: { eq: "123" } }) {
    name
    createdAt
  }
}
```

Or, if the `artist` model has a slug field:

```graphql
query {
  artist(filter: { slug: { eq: { "blank-banshee" } } }) {
    name
    createdAt
  }
}
```

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

Note: The query name approximates the plural rules of the English language. If you are unsure about the actual query name, explore available queries in your API Explorer.

The query response of a query fetching multiple records can be further controlled by supplying different query arguments. The response can be ordered, filtered or paginated.

### Ordering records

When querying all records of a model you can supply the `orderBy` argument for every scalar field of the model: `orderBy: <field>_ASC` or `orderBy: <field>_DESC`.

Example:

```graphql
query {
  allArtists(
    orderBy: [name_ASC]
  ) {
    id
    name
  }
}
```

### Filtering records

When querying all records of a model you can supply different parameters to the filter argument to filter the query response accordingly. The available options depend on the scalar fields defined on the model in question.

If you supply exactly one parameter to the filter argument, the query response will only contain records that fulfill this constraint:

```graphql
query {
  allArtists(
    filter: {
      published: { eq: false }
    }
  ) {
    id
    name
    published
  }
}
```

Depending on the type of the field you want to filter by, you have access to different advanced criteria you can use to filter your query response:

```graphql
allArtists(
  filter: {
    name: {
      in: [ "Velvet Parker", "Cat Stevie" ]
    }
  }
) {
  id
  name
  published
}
```

For to-one relations, you can define conditions on the related record by nesting the according argument in filter:

```graphql
{
  allRecords(filter: {artist: {name: "Cat-Stevie"}}) {
    id
    slug
  }
}
```

You can combine multiple filter conditions, and they will be applied in AND:

```graphql
{
  allRecords(
    filter: {
      { artist: { name: { eq: "Cat Stevens" } },
      { cover: { isPublic: { eq: true } } }
    }
  ) {
    id
    slug
    cover {
      url
    }
  }
}
```

#### Pagination

When querying all records of a specific model you can supply arguments that allow you to paginate the query response. Pagination allows you to request a certain amount of records at the same time. You can seek forwards or backwards through the records and supply an optional starting record:

* to seek forwards, use `first`; specify a starting record with after.
* to seek backwards, use `last`; specify a starting record with before.

You can also skip an arbitrary amount of records in whichever direction you are seeking by supplying the skip argument:

```graphql
{
  allArtists(first: 5) {
    id
    name
  }
}
```

To query the first two artists after the artists with id `123`:

```graphql
query {
  allArtists(
    first: 2,
    after: "123"
  ) {
    id
    name
  }
}
```

To query the last 5 artists use last:

```graphql
query {
  allArtists(last: 5) {
    id
    name
  }
}
```

Note: You cannot combine first with before or last with after. 

Note: If you query more records than exist, your response will simply contain all records that actually do exist in that direction.
