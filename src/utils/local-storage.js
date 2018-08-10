const localStorage = window.localStorage;

export const getAuthStorage = () => {
    return localStorage.getItem('auth-token');
};

export const setAuthStorage = authToken => {
    return localStorage.setItem('auth-token', authToken);
};
