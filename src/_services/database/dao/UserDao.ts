import User, { UserDb } from "../../../models/User";
import DAO from "./Dao"

export default class UserDao extends DAO {
    static async getUser() {
        const sql = `
            SELECT
                *
            FROM
                ${UserDb.table}
            LIMIT 1;
        `;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return this.SetResultsToList(results[0].rows)[0] as User | undefined;
    }
    static async insertUser(user:User) {
        const tableAttributes = this.getObjParamsForInsert(user);
        const sql = `
            INSERT INTO ${UserDb.table}
                (${tableAttributes.attributes})
            VALUES
                (${tableAttributes.values});
        `;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, tableAttributes.params);
        return this.SetResultsToList(results[0].rows);

    }
}