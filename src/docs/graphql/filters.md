---
position: 2
title: Filtering and ordering
---

### Ordering records

When retrieving records of a specific model you can supply the `orderBy` argument for every scalar field of the model: `orderBy: <field>_ASC` or `orderBy: <field>_DESC`. For tree and sortable models, you can also order them by `position`:

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

You can supply different parameters to the `filter` argument to filter the query response accordingly. The available options depend on the fields defined on the model in question.

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
    name: { in: [ "Blank Banshee", "Gazelle Twin" ] }
  }
) {
  id
  name
  genre
}
```

If you specify multiple conditions, they will be combined in a logical AND expression:

```graphql
{
  allAlbums(
    filter: {
      { artist: { eq: "212" } },
      { releaseDate: { gt: "2016-01-01" } }
    }
  ) {
    id
    slug
    artist { name }
    coverImage { url }
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
  allArtists(first: 2, after: "123") {
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
