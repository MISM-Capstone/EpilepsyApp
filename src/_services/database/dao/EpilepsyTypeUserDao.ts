import EpilepsyTypeUser from "../../../models/EpilepsyTypeUser";
import DAO from "./Dao"

export default class EpilepsyTypeDao extends DAO {
    static async getAll() {
        return await this.pullAll(EpilepsyTypeUser);
    }
}