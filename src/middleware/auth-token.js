import { setAuthStorage } from '../utils/local-storage';

export default store => next => async action => {
    if (action.type === 'SET_AUTH_TOKEN') {
        // Set auth token into local storage
        setAuthStorage(action.authToken);
    }

    return next(action);
};
