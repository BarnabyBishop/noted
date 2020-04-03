export const setDate = date => ({
    type: 'SET_DATE',
    date
});

export const setSearch = term => ({
    type: 'SET_SEARCH',
    term
});

export const setTag = tag => ({
    type: 'SET_TAG',
    tag
});

export const setSelectedListItem = itemId => ({
    type: 'SET_SELECTED_LIST_ITEM',
    itemId
});

export const setModalActive = itemId => ({
    type: 'SET_MODAL_ACTIVE',
    itemId
});

export const setModalDeactive = () => ({
    type: 'SET_MODAL_DEACTIVE'
});

export const setAuthToken = authToken => ({
    type: 'SET_AUTH_TOKEN',
    authToken
});

export const login = (email, password) => ({
    type: 'LOGIN',
    email,
    password
});
