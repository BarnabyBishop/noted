import { login } from '../service';

export default store => next => async action => {
    if (action.type !== 'LOGIN') return next(action);

    next({ type: 'LOGGING_IN' });

    const authToken = await login(action.email, action.password);
    if (authToken) {
        return next({ type: 'SET_AUTH_TOKEN', authToken });
    }

    return next({ type: 'LOGIN_FAILED' });
};
