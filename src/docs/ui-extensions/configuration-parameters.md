---
position: 4
title: Configuration parameters
---

When building an extension, you might feel the need to add some configuration options, so that you can reuse the same extension with slight differences multiple times in different fields.

There are two types of configuration parameters that can be set up for an extension:

* **Global parameters** are project-wide settings and are applied to every field within the project that uses the extension. You can set them up under the *Settings > UI Extensions* section;
* **Instance parameters** are field-specific settings. Every time you assing an extension to a field you set different parameters directly within the Presentation tab of the fields settings.

### Defining parameters

When creating a new extension, you can define which configuration options it will accept using a specific JSON format:

![foo](../images/ui-extensions/parameters.png)

As you can see, both global and instance parameters take an array of **parameter definitions**. Every parameter definition is an object constructed as described in the table below:

Property    | Type and value                               | Required? | Remarks
------------|----------------------------------------------|-----------|--------
`id`        | String                                       | yes       | Can contain only letters and numbers
`label`     | String                                       | yes       | Human readable name of the parameter
`type`      | `boolean`, `date`, `date_time`, `float`, `integer`, `string`, `text`, `json` or `color` | yes | The type of field to offer when editing this parameter
`hint`      | String                                       | no        | Further explanation of the purpose of the parameter
`required`  | Boolean                                      | no        | Whether the parameter value needs to be provided (defaults to `false`)
`default`   | Should match type                            | no        | Default value to use for the parameter

As soon as you edit the *Parameter definitions* field, a preview of the resulting fields will be shown under the field:

![foo](../images/ui-extensions/parameters-preview.png)

**WARNING:** Configuration parameters can be read by anybody who is allowed to use the extension. It's not secure to use parameters to inject access tokens with access level permitting data manipulation. Read-only tokens can be used but keep in mind their value is not hidden.

