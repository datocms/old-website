const crypto = require('crypto');

exports.sourceNodes = async (
  { boundActionCreators },
  { resolve }
) => {
  const { createNode } = boundActionCreators;
  const digest = (blob) => crypto.createHash('md5').update(JSON.stringify(blob)).digest('hex');
  return resolve(createNode, digest);
}
