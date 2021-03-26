import DosageUnit, {DosageUnitDb} from "../../../models/DosageUnits";
import DAO from "./Dao"

export default class DosageUnitDao extends DAO {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${DosageUnitDb.table}
            ORDER BY
                ${DosageUnitDb.fields.is_default},
                ${DosageUnitDb.fields.name};
        `;
        const resultDosageUnit = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultDosageUnit, DosageUnit);
    }
    static async insert(dosageUnit:DosageUnit) {
        return await this.insertObj(dosageUnit, DosageUnitDb);
    }
    static async update(dosageUnit:DosageUnit) {
        return await this.updateObj(dosageUnit, DosageUnitDb);
    }
}