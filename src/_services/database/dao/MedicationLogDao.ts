import MedicationLog from "../../../models/Medication/MedicationLog";
import LogDao from "./LogDao";

export default class MedicationLogDao extends LogDao {
    static async getAll() {
        return await this.pullAll(MedicationLog);
    }
    static async getByDate(date: Date) {
        return await this.pullfromDateRange(date, date, MedicationLog);
    }
    static async getInDateRange(startDate:Date, endDate:Date) {
        return await this.pullfromDateRange(startDate, endDate, MedicationLog);
    }
    static async getById(medication_id: number) {
        return await this.pullById(medication_id, MedicationLog);
    }
}