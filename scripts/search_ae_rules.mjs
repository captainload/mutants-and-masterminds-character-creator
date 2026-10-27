import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');
const buf = fs.readFileSync('H:/My Drive/Friends/_SUPERHERO/Mutants & Masterminds 3rd Ed/Hero\'s Handbook Deluxe Edition.pdf');
const parser = new PDFParse({ data: buf });
parser.getText().then(res => {
  for (let p = 189; p <= 192; p++) {
    const text = res.pages[p - 1].text;
    const lines = text.split('\n');
    lines.forEach((l, i) => {
      if (l.toLowerCase().includes('alternate effect') || l.toLowerCase().includes('array')) {
        console.log(`=== Page ${p} line ${i} ===`);
        console.log(lines.slice(Math.max(0, i - 1), Math.min(lines.length, i + 8)).join('\n'));
      }
    });
  }
});
