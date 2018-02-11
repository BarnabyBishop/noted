export const setDate = date => ({
    type: 'SET_DATE',
    date
});

export const setSelectedListItem = itemId => ({
    type: 'SET_SELECTED_LIST_ITEM',
    itemId
});

export const setSearch = search => ({
    type: 'SET_SEARCH',
    search
});

export const setFilterType = filterType => ({
    type: 'SET_FILTER_TYPE',
    filterType
});