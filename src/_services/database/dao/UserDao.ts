import User, { UserDb } from "../../../models/User";
import DAO from "./Dao"

export default class UserDao extends DAO {
    static async getFirst() {
        const sql = `
            SELECT
                *
            FROM
                ${UserDb.table}
            LIMIT 1;
        `;
        const resultUsers = (await this.runQuery(sql));
        let convertedUsers =  this.convertQueryResultToObj(resultUsers, User);
        return convertedUsers[0];
    }
    static async insert(user:User) {
        return await this.insertObject(user, UserDb);
    }
    static async update(user:User) {
        return await this.updateObject(user, UserDb);
    }
}