import Dao from "./Dao";
// import SQLite from "react-native-sqlite-storage";

export default class SeizureHistoryDao extends Dao {
    static async getLogs() {
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

    static async getLogsByDate(date: string) {
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
}
