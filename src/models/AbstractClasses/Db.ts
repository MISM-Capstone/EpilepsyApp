
export default abstract class Db {
    id: number | null = null;

    copy() {
        let objCopy = Object.create(this);
        for (const key of Reflect.ownKeys(this)) {
            objCopy[key] = (this as any)[key];
        }
        return objCopy;
    }
}

export type DBObj = {
    table:string;
    fields: {[k:string]:string}
}

export const DbFields = {
    id: "id",
}
