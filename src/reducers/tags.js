const tags = (state = [], action) => {
    switch (action.type) {
        case 'GOT_TAGS':
            return action.tags.map(item => item.tag);
        default:
            return state;
    }
};

export default tags;
