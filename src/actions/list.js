let nextItemId = 101;

export const addListItem = (text, created, sortOrder) => ({
    type: 'ADD_LIST_ITEM',
    id: nextItemId++,
    text: text || '',
    created,
    sortOrder
});

export const saveListItem = (id, text, height) => ({
    type: 'SAVE_LIST_ITEM',
    id,
    text,
    height
});

export const removeListItem = (id) => ({
    type: 'REMOVE_LIST_ITEM',
    id
});

export const toggleChecked = (id) => ({
    type: 'TOGGLE_CHECKED',
    id
});
