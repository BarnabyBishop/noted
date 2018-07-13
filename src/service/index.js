import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import store from '../utils/store';
import { getAuthStorage } from '../utils/local-storage';

const client = new ApolloClient({
    uri: `/api/graphql${location.search}`,
    request: operation => {
        operation.setContext({
            headers: {
                authorization: `Bearer ${getAuthStorage()}`
            }
        });
    },
    onError: ({ graphQLErrors, networkError }) => {
        if (networkError && networkError.statusCode === 401) {
            store.dispatch({ type: 'SET_AUTH_TOKEN', authToken: null });
        }
    }
});

export async function login(email, password) {
    const response = await fetch(`/api/login${location.search}`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ email, password })
    });
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    const details = await response.json();
    return details;
}

export async function saveListItem(listItem) {
    const response = await fetch(`/api/save-list-item${location.search}`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(listItem)
    });
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    const savedListItem = await response.json();
    return savedListItem;
}

export async function getList() {
    const response = await fetch(`/api/get-list${location.search}`);
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    const data = await response.json();
    return data;
}

const listItemFields = `
id
sortOrder
created
completed
title
text
height
createdAt
updatedAt`;

export async function getListByDate(date) {
    const response = await client.query({
        query: gql`
            query Query {
                itemByDate(date: "${date}") {
                    ${listItemFields}
                }
            }
        `
    });
    return response.data.itemByDate;
}

export async function getListBySearch(term) {
    const response = await client.query({
        query: gql`
            query Query {
                itemBySearch(term: "${term}") {
                    ${listItemFields}
                }
            }
        `
    });
    return response.data.itemBySearch;
}

export async function getTags() {
    const response = await client.query({
        query: gql`
            query Query {
                tags {
                    tag
                }
            }
        `
    });
    return response.data;
}
