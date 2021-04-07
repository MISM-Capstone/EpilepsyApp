import Dao from "./Dao";

export default class LogSurveyDao extends Dao {
    static async insertSurveyEntry(date: Date, sleep_start_date: Date, sleep_end_date: Date, stress_level: string, illness: boolean, fever: boolean, miss_meal: boolean, medication: boolean) {
        let date_string = date.toJSON().substring(0,10);
        const sql = `
            INSERT INTO survey_log 
                (date, 
                sleep_start_date,
                sleep_end_date, 
                stress_level,
                illness,
                fever,
                miss_meal,
                medication) 
            VALUES
                (?,?,?,?,?,?,?,?)
            ;
        `;
        const params = [
            date_string,
            sleep_start_date.toString(),
            sleep_end_date.toString(),
            stress_level,
            illness.toString(),
            fever.toString(),
            miss_meal.toString(),
            medication.toString()
        ]
        console.log('params: ', params);
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return results;
    }
}