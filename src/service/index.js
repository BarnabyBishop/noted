require('isomorphic-fetch'); // Required for iOS

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

import gql from 'graphql-tag';
import store from '../utils/store';

const middlewareLink = setContext(() => {
    return { headers: { authorization: `Bearer ${store.getState().app.authToken}` } };
});

const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        const {
            response: { headers }
        } = operation.getContext();
        if (headers) {
            store.dispatch({ type: 'SET_AUTH_TOKEN', authToken: headers.get('auth-token') });
        }

        return response;
    });
});

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
                );
            if (networkError) {
                if (networkError.statusCode === 401) {
                    store.dispatch({ type: 'SET_AUTH_TOKEN', authToken: null });
                } else {
                    console.log(`[Network error]: ${networkError}`);
                }
            }
        }),
        afterwareLink,
        middlewareLink,
        new HttpLink({
            uri: '/api/graphql'
        })
    ]),
    cache: new InMemoryCache()
});

export async function login(email, password) {
    const response = await fetch(`/api/login${location.search}`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ email, password })
    });
    if (response.status >= 400) {
        if (response.status === 401) {
            return false;
        }
        return new Error(response.statusText);
    }
    const { headers } = response;
    return headers.get('auth-token');
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
                itemByDate(userId: "${store.getState().app.userId}", date: "${date}") {
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
                itemBySearch(userId: "${store.getState().app.userId}", term: "${term}") {
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
                tags(userId: "${store.getState().app.userId}") {
                    tag
                }
            }
        `
    });
    return response.data;
}
