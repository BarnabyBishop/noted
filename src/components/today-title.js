import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

export const Title = ({ id, title, completed, action, save, registerRef }) => {
    const [text, useText] = useState(title);
    const [autosave, useAutosave] = useState();

    const updateText = (newText) => {
        useText(newText);
        clearTimeout(autosave);
        useAutosave(setTimeout(() => save(id, newText), 1000));
    };

    return (
        <TextArea
            value={text}
            onChange={(e) => updateText(e.target.value)}
            onKeyDown={(e) => action(e, id, 'title')}
            completed={completed}
            inputRef={(ref) => registerRef(ref)}
            autoFocus={!title}
            rows="1"
        />
    );
};

const TextArea = styled(TextareaAutosize)`
    resize: none;
    outline: none;
    border: 0;
    width: 90%;
    font-size: 16px;

    ${(p) => p.completed && 'color: #777;'}
`;
