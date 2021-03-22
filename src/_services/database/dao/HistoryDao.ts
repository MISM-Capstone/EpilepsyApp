import { ResultSet } from "react-native-sqlite-storage";
import Dao from "./Dao";
// import SQLite from "react-native-sqlite-storage";

export default class HistoryDao extends Dao {

    // SEIZURE LOGS 
    static async getSeizureLogs() {
        const sql = `
            SELECT
                *
            FROM
                seizure_log
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return this.SetResultsToList(results[0].rows);
    }

    static async getSeizureLogsByDate(date: string) {
        const sql = `
            SELECT
                *
            FROM
                seizure_log
            WHERE 
                date = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [date]);
        return this.SetResultsToList(results[0].rows);
    }

    static async getSeizureLogById(seizure_id: number | string) {
        const sql = `
            SELECT
                *
            FROM
                seizure_log
            WHERE 
                seizure_id = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [seizure_id]);
        return this.SetResultsToList(results[0].rows);
    }

    static async deleteSeizureLog(id: number | string) {
        const sql = `
            DELETE FROM seizure_log
            WHERE seizure_id = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [id]);
        return this.SetResultsToList(results[0].rows);
    }

    static async updateSeizureLog(id: number | string, date: Date, time: Date, location: string, notes: string) {
        let date_string = date.toJSON().substring(0, 10);
        let time_string = time.toLocaleTimeString();
        const sql = `
            UPDATE seizure_log 
            SET date = ?, 
                time = ?,
                location = ?,
                notes = ? 
            WHERE
                seizure_id = ?
        `;
        const params = [date_string, time_string, location, notes, id];
        const db = await this.getDatabase();
        let results: ResultSet[] = [];
        await db.transaction(async tx => {
            let [, result] = await tx.executeSql(sql, params);
            results.push(result);
        });
        return results;
    }

    // SURVEY LOGS
    static async getSurveyLogs() {
        const sql = `
            SELECT
                *
            FROM
                survey_log
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return this.SetResultsToList(results[0].rows);
    }

    static async getSurveyLogsByDate(date: string) {
        const sql = `
            SELECT
                *
            FROM
                survey_log
            WHERE 
                date = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [date]);
        return this.SetResultsToList(results[0].rows);
    }

    static async getSurveyLogById(survey_id: number | string) {
        const sql = `
            SELECT
                *
            FROM
                survey_log
            WHERE 
                survey_id = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [survey_id]);
        return this.SetResultsToList(results[0].rows);
    }

    static async deleteSurveyLog(id: number | string) {
        const sql = `
            DELETE FROM survey_log
            WHERE survey_id = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [id]);
        return this.SetResultsToList(results[0].rows);
    }

    static async updateSurveyLog(id: number | string, date: Date, sleep_start_date: Date, sleep_end_date: Date, stress_level: string, illness: boolean, fever: boolean, miss_meal: boolean, medication: boolean) {
        let date_string = date.toJSON().substring(0, 10);
        const sql = `
            UPDATE survey_log 
            SET    
                date = ?, 
                sleep_start_date =?,
                sleep_end_date = ?, 
                stress_level = ?,
                illness = ?,
                fever = ?,
                miss_meal = ?,
                medication = ? 
            WHERE 
                survey_id = ?
            ;
        `;
        const params = [
            date_string,
            sleep_start_date.toString(),
            sleep_end_date.toString(),
            stress_level,
            illness.toString(),
            fever.toString(),
            miss_meal.toString(),
            medication.toString(),
            id
        ]
        console.log('params: ', params);
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return results;
    }

    // MEDICATION LOGS
    static async getMedicationLogs() {
        const sql = `
            SELECT
                *
            FROM
                medication_log
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return this.SetResultsToList(results[0].rows);
    }

    static async getMedicationLogsByDate(date: string) {
        const sql = `
            SELECT
                *
            FROM
                medication_log
            WHERE 
                date = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [date]);
        return this.SetResultsToList(results[0].rows);
    }

    static async getMedicationLogById(medication_id: number | string) {
        const sql = `
            SELECT
                *
            FROM
                medication_log
            WHERE 
                medication_id = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [medication_id]);
        return this.SetResultsToList(results[0].rows);
    }

    static async deleteMedicationLog(id: number | string) {
        const sql = `
            DELETE FROM medication_log
            WHERE medication_id = ?
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
            UPDATE medication_log 
            SET
                date = ?, 
                time = ?,
                medication = ?, 
                dosage = ?, 
                notes = ?
            WHERE
                medication_id = ?
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

    // COMBINED LOGS
    static async getAllLogs() {
        const seizures = await this.getSeizureLogs();
        const surveys = await this.getSurveyLogs();
        const medications = await this.getMedicationLogs();
        const data = {
            seizures: seizures,
            surveys: surveys,
            medications: medications
        };
        return data;
    }

    static async getAllEventDates() {
        const sql = `
            SELECT DISTINCT
                date
            FROM
                seizure_log
            UNION
            SELECT DISTINCT
                date
            FROM
                survey_log
            UNION
            SELECT DISTINCT
                date
            FROM
                medication_log
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return this.SetResultsToList(results[0].rows);
    }

    static async getAllLogsByDate(date: string) {
        const seizures = await this.getSeizureLogsByDate(date);
        const surveys = await this.getSurveyLogsByDate(date);
        const medications = await this.getMedicationLogsByDate(date);
        const data = {
            seizures: seizures,
            surveys: surveys,
            medications: medications
        };
        return data;
    }
}
