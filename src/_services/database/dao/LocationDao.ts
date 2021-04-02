import Location from "../../../models/Location";
import DAO from "./Dao"

export default class LocationDao extends DAO {
    static async getAll() {
        return await this.pullAll(Location);
    }
}