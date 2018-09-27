---
position: 6
title: UI Extensions SDK reference
---

### Initialization

The SDK exposes the `DatoCmsExtension.init()` method. This is the main entry-point for all extension related code. If you require the script from the web without any module system you can include it like this:

```html
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <script src="https://unpkg.com/datocms-ui-extensions-sdk"></script>
</head>
<body>
  <input type="text" />
  <script type="text/javascript">
    DatoCmsExtension.init(function(extension) {
      /* ... */
    });
  </script>
</body>
</html>
```

If you use webpack or browserify, you'll need to require the Extensions SDK.

```js
const datoCmsExtension = require('datocms-ui-extensions-sdk');

DatoCmsExtension.init(function(extension) {
  /* ... */
});
```

### Examples

If you have doubts regarding how to structure the logic of your extension, please take a look at some examples we already made available in our [Github repository](https://github.com/datocms/ui-extensions-sdk/tree/master/examples/).

### Table of Contents

### Extension methods

#### `extension.getFieldValue(...pathChunks)`

Returns the value of a specific field. To get the value of the current field the extension is attached to, use the [`extension.fieldPath`](/docs/ui-extensions/sdk-reference/#extensionfieldpath) option.

```js
// get the value of the 'title' field
console.log(extension.getFieldValue('title'));

// if the field is multi-language, both of these methods are fine:
console.log(extension.getFieldValue('title.en'));
console.log(extension.getFieldValue('title', 'en'));

// get field's current value
console.log(extension.getFieldValue(extension.fieldPath));
```

#### `extension.setFieldValue(...pathChunks, newValue)`

Sets the value of a specific field.

The type of the value must match the expected field type. For example, if the extension is attached to a "single-line string" field you must pass a string.

The method returns a Promise that resolves once the change has been acknowledged by the DatoCMS webapp.

You can get the path of the field the extension is attached to using the method [`extension.fieldPath`](/docs/ui-extensions/sdk-reference/#extensionfieldpath).

```js
// set the value of the 'title' field
extension.setFieldValue('title', 'New title!');

// if the field is multi-language, both of these methods are fine:
extension.setFieldValue('title.en', 'New title!');
extension.setFieldValue('title', 'en', 'New title!');

// set field's current value
extension.setFieldValue(extension.fieldPath, 'New title!');

// if multi-language, and you need to set the value of the field in a different locale (ie. `it`):
const alternativeLanguageFieldPath = extension.fieldPath
  .replace(new RegExp(`\.${extension.locale}$`), `.it`);

extension.setFieldValue(alternativeLanguageFieldPath, 'New title!');
```

#### `extension.addFieldChangeListener(...pathChunks, callbackFn)`

Calls the `callbackFn` every time the value of the field specified is changed by an external event (e.g. when multiple editors are working on the same entry) or when `setFieldValue()` is called.

The method returns a function you can call to stop listening to changes.

You can get the path of the field the extension is attached to using the method [`extension.fieldPath`](/docs/ui-extensions/sdk-reference/#extensionfieldpath).

```js
const input = document.querySelector("input");

const unsubscribe = extension.addFieldChangeListener(extension.fieldPath, (newValue) => {
  input.value = newValue;
});

// stop being notified
unsubscribe();
```

#### `extension.addChangeListener(...pathChunks, callbackFn)`

Calls the `callbackFn` every time one of the extension options is changed by an external event. The method returns a function you can call to stop listening to changes.

```js
const input = document.querySelector("input");

const unsubscribe = extension.addFieldChangeListener('disabled', (newValue) => {
  input.disabled = newValue;
});

// stop being notified
unsubscribe();
```

#### `extension.startAutoResizer()`

Listens for DOM changes and calls `updateHeight()` when the size changes.

#### `extension.stopAutoResizer()`

Stops resizing the iframe automatically.

#### `extension.updateHeight()`

Calculates the body's `scrollHeight` and sets the containers height to this value.

#### `extension.updateHeight(height)`

Sets the iframe height to the given value in pixels. `height` must be an integer.

### Extension options

#### `extension.site`

Returns information about the current DatoCMS project. The object takes the same format as the [CMA Site object](https://www.datocms.com/content-management-api/#site-0).

```js
// returns the API identifier of the current model
console.log(extension.site.attributes.name);
```

#### `extension.itemType`

Returns information about of the current DatoCMS model. The object takes the same format as the [CMS API ItemType object](https://www.datocms.com/content-management-api/#item_type-1).

```js
// returns the API identifier of the current model
console.log(extension.itemType.attributes.api_key);
```

#### `extension.itemTypes`

Returns all the models of the current DatoCMS project, indexed by ID. The objects take the same format as the [CMS API ItemType object](https://www.datocms.com/content-management-api/#item_type-1).

```js
// returns info about all the models of the current DatoCMS project

extension.site.relationships.item_types.data.forEach(function(link) {
  console.log(extension.itemTypes[link.id].attributes.api_key);
});
```

#### `extension.fields`

Returns all the fields of the current DatoCMS project, indexed by ID. The objects take the same format as the [CMS API Field object](https://www.datocms.com/content-management-api/#field-1).

```js
// returns info about all the fields of the current model

extension.itemType.relationships.fields.data.forEach(function(link) {
  console.log(extension.fields[link.id].attributes.api_key);
});
```

#### `extension.disabled`

Returns whether the field must be disabled or not.

```js
const input = document.querySelector("input");
input.disabled = extension.disabled;
```

#### `extension.parameters`

Returns the [configuration parameters](/docs/ui-extensions/configuration-parameters/) values for the extension.

```js
console.log(input.parameters);

// returns parameters in the following shape:
// {
//   global: {
//     developmentMode: true
//   },
//   instance: {
//     sentences: 2
//   }
// }
```

#### `extension.locale`

The current locale of a field the extension is attached to.

```js
// returns ie. "en_US"
console.log(extension.locale);
```

#### `extension.fieldPath`

Returns the path of the field the extension is attached to. Useful to set or get the value of the field itself:

```js
// get field's current value
console.log(extension.getFieldValue(extension.fieldPath));

// change field's current value
extension.setFieldValue(extension.fieldPath, 'New value!');
```

#### `extension.placeholder`

Returns the default placeholder for the field the extension is attached to.

```js
const input = document.querySelector("input");
input.placeholder = extension.placeholder;
```

#### `extension.theme`

Returns the site current color scheme.

```js
console.log(extension.theme);

// returns the color scheme in the following form:
// {
//   accentColor: 'rgb(20, 179, 204)',
//   darkColor: 'rgb(47, 59, 59)',
//   lightColor: 'rgb(227, 249, 252)',
//   primaryColor: 'rgb(20, 152, 172)',
//   semiTransparentAccentColor: 'rgb(20, 179, 204, 0.1)',
// }
```

