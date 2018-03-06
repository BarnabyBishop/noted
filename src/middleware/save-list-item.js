import { saveListItem } from '../service';

export default store => next => async action => {
    if (action.type !== 'SAVE_LIST_ITEM') return next(action);

    next(action);

    // Run save after initial action to ensure all updates have been made.
    const state = store.getState();
    const list = state.list;
    const listItem = list.find(item => item.id === action.id);

    // Only save an item if it has changed (dirty) and has some title or text filled in
    if (listItem && listItem.dirty && (listItem.title || listItem.text)) {
        next({ type: 'SAVING_LIST_ITEM', id: action.id });
        const savedListItem = await saveListItem(listItem);
        return next({ type: 'SAVED_LIST_ITEM', id: action.id, item: savedListItem });
    }
    return next({ type: 'SAVE_LIST_ITEM_FAILED', id: action.id });
};
