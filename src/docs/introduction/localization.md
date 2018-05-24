---
position: 9
title: Localization
---

Each administrative area in DatoCMS supports multiple locales, defined by the short ISO locale codes (ie. `en` or `de`). You can add or remove locales within the *Admin area > Site settings* section:

![foo](../images/localization/1.png)
![foo](../images/localization/2.png)

Each field is localized individually, so you can pick and choose which specific content needs to be translated and which not:

![foo](../images/localization/3.png)
![foo](../images/localization/4.png)

As soon as a localized field is present within a model, the form to edit its records will present one tab for each locale:

---

### Adding new locales along the way

With DatoCMS you are free to add new locales at any time; just be aware that, once a new locale is added, if some validations are present on your fields, those validations will be enforced for every locale. Records already created will therefore be marked as "invalid", and you won't be able to update your records until all the validations are satisfied for all the locales. For more information, take a look at the [Data migration](/docs/introduction/data-migration/) chapter.
