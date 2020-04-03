export default store => next => action => {
    if (window && window.location.search.indexOf('debug') > -1) {
        console.log('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        return result;
    }
    return next(action);
};
