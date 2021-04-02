import Log from "../../../models/AbstractClasses/Log";
import DAO from "./Dao";

export default abstract class LogDao extends DAO {
    protected static async pullfromDateRange<T extends Log>(startDate:Date, endDate:Date, type: (new (...args: any[]) => T)) {
        let t = new type();
        startDate.setHours(0,0,0,0);
        let start = startDate.getTime();
        endDate.setHours(23, 59, 59, 999);
        let end = endDate.getTime();
        
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