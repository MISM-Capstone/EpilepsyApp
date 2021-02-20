import Dao from "./Dao";

export default class LogSurveyDao extends Dao {
    static async insertSurveyEntry(date: Date, sleep: string, stress_level: string, illness: boolean, fever: boolean, miss_meal: boolean, medication: boolean) {
        const sql = `
            INSERT INTO survey_log 
                (date, 
                sleep, 
                stress_level,
                illness,
                fever,
                miss_meal,
                medication) 
            VALUES 
                (?,?,?,?,?,?,?)
            ;
        `;
        const params = [
            date.toString(),
            sleep,
            stress_level,
            illness.toString(),
            fever.toString(),
            miss_meal.toString(),
            medication.toString()
        ]
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return results;
    }
}