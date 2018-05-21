export const setDate = date => ({
    type: 'SET_DATE',
    date
});

export const setSearch = term => ({
    type: 'SET_SEARCH',
    term
});

export const setTag = term => ({
    type: 'SET_TAG',
    term
});

export const setSelectedListItem = itemId => ({
    type: 'SET_SELECTED_LIST_ITEM',
    itemId
});
