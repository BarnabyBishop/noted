const today = new Date();

const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const dayAfter = new Date();
dayAfter.setDate(today.getDate() + 2);

const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const initialState = [
    { id: 11, sortOrder: 100, created: yesterday, completed: yesterday, text: 'yesterday (100)', checked: true },
    { id: 10, sortOrder: 200, created: yesterday, text: '3. React DND (200)', checked: false },
    { id: 5, sortOrder: 100, created: tomorrow, text: 'tomorrow (100)', checked: false },
    { id: 6, sortOrder: 100, created: dayAfter, text: 'dayAfter tomorrow (100)', checked: false },
    { id: 8, sortOrder: 300, text: '4. description note (300)', checked: false, height: 36 },
    { id: 9, sortOrder: 400, text: '5. DB (400)', checked: false },
    { id: 1, sortOrder: 100, created: today, text: '2. Checkboxes (100)', checked: false },
    { id: 0, sortOrder: 50, created: today, text: '1. sort Order (100)', checked: true },
    { id: 99, sortOrder: 500, text: 'So I said, I should get out of these wet clothes and into a dry martini.(500)', height: 69, checked: false }
];

const list = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LIST_ITEM':
            return [
                ...state,
                { id: action.id,
                  text: action.text,
                  created: action.created,
                  sortOrder: action.sortOrder }
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
        case 'TOGGLE_CHECKED':
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
