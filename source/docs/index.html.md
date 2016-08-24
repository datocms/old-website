---
title: Documentation
---

# Documentation
###### The place to learn how to build with DatoCMS

Here you'll find everything necessary for setting up and going deeper: introductory explanations, tutorials, SDKs and libraries for major platforms, API references as well as other helpful tools and code samples.

### What is DatoCMS

DatoCMS is working hard to provide the easiest way to enable non-technical editors to update a completely static website — without the intervention of a developer — from the comfort of a user-friendly web interface, just like they're used with Wordpress and such.

### How does it work?

All the websites built with a static website generator are made of:

* Static files which represent the actual content of the pages (usually written in Markdown + [front matter](https://jekyllrb.com/docs/frontmatter/), plus optionally some YAML, JSON or Toml config files);
* Some HTML templates that use these files to generate the actual static HTML pages you will upload online.

That means that, up until now, even the most basic change to a static website could only be performed by a tech-savvy users, as too many things had to be known (Git, Markdown syntax, properly editing YAML/JSON/Toml files).

DatoCMS works differently:

1. You create a web administrative interface for your editors that fits exactly the needs of your static website;
2. Editors can make changes to the content of the website from that CMS interface you prepared;
3. Using our plugins, all the data stored in your DatoCMS administrative interface can be transformed into local Markdown/YAML/JSON/Toml files, so that can be "digested" by the static website generator just as they were written by hand.

The process of translating the data coming from the API into static files can be performed both on your machine during the development process of the website, and in your Continuous Deployment service anytime the editors request a new "build" pressing a "Publish" button on the web interface.

Now your static website isn't static anymore! Isn't this awesome?! :-) 

### General concepts

These articles introduce the basics of DatoCMS, explain our data model, and provide some best practices. Perhaps this is the best place to start if you haven't built anything with DatoCMS before.

* [Data model](/docs/concepts/data-model/)
* [Deployment solutions](/docs/concepts/deployment/)

### Video Tutorials

These series of screencast will walk you through the publishing of a fully-static website using DatoCMS.

* [Middleman + Netlify](/docs/tutorials/middleman_netlify/)

### Integration with Static Website Generators

DatoCMS offers an API that can be used inside most static website generators to fetch all the data contained inside a Site. We also have prepared specific plugins for the most popular generators, so that you can start developing right away.

* [Middleman](/docs/ssg/middleman/)

### API references

Here you can find some generic overview of the API:

* [API basics](/docs/concepts/api-basics/)
* [Field types](/docs/concepts/field-types/)

There are three APIs available, and each serves one specific purpose:

* [Site Management API](/docs/api/sma/) for managing content inside a Site (e.g. creating, updating, deleting content)
* [Account Management API](/docs/api/ama/) for creating new Sites programmatically
