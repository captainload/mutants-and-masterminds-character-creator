import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const buf = fs.readFileSync('H:/My Drive/Friends/_SUPERHERO/Mutants & Masterminds 3rd Ed/Hero\'s Handbook Deluxe Edition.pdf');
const parser = new PDFParse({ data: buf });
parser.getText().then(res => {
  for (let i = 186; i <= 192; i++) {
    console.log(`=== PAGE ${i} ===`);
    console.log(res.pages[i - 1].text.substring(0, 1500));
  }
});
