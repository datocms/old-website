module.exports = function(fetch) {
  const token = 'aa01834acf28627c3859e59dbc821f';

  return fetch(
    'https://graphql.datocms.com/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query IntrospectionQuery {
             __schema {
               types {
                 ...FullType
               }
             }
           }

           fragment FullType on __Type {
             kind
             name
             description
             docHints
             inputFields {
               ...InputValue
             }
           }

           fragment InputValue on __InputValue {
             name
             description
             type { ...TypeRef }
             defaultValue
           }

           fragment TypeRef on __Type {
             kind
             name
             ofType {
               kind
               name
               ofType {
                 kind
                 name
                 ofType {
                   kind
                   name
                   ofType {
                     kind
                     name
                     ofType {
                       kind
                       name
                       ofType {
                         kind
                         name
                         ofType {
                           kind
                           name
                         }
                       }
                     }
                   }
                 }
               }
             }
           }
        `
      }),
    }
  )
    .then(res => res.json());
}
