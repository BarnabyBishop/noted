const tags = (state = [], action) => {
    switch (action.type) {
        case 'GOT_TAGS':
            return action.tags;
        default:
            return state;
    }
};

export default tags;
