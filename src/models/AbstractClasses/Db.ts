
export default abstract class Db {
    id: number | null = null;

    copy() {
        let objCopy = Object.create(this);
        for (const key of Reflect.ownKeys(this)) {
            objCopy[key] = (this as any)[key];
        }
        return objCopy as this;
    }
}

export type DBObjFields = {[k:string]:string}

export type DBObj = {
    table:string;
    fields: DBObjFields;
}

export const DbFields = {
    id: "id",
} as const;
