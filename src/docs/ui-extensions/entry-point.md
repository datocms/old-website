---
position: 5
title: The extension entry point
---

From a technical point of view, an UI Extension is an HTML page that will be showed inside an `<iframe>` by the DatoCMS webapp. You, the developer, are in charge of writing and hosting this HTML page, which we call the extension *entry-point*. When you [create a new extension](/docs/ui-extensions/creating-a-new-extension/), you will be asked for the URL of this web page.

You can implement this entry-point with basic HTML and JavaScript, or using more advanced client-side frameworks such as React, Angular or Vue.

### Skeleton code

This is the minimal code you need to write to make a working custom extension with just a single text input:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <script src="https://unpkg.com/datocms-ui-extensions-sdk@0.0.2"></script>
  <link href="https://unpkg.com/datocms-ui-extensions-sdk@0.0.2/dist/sdk.css" media="all" rel="stylesheet" />
</head>
<body>
  <input type="text" />
  <script type="text/javascript">
    DatoCmsExtension.init(function(extension) {
      const input = document.querySelector("input");

      extension.startAutoResizer();

      input.value = extension.getFieldValue(extension.fieldPath);

      extension.addFieldChangeListener(extensions.fieldPath, function(newValue) {
        input.value = newValue;
      });

      input.addEventListener("change", function(e) {
        extension.setFieldValue(extension.fieldPath, e.target.value);
      });
    });
  </script>
</body>
</html>
```

As you can see, the entry-point includes a reference to the [UI Extensions SDK](https://github.com/datocms/ui-extensions-sdk/), which enables the extension to communicate with the DatoCMS web app:

```html
<script src="https://unpkg.com/datocms-ui-extensions-sdk@0.0.2"></script>
```

It is also suggested to add the official SDK style sheet to get some default styling that's coherent to the DatoCMS UI:

```html
<link href="https://unpkg.com/datocms-ui-extensions-sdk@0.0.2/dist/sdk.css" media="all" rel="stylesheet" />
```

The SDK exposes a `DatoCmsExtension.init()`, that you can use within the page to initialize the extension:

```js
DatoCmsExtension.init(function(extension) {
  // place your custom extension code here
});
```

The `DatoCmsExtension.init()` callback will invoked once the extension is ready with an `extension` argument, which will give you all the methods you might need to get info and communicate to the main DatoCMS webapp. 

We'll take a detailed look the methods our SDK offers and how to use them in the [next section of the guide](/docs/ui-extensions/sdk-reference/).
