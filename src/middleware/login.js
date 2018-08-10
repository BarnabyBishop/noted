import { login } from '../service';
import { setDate } from '../actions/app';
import { getTags } from '../actions/tags';

export default store => next => async action => {
    if (action.type !== 'LOGIN') return next(action);

    next({ type: 'LOGGING_IN' });

    const authToken = await login(action.email, action.password);
    if (authToken) {
        next({ type: 'SET_AUTH_TOKEN', authToken });
        next(setDate(new Date()));
        return next(getTags());
    }

    return next({ type: 'LOGIN_FAILED' });
};
