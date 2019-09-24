require('dotenv').config();
const fetch = require('node-fetch');
const getExtractedSVG = require('svg-inline-loader').getExtractedSVG;
const request = require('request-promise-native');
const fs = require('fs');
const md5 = require('md5');
const path = require('path');

const getImage = (image, cacheDir) => {
  const requestUrl = image.url;
  const cacheFile = path.join(cacheDir, md5(requestUrl)) + '.svg';

  if (false && fs.existsSync(cacheFile)) {
    const body = fs.readFileSync(cacheFile, 'utf8');
    return Promise.resolve(body);
  }

  return request(requestUrl)
  .then((body) => {
    const prefix = `prefix-${md5(requestUrl)}-`;

    const fixedBody = getExtractedSVG(
      body,
      { classPrefix: prefix, idPrefix: prefix }
    )
    .replace(/Colfax\-Regular/g, 'colfax-web')
    .replace(/font\-size:12px/g, 'letter-spacing:.2pt; font-size:12px')
    .replace(/font\-size:10px/g, 'letter-spacing:.2pt; font-size:10px')
    .replace(/font\-size:8px/g, 'letter-spacing:.2pt; font-size:8px')
    .replace(/font-family:&#x27;PTMono\-Regular&#x27;; letter\-spacing:\.[^p]+pt;/g, `font-family:&#x27;SF-Mono-Regular&#x27;, &#x27;Source Code Pro&#x27;, Menlo, monospace; letter-spacing:.1pt;`);

    fs.writeFileSync(cacheFile, fixedBody, 'utf8');
    return body;
  });
}

(async () => {
  const cacheDir = `static/features/`

  if (!fs.existsSync(cacheDir)){
      fs.mkdirSync(cacheDir);
  }

  const res = await fetch(
    `https://graphql.datocms.com/${process.env.PREVIEW_MODE ? 'preview' : ''}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.DATO_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: '{ features: allFeatures { image { url } } }'
      }),
    }
  );
  const { data } = await res.json();

  for (const feature of data.features) {
    await getImage(feature.image, cacheDir);
  }
})();
