---
position: 3
title: Creating a new plugin
---

To get started:

1. Navigate to *Settings > Plugins* in your project administrative area;
1. Select *Create new plugin* hovering the mouse on the plus button;
1. Enter a *Name* for the plugin;
1. Enter the *Plugin entry point URL*, that is the HTML page that will be embedded into the DatoCMS entry editor as an `<iframe>`;
1. Select the types of field where it will be possible to use the plugin;
1. If needed, enter some [parameter definitions](/docs/plugins/configuration-parameters/) and select whether the plugin must be rendered in sidebar or not.

![foo](../images/plugins/new.png)

Click Save to create the plugin.

### Assigning an plugin to a field

Once an plugin has been successfully installed, it can be assigned to one (or many) fields in one of your models. To do that:

1. Navigate to a Model and select a field;
1. Navigate to the *Settings > Presentation* tab of the field;
1. Select the desired Plugin;
1. Navigate to a record of the model to see the selected Plugin in action.

The image below shows the *Presentation* tab under the settings of a field:

![foo](../images/plugins/apply.png)

To use the plugin across several fields or content types, repeat the above steps again for each field.
