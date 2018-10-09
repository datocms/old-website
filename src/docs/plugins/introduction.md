---
position: 1
title: Plugins
---

Plugins allow developers to extend the basic functionality of the DatoCMS administrative area. You, the developer, are in charge of writing and hosting the Plugin. Plugins can be implemented with basic HTML and JavaScript, or using more advanced client-side frameworks such as React, Angular or Vue.

Technically speaking Plugins are small HTML5 applications that exist in a sandboxed `<iframe>` and interact with the main DatoCMS webapp through a JS library you need to include — the [Plugins SDK](/docs/plugins/sdk-reference/).

### Types of plugins

In DatoCMS you can build different kinds of plugins:

#### "Field editor" plugins

They reside in the record editor body and operate on top of a particular field (or set of fields), replacing the default field editor that DatoCMS provides with custom code.

An example of a field editor plugin is our [Star rating editor](https://github.com/datocms/plugins/tree/master/star-rating-editor) plugin, which will present an Integer field with a star rating widget instead of using the default textual input:

![foo](../images/plugins/field-editor.png)

#### "Field addon" plugins

They also reside in the record editor body, but are placed underneath the field editor to provide additional info/behaviour.

An example of a field addon plugin is our [Yandex Translate](https://github.com/datocms/plugins/tree/master/yandex-translate) plugin, which makes it easier to automatically translate your content into secondary languages:

![foo](../images/plugins/field-addon.png)

#### "Sidebar widget" plugins

Sidebar plugins are rendered on the sidebar of the record editor. They make most sense if the functionality provided by the plugin applies to an entire record instead of a single field.

An example of a field addon plugin is our [Notes](https://github.com/datocms/plugins/tree/master/notes) plugin, that you can use to add Post-It notes to your records:

![foo](../images/plugins/sidebar.png)

A sidebar plugin is still assigned to a field which is then ommited from the entry editor. The field's value can be used to store data for the sidebar plugin.
