---
title: Complexity limiting
---

Each query hitting our Content Delivery API has a complexity score based on which type of field and how many fields are present in it.

### Example 1

Root fields related to your models have a complexity score of `80`. Each subfield has a complexity of `1`, apart from `file`, `gallery`, `link`, `links` and `modular content` (`richtext`) fiels which have a complexity of `10`.

The following query has a complexity score of `82`.

```graphql
query {
  allArtists { # 80
    id # 1
    name # 1
  }
}
```

### Example 2

Root fields like `_allArtistsMeta` and `artist` have a complexity score of `80` too.

The following query has a complexity score of `162`.

```graphql
query {
  _allArtistsMeta { # 80
    count # 1
  }
  artist(filter: {id: {eq: "10"}}) { # 80
    name # 1
  }
}	
```

### Example 3

Like said before in Example 1, fields of type `file`, `gallery`, `link`, `links` and `modular content` (`richtext`) have a complexity score of `10`.

The following query has a complexity score of `91`.

```graphql
query {
  allArtists { # 80
    photo { # 10 (file field)
    	url # 1
    }
  }
}
```

### Example 4

Root fields about uploads, `_allUploadsMeta` and `upload`, have a complexity score of `25` both.

The following query has a complexity score of `52`.

```graphql
query {  
  _allUploadsMeta { # 25
    count # 1
  }
  upload(filter: {id: {eq: "564"}}) { # 25
    url # 1
  }
}
```

### Example 5

Root fields about singleton records have a complexity score of `25`.

The following query has a complexity score of `27`.

```graphql
query {  
  contactPage { # 25
    phoneNumber # 1
    emailAddress # 1
  }
}
```

### Example 6

Root field `_site` has a complexity score of `10`.

The following query has a complexity score of `13`.

```graphql
query {
  _site { # 10
    globalSeo { # 1
      siteName # 1
      titleSuffix # 1
    }
  }
}
```

## Maximum complexity score

The Content Delivery API sets the `x-complexity` header in the response to let you know the calculated complexity score for your submitted query.

If the query complexity score **is over 1200**, you'll get an error from the Content Delivery API:

```json
{
  "errors": [
    {
      "message": "Query has complexity of 1276, which exceeds max complexity of 1200"
    }
  ]
}
```

Higher complexity score limit may apply to your project. Take a look at the "Plan and usage" section of your project in the [Account dashboard](https://dashboard.datocms.com/).
