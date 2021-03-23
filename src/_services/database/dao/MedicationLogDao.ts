import { ResultSet } from "react-native-sqlite-storage";
import MedicationLog, { MedicationLogDb } from "../../../models/Medication/MedicationLog";
import Dao from "./Dao";

export default class MedicationLogDao extends Dao {
    static async getMedicationLogs() {
        const sql = `
            SELECT
                *
            FROM
                ${MedicationLogDb.table}
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return this.SetResultsToList(results[0].rows) as MedicationLog[];
    }
    static async getMedicationLogsByDate(date: string) {
        const sql = `
            SELECT
                *
            FROM
                ${MedicationLogDb.table}
            WHERE 
                ${MedicationLogDb.fields.date} = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [date]);
        return this.SetResultsToList(results[0].rows) as MedicationLog[];
    }
    static async getMedicationInDateRange(startDate:Date, endDate:Date) {
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
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return this.SetResultsToList(results[0].rows) as MedicationLog[];
    }
    static async getMedicationLogById(medication_id: number | string) {
        const sql = `
            SELECT
                *
            FROM
                ${MedicationLogDb.table}
            WHERE 
                ${MedicationLogDb.fields.id} = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [medication_id]);
        return this.SetResultsToList(results[0].rows);
    }

    // TODO - Check that this works
    static async insertMedicationLog(date: Date, time:Date, medication: string, dosage: string, notes: string) {
        let date_string = date.toJSON().substring(0,10);
        let time_string = time.toLocaleTimeString(); 
        console.log('TIME STRING: ', time_string)
        const sql = `
            INSERT INTO ${MedicationLogDb.table}
            (${MedicationLogDb.fields.date},
            ${MedicationLogDb.fields.time},
            ${MedicationLogDb.fields.medication_id},
            ${MedicationLogDb.fields.dosage},
            ${MedicationLogDb.fields.dosage_unit_id},
            ${MedicationLogDb.fields.medication_id},
            ${MedicationLogDb.fields.user_id})
            VALUES (?,?,?,?,?);
        `;
        const params = [date_string, time_string, medication, dosage, notes];
        const db = await this.getDatabase();
        let results:ResultSet[] = [];
        await db.transaction(async tx => {
            let [, result] = await tx.executeSql(sql,params);
            results.push(result);
        });
        return results;
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