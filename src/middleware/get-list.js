import { getListByDate, getListBySearch } from '../service';

export default store => next => async action => {
    if (action.type !== 'SET_DATE' && action.type !== 'SET_SEARCH' && action.type !== 'SET_TAG') {
        return next(action);
    }

    // Only search if there are at least two characters to search, otherwise there
    // are too many results (at least until search paging is implemented)
    if (action.type === 'SET_SEARCH' && (!action.search || action.search.length < 2)) {
        return next(action);
    }

    // Set date in app reducer
    next(action);

    next({ type: 'GETTING_LIST' });

    // SET_SEARCH and SET_TAG call the same search endpoint with the same API
    const getList = action.type === 'SET_DATE' ? getListByDate : getListBySearch;
    const value = action.type === 'SET_DATE' ? action.date : action.term;

    const data = await getList(value);
    if (data) {
        return next({ type: 'GOT_LIST', list: data });
    }

    return next({ type: 'GET_LIST_FAILED' });
};
