/* General app state */

const filterTypes = {
    date: 'date',
    search: 'search',
    tag: 'tag'
}

const initialState = {
    date: new Date().toISOString(),
    search: '',
    tag: null,
    filterType: filterTypes.date,
    selectedListItemId: null
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                date: action.date,
                filterType: 'date',
                tag: null,
                search: ''
            };
        case 'SET_SEARCH':
            return {
                ...state,
                search: action.search,
                filterType: action.search ? 'search' : 'date',
                tag: null
            };
        case 'SET_TAG':
            return {
                ...state,
                tag: action.tag,
                filterType: 'tag',
                search: ''
            };
        case 'SET_DATE_FILTER':
            return {
                ...state,
                filterType: 'date',
                tag: null,
                search: ''
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
