/* General app state */
import jwtDecode from 'jwt-decode';

const filterTypes = {
    date: 'date',
    search: 'search',
    tag: 'tag'
};

const initialState = {
    date: new Date().toISOString(),
    search: '',
    tag: '',
    filterType: filterTypes.tag,
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
                selectedListItemId: action.list && action.list.length && action.list[0].id,
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
        case 'SET_MODAL_ACTIVE':
            return {
                ...state,
                modalActive: true
            };
        case 'SET_MODAL_DEACTIVE':
            return {
                ...state,
                modalActive: false
            };
        case 'LOGGING_IN':
            return {
                ...state,
                loginStatus: 'LOGGING_IN'
            };
        case 'LOGIN_FAILED':
            return {
                ...state,
                loginStatus: 'LOGIN_FAILED'
            };
        case 'SET_AUTH_TOKEN':
            return {
                ...state,
                loginStatus: null,
                authToken: action.authToken,
                userId: action.authToken ? jwtDecode(action.authToken).userId : null
            };
        default:
            return state;
    }
};

export default app;
