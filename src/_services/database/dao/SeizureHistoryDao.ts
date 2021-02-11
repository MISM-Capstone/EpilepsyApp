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
        let len = results[0].rows.length;
        let logs = [];
        for (let i = 0; i < len; i++) {
            logs.push(results[0].rows.item(i));
        }
        return logs;
    }
}
