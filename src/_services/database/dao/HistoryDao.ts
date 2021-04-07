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
        const surveys = await SurveyLogDao.getAll();
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
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate()
            return Object.assign(c, { [`${year}-${month<10?"0"+month:month}-${day<10?"0"+day:day}`]: { marked: true } });
        }, {});
        return marked;
    }

    static async getAllLogsByDate(date: Date) {
        const seizures = await SeizureLogDao.getByDate(date);
        const surveys = await SurveyLogDao.getByDate(date);
        const medications = await MedicationLogDao.getByDate(date);
        const data = {
            seizures: seizures,
            surveys: surveys,
            medications: medications
        };
        return data;
    }
}
