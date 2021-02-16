import Dao from "./Dao";

export default class LogSurveyDao extends Dao {
    static async insertSurveyEntry(date: Date, sleep: string, stress_level: string, illness: boolean, fever: boolean, miss_meal: boolean, medication: boolean) {
        let date_string = date.toJSON().substring(0,10);
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
                ('${date_string}',
                ${sleep},
                ${stress_level},
                ${illness},
                ${fever},
                ${miss_meal},
                ${medication})
            ;
        `;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return results;
    }
}