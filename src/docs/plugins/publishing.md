---
position: 7
title: Publishing plugins
---

If you've [created a new plugin](/docs/plugins/creating-a-new-plugin/), we strongly encourage you to share it with the community as an [npm](https://www.npmjs.com/) package, so that it will become available in our Plugins Explorer:

![foo](../images/plugins/explorer.png)

In order to properly release a plugin, you need to make sure to fill the `package.json` with these information:

```json
{
  "name": "datocms-plugin-foobar",
  "version": "0.0.1",
  "homepage": "https://github.com/mark/foobar#readme",
  "description": "Add a small description for the plugin here",
  "keywords": ["datocms-plugin"],
  "datoCmsPlugin": {
    "title": "Plugin title",
    "previewImage": "docs/preview.gif",
    "entryPoint": "dist/index.html",
    "fieldTypes": ["json"],
    "pluginType": "sidebar",
    "parameters": {
      "global": [ ... ],
      "instance": [ ... ]
    }
  },
  "devDependencies": { ... },
  "dependencies": { ... }
}
```

The following table describes the properties that can be set on the file:

Property                     | Type           | Description
-----------------------------|----------------|------------
`name`                       | String         | Npm package name
`version`                    | String         | Plugin version
`homepage`                   | String         | URL of the plugin homepage, will be shown in the Plugin Explorer
`keywords`                   | Array<String>  | Plugin keywords, useful to help users find your plugin
`datoCmsPlugin.title`        | String         | Plugin title
`datoCmsPlugin.previewImage` | String         | Relative path to a plugin preview image
`datoCmsPlugin.entryPoint`   | String         | Relative path to the plugin entry point
`datoCmsPlugin.fieldTypes`   | Array<String>  | The type of plugin
`datoCmsPlugin.pluginType`   | String         | The types of field the plugin can be used with
`datoCmsPlugin.parameters`   | Hash           | Configuration parameters for the plugin

Make sure to follow these rules:

* `name` MUST be prefixed with `datocms-plugin`;
* `datoCmsPlugin.entryPoint` and `datoCmsPlugin.previewImage` must be files contained in the package, and need to be defined as relative paths to the package root;
* `keywords` MUST contain the `datocms-plugin` keyword, otherwise the plugin won't be visible in the Plugin explorer;
* `datoCmsPlugin.fieldTypes` MUST contain one or more of the following values: `boolean`, `date`, `date_time`, `file`, `float`, `integer`, `string`, `text`, `lat_lon`, `json`, `seo`, `link`, `links`, `video`, `slug`, `gallery` and `color`;
* `datoCmsPlugin.pluginType` MUST be one of the following values: `field_editor`, `field_addon` or `sidebar`.
* `datoCmsPlugin.parameters` MUST follow the syntax detailed in the [Configuration parameters](/docs/plugins/creating-a-new-plugin/#configuration-parameters) section of this guide.
