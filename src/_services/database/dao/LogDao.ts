import Log from "../../../models/AbstractClasses/Log";
import DAO from "./Dao";

export default abstract class LogDao extends DAO {
    protected static async pullfromDateRange<T extends Log>(startDate:Date, endDate:Date, type: (new (...args: any[]) => T)) {
        const copyStart = new Date(startDate);
        const copyEnd = new Date(endDate);
        let t = new type();
        copyStart.setHours(0,0,0,0);
        let start = copyStart.getTime();
        copyEnd.setHours(23, 59, 59, 999);
        let end = copyEnd.getTime();
        const sql = `
            SELECT
                *
            FROM
                ${t.db.table}
            WHERE
                ${t.db.fields.date} >= ?
                and ${t.db.fields.date} <= ?
        ;`;
        const params = [start, end];
        const resultSeizureLog = await this.runQuery(sql, params);
        return this.convertQueryResultToObj(resultSeizureLog, type);
    }
}