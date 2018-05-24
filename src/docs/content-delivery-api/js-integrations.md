---
position: 100
title: JS integration examples
---

#### Vanilla JS example

```js
const token = 'YOUR-API-TOKEN';

fetch(
  'https://graphql.datocms.com/',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: '{ allPosts { title } }'
    }),
  }
)
.then(res => res.json())
.then((res) => {
  console.log(res.data)
})
.catch((error) => {
  console.log(error);
});
```

#### Apollo example

```js
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const token = 'YOUR-API-TOKEN';

const httpLink = createHttpLink({
  uri: 'https://graphql.datocms.com/',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign(
      headers || {},
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    )
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

client.query({ query: gql`{ allPosts { title } }` })
.then((res) => {
  console.log(res.data);
})
.catch((error) => {
  console.log(error);
});
```

