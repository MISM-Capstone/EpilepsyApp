
export default abstract class Db {
    id: number | null = null;
    date_modified: Date = new Date();

    copy() {
        let objCopy = Object.create(this);
        for (const key of Reflect.ownKeys(this)) {
            objCopy[key] = (this as any)[key];
        }
        return objCopy as this;
    }
    abstract get db():DBObj;
}

export type DBObjFields = {
    id:"id",
    date_modified:"date_modified",
    [k:string]:string
}

export type DBObj = {
    table:string;
    fields: DBObjFields;
}

export const DbFields = {
    id: "id",
    date_modified:"date_modified",
} as const;
