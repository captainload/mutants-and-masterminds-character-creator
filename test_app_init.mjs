import fs from 'fs';

const html = fs.readFileSync('C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator/index.html', 'utf8');

// Parse all IDs present in index.html
const idRegex = /id=["']([^"']+)["']/g;
const validIds = new Set();
let m;
while ((m = idRegex.exec(html)) !== null) {
  validIds.add(m[1]);
}

// Minimal DOM mock
class MockElement {
  constructor(id = '', tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.style = {};
    this.dataset = {};
    this.classList = {
      add: () => {},
      remove: () => {},
      toggle: () => {},
      contains: () => false
    };
    this.value = '';
    this.textContent = '';
    this.innerHTML = '';
  }
  addEventListener(event, fn) {}
  querySelector(sel) { return new MockElement(); }
  querySelectorAll(sel) { return [new MockElement()]; }
  appendChild(child) { this.children.push(child); }
  insertBefore(child) {}
  setAttribute(k, v) {}
  getAttribute(k) { return null; }
  closest(sel) { return this; }
}

global.window = {
  innerWidth: 1200,
  innerHeight: 800,
  addEventListener: () => {},
  removeEventListener: () => {},
  confirm: () => true,
  alert: () => {},
  prompt: () => 'Test'
};

const mockElements = new Map();

global.document = {
  documentElement: new MockElement('html', 'html'),
  body: new MockElement('body', 'body'),
  getElementById(id) {
    if (!validIds.has(id)) {
      console.warn(`[WARN] getElementById called with missing ID: "${id}"`);
      return null;
    }
    if (!mockElements.has(id)) {
      mockElements.set(id, new MockElement(id));
    }
    return mockElements.get(id);
  },
  querySelector(sel) {
    return new MockElement('', 'div');
  },
  querySelectorAll(sel) {
    return [new MockElement('', 'div')];
  },
  createElement(tag) {
    return new MockElement('', tag);
  },
  addEventListener() {}
};

global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

global.sessionStorage = {
  getItem: () => null,
  setItem: () => {}
};

let domLoadedCb;
global.window.addEventListener = (event, fn) => {
  if (event === 'DOMContentLoaded') domLoadedCb = fn;
};

// Now import app.js and try new AppController
try {
  global.document.readyState = 'complete';
  await import('./js/app.js');
  if (global.window.app) {
    console.log('SUCCESS! window.app instance initialized.');
    console.log('Character loaded:', global.window.app.char.name);
    console.log('Abilities cost:', global.document.getElementById('abilities-cost-display')?.textContent);
    console.log('Skills cost:', global.document.getElementById('skills-cost-display')?.textContent);
    console.log('Advantages cost:', global.document.getElementById('advantages-cost-display')?.textContent);
    console.log('Powers cost:', global.document.getElementById('powers-cost-display')?.textContent);
  } else {
    console.error('FAILED: window.app not defined');
  }
} catch (err) {
  console.error('Error during app.js execution:', err);
}
