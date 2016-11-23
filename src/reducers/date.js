const initialState = {
    currentDate: new Date()
};

const date = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                currentDate: action.date
            };
        default:
            return state;
    }
};

export default date;
