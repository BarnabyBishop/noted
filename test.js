//const Plain = require('slate-plain-serializer').default;
const MarkdownSerializer = require('slate-md-serializer').default;

const Serializer = new MarkdownSerializer();

const text = `here is some **strong** text and some _emphasis_ text

# title`;

// const plain = Plain.deserialize(text);
// console.log(JSON.stringify(plain, null, 2));
const md = Serializer.deserialize(text);
console.log(JSON.stringify(md, null, 2));
