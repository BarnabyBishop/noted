import uuid from 'uuid/v4';

export const getList = () => ({
    type: 'GET_LIST'
});

export const addListItem = (title, created, sortOrder, text) => ({
    type: 'ADD_LIST_ITEM',
    id: uuid(),
    title: title || '',
    text: text || '',
    created,
    sortOrder
});

export const updateListItemSortOrder = (id, sortOrder) => ({
    type: 'UPDATE_LIST_ITEM_SORT_ORDER',
    id,
    sortOrder
});

export const updateListItem = (id, title, height) => ({
    type: 'UPDATE_LIST_ITEM',
    id,
    title,
    height
});

export const updateListItemText = (id, text) => ({
    type: 'UPDATE_LIST_ITEM_TEXT',
    id,
    text
});

export const saveListItem = id => ({
    type: 'SAVE_LIST_ITEM',
    id
});

export const removeListItem = id => ({
    type: 'REMOVE_LIST_ITEM',
    id
});

export const toggleCompleted = id => ({
    type: 'TOGGLE_COMPLETED',
    id
});
