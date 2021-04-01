import { AuthAction, AUTH_REDUCER_OPTIONS } from "../reducers/AuthReducer";
import User from "../../models/User";
import UserDao from "../database/dao/UserDao";

export async function getUser(dispatch:React.Dispatch<AuthAction>) {
    let user: User | undefined;
    try {
        user = await UserDao.getFirst();
    } catch (e) {
        console.warn("Error getting user");
    }
    dispatch({type: AUTH_REDUCER_OPTIONS.setUser, user: user});
}

export async function registerUser(user:User, dispatch:React.Dispatch<AuthAction>) {
    const result = await UserDao.save(user);
    const newUser = await UserDao.getFirst();
    dispatch({type: AUTH_REDUCER_OPTIONS.setUser, user: newUser});
}

export async function updateUser(user:User, dispatch:React.Dispatch<AuthAction>) {
    await UserDao.save(user);
    const newUser = await UserDao.getFirst();
    dispatch({type: AUTH_REDUCER_OPTIONS.setUser, user: newUser});
}
