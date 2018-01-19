---
category: schema
position: 1
title: Define the schema
---

DatoCMS can be seen as a client-friendly interface over a database, so the first step is to build the actual schema upon which users will generate the actual website content.

---

### Models, fields and records

The way you define the kind of content you can edit inside each different administrative area passes through the concept of <strong>models</strong>, which are much like database tables. Each administrative area can specify a number of different models, and they represent <em>blueprints</em> upon which users will store the website content. For example, a site can define different models for articles, products, categories, and so on. 

You can create new models in the *Admin area > Models* section of your administrative area:

![foo](/images/data-model/1.png)

Each model consists of a set of <strong>fields</strong> that you define. Fields can can be one of the following:

* **Single-line string**: Ideal for titles, headings, etc.
* **Multiple-paragraph text**: For Markdown, HTML or plain text.
* [**Modular content**](/schema/modular-content.html): To compose your content with text, images, videos, etc. in a Medium-like manner.
* **Integer** and **Floating-point number**: For storing integer SKUs, quantities, prices, etc.
* **Boolean**: For storing values that have two states, e.g. yes or no, true or false etc.
* **Date** and **DateTime**: A timestamp value for storing dates and times (ie. an event start, office opening hours).
* [**File attachment**](/other/fields.html#file-attachment-fields): To store any kind of document (PDF, ZIP, etc.).
* [**Image**](/other/fields.html#image-fields) and [**Image gallery**](/other/fields.html#image-gallery-fields): To store one or more images (for sliders, carousels, etc.).
* [**Video**](/other/fields.html#video-fields): To reference to an external YouTube/Vimeo video.
* [**Color**](/other/fields.html#color-fields): For storing colors (with or without alpha channel).
* [**Geolocation**](/other/fields.html#geolocation-fields): Coordinate values for storing the latitude and longitude of a physical location.
* [**SEO meta tags**](/other/fields.html#seo-meta-tags-fields): To manage a page meta title, meta description, OpenGraph cards, etc.
* [**Slug**](/schema/slug-permalinks.html): To generate a page permalink based on another textual field of the model.
* [**Single and multiple links**](/schema/links.html): To model relationships between content, including other models. For example, linking a blog to a category.

<div class="small">
![foo](/images/data-model/2.png)
</div>
    
Each field has a name and additional metadata, like validations, or particular configurations to better present the field to the editor (hints, etc.):

<div class="two">
  <div>![foo](/images/data-model/3.png)</div>
  <div>![foo](/images/data-model/4.png)</div>
</div>

Fields in DatoCMS can also be localized, if you need to accept different values based on language.

DatoCMS stores the individual pieces of content you create from a model as <strong>records</strong>, which are much like table rows in a database. You (and your editors) can create new records of a certain model within the *Content* tab of your administrative area:

![foo](/images/data-model/5.png)
