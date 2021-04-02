import DosageUnit from "../../../models/DosageUnits";
import DAO from "./Dao"

export default class DosageUnitDao extends DAO {
    static async getAll() {
        return await this.pullAll(DosageUnit);
    }
}