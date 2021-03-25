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

export function CopyAndSetKey(obj:Db, key:string, value:any) {
    let newObj = obj.copy();
    newObj[key] = value;
    return newObj;
}