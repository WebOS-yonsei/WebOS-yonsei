const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function init() {
  console.log('### Packing the Enact TV app ###');
  execSync('bun pack -p');

  console.log('### Transpiling the packed app ###');
  execSync('bunx rollup --config rollup.config.mjs');

  console.log('### Replace the main.js with bundle.js in index.html');
  const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const modifiedContent = indexContent.replace('/main.js', 'bundle.js');
  fs.writeFileSync(indexPath, modifiedContent, 'utf8');

  console.log('### Done! ###');
}

init();
