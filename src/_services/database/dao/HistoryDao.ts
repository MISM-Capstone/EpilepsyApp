import Dao from "./Dao";
import SeizureLogDao from "./SeizureLogDao";
import SurveyLogDao from "./SurveyLogDao";
import MedicationLogDao from "./MedicationLogDao";
import { SeizureLogDb } from "../../../models/SeizureLog";
import { SurveyLogDb } from "../../../models/Surveys/SurveyLog";
import { MedicationLogDb } from "../../../models/Medication/MedicationLog";

export default class HistoryDao extends Dao {
    // COMBINED LOGS
    static async getAllLogs() {
        const seizures = await SeizureLogDao.getAll();
        const surveys = await SurveyLogDao.getSurveyLogs();
        const medications = await MedicationLogDao.getAll();
        const data = {
            seizures: seizures,
            surveys: surveys,
            medications: medications
        };
        return data;
    }

    static async getAllEventDates() {
        const sql = `
            SELECT DISTINCT
                ${SeizureLogDb.fields.date}
            FROM
                ${SeizureLogDb.table}
            UNION
            SELECT DISTINCT
                ${SurveyLogDb.fields.date}
            FROM
                ${SurveyLogDb.table}
            UNION
            SELECT DISTINCT
                ${MedicationLogDb.fields.date}
            FROM
                ${MedicationLogDb.table}
        ;`;
        const result = await this.runQuery(sql);
        let marked = result.reduce((c: any, v: any) => {
            const date = new Date(v.date);
            return Object.assign(c, { [date.toJSON().substring(0,10)]: { marked: true } });
        }, {});
        return marked;
    }

    static async getAllLogsByDate(date: Date) {
        console.log("All logs")
        const seizures = await SeizureLogDao.getByDate(date);
        const surveys = await SurveyLogDao.getSurveyLogsByDate(date);
        const medications = await MedicationLogDao.getByDate(date);
        const data = {
            seizures: seizures,
            surveys: surveys,
            medications: medications
        };
        console.log(data)
        return data;
    }
}
