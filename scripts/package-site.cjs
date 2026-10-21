const fs = require('node:fs');
const path = require('node:path');
const destination = path.resolve('dist');
fs.mkdirSync(destination, {recursive:true});
fs.cpSync('Website',destination,{recursive:true});
for (const name of ['index.html','login.html','selection.html','registration.html']) {
  if (!fs.existsSync(path.join(destination,name))) throw new Error(`Missing release file: ${name}`);
}
console.log('Release package created in dist. All four HTML entry points are present.');
