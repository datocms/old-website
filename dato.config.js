const getExtractedSVG = require('svg-inline-loader').getExtractedSVG;
const request = require('request-promise-native');
const fs = require('fs');
const md5 = require('md5');
const path = require('path');

const getImage = (image, cacheDir) => {
  const requestUrl = image.url();
  const cacheFile = path.join(cacheDir, md5(requestUrl)) + '.svg';

  if (fs.existsSync(cacheFile)) {
    const body = fs.readFileSync(cacheFile, 'utf8');
    return Promise.resolve(body);
  }

  return request(requestUrl)
  .then((body) => {
    const prefix = `prefix-${md5(image.url)}-`;

    const fixedBody = getExtractedSVG(
      body,
      { classPrefix: prefix, idPrefix: prefix }
    )
    .replace(/url\(#/g, `url(#${prefix}`)
    .replace(/Colfax\-Regular/g, 'colfax-web');

    fs.writeFileSync(cacheFile, fixedBody, 'utf8');
    return body;
  });
}

module.exports = (dato, root, i18n) => {
  const cacheDir = `static/features/`

  if (!fs.existsSync(cacheDir)){
      fs.mkdirSync(cacheDir);
  }

  dato.features.reduce(
    (chain, feature) => {
      return chain.then(() => getImage(feature.image, cacheDir));
    },
    Promise.resolve()
  );
}
