import { Reducer } from "react";
import { CONTEXT_OPTIONS } from "../constants";

export type ReducerState = {
    isLoading: boolean;
    isSignout: boolean;
    userToken: string | null;
}

const LoginReducer:Reducer<ReducerState, any> = (state:ReducerState, action) => {
    console.log("Called Reducer -------------------------");
    console.log(state);
    console.log(action);
    switch (action.type) {
        case CONTEXT_OPTIONS.restoreToke:
          return {
            ...state,
            userToken: action.token,
            isLoading: false,
          };
        case CONTEXT_OPTIONS.login:
          return {
            ...state,
            isSignout: false,
            userToken: action.token,
          };
        case CONTEXT_OPTIONS.logout:
          return {
            ...state,
            isSignout: true,
            userToken: null,
        };
        default: {
            return state
        }
      }
}

export default LoginReducer