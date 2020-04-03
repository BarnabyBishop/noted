import { getTags } from '../service';
import { setTag } from '../actions/app';

export default store => next => async action => {
    if (action.type !== 'GET_TAGS') return next(action);

    next({ type: 'GETTING_TAGS' });

    const data = await getTags();
    if (data) {
        if (action.initial && data.tags && data.tags.length) {
            store.dispatch(setTag(data.tags[0]));
        }
        return next({ type: 'GOT_TAGS', tags: data.tags });
    }

    return next({ type: 'GET_TAGS_FAILED' });
};
