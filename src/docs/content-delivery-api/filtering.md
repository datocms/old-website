---
position: 4
title: Filtering records
---

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
