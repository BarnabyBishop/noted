import { getList } from '../service';

export default store => next => async action => {
    if (action.type !== 'GET_LIST') return next(action);

    next({ type: 'GETTING_LIST' });

    const data = await getList();
    if (data && data.list) {
        return next({ type: 'GOT_LIST', list: data.list });
    }

    return next({ type: 'GET_LIST_FAILED' });
};

