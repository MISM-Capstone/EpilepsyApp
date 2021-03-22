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

    static async deleteSeizureLog(id: number | string) {
        const sql = `
            DELETE FROM seizure_log
            WHERE seizure_id = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [id]);
        return this.SetResultsToList(results[0].rows);
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

    static async deleteSurveyLog(id: number | string) {
        const sql = `
            DELETE FROM survey_log
            WHERE survey_id = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [id]);
        return this.SetResultsToList(results[0].rows);
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

    static async deleteMedicationLog(id: number | string) {
        const sql = `
            DELETE FROM medication_log
            WHERE medication_id = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [id]);
        return this.SetResultsToList(results[0].rows);
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
