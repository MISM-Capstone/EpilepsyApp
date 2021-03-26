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
    static async getByDate(date: string) {
        const sql = `
            SELECT
                *
            FROM
                ${MedicationLogDb.table}
            WHERE 
                ${MedicationLogDb.fields.date} = ?
        ;`;
        const resultMedicationLog = await this.runQuery(sql, [date]);
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
        ;`;
        const resultMedicationLog = await this.runQuery(sql, [medication_id]);
        return this.convertQueryResultToObj(resultMedicationLog, MedicationLog);
    }

    // TODO - Check that this works
    static async insert(medicationLog:MedicationLog) {
        return await this.insertObj(medicationLog, MedicationLogDb);
    }

    static async deleteMedicationLog(id: number | string) {
        const sql = `
            DELETE FROM ${MedicationLogDb.table}
            WHERE ${MedicationLogDb.fields.id} = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [id]);
        return this.SetResultsToList(results[0].rows);
    }

    static async updateMedication(id: number | string, date: Date, time:Date, medication: string, dosage: string, notes: string) {
        let date_string = date.toJSON().substring(0,10);
        let time_string = time.toLocaleTimeString(); 
        console.log('TIME STRING: ', time_string)
        const sql = `
            UPDATE ${MedicationLogDb.table} 
            SET
                ${MedicationLogDb.fields.date},
                ${MedicationLogDb.fields.time},
                ${MedicationLogDb.fields.medication_id},
                ${MedicationLogDb.fields.dosage},
                ${MedicationLogDb.fields.dosage_unit_id},
                ${MedicationLogDb.fields.medication_id},
                ${MedicationLogDb.fields.user_id}
            WHERE
                ${MedicationLogDb.fields.id} = ?
        ;`;
        const params = [date_string, time_string, medication, dosage, notes, id];
        const db = await this.getDatabase();
        let results:ResultSet[] = [];
        await db.transaction(async tx => {
            let [, result] = await tx.executeSql(sql,params);
            results.push(result);
        });
        return results;
    }
}