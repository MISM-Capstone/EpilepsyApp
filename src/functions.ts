export function IterateThroughKeys(obj:any, action:(key:string, value:any)=>void) {
    for (let [key, value] of Object.entries(obj)) {
        action(key, value);
    }
}