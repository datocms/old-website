---
category: metalsmith
position: 1
title: Overview
---

<div class="note">
**Disclaimer** This guide assumes you already know what Metalsmith is and how it works. If you need some help getting started with Metalsmith, you can read the official [Metalsmith documentation](http://www.metalsmith.io/), as well as [Awesome Metalsmith](https://github.com/metalsmith/awesome-metalsmith), which feature a comprehensive set of guides, videos and curated resources.
</div>

---

### Overview

The main difference between Metalsmith and other static website generators is that, instead of being packed with lots of built-in features, it focuses on giving you an extensible architecture from which you can build your own stack, combining together a number of community plugins. 

With DatoCMS you can fully embrace the Metalsmith spirit: what we offer is a Javascript-based CLI tool that makes it extremely convenient to transform the content stored in your administrative area into local files. Once you've dumped your remote content into local files, you can keep on using Metalsmith like you're used to, taking advantage of all the already existing Metalsmith plugins. Just to make some common examples, you can:

* Transform remote content into local JSON/YAML files, and use them inside Metalsmith with [metalsmith-metadata](https://github.com/segmentio/metalsmith-metadata);
* Transform remote content into local Markdown files with frontmatter, then process them with [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown) and [metalsmith-collections](https://github.com/segmentio/metalsmith-collections);

You are in charge of specifing how DatoCMS records will be dumped into local files using a Javascript config file called `dato.config.js`.
