import uuid from 'uuid/v4';

export const addListItem = (text, created, sortOrder) => ({
  type: 'ADD_LIST_ITEM',
  id: uuid(),
  text: text || '',
  created,
  sortOrder
});

export const updateListItemSortOrder = (id, sortOrder) => ({
  type: 'UPDATE_LIST_ITEM_SORT_ORDER',
  id,
  sortOrder
});

export const updateListItem = (id, text, height) => ({
  type: 'UPDATE_LIST_ITEM',
  id,
  text,
  height
});

export const saveListItem = id => ({
  type: 'SAVE_LIST_ITEM',
  id
});

export const removeListItem = id => ({
  type: 'REMOVE_LIST_ITEM',
  id
});

export const toggleCompleted = id => ({
  type: 'TOGGLE_COMPLETED',
  id
});
