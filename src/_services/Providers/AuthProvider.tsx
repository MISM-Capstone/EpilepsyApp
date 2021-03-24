import 'react-native-gesture-handler';

import React, { useReducer, useEffect, useMemo } from 'react';

import LoginReducer, { initialReducerState } from '../reducers/LoginReducer';
import AuthContext, { AuthProviderContext } from '../Authentication/AuthContext';
import { registerUser, getUser } from '../Authentication/AuthFunctions';
import User from '../../models/User';

type AuthProviderProps = {
    children: React.ReactNode;
}

export default function AuthProvider(props:AuthProviderProps) {
    const [state, dispatch] = useReducer(LoginReducer, initialReducerState);
    useEffect(() => {
        getUser(dispatch);
    }, []);

    const authContext:AuthProviderContext = useMemo(
        () => ({
            isLoading:state.isLoading,
            user: state.user,
            register: async (user: User) => {
                await registerUser(user, dispatch);
            },
        }),
        [state.user, state.isLoading, dispatch]
    );

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
};

export function GetAuthContext() {
    return React.useContext(AuthContext);
}
