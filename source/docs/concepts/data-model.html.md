---
title: Data model
---

# Data model

Content in DatoCMS is organized into <strong>Sites</strong>, so that related resources for one project can be grouped together into one repository. Any DatoCMS account can create multiple Sites. That is, if you have three different websites running on your DatoCMS account, you need to create three different Sites.

Each Site you create offers a completely separate backend on a different domain, with different users that can be invited in and different content they can manage within the backend itself.

The way you define the kind of content you can edit inside each different Site passes through the concept of <strong>Item Type</strong>. Each Site can specify a number of different Item Types, and they represent <em>blueprints</em> upon which users create the actual website content. For example, a Site can define Item Types for articles, products, categories, image galleries, and so on.

Individual pieces of content you create are stored in <strong>Items</strong>, which represent textual or structural information. Each item has a set of attributes, derived from a particular Item Type.

Each Item Type defines which <strong>Fields</strong> a item of that type is supposed to have. Each Field has a name, a data type and additional metadata, like validations. The data type defines what kind of content the field values store, e.g. a short text or an integer number. 

One notable data type is Link, it enables the modeling of relationships between items. For example, you can have a category Item Type and link all blog posts belonging to that category to it, so that you can easily retrieve them. Each field in DatoCMS can also be localized into different locales, by providing a different value for each of them.

<div class="space--both-5"><img src="/images/data-model.png" /></div>

## Collection vs Singleton Item Types

Real-world websites have often pages which don't resemble any other (eg. "About us" section or the homepage). If you want to allow the editors to change their content, you can create a <strong>Singleton Item Type</strong>. While standard Item Types enable the creation of a collection of multiple items, singletons permit just a single item to be edited.

## Customizing the Navigation Menu

Big websites tend to require a significant number of Item Types to properly manage every page, so for editors it might quickly become difficult to understand which Item Type of the backend is linked to which part of the frontend site.

You can easily help your editors by customizing the navigation menu they see on the left. You can easily organize the different Item Types in a more understandable way grouping and nesting them to mimic the structure of your frontend site. 

## Links

Links are a very powerful way to model relationships between pieces of content. items can have Link fields which point to other items, for example:

* A <em>Restaurant</em> linking to its <em>Menu</em> (singular relationship)
* A <em>Menu</em> linking to its specific <em>Menu items</em> (plural relationship)

Using Links, relationships are clearly defined and validated by specific Item Type Fields.

<div class="space--both-5"><img src="/images/links.png" width="300"/></div>

## Locales

A Site in DatoCMS can support multiple locales, defined by the short ISO locale codes (ie. `en` or `de`). Each Field is localized individually, so you can pick and choose which specific content needs to be translated and which not. As soon as a localized Field is present within a Item Type, the forms for that specific Item Type will present one tab for each Locale.

## Data migration and Invalid items

In DatoCMS you are free at any time you want to edit any Item Type and Field present in your Site. While this is great news for you, it also complicates the situation quite a bit on our part! 

Suppose you have an `Article` Item Type, and you already have a number of article items saved in your Site. What happens to these existing articles in one of the following situations?

* You add a new mandatory field;
* You transform a non-localized field into a localized one (or viceversa);
* You add a new Locale to your Site (ie. Italian).

Well, these existing articles are now suddenly invalid: that is, the data they contain does not respect the new Item Type <em>"blueprint"</em> anymore. 

The way DatoCMS handles any of this situation follows these common-sense rules:

* If a non-localized field becomes localized, the existing non-localized content becomes the content associated with the first Site locale, and the other locales will be empty;
* If a localized field becomes non-localized, only the content specified for the first Site locale is preserved, the others will be destroyed;
* If you remove a Locale from the Site settings, the content of any localized Field for that locale will be destroyed;
* If you add a new Locale in the Site settings, the content of any localized Field for that locale will be empty;

On top of that, anytime you edit a Item Type (or any of its Fields and metadata), each of its items will be re-checked against the new validation rules, and potentially <strong>marked as invalid</strong>. Our APIs and static site generator plugins only deal with valid items, so that invalid content won't be present in the final frontend website.
