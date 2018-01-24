---
category: hugo
position: 1
title: Overview
---

**Disclaimer** This guide assumes you already know what Hugo is and how it works. If you need some help getting started with Hugo, you can read the official [Hugo documentation](https://gohugo.io/overview/introduction/) and [discussion forum](https://discuss.gohugo.io/).

---

### Overview

Unlike other static site generators written in other languages, Hugo doesn't offer any way to extend its features with plugins. To overcome this limitation DatoCMS offers a Javascript-based CLI tool that makes it extremely convenient to transform the content stored in your administrative area into local:

* Hugo [posts](https://gohugo.io/content/organization/) and [content types](https://gohugo.io/content/types/) (complete with Yaml frontmatter);
* Hugo [data files](https://gohugo.io/extras/datafiles/);
* Add sections to your Hugo [configuration file](https://gohugo.io/overview/configuration/).

Once content coming from DatoCMS is dumped into local files, you are free to use Hugo just like you're used to. You are in charge of specifying how DatoCMS records will be dumped into these files using a Javascript config file called `dato.config.js`.
