import { Reducer } from "react";
import User from "../../models/User";

export enum REDUCER_OPTIONS {
  registerUser = "registerUser",
  setUser = "setUser",
}

export type ReducerState = {
  isLoading: boolean;
  user?: User;
}

type ActionSetUser = {
    type:REDUCER_OPTIONS.setUser,
    user?:User,
}

export type AuthAction = ActionSetUser;


export const initialReducerState: ReducerState = {
  isLoading: true,
}

function LoginReducer(state:ReducerState, action:AuthAction) {
    switch (action.type) {
        case REDUCER_OPTIONS.setUser:
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

export default LoginReducer