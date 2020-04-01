//const Plain = require('slate-plain-serializer').default;
import MarkdownSerializer from './renderer';

const Serializer = new MarkdownSerializer();

const text = `here is some __squiggles__ ok`;

// const plain = Plain.deserialize(text);
// console.log(JSON.stringify(plain, null, 2));
const md = Serializer.deserialize(text);
console.log(JSON.stringify(md, null, 2));
