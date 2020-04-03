import React from 'react';
import styled from 'styled-components';

// https://webdesign.tutsplus.com/articles/quick-tip-easy-css3-checkboxes-and-radio-buttons--webdesign-8953

const Checkbox = ({ htmlId, checked, onChange, enabled }) => {
    return (
        <Container>
            <Input type="checkbox" id={htmlId} checked={checked} onChange={onChange} />
            <Label htmlFor={htmlId} enabled={enabled} />
        </Container>
    );
};

const Container = styled.div`
    display: 'inline-block';
    vertical-align: top;
    margin-top: 4px;
    margin-right: 9px;
`;

const Input = styled.input`
    display: none;

    &:checked + label::after {
        border: 3px solid limegreen;
        border-top: none;
        border-right: none;
    }
`;

const Label = styled.label`
    height: 12px;
    width: 12px;
    border-radius: 3px;
    display: ${p => (p.enabled ? 'inline-block' : 'none')}
    margin-right: 2px;
    position: relative;
    cursor: pointer;

    &:after {
        content: '';
        width: 12px;
        height: 5px;
        position: absolute;
        top: -1px;
        left: 2px;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    &:hover:after {
        border: 3px solid #ddd;
        border-top: none;
        border-right: none;
    }
`;

export default Checkbox;
