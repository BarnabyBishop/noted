import React from 'react';
import { EditorState, ContentState, CompositeDecorator } from 'draft-js';

function tagStrategy(regex, contentBlock, callback, contentState) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) { // eslint-disable-line
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

const tagBlock = (Tag, props) => {
    return <Tag>{props.children}</Tag>;
};

const Url = (props) => (
    <a href={props.decoratedText} target="_blank">{props.children}</a>
);

const Code = (props) => (
    <pre className="code-block"><code>{props.children}</code></pre>
);

const types = {
    h1: {
        regex: /^#\s.*/g,
        tag: 'h1'
    },
    h2: {
        regex: /^##\s.*/g,
        tag: 'h2'
    },
    h3: {
        regex: /^###\s.*/g,
        tag: 'h3'
    },
    strong: {
        regex: /\*.+\*/g,
        tag: 'strong'
    },
    em: {
        regex: /_.+_/g,
        tag: 'em'
    },
    url: {
        regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    },
    code: {
        regex: /```(.|\n)[^```]*```/g
    }
}

const compositeDecorator = new CompositeDecorator([
    {
        strategy: (...args) => tagStrategy(types.h1.regex, ...args),
        component: (props) => tagBlock(types.h1.tag, props)
    },
    {
        strategy: (...args) => tagStrategy(types.h2.regex, ...args),
        component: (props) => tagBlock(types.h2.tag, props)
    },
    {
        strategy: (...args) => tagStrategy(types.h3.regex, ...args),
        component: (props) => tagBlock(types.h3.tag, props)
    },
    {
        strategy: (...args) => tagStrategy(types.strong.regex, ...args),
        component: (props) => tagBlock(types.strong.tag, props)
    },
    {
        strategy: (...args) => tagStrategy(types.em.regex, ...args),
        component: (props) => tagBlock(types.em.tag, props)
    },
    {
        strategy: (...args) => tagStrategy(types.url.regex, ...args),
        component: Url
    },
    {
        strategy: (...args) => tagStrategy(types.code.regex, ...args),
        component: Code
    }
]);

export default function buildEditorState(text) {
    return EditorState.createWithContent(ContentState.createFromText(text), compositeDecorator)
};