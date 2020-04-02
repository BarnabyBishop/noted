import React from 'react';
import styled from 'styled-components';

const TagPicker = props => {
    return (
        <Container>
            {props.tags.map((tag, index) => (
                <Row key={tag.tagName + index} onClick={() => props.actions.setTag(tag.tagName)}>
                    <Icon selected={props.currentTag === tag.tagName}>{tag.icon}</Icon>
                    <Tag selected={props.currentTag === tag.tagName}>{tag.tagName}</Tag>
                </Row>
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

    @media (max-width: 420px) {
        display: flex;
        justify-content: center;
    }
`;

const Tag = styled.span`
    ${p => p.selected && `color: #4990fe;`}
    padding-left: 5px;

    @media (max-width: 420px) {
        display: none;
    }
`;

const Row = styled.div`
    padding: 3px 0px;

    @media (max-width: 420px) {
        padding: 0px 5px;
    }
`;

const Icon = styled.span`
    ${p => p.selected && 'border-bottom: solid 1px #4990fe;'}
    padding-bottom: 3px;
`;

export default TagPicker;
