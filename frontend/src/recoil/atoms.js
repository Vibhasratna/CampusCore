import { atom } from 'recoil';

const getInitialAuthState = () => {
    const storedAuth = localStorage.getItem('authState');
    return storedAuth ? JSON.parse(storedAuth) : { isLoggedIn: false, user: null };
};

export const authState = atom({
    key: 'authState',
    default: getInitialAuthState(),
});