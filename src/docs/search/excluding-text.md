---
category: search
position: 5
title: Exclude content from indexing
---

To give your users the best experience, it's often useful to instruct DatoCMS to exclude certain parts of your pages from indexing, for example website headers and footers. Those sections are repeated in every page, thus can only degrade your search results.

To do that, you can simply add a `data-datocms-noindex` attribute to the HTML elements of your page you want to exclude: everything cointained in those elements will be ignored during indexing.

```html
<body>
  <div class="header" data-datocms-noindex>
    ...
  </div>
  <div class="main-content">
    ...
  </div>
  <div class="footer" data-datocms-noindex>
    ...
  </div>
</body>
```
