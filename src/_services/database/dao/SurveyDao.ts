import Survey from "../../../models/Surveys/Survey";
import DAO from "./Dao"

export default class SurveyDao extends DAO {
    static async getAll() {
        return await this.pullAll(Survey);
    }
    static async getById(id:number) {
        return await this.pullById(id, Survey);
    }
}