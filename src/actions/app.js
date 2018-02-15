export const setDate = date => ({
    type: 'SET_DATE',
    date
});

export const setSearch = search => ({
    type: 'SET_SEARCH',
    search
});

export const setTag = tag => ({
    type: 'SET_TAG',
    tag
});

export const setSelectedListItem = itemId => ({
    type: 'SET_SELECTED_LIST_ITEM',
    itemId
});

export const setDateFilter = () => ({
    type: 'SET_DATE_FILTER'
});