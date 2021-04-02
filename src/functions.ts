import { StackNavigationProp } from "@react-navigation/stack";
import { ResultSet } from "react-native-sqlite-storage";
import Db from "./models/AbstractClasses/Db";
import { HomeStackParamList } from "./navigation/Home/HomeNavProps";
import { TrendsStackParamList } from "./navigation/Trends/TrendsNavProps";
import { UpdateProviderContext } from "./_services/Providers/UpdateProvider";

export function IterateThroughKeys(obj:any, action:(key:string, value:any)=>void) {
    for (let [key, value] of Object.entries(obj)) {
        action(key, value);
    }
}

export function CopyObjAttributes(objToCopy:any, objCopiedTo:any) {
    IterateThroughKeys(objToCopy, (key, value) => {
        let oldValue = objCopiedTo[key];
        if (oldValue !== null) {
            if (!(oldValue instanceof Object) && typeof oldValue === typeof value) {
                objCopiedTo[key] = value;            
            } else if (oldValue instanceof Date) {
                objCopiedTo[key] = new Date(value);
            }
        } else {
            objCopiedTo[key] = value;
        }
    });
}

export function CopyAndSetKey<T extends Db>(obj:T, key:keyof T, value:any) {
    let newObj = obj.copy();
    newObj[key] = value;
    return newObj;
}

export function updateValue<T extends Db, TProp extends keyof T>(obj:T, key:TProp, value:T[TProp], hook:(obj:T)=>void) {
    updateValues(obj, [key], [value], hook);
}

export function updateValues<T extends Db, TProp extends keyof T>(obj:T, keys:TProp[], values:T[TProp][], hook:(obj:T)=>void) {
    let newObj = obj.copy();
    for (let i=0; i<keys.length; i++) {
        newObj = CopyAndSetKey(newObj, keys[i], values[i]);
    }
    hook(newObj);
}

export function returnToPreviousPage(obj: Db, results:ResultSet, updateContext: UpdateProviderContext, nav: () => void) {
    const id = obj.id ? obj.id : results.insertId;
    updateContext.setUpdateObj(obj, id);
    nav();
}