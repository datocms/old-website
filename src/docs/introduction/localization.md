---
position: 9
title: Localization
---

Each administrative area in DatoCMS supports multiple locales, defined by the short ISO locale codes (ie. `en` or `de`). You can add or remove locales within the *Admin area > Site settings* section:

![Site settings in admin area](../images/localization/1.png)
![Available languages select](../images/localization/2.png)

Each field is localized individually, so you can pick and choose which specific content needs to be translated and which not:

![Field-specific localization](../images/localization/3.png)
![Field localization switch](../images/localization/4.png)

As soon as a localized field is present within a model, the form to edit its records will present one tab for each locale:

![Localization tabs](../images/localization/5.png)

---

### How to localize images (title and alt)

DatoCMS media handling by default gives you the title and alt field for every image:

![Title and alt for the image field](../images/localization/6.png)

If you don't need to localize them you can just use them straight away.

Otherwise, what we recommend is to use a *modular block* with an image field, and a couple of text fields:

![Image modular block](../images/localization/7.png)

You can then add the *modular block* to a localizable *modular content*. If you need a single image you can limit the number of records to one, otherwise you leave it unlimited to build a gallery:

![Limit records in modular content](../images/localization/8.png)

Once you have done your first image block, you can easily reuse it across other instances, by picking an existing block:

![Pick existing image block](../images/localization/9.png)

**Pro tip**: if you chose to use the additional fields to manage image titles, you are then free to use the native title and alt text to describe your medias and leverage the search functionality in the media management section of DatoCMS. If you have a big media library this is going to be very useful to help you find the assets!

---

### Adding new locales along the way

With DatoCMS you are free to add new locales at any time; just be aware that, once a new locale is added, if some validations are present on your fields, those validations will be enforced for every locale. Records already created will therefore be marked as "invalid", and you won't be able to update your records until all the validations are satisfied for all the locales. For more information, take a look at the [Data migration](/docs/introduction/data-migration/) chapter.
