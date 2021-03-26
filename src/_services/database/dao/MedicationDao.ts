import Medication, {MedicationDb} from "../../../models/Medication/Medication";
import DAO from "./Dao"

export default class MedicationDao extends DAO {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${MedicationDb.table}
            ORDER BY
                ${MedicationDb.fields.name};
        `;
        const resultMedication = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultMedication, Medication);
    }
    static async insert(Medication:Medication) {
        return await this.insertObj(Medication, MedicationDb);
    }
    static async update(Medication:Medication) {
        return await this.updateObj(Medication, MedicationDb);
    }
}