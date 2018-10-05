---
position: 5
title: The plugin entry point
---

As already mentioned, from a technical point of view, an Plugin is an HTML page that will be showed inside an `<iframe>` by the DatoCMS webapp. You, the developer, are in charge of writing and hosting this HTML page, which we call the plugin *entry-point*.

When you [create a new plugin](/docs/plugins/creating-a-new-plugin/), you will be asked for the URL of this web page.

You can implement this entry-point with basic HTML and JavaScript, or using more advanced client-side frameworks such as React, Angular or Vue.

### Skeleton code

This is the minimal code you need to write to make a custom plugin that renders and updates a simple text input:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <script src="https://unpkg.com/datocms-plugins-sdk"></script>
  <link href="https://unpkg.com/datocms-plugins-sdk/dist/sdk.css" media="all" rel="stylesheet" />
</head>
<body>
  <input type="text" />
  <script type="text/javascript">
    DatoCmsPlugin.init(function(plugin) {
      const input = document.querySelector("input");

      plugin.startAutoResizer();

      input.value = plugin.getFieldValue(plugin.fieldPath);

      plugin.addFieldChangeListener(plugins.fieldPath, function(newValue) {
        input.value = newValue;
      });

      input.addEventListener("change", function(e) {
        plugin.setFieldValue(plugin.fieldPath, e.target.value);
      });
    });
  </script>
</body>
</html>
```

As you can see, the entry-point includes a reference to the [Plugins SDK](https://github.com/datocms/plugins-sdk/), which enables the plugin to communicate with the DatoCMS web app:

```html
<script src="https://unpkg.com/datocms-plugins-sdk"></script>
```

It is also suggested to add the official SDK style sheet to get some default styling that's coherent to the DatoCMS UI:

```html
<link href="https://unpkg.com/datocms-plugins-sdk/dist/sdk.css" media="all" rel="stylesheet" />
```

The SDK exposes a `DatoCmsPlugin.init()`, that you can use within the page to initialize the plugin:

```js
DatoCmsPlugin.init(function(plugin) {
  // place your custom plugin code here
});
```

The `DatoCmsPlugin.init()` callback will be invoked once the plugin is ready with an `plugin` argument, which will give you all the methods you might need to get info and communicate to the main DatoCMS webapp.

We'll take a detailed look the methods our SDK offers and how to use them in the [next section of the guide](/docs/plugins/sdk-reference/).


### Examples

If you have doubts regarding how to structure your entry-point HTML file, please take a look at some of the plugins we already made available in our [Github repository](https://github.com/datocms/plugins-sdk/tree/master/examples/).
