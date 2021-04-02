import { ResultSet } from "react-native-sqlite-storage";
import MedicationLog, { MedicationLogDb } from "../../../models/Medication/MedicationLog";
import Dao from "./Dao";

export default class MedicationLogDao extends Dao {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${MedicationLogDb.table}
        ;`;
        const resultMedicationLog = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultMedicationLog, MedicationLog);
    }
    static async getByDate(date: Date) {
        let start = date.getTime();
        date.setHours(23, 59, 59, 999);
        let end = date.getTime();
        const sql = `
            SELECT
                *
            FROM
                ${MedicationLogDb.table}
            WHERE 
                ${MedicationLogDb.fields.date} = ?
        ;`;
        const resultMedicationLog = await this.runQuery(sql, [start, end]);
        return this.convertQueryResultToObj(resultMedicationLog, MedicationLog);
    }
    static async getInDateRange(startDate:Date, endDate:Date) {
        const sql = `
            SELECT
                *
            FROM
                ${MedicationLogDb.table}
            WHERE
                ${MedicationLogDb.fields.date} >= ?
                and ${MedicationLogDb.fields.date} <= ?
        ;`;
        const params = [startDate.toJSON().substring(0,10), endDate.toJSON().substring(0,10)];
        const resultMedicationLog = await this.runQuery(sql, params);
        return this.convertQueryResultToObj(resultMedicationLog, MedicationLog);
    }
    static async getById(medication_id: number | string) {
        const sql = `
            SELECT
                *
            FROM
                ${MedicationLogDb.table}
            WHERE 
                ${MedicationLogDb.fields.id} = ?
            LIMIT 1;
        ;`;
        const resultMedicationLog = await this.runQuery(sql, [medication_id]);
        const convertedMedLogs =  this.convertQueryResultToObj(resultMedicationLog, MedicationLog)[0];
        return convertedMedLogs?convertedMedLogs:undefined;
    }

    static async delete(id: number | string) {
        return await this.deleteObj(id, MedicationLogDb);
    }
}