---
title: DatoCMS Documentation
---

# Documentation

DatoCMS is working hard to provide the easiest way to enable non-technical editors to update a completely static website — without the intervention of a developer — from the comfort of a user-friendly web interface, just like they're used with Wordpress and such.

Here you'll find everything necessary for setting up and going deeper: introductory explanations, tutorials, SDKs and libraries for major platforms, API references as well as other helpful tools and code samples.

### General concepts

These articles introduce the basics of DatoCMS, explain our data model, and provide some best practices. Perhaps this is the best place to start if you haven't built anything with DatoCMS before.

* [Data model](/docs/concepts/data-model/)
* [Deployment solutions](/docs/concepts/deployment/)

### Video Tutorials

These series of screencast will walk you through the publishing of a fully-static website using DatoCMS.

* [Middleman + Netlify](/docs/tutorials/middleman_netlify/)

### Integration with Static Website Generators

DatoCMS offers an API that can be used inside most static website generators to fetch all the data contained inside a site. We also have prepared specific plugins for the most popular generators, so that you can start developing right away.

* [Middleman](/docs/ssg/middleman/)
* [Hugo](/docs/ssg/hugo/)
* [Jekyll](/docs/ssg/jekyll/)
* [Hexo](/docs/ssg/hexo/)
* [Metalsmth](/docs/ssg/metalsmith/)

### API references

Here you can find some generic overview of the API:

* [API basics](/docs/concepts/api-basics/)
* [Field types](/docs/concepts/field-types/)

There are two APIs available, each serves one specific purpose:

* [Site Management API](/docs/api/sma/) for managing content inside a site (e.g. creating, updating, deleting content)
* [Account Management API](/docs/api/ama/) for creating new sites programmatically
