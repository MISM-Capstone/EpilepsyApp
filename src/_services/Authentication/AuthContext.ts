import { createContext } from "react";
import User from "../../models/User";

export interface AuthProviderContext {
    isLoading: boolean;
    user?: User;
    register: (data:any) => void;
}

const AuthContext = createContext<AuthProviderContext>({} as AuthProviderContext);

export default AuthContext