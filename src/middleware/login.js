import { login } from '../service';
import { setAuthStorage } from '../utils/local-storage';

export default store => next => async action => {
    if (action.type !== 'LOGIN') return next(action);

    next({ type: 'LOGGING_IN' });

    const data = await login(action.email, action.password);
    console.log({ data });
    if (data && data.token) {
        setAuthStorage(data.token);
        return next({ type: 'SET_AUTH_TOKEN', authToken: data.token });
    }

    return next({ type: 'LOGIN_FAILED' });
};
