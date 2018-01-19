---
category: api-client
position: 1
title: NodeJS client
---

We released an NPM package to make it easy to programmatically read/create/edit/destroy DatoCMS records. Install the `datocms-client` package in your application:

```
$ npm install --save-dev datocms-client
```

Or, if you're using Yarn as package manager:

```
$ yarn add datocms-client
```

<div class="note">
**Warning** Due to historical reasons and backward compatibility, the API exposes some different naming compared to the rest of the product: Models are called Item Types, while Records are called Items. Keep that in mind!
</div>

The first step is to require the DatoCMS package, and initialize the client with the read-write API token you can find under the *Admin area > API tokens* section. Let's create an `import.js` file with the following content:

```js
require('babel-polyfill');
const SiteClient = require('datocms-client').SiteClient;

const client = new SiteClient('YOUR_API_READWRITE_TOKEN');
```

Now, suppose we have an administrative area with an *Article* model, and we want to import a list of articles ie. from a JSON file:

<div class="small">
![foo](/images/import/article.png)
</div>

The first thing to know is the ID of the model itself. Let's add the following line to pretty print the existing models:

```js
require('babel-polyfill');
const SiteClient = require('datocms-client').SiteClient;

const client = new SiteClient('YOUR_API_READWRITE_TOKEN');

client.itemTypes.all()
.then((models) => console.log(models));
```

As you can see `client.itemTypes.all()` method returns a promise. Here's the output when we execute the script:

```
$ node import.js
[ 
  { 
    id: '7149',
    name: 'Article',
    singleton: false,
    sortable: false,
    apiKey: 'article',
    fields: [ '27669', '27667', '27668' ] 
  }
]
```

We can also inspect the fields contained in the model:

```js
// obtain all the fields of the model
client.fields.all("7149")
.then((fields) => console.log(fields));

// Output:
//
// [ { id: '27667',
//     label: 'Title',
//     fieldType: 'string',
//     apiKey: 'title',
//     hint: null,
//     localized: false,
//     validators: {},
//     position: 2,
//     appeareance: { type: 'title' },
//     itemType: '7149' },
//   { id: '27668',
//     label: 'Content',
//     fieldType: 'text',
//     apiKey: 'content',
//     hint: null,
//     localized: false,
//     validators: {},
//     position: 3,
//     appeareance: { type: 'wysiwyg' },
//     itemType: '7149' },
//   { id: '27669',
//     label: 'Cover image',
//     fieldType: 'image',
//     apiKey: 'cover_image',
//     hint: null,
//     localized: false,
//     validators: {},
//     position: 1,
//     appeareance: {},
//     itemType: '7149' } ] ]
```

Great, here there are our three fields. Let's create our article:

```js
// create a new Article record
client.uploadImage('http://i.giphy.com/NXOF5rlaSXdAc.gif')
.then((image) => {
  return client.items.create({
    itemType: '7149',
    title: 'My first article!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod.',
    coverImage: image
  })
})
.then(record => console.log(record));

// Output:
// { id: '43858',
//   updatedAt: '2017-03-20T14:34:30.249Z',
//   isValid: true,
//   title: 'My first article!',
//   content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod.',
//   coverImage:
//    { path: '/932/1490020446-nxof5rlasxdac-gif',
//      width: 432,
//      height: 250,
//      format: 'gif',
//      size: 5475424,
//      alt: null,
//      title: null },
//   itemType: '7149' }
```

As you can see, we use the helper method `client.uploadImage` to pass DatoCMS the metadata of the image to associate to the record.

## Retrieving records

To retrieve the stored records:

```js
client.items.all()
.then((records) => console.log(records));
```

If you want to retrieve just the records of a specific model (ie. `article`):

```js
client.items.all({ 'filter[type]': 'article' })
.then((records) => console.log(records));
```

You can also pass the model ID instead of the model API identifier.

## Linking records

If you have a record with some a link field (ie. an article linked to its category), during the creation you need to pass the ID of the linked record:

```js
client.items.create({
  itemType: '7150',
  name: 'My category',
})
.then((category) => {
  return client.items.create({
    itemType: '7149',
    title: 'My first article!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod.',
    category: category.id
  });
})
.then((record) => console.log(record));
```

If you have a "multiple links" field, then you need to pass the array of IDs:

```js
client.items.create({
  itemType: '7150',
  name: 'My category',
})
.then((category) => {
  return client.items.create({
    itemType: '7149',
    title: 'My first article!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod.',
    categories: [category.id]
  });
})
.then((record) => console.log(record));
```

### Multi-language fields

If localization is enabled on some field, the format of the payload changes a little bit, as you need to pass an hash representing the value of the field for each of the locales you setup in your administrative area:

```js
// create a new Article record
client.uploadImage('http://i.giphy.com/NXOF5rlaSXdAc.gif')
.then((image) => {
  return client.items.create({
    itemType: '7149',
    title: {
      en: 'My first article!',
      it: 'Il mio primo articolo!'
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod.',
    coverImage: image
  })
})
.then(record => console.log(record));
```

### List of client methods

Here's the complete list of methods available to you. Each methods returns a promise:

```js
////// Records //////

// Create a new record
client.items.create(resourceAttributes)

// Update an existing record
client.items.update(itemId, resourceAttributes)

// Return a collection of items
client.items.all(filters = {})

// Return a specific item
client.items.find(itemId)

// Destroy an existing item
client.items.destroy(itemId)

// Helper methods to upload a file/image: to be used togheter with 
// `client.items.create` or `client.items.update`
client.uploadImage(pathOrUrl)
client.uploadFile(pathOrUrl)


////// Fields //////

// Create a new field on the specified model
client.fields.create(itemTypeId, resourceAttributes)

// Update an existing field
client.fields.update(fieldId, resourceAttributes)

// Return all the fields of the specified model
client.fields.all(itemTypeId)

// Return a specific field
client.fields.find(fieldId)

// Destroy an existing field
client.fields.destroy(fieldId)


////// Models //////

// Create a new model
client.itemTypes.create(resourceAttributes)

// Update an existing model
client.itemTypes.update(itemTypeId, resourceAttributes)

// Return all the models of the administrative area
client.itemTypes.all()

// Return a specific model
client.itemTypes.find(itemTypeId)

// Destroy an existing model
client.itemTypes.destroy(itemTypeId)


////// Editors //////

// Create a new editor
client.users.create(resourceAttributes)

// Return all the editors of the administrative area
client.users.all()

// Return a specific editor
client.users.find(userId)

// Destroy an existing editor
client.users.destroy(userId)


////// Uploads //////

// Create a new upload
client.uploads.create(resourceAttributes)

// Return all the uploads of the administrative area
client.uploads.all(filters = {})

// Return a specific upload
client.uploads.find(uploadId)

// Destroy an existing upload
client.uploads.destroy(uploadId)
```
