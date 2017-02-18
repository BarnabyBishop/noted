const list = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_LIST_ITEM':
            return [
                ...state,
                { id: action.id,
                  dirty: true,
                  text: action.text,
                  created: action.created,
                  sortOrder: action.sortOrder }
            ];
        case 'UPDATE_LIST_ITEM':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        dirty: true,
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
        case 'TOGGLE_COMPLETED':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        dirty: true,
                        completed: !item.completed ? new Date() : null
                    };
                }
                return item;
            });
        case 'SAVED_LIST_ITEM': {
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        dirty: false
                    };
                }
                return item;
            });
        }
        default:
            return state;
    }
};

export default list;
