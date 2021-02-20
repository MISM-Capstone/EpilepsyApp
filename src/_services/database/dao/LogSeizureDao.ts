import { ResultSet } from "react-native-sqlite-storage";
import Dao from "./Dao";

export default class LogSeizureDao extends Dao {
    static async insertSeizure(date: Date, location: string, notes: string) {
        const sql = `
            INSERT INTO seizure_log (date, location, notes) 
            VALUES (?,?,?);
        `;
        const params = [date.toString(), location, notes];
        const db = await this.getDatabase();
        let results:ResultSet[] = [];
        await db.transaction(async tx => {
            let [, result] = await tx.executeSql(sql,params);
            results.push(result);
        });
        return results;
    }
}