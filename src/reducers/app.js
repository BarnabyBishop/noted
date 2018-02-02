/* General app state */

const filterTypes = {
    date: 'date',
    search: 'search',
    tag: 'tag'
}

const initialState = {
    date: new Date().toISOString(),
    search: null,
    tag: null,
    filterType: filterTypes.date,
    selectedListItemId: null
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                date: action.date
            };
        case 'SET_SEARCH':
            return {
                ...state,
                search: action.search
            };
        case 'SET_TAG':
            return {
                ...state,
                tag: action.tag
            };
        case 'SET_FILTER_TYPE':
            return {
                ...state,
                filterType: action.filterType
            };
        case 'SET_SELECTED_LIST_ITEM':
            return {
                ...state,
                selectedListItemId: action.itemId
            };
        default:
            return state;
    }
};

export default app;
