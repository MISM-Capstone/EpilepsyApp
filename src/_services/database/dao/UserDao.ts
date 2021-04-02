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
        let convertedUsers =  this.convertQueryResultToObj(resultUsers, User)[0];
        return convertedUsers?convertedUsers:undefined;
    }
}