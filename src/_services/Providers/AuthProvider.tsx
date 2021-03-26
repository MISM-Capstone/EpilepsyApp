import React, { useReducer, useEffect, useMemo, createContext } from 'react';

import AuthReducer, { initialAuthReducerState } from '../reducers/AuthReducer';
import { registerUser, getUser, updateUser } from '../Authentication/AuthFunctions';
import User from '../../models/User';


export interface AuthProviderContext {
    isLoading: boolean;
    user?: User;
    register: (data:any) => void;
    update: (user:User) => void;
}

const AuthContext = createContext<AuthProviderContext>({} as AuthProviderContext);


type AuthProviderProps = {
    children: React.ReactNode;
}

export default function AuthProvider(props:AuthProviderProps) {
    const [state, dispatch] = useReducer(AuthReducer, initialAuthReducerState);
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
            update: async (user: User) => {
                await updateUser(user, dispatch);
            }
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
