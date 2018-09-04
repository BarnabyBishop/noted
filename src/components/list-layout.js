import React from 'react';
import styled from 'styled-components';
import DatePicker from './date-picker';
import TagPicker from './tag-picker';
import List from './list';
import Details from './details';
import Search from './search';

export default ({ actions, list, tags, tag, date, search, selectedListItem, loading, filterType }) => {
    return (
        <Container>
            <Filters>
                <TagPicker actions={actions} tags={tags} currentTag={tag} />
                <DatePicker actions={actions} filterType={filterType} currentDate={date} />
            </Filters>
            <Search actions={actions} list={list} selectedSearch={search} />
            <List
                actions={actions}
                list={list}
                filterType={filterType}
                currentDate={date}
                currentTag={tag}
                selectedListItem={selectedListItem}
                loading={loading}
            />
            <Details actions={actions} selectedListItem={selectedListItem} />
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 250px auto;
    min-width: 750px;

    @media (max-width: 376px) {
        grid-template-columns: 375px 375px;
    }
`;

const Filters = styled.div`
    background-color: #4990fe;
    color: #fff;
    height: 100%;
    vertical-align: middle;
`;
