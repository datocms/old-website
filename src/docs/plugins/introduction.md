---
position: 1
title: Plugins
---

Plugins allow developers to extend the basic functionality of the DatoCMS administrative area, replacing the default field editors that DatoCMS provides with custom code.

You, the developer, are in charge of writing and hosting the Plugin. Plugins can be implemented with basic HTML and JavaScript, or using more advanced client-side frameworks such as React, Angular or Vue.

Technically speaking Plugins are small HTML5 applications that exist in a sandboxed `<iframe>` and interact with the main DatoCMS webapp through a JS library you need to include — the [Plugins SDK](/docs/plugins/sdk-reference/).

### Types of plugins

In DatoCMS you can build two different kinds of plugins:

* **Single field plugins** reside in the record editor body and operate on top of a particular field (or set of fields),
* **Sidebar plugins** reside on the sidebar of the record editor and make it possible add custom behaviour based on the state of the entire record instead of a single field.

### Sidebar plugins

Sidebar plugins are rendered on the sidebar of the record editor. They make most sense if the functionality provided by the plugin applies to an entire record instead of a single field. 

Examples of sidebar plugins are:

* Custom webhooks/notifications,
* Integration with a preview environment,
* Moving entries across different projects

A sidebar plugin is still assigned to a field which is then ommited from the entry editor. The field's value can be used to store data for the sidebar plugin.
