---
title: Uploads
---

All the uploads object are augmented with some extra fields exposed via the
GraphQL API, to allow you some extra possibilities on the frontend.

### Images

Besides all the fields that you can explore via the CMS interface the API returns
the Blurhash of every image, also as a base64 thumbnail. You can embedded that
directly in the HTML of the page and then swap it with the actual image at a later
time, to offer a smooth experience when loading images.

Alternatively a more minimal option is to use the dominant colors to prepare the space
where the image will be shown:

<iframe src="https://cda-explorer.datocms.com/?embed&apitoken=faeb9172e232a75339242faafb9e56de8c8f13b735f7090964&query={%0A%20%20allUploads%20{%0A%20%20%20%20colors%20{%0A%20%20%20%20%20%20hex%0A%20%20%20%20}%0A%20%20%20%20blurhashBase64Thumb%0A%20%20%20%20url%0A%20%20}%0A}%0A"></iframe>


### Videos

If you chose to upload videos on DatoCMS, thanks to the integration with [Mux](https://www.mux.com),
we can augment the video objects with:

- HSL video streaming URL;
- high, medium and low quality MP4 versions of the video to support legacy browsers that do not support HSL;
- duration and frame rate of the video;
- thumbnail URL: resizable, croppable and available in JPEG, PNG and GIF format.

Like so:

<iframe src="https://cda-explorer.datocms.com/?embed&apitoken=faeb9172e232a75339242faafb9e56de8c8f13b735f7090964&query={%0A%20%20allUploads(filter%3A%20{type%3A%20{eq%3A%20video}})%20{%0A%20%20%20%20video%20{%0A%20%20%20%20%20%20duration%0A%20%20%20%20%20%20framerate%0A%20%20%20%20%20%20gifUrl%0A%20%20%20%20%20%20hlsUrl%0A%20%20%20%20%20%20mp4HighResUrl%0A%20%20%20%20%20%20mp4LowResUrl%0A%20%20%20%20%20%20mp4MediumResUrl%0A%20%20%20%20%20%20muxAssetId%0A%20%20%20%20%20%20muxPlaybackId%0A%20%20%20%20%20%20thumbnailUrl%0A%20%20%20%20}%0A%20%20}%0A}%0A"></iframe>

### Filtering

You can filter on all the meaningful fields that we offer in the uploads.

Here's an example of what you'll see in your CDA explorer:

![Filter uploads](../images/graphql/uploads-filtering.png)