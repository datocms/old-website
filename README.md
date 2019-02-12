# DatoCMS marketing website

https://www.datocms.com

## Development

You'll need a DatoCMS API token for the site's data. See `.env.sample`.

## Troubleshooting

### libvips

On Ubuntu the sharp library needs an updated version of libvips. In that case you should build it from soure.

Get the latest release here: https://github.com/libvips/libvips and build it.

Then I had to follow these steps to make it work: https://github.com/lovell/sharp/issues/327#issuecomment-167094002
