import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DatePicker from './date-picker';
import TagList from './tag-list';
import TagButton from './tag-button';
import List from './list';
import Details from './details';
import Search from './search';

export default ({ actions, list, tags, tag, date, search, selectedListItem, loading, filterType, modalActive }) => {
    const [showTagList, useTagList] = useState(false);
    const currentTag = tag ? tag.tagName : '';
    return (
        <Container showTagList={showTagList}>
            <TagList actions={actions} tags={tags} currentTag={currentTag} />
            <Filters>
                <TagButton toggleTagList={() => useTagList(!showTagList)} currentTag={currentTag} />
                <Link to="/today">
                    <i className="fas fa-calendar-alt" />
                </Link>
                {/* <DatePicker actions={actions} filterType={filterType} currentDate={date} /> */}
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
            <Details actions={actions} selectedListItem={selectedListItem} modalActive={modalActive} />
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: ${(p) => (p.showTagList ? '200px' : '35px')} 250px auto;

    @media (max-width: 420px) {
        grid-template-columns: 100%;
    }
`;

const Filters = styled.div`
    color: #4990fe;
    background-color: #fff;
    height: 100%;
    vertical-align: middle;
`;
