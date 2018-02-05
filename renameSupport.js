var fs = require('fs');
var stats = JSON.parse(fs.readFileSync('public/stats.json', 'utf8'));
fs.renameSync('public/' + stats.assetsByChunkName.support[0], 'public/support.js');
