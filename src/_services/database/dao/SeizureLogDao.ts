import { ResultSet } from "react-native-sqlite-storage";
import SeizureLog, { SeizureLogDb } from "../../../models/SeizureLog";
import Dao from "./Dao";

export default class SeizureLogDao extends Dao {
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
    static async getSeizuresInDateRange(startDate:Date, endDate:Date) {
        const sql = `
            SELECT
                *
            FROM
                ${SeizureLogDb.table}
            WHERE
                ${SeizureLogDb.fields.date} >= ?
                and ${SeizureLogDb.fields.date} <= ?
        ;`;
        const params = [startDate.toJSON().substring(0,10), endDate.toJSON().substring(0,10)];
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return this.SetResultsToList(results[0].rows) as SeizureLog[];
    }
    static async getSeizureLogById(seizure_id: number | string) {
        const sql = `
            SELECT
                *
            FROM
                ${SeizureLogDb.table}
            WHERE 
                ${SeizureLogDb.fields.id} = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [seizure_id]);
        return this.SetResultsToList(results[0].rows) as SeizureLog[];
    }

    static async insertSeizureLog(date: Date, time:Date, location: string, notes: string) {
        let date_string = date.toJSON().substring(0,10);
        let time_string = time.toLocaleTimeString(); 
        console.log('TIME STRING: ', time_string)
        const sql = `
            INSERT INTO ${SeizureLogDb.table}
            (${SeizureLogDb.fields.date}, ${SeizureLogDb.fields.time}, ${SeizureLogDb.fields.location_id}, ${SeizureLogDb.fields.notes}) 
            VALUES (?,?,?,?);
        `;
        const params = [date_string, time_string, location, notes];
        const db = await this.getDatabase();
        let results:ResultSet[] = [];
        await db.transaction(async tx => {
            let [, result] = await tx.executeSql(sql,params);
            results.push(result);
        });
        return results;
    }

    static async deleteSeizureLog(id: number | string) {
        const sql = `
            DELETE FROM ${SeizureLogDb.table}
            WHERE ${SeizureLogDb.fields.id} = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [id]);
        return this.SetResultsToList(results[0].rows);
    }

    static async updateSeizureLog(id: number | string, date: Date, time: Date, location: string, notes: string) {
        let date_string = date.toJSON().substring(0, 10);
        let time_string = time.toLocaleTimeString();
        const sql = `
            UPDATE ${SeizureLogDb.table} 
            SET ${SeizureLogDb.fields.date} = ?, 
                ${SeizureLogDb.fields.time} = ?,
                ${SeizureLogDb.fields.location_id} = ?,
                ${SeizureLogDb.fields.notes} = ?,
            WHERE
                ${SeizureLogDb.fields.id} = ?
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
}