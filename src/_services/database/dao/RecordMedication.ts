import { ResultSet } from "react-native-sqlite-storage";
import Dao from "./Dao";

export default class RecordMedicationDao extends Dao {
    static async insertMedication(date: Date, time:Date, medication: string, dosage: string, notes: string) {
        let date_string = date.toJSON().substring(0,10);
        let time_string = time.toLocaleTimeString(); 
        console.log('TIME STRING: ', time_string)
        const sql = `
            INSERT INTO medication_log (date, time, medication, dosage, notes) 
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
}