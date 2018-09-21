---
position: 13
title: UI Extensions
---

While DatoCMS offers a great number of fields with different appearance configurations, we obviously cannot cover every scenario. That's where UI Extensions come in.

UI Extensions enable developers to replace the default fields that DatoCMS provides with third-party HTML5 applications, so the editing experience of can be fully customized.

Technically speaking a UI Extension lives in a sandboxed `<iframe>` which interacts with the DatoCMS app through the [UI Extensions SDK](https://github.com/datocms/ui-extensions-sdk/). This SDK is a proxy to the [Content Management API](/content-management-api/) and is acting on behalf of the logged-in user.

### Use cases

Usage of UI Extensions is majorly focused on the following two areas:

#### Enhancing Authoring Experience

In cases wherein the field types provided by DatoCMS do not meet the specific requirements of the authors or editors, UI Extensions can be created to customize the DatoCMS Web App suite to fit the authors' needs perfectly. Consider the following scenarios:

* Requirement to add a multi-line text editor to a text field.
* A number field that allows the author to store geo-coordinates.
* To make tabular data editable.
* Displaying the difference between draft and published states of a field.
* To validate that all the links in the content are working.
* An enhanced interface that provides authors a quicker solution for setting references.

For all the above mentioned scenarios and many more UI Extensions are the perfect solution.

#### Third Party Integrations

UI Extensions can be created to communicate with external APIs and integrate third-party data in DatoCMS. Consider the following scenarios:

* Extracting the video ID from a valid YouTube URI.
* Translating text from the default locale to other locales in a space using an external translating API.
* Fetching product details from an external e-commerce website and embed it with content in DatoCMS.

The possibilities are endless!

### Next steps

If you're a developer, you can learn [how to build UI Extensions in our detailed guide](/docs/ui-extensions/).
