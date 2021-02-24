import { ResultSet } from "react-native-sqlite-storage";
import Dao from "./Dao";

export default class SeizureLogDao extends Dao {
    static async insertSeizure(date: Date, location: string, notes: string) {
        let date_string = date.toJSON().substring(0,10);
        const sql = `
            INSERT INTO seizure_log (date, location, notes) 
            VALUES (?,?,?);
        `;
        const params = [date_string, location, notes];
        const db = await this.getDatabase();
        let results:ResultSet[] = [];
        await db.transaction(async tx => {
            let [, result] = await tx.executeSql(sql,params);
            results.push(result);
        });
        return results;
    }

    static async get() {
        
    }
}