import { saveListItem } from '../service';

export default store => next => async action => {
  if (action.type !== 'SAVE_LIST_ITEM') return next(action);
  const state = store.getState();
  const list = state.list;
  const listItem = list.find(item => item.id === action.id);

  next(action);

  if (listItem && listItem.dirty) {
    next({ type: 'SAVING_LIST_ITEM', id: action.id });
    await saveListItem(listItem);
    return next({ type: 'SAVED_LIST_ITEM', id: action.id });
  }
  return next({ type: 'SAVE_LIST_ITEM_FAILED', id: action.id });
}