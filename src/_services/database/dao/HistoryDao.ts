import SeizureLog, { SeizureLogDb } from "../../../models/SeizureLog";
import Dao from "./Dao";

export default class HistoryDao extends Dao {

    // SEIZURE LOGS 
    static async getSeizureLogs() {
        const sql = `
            SELECT
                *
            FROM
                ${SeizureLogDb.table}
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return this.SetResultsToList(results[0].rows) as SeizureLog[];
    }

    static async getSeizureLogsByDate(date: string) {
        const sql = `
            SELECT
                *
            FROM
                ${SeizureLogDb.table}
            WHERE 
                ${SeizureLogDb.fields.date} = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [date]);
        return this.SetResultsToList(results[0].rows) as SeizureLog[];
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
