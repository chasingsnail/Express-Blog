const path = require('path')

const basePath = __dirname
console.log('basePath: ', basePath);
const path1 = path.join(__dirname, '../', '../', 'logs')
console.log('path1: ', path1);
const path2 = path.resolve(__dirname, 'logs')
console.log('path2: ', path2);