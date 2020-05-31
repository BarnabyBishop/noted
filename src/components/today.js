import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { sortList } from '../utils/sort-utils';
import { List } from './today-list';

const itemByDateQuery = gql`
    query Query($userId: ID, $date: String) {
        itemByDate(userId: $userId, date: $date) {
            id
            sortOrder
            created
            completed
            title
            text
            createdAt
            updatedAt
        }
    }
`;

export default ({ actions, userId }) => {
    const [date, useDate] = useState(new Date());
    // Keep query up here so we can change the query with selected tags or changed date
    const { loading, error, data } = useQuery(itemByDateQuery, { variables: { userId, date } });
    const sortedList = data && data.itemByDate ? sortList(data.itemByDate) : [];

    // We want to seperate the component state from apollo state, this needs to be cloned
    // const sortedListClone = cloneDeep(sortedList);
    // console.log({ sortedListClone });

    console.log('RENDER TODAY');

    return (
        <Container>
            <div>LHC</div>
            <div>
                <h1>{`${moment().format('dddd, D MMM YYYY')}`}</h1>
                {sortedList && sortedList.length && (
                    <List sortedList={sortedList} loading={loading} error={error} actions={actions} userId={userId} />
                )}
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 150px auto;
    padding: 20px;

    @media (max-width: 420px) {
        grid-template-columns: 100%;
    }
`;
