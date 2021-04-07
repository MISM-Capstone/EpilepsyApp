import User from "../../models/User";

export enum AUTH_REDUCER_OPTIONS {
  registerUser = "registerUser",
  setUser = "setUser",
}

export type AuthReducerState = {
  isLoading: boolean;
  user?: User;
}

type AuthActionSetUser = {
    type:AUTH_REDUCER_OPTIONS.setUser,
    user?:User,
}

export type AuthAction = AuthActionSetUser;


export const initialAuthReducerState: AuthReducerState = {
  isLoading: true,
}

function AuthReducer(state:AuthReducerState, action:AuthAction) {
    switch (action.type) {
        case AUTH_REDUCER_OPTIONS.setUser:
          return {
            ...state,
            user: action.user,
            isLoading: false,
          };
        default: {
            return state
        }
      }
}

export default AuthReducer