import Db from "./models/AbstractClasses/Db";

export function IterateThroughKeys(obj:any, action:(key:string, value:any)=>void) {
    for (let [key, value] of Object.entries(obj)) {
        action(key, value);
    }
}

export function CopyObjAttributes(objToCopy:any, objCopiedTo:any) {
    IterateThroughKeys(objToCopy, (key, value) => {
        objCopiedTo[key] = value;
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