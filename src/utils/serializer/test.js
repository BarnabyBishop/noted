//const Plain = require('slate-plain-serializer').default;
import MarkdownSerializer from './renderer';

/*
TODO
[x] Headings
[x] Bold
[x] Italics
[ ] blockquote
[ ] list
[ ] Strikeout
[ ] inline code
[ ] fence
[ ] tags
[ ] table?
[x] hr
*/

const Serializer = new MarkdownSerializer();

const text = `
|heading1|heading2|
|--------|--------|
|value 1 |value 2 |
|valie 3 |value 4 |
`;

// const plain = Plain.deserialize(text);
// console.log(JSON.stringify(plain, null, 2));
const md = Serializer.deserialize(text);
console.log(JSON.stringify(md, null, 2));
