const jsdom = require("jsdom");                                                                               
const { JSDOM } = jsdom;
require('@testing-library/jest-dom');
const fs = require('fs');
const path = require('path');
 
let dom: typeof JSDOM;
let document: Document;
let container: Element;
 
const html = fs.readFileSync(path.resolve(__dirname, "..", 'src', 'template.html'), 'utf8');
dom = new JSDOM(html, {runScripts: 'dangerously'});
document = dom.window.document;
const body = document.body;
container = body.firstElementChild;
 
export { container, document };
