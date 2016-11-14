let nextItemId = 101;

export const addListItem = (text, index) => ({
    type: 'ADD_LIST_ITEM',
    id: nextItemId++,
    text: text || '',
    index
});

export const saveListItem = (id, text, height) => ({
    type: 'SAVE_LIST_ITEM',
    id,
    text,
    height
})

export const removeListItem = (id) => ({
    type: 'REMOVE_LIST_ITEM',
    id
})

export const toggleListItem = (id) => ({
    type: 'TOGGLE_LIST_ITEM',
    id
});
