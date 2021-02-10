import Dao from "./Dao";

export default class LogSeizureDao extends Dao {
    static async insertSeizure(date: Date, location: string, notes: string) {
        const sql = `
            INSERT INTO seizure_log (date, location, notes) 
            VALUES ('${date}','${location}','${notes}');
        `;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return results;
    }
}