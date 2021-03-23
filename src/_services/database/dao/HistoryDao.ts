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
        const seizures = await SeizureLogDao.getSeizureLogs();
        const surveys = await SurveyLogDao.getSurveyLogs();
        const medications = await MedicationLogDao.getMedicationLogs();
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
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return this.SetResultsToList(results[0].rows);
    }

    static async getAllLogsByDate(date: string) {
        const seizures = await SeizureLogDao.getSeizureLogsByDate(date);
        const surveys = await SurveyLogDao.getSurveyLogsByDate(date);
        const medications = await MedicationLogDao.getMedicationLogsByDate(date);
        const data = {
            seizures: seizures,
            surveys: surveys,
            medications: medications
        };
        return data;
    }
}
