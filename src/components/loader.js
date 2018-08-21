import React from 'react';
import styled from 'styled-components';

export default () => (
    <Loader />
);

const Loader = styled.div`
    display: block;
    text-align: center;
    width: 100%;

    &:after {
        content: ' ';
        margin: 20px auto;
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid cornflowerblue;
        border-color: cornflowerblue transparent cornflowerblue transparent;
        animation: ring-loader 1.2s linear infinite;
    }

    @keyframes ring-loader {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;