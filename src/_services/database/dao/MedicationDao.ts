import Medication from "../../../models/Medication/Medication";
import DAO from "./Dao"

export default class MedicationDao extends DAO {
    static async getAll() {
        return await this.pullAll(Medication);

    }
    static async getById(id:number) {
        return await this.pullById(id, Medication);

    }
}