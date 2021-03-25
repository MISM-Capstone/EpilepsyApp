import { AuthAction, REDUCER_OPTIONS } from "../reducers/LoginReducer";
import User from "../../models/User";
import UserDao from "../database/dao/UserDao";

export async function getUser(dispatch:React.Dispatch<AuthAction>) {
    let user: User | undefined;
    try {
        user = await UserDao.getFirst();
    } catch (e) {
        console.log("Error getting user");
    }
    dispatch({type: REDUCER_OPTIONS.setUser, user: user});
}

export async function registerUser(user:User, dispatch:React.Dispatch<AuthAction>) {
    const result = await UserDao.insert(user);
    const newUser = await UserDao.getFirst();
    dispatch({type: REDUCER_OPTIONS.setUser, user: newUser});
}

export async function updateUser(user:User, dispatch:React.Dispatch<AuthAction>) {
    const result = await UserDao.update(user);
    const newUser = await UserDao.getFirst();
    dispatch({type: REDUCER_OPTIONS.setUser, user: newUser});
}
