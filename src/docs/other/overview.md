---
category: other
position: 1
title: Introduction
---

All the websites built with a static website generator are made of:

* Static files which represent the actual content of the pages (usually written in Markdown + [front matter](https://jekyllrb.com/docs/frontmatter/), YAML, JSON or Toml);
* Some HTML templates that use these files to generate the actual static HTML pages you will upload online.

With DatoCMS here's the workflow:

1. You create a web administrative interface for your editors that fits exactly the needs of your static website;
2. Editors can make changes to the content of the website from that CMS interface you prepared;
3. Using our CLI tool, all the data stored in your DatoCMS administrative interface can be transformed into local Markdown/YAML/JSON/Toml files, so that can be "digested" by the static website generator just as they were written by hand.

The process of translating the data coming from the API into static files can be performed both on your machine during the development process of the website, and in your Continuous Deployment service anytime the editors request a new build pressing a *Publish changes* button on the web interface.

Now your static website isn't static anymore! Isn't this awesome?! :-)

Our Javascript-based CLI tool makes it extremely convenient to transform the content stored in your administrative area into local files. You are in charge of specifing how DatoCMS records will be dumped into local files using a Javascript config file called `dato.config.js`.

Once you've dumped your remote content into local files, you can keep on work on your static website like you're used to.


