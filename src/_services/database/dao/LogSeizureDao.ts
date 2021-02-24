import { ResultSet } from "react-native-sqlite-storage";
import Dao from "./Dao";

export default class LogSeizureDao extends Dao {
    static async insertSeizure(date: Date, time:Date, location: string, notes: string) {
        let date_string = date.toJSON().substring(0,10);
        let time_string = time.toLocaleTimeString(); // TODO: get the time in a better format?
        console.log('TIME STRING: ', time_string)
        const sql = `
            INSERT INTO seizure_log (date, time, location, notes) 
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
}