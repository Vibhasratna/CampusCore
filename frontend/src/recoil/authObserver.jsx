import { useRecoilState } from 'recoil';
import { authState } from './atoms';
import { useEffect } from 'react';

const AuthObserver = () => {
    const [auth, setAuth] = useRecoilState(authState);

    useEffect(() => {
        localStorage.setItem('authState', JSON.stringify(auth));
    }, [auth]);

    return null;
};

export default AuthObserver;