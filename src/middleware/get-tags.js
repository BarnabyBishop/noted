import { getTags } from '../service';

export default store => next => async action => {
    if (action.type !== 'GET_TAGS') return next(action);

    next({ type: 'GETTING_TAGS' });

    const data = await getTags();
    if (data) {
        return next({ type: 'GOT_TAGS', tags: data.tags });
    }

    return next({ type: 'GET_TAGS_FAILED' });
};

