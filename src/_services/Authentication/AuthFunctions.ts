import { AuthAction, REDUCER_OPTIONS } from "../reducers/LoginReducer";
import User from "../../models/User";
import UserDao from "../database/dao/UserDao";

export async function getUser(dispatch:React.Dispatch<AuthAction>) {
    let user: User | undefined;
    try {
        user = await UserDao.getUser();
    } catch (e) {
        console.log("Error getting token");
    }
    dispatch({type: REDUCER_OPTIONS.setUser, user: user});
}

export async function registerUser(user:User, dispatch:React.Dispatch<AuthAction>) {
    const result = await UserDao.insertUser(user);
    const newUser = await UserDao.getUser();
    dispatch({type: REDUCER_OPTIONS.setUser, user: newUser});
}
