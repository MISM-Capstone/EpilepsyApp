import EpilepsyType, {EpilepsyTypeDb} from "../../../models/EpilepsyType";
import DAO from "./Dao"

export default class EpilepsyTypeDao extends DAO {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${EpilepsyTypeDb.table};
        `;
        const resultEpilepsyType = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultEpilepsyType, EpilepsyType);
    }
}