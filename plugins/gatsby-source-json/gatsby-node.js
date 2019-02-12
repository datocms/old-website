const crypto = require('crypto');

exports.sourceNodes = async (
  { actions },
  { resolve }
) => {
  const { createNode } = actions;
  const digest = (blob) => crypto.createHash('md5').update(JSON.stringify(blob)).digest('hex');
  return resolve(createNode, digest);
}
