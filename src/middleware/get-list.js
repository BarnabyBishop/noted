import { getListByDate, getListBySearch } from '../service';

export default store => next => async action => {
    if (action.type !== 'SET_DATE' && action.type !== 'SET_SEARCH' && action.type !== 'SET_TAG') {
        return next(action);
    }

    // Set date in app reducer
    next(action);

    next({ type: 'GETTING_LIST' });

    let data;
    if (action.type === 'SET_DATE') {
        data = await getListByDate(action.date);
    } else if (action.type === 'SET_TAG' && action.tag) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const fromDate = action.tag.todo ? today.toISOString() : '';
        data = await getListBySearch(action.tag.tagName, fromDate);
    } else {
        data = await getListBySearch(action.term);
    }
    if (data) {
        return next({ type: 'GOT_LIST', list: data });
    }

    return next({ type: 'GET_LIST_FAILED' });
};
