import React from 'react';
import styled from 'styled-components';

const TagButton = props => {
    return (
        <Container onClick={() => props.toggleTagList()}>
            <i className="fab fa-slack-hash"></i>
            {props.currentTag && props.currentTag.replace('#', '')}
        </Container>
    );
};

const Container = styled.div`
    display: inline-block;
    padding: 0px 15px;
`;

export default TagButton;
