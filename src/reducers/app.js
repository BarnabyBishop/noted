/* General app state */
const initialState = {
    currentDate: new Date(),
    selectedListItemId: null
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                currentDate: action.date
            };
        case 'SET_SELECTED_LIST_ITEM':
            return {
                ...state,
                selectedListItemId: action.itemId
            };
        default:
            return state;
    }
};

export default app;
