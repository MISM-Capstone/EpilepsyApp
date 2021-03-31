import Location, {LocationDb} from "../../../models/Location";
import DAO from "./Dao"

export default class LocationDao extends DAO {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${LocationDb.table}
            ORDER BY
                ${LocationDb.fields.name};
        `;
        const resultLocation = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultLocation, Location);
    }
}