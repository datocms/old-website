---
title: Content Management API
---

This document is a detailed reference to DatoCMS's Content Management API.

The Content Management API is used to manage the content of your DatoCMS projects. This includes creating, updating, deleting, and fetching content of your projects. To use the Content Management API, you will need to authenticate yourself with an API token. Read more about it in <Link to="/docs/content-management-api/#authentication">Authentication</Link>.

The Content Management APIs also include many GET requests. However, it is highly recommended that you always use the [Content Delivery API](/docs/content-delivery-api/) deliver content to your public-facing web or mobile projects.

### JSON Schema

We expose a machine-readable JSON schema that describes what resources are available via the API, what their URLs are, how they are represented and what operations they support.

This schema follows the <a href="http://json-schema.org/">JSON Schema format</a>, combined with the draft <a href="http://tools.ietf.org/html/draft-fge-json-schema-validation-00">Validation</a> and <a href="http://tools.ietf.org/html/draft-luff-json-hyper-schema-00">Hypertext</a> extensions.

The latest version of the API schema will always be available at the following URL:

```
https://site-api.datocms.com/docs/site-api-hyperschema.json
```

### Official clients

DatoCMS ships with an official API client for <a href="https://github.com/datocms/js-datocms-client">Javascript</a> and <a href="https://github.com/datocms/ruby-datocms-client">Ruby</a>.
In this document you will find examples of usage with both clients for each endpoint the API exposes.

Both clients are built upon the API <Link to="/docs/content-management-api/#schema">JSON Schema</Link>, so they're guaranteed to be up-to-date with the API itself.
