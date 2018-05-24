---
position: 5
title: Ordering records
---

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

#### Pagination

When querying all records of a specific model you can supply arguments that allow you to paginate the query response. Pagination allows you to request a certain amount of records at the same time.

Use `first` to limit the number of results:

```graphql
{
  allArtists(first: 5) {
    id
    name
  }
}
```

You can also skip an arbitrary amount of records by supplying the `skip` argument:


```graphql
{
  allArtists(first: 5, skip: 10) {
    id
    name
  }
}
```

Note: If you query more records than exist, your response will simply contain all records that actually do exist in that direction.
