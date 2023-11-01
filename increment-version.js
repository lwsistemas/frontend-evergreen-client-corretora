const fs = require('fs');
const packageJson = require('./package.json');

// Increment the version (e.g., from "1.0.0" to "1.0.1")
const versionParts = packageJson.version.split('.');
versionParts[2] = (parseInt(versionParts[2]) + 1).toString();
packageJson.version = versionParts.join('.');

// Save the updated package.json
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
