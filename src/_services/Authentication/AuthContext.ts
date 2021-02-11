import { createContext } from "react";

export interface AuthProviderContext {
    signIn: (data:any) => void;
    signOut: () => void;
    signUp: (data:any) => void;
}

const AuthContext = createContext<AuthProviderContext>({} as AuthProviderContext);

export default AuthContext