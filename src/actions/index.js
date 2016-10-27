let nextItemId = 101;

export const addListItem = (text) => ({
    type: 'SAVE_LIST_ITEM',
    id: nextItemId++,
    text
});

export const saveListItem = (id, text, height) => ({
    type: 'SAVE_LIST_ITEM',
    id,
    text,
    height
})

export const toggleListItem = (id) => ({
    type: 'TOGGLE_LIST_ITEM',
    id
});
