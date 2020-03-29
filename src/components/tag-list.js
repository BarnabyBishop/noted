import React from 'react';
import styled from 'styled-components';

const TagPicker = props => {
    return (
        <Container>
            {props.tags.map((tag, index) => (
                <div key={tag.tagName + index} onClick={() => props.actions.setTag(tag.tagName)}>
                    <span>{tag.icon}&nbsp;</span>
                    {props.currentTag === tag.tagName ? (
                        <CurrentTag>{tag.tagName}</CurrentTag>
                    ) : (
                        <span>{tag.tagName}</span>
                    )}
                </div>
            ))}
        </Container>
    );
};

const Container = styled.div`
    grid-row: 1 / 3;
    background-color: #f5f5f5;

    box-shadow: inset rgba(170, 170, 170, 0.4) 1px 1px 5px 0px;
    overflow: hidden;
    white-space: nowrap;
    color: #000;
    padding: 10px;
    div {
        cursor: pointer;
    }
`;

const CurrentTag = styled.span`
    color: #4990fe;
    font-weight: bold;
`;

export default TagPicker;
