const initialState = [
    { id: 1, text: 'first note', checked: false },
    { id: 5, text: '2nd note', checked: false },
    { id: 99, text: '3 note', checked: true }
];

const list = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LIST_ITEM':
            // Use slice not splice
            state.splice(action.index, 0, { id: action.id, text: action.text });
            return [].concat(state);
        case 'SAVE_LIST_ITEM':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        text: action.text,
                        height: action.height
                    };
                }
                return item;
            });
        case 'REMOVE_LIST_ITEM':
            return state.map(item => {
                if (item.id !== action.id) {
                    return item;
                }
                return null;
            });
        case 'TOGGLE_LIST_ITEM':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        checked: !item.checked
                    };
                }
                return item;
            });
        default:
            return state;
    }
};

export default list;
