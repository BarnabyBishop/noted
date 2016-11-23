const today = new Date();

const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const dayAfter = new Date();
dayAfter.setDate(today.getDate() + 2);

const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const initialState = [
    { id: 6, created: yesterday, completed: yesterday, text: 'yesterday', checked: true },
    { id: 6, created: yesterday, text: 'yesterday but aint finished', checked: true, height: 36 },
    { id: 1, created: today, text: 'today', checked: false },
    { id: 5, created: tomorrow, text: 'tomorrow', checked: false },
    { id: 6, created: dayAfter, text: 'dayAfter tomorrow', checked: false },
    { id: 8, text: 'note note note note', checked: false },
    { id: 9, text: 'I like what youve got', checked: false },
    { id: 99, text: 'So I said, I should get out of these wet clothes and into a dry martini.', height: 69, checked: false }
];

const list = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LIST_ITEM':
            return [
                ...state.slice(0, action.index),
                { id: action.id, text: action.text },
                ...state.slice(action.index)
            ];
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
            const index = state.findIndex(item => item.id === action.id);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
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
