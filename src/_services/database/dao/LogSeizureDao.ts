import Dao from "./Dao";

export default class LogSeizureDao extends Dao {
    static async insertSeizure(date: Date, location: string, notes: string) {
        let date_string = date.toJSON().substring(0,10);
        const sql = `
            INSERT INTO seizure_log (date, location, notes) 
            VALUES ('${date_string}','${location}','${notes}');
        `;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return results;
    }
}