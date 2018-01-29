---
position: 6
title: Link fields
---

Links are a powerful way to model relationships between content. Models can have link fields which point to other records, for example:

* An article linking to its category (singular relationship).
* An article linking to some related articles (plural relationship).

In DatoCMS you don't need to define a field for the reverse relationship (ie. the category linking to its articles): as we'll discover later during the integration with your static website, you can easily perform reverse reference lookups in a couple of lines of code.

When you add a new field of type **Link** (or **Links**) to a model, DatoCMS requires you to specify, within the *Validations* tab, the models that can be referenced in the field itself:


To let the editors select one (or more) records to link, DatoCMS will present a dropdown with auto-completion turned on:


---

### Links as "embedded forms"

While this is by far the most common usage for a link field, you can also use them to achieve a totally different editing experience changing the presentation mode of the field to **Embedded form**:


Instead of referencing existing records, the *embedded form* mode allows the editors to create new records of the specified models **within the context of a parent record**. This is useful in at least two scenarios:

##### To model parent > child collections

Take as an example two models: each recipe has its own distinct collection of steps. Creating/editing steps inside a global collection might be cumbersome: in this case, you can just create a Links field in the *Recipe* model, and only edit the steps within the context of its recipe:


##### Inside a record, to model a group of optional fields

Similarly, suppose you have a model with a set of fields that might not be always needed. Sure, you can just leave these fields empty, but it might clutter your interface. Instead, you can create a separate model with those fields, and use a Link field on the parent model to make them optional altogheter:

#### Hiding "embedded" models from the navigation bar

If you create a model only to be used inside Link fields of other models, it is perfectly safe and suggested to remove it from the navigation bar, so that they can only be accessed within a parent record.
