import SeizureLog from "../../../models/SeizureLog";
import LogDao from "./LogDao";

export default class SeizureLogDao extends LogDao {
    static async getAll() {
        return await this.pullAll(SeizureLog);
    }
    static async getByDate(date: Date) {
        return await this.pullfromDateRange(date, date, SeizureLog);
    }
    static async getInDateRange(startDate:Date, endDate:Date) {
        return await this.pullfromDateRange(startDate, endDate, SeizureLog);
    }
    static async getById(seizure_id: number) {
        return await this.pullById(seizure_id, SeizureLog);
    }

}