/* General app state */

const filterTypes = {
    date: 'date',
    search: 'search',
    tag: 'tag'
};

const initialState = {
    date: new Date().toISOString(),
    search: '',
    tag: null,
    filterType: filterTypes.date,
    selectedListItemId: null,
    loading: true,
    authToken: null
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'GETTING_LIST':
            return {
                ...state,
                loading: true
            };
        case 'GOT_LIST':
            return {
                ...state,
                loading: false
            };
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
                search: action.term,
                filterType: action.term ? 'search' : 'date',
                tag: null
            };
        case 'SET_TAG':
            return {
                ...state,
                tag: action.term,
                filterType: 'tag',
                search: ''
            };
        case 'SET_SELECTED_LIST_ITEM':
            return {
                ...state,
                selectedListItemId: action.itemId
            };
        case 'SET_AUTH_TOKEN':
            return {
                ...state,
                authToken: action.authToken
            };
        default:
            return state;
    }
};

export default app;
