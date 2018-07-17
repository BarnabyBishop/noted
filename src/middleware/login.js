import { login } from '../service';
import { setAuthStorage } from '../utils/local-storage';

export default store => next => async action => {
    if (action.type !== 'LOGIN') return next(action);

    next({ type: 'LOGGING_IN' });

    const authToken = await login(action.email, action.password);
    if (authToken) {
        setAuthStorage(authToken);
        return next({ type: 'SET_AUTH_TOKEN', authToken: authToken });
    }

    return next({ type: 'LOGIN_FAILED' });
};
