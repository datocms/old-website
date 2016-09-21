---
title: API basics
---

# API basics

DatoCMS is an API-first CMS, offering two REST APIs for working with your content. Each APIs serves a different purpose, so which one to use depends on what you want to do:

* If you want to programmatically create or update content items, you want to use the Site Management API.
* When retrieving images stored in DatoCMS, they will come from dato-images.imgix.com. You can apply various transforms to images by appending query parameters to the URL.
* Finally, if you want to create or update new Sites, you want to use the Account Management API.

## Site Management API

The Site Management API (SMA), available at https://site-api.datocms.com, is a read-write API for managing your content. The API requires you to authenticate as a DatoCMS user. It covers several use cases, such as:

* Automatic imports from different CMSes like WordPress or Drupal
* Integration with other backend systems, such as an e-commerce shop

[Read the reference documentation for the Site Management API](/docs/api/sma.html)

## Account Management API

The Account Management API (AMA), available at https://account-api.datocms.com a read-write API for managing your account Sites. The API requires you to authenticate as a DatoCMS account. It covers several use cases, such as:

[Read the reference documentation for the Account Management API](/docs/api/ama.html)

## Images API

Every DatoCMS site comes with the power of Imgix image processing. Imgix makes image processing easy by allowing you to resize, crop, rotate, style, watermark images and more easily on-the-fly. This is especially useful when your app needs to keep image sizes dynamic for optimal rendering speed across devices.

[Read the reference documentation for the Image URL API](https://docs.imgix.com/apis/url)

