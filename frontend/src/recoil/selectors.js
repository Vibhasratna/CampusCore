import { selector } from 'recoil';
import { authState } from './atoms';

export const isAuthenticated = selector({
    key: 'isAuthenticated',
    get: ({ get }) => {
        const auth = get(authState);
        return auth.isLoggedIn;
    },
});