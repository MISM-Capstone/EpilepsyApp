import EpilepsyType from "../../../models/EpilepsyType";
import DAO from "./Dao"

export default class EpilepsyTypeDao extends DAO {
    static async getAll() {
        return await this.pullAll(EpilepsyType);

    }
}