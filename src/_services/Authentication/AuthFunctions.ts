import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONTEXT_OPTIONS, STORAGE_KEYS } from "../../constants";

export async function GetAuthToken(dispatch:React.Dispatch<any>) {
    let userToken;
    try {
        userToken = await AsyncStorage.getItem(STORAGE_KEYS.userToken);
    } catch (e) {
        console.log("Error getting token");
    }
    dispatch({type: CONTEXT_OPTIONS.restoreToke, token: userToken});
}

export async function AddAuthToken(userToken:string) {
    await AsyncStorage.setItem(STORAGE_KEYS.userToken, userToken);
}

export async function RemoveAuthToken() {
    await AsyncStorage.removeItem(STORAGE_KEYS.userToken);
}