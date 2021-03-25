import { createContext } from "react";
import User from "../../models/User";

export interface AuthProviderContext {
    isLoading: boolean;
    user?: User;
    register: (data:any) => void;
    update: (user:User) => void;
}

const AuthContext = createContext<AuthProviderContext>({} as AuthProviderContext);

export default AuthContext