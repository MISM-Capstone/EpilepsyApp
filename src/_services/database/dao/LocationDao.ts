import Location, {LocationDb} from "../../../models/Location";
import DAO from "./Dao"

export default class LocationDao extends DAO {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${LocationDb.table};
        `;
        const resultLocation = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultLocation, Location);
    }
    static async insert(location:Location) {
        return await this.insertObj(location, LocationDb);
    }
    static async update(location:Location) {
        return await this.updateObj(location, LocationDb);
    }
}