import fs from 'fs';

const html = fs.readFileSync('C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator/index.html', 'utf8');
const js = fs.readFileSync('C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator/js/app.js', 'utf8');

const regex = /getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const missing = new Set();
while ((match = regex.exec(js)) !== null) {
  const id = match[1];
  if (!html.includes(`id="${id}"`) && !html.includes(`id='${id}'`)) {
    missing.add(id);
  }
}

console.log('Missing IDs found in app.js:');
console.log(Array.from(missing));
