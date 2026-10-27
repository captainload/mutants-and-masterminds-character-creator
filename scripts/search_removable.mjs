import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');
const buf = fs.readFileSync('H:/My Drive/Friends/_SUPERHERO/Mutants & Masterminds 3rd Ed/Hero\'s Handbook Deluxe Edition.pdf');
const parser = new PDFParse({ data: buf });
parser.getText().then(res => {
  for (let p = 200; p <= 212; p++) {
    const text = res.pages[p - 1].text;
    if (text.includes('Removable') || text.includes('removable')) {
      const lines = text.split('\n');
      lines.forEach((l, i) => {
        if (l.toLowerCase().includes('removable') || l.toLowerCase().includes('device')) {
          console.log(`=== Page ${p} line ${i}: ${l} ===`);
          console.log(lines.slice(Math.max(0, i - 1), Math.min(lines.length, i + 6)).join('\n'));
        }
      });
    }
  }
});
