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

const compositeDecorator = new CompositeDecorator([
    {
        strategy: (...args) => tagStrategy(/^#\s.*/g, ...args),
        component: (props) => tagBlock('h1', props)
    },
    {
        strategy: (...args) => tagStrategy(/^##\s.*/g, ...args),
        component: (props) => tagBlock('h2', props)
    },
    {
        strategy: (...args) => tagStrategy(/^###\s.*/g, ...args),
        component: (props) => tagBlock('h3', props)
    },
    {
        strategy: (...args) => tagStrategy(/\*.+\*/g, ...args),
        component: (props) => tagBlock('strong', props)
    },
    {
        strategy: (...args) => tagStrategy(/_.+_/g, ...args),
        component: (props) => tagBlock('em', props)
    }
]);

export default function buildEditorState(text) {
    return EditorState.createWithContent(ContentState.createFromText(text), compositeDecorator)
};