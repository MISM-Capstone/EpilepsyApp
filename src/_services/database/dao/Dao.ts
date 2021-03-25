// This looks like it has potential to be a good tutorial.
// https://brucelefebvre.com/blog/2020/05/03/react-native-offline-first-db-with-sqlite-hooks/
// 
// Documentation
// https://github.com/andpor/react-native-sqlite-storage

import { AppState, AppStateStatus } from "react-native";
import SQLite, { ResultSetRowList } from 'react-native-sqlite-storage';
import { CopyObjAttributes, IterateThroughKeys } from "../../../functions";
import Db, { DBObj } from "../../../models/AbstractClasses/Db";
import {DatabaseInitialization} from "../DatabaseInitialization";

export default abstract class DAO {
    private static databaseInstance: SQLite.SQLiteDatabase | undefined;
    // Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
    private static appState = "active";
    private static didRegisterEventListener = false;
    
    protected static async getDatabase(): Promise<SQLite.SQLiteDatabase>{
        let db:SQLite.SQLiteDatabase;
        if (DAO.databaseInstance !== undefined) {
            db = DAO.databaseInstance;
        } else {
            db = await this.open();
        }
        return db;
    }

    protected static async runQuery(sql:string, params?:any[]) {
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return this.SetResultsToList(results[0].rows);
    }

    protected static convertQueryResultToObj<T extends Db>(queryResult:any[], type: (new (...args: any[]) => T), ...args: any[]) {
        let convertedResults:T[] = [];
        queryResult.forEach((result) => {
            const converted = new type(...args);
            CopyObjAttributes(result, converted);
            convertedResults.push(converted);
        });
        return convertedResults;
    }

    protected static async insertObject(obj:Db, dbObj:DBObj) {
        const tableAttributes = this.getObjParamsForInsert(obj);
        const sql = `
            INSERT INTO ${dbObj.table}
                (${tableAttributes.attributes})
            VALUES
                (${tableAttributes.values});
        `;
        return await this.runTrueFalseQuery(sql, tableAttributes.params);
    }

    protected static async updateObject(obj:Db, dbObj:DBObj) {
        const tableAttributes = this.getObjParamsForUpdate(obj);
        tableAttributes.params.push(obj.id);
        const sql = `
            UPDATE ${dbObj.table}
            SET ${tableAttributes.setSQL}
            WHERE ${dbObj.fields.id} = ?;
        `;
        return await this.runTrueFalseQuery(sql, tableAttributes.params);
    }

    private static async runTrueFalseQuery(sql:string, params?:any[]) {
        let wasSuccessful = false;
        try {
            await this.runQuery(sql, params);
            wasSuccessful = true;
        } catch (error) {
            console.log("Error",error);
        }
        return wasSuccessful;
    }





    protected static SetResultsToList(results:ResultSetRowList) {
        let resultList:any[] = [];
        for (let i = 0; i < results.length; i++) {
            resultList.push(results.item(i));
        }
        return resultList;
    }

    protected static getObjParamsForInsert(obj:any) {
        let statement = {
            attributes:"",
            values:"",
            params:[] as any[],
        };
        IterateThroughKeys(obj, (key, value) => {
            if (key !== "id") {
                statement.attributes += (key + ",");
                statement.values += "?,";
                // TODO - Convert value to string
                console.log("Value:",value);
                statement.params.push(value);
            }
        });
        statement.attributes = statement.attributes.slice(0, -1);
        statement.values = statement.values.slice(0, -1);
        return statement;
    }

    protected static getObjParamsForUpdate(obj:any) {
        let statement = {
            setSQL: "",
            params:[] as any[],
        };
        IterateThroughKeys(obj, (key, value) => {
            if (key !== "id") {
                statement.setSQL += ` ${key}=?,`;
                // TODO - Convert value to string
                console.log("Value:",value);
                statement.params.push(value);
            }
        });
        statement.setSQL = statement.setSQL.slice(0, -1);
        return statement;
    }



    // Open a connection to the database
    private static async open(): Promise<SQLite.SQLiteDatabase> {
        // SQLite.DEBUG(true);
        SQLite.enablePromise(true);
        
        if (!DAO.didRegisterEventListener) {
            // Add listener to handle app state changes");
            AppState.removeEventListener("change", DAO.handleAppStateChange);
            AppState.addEventListener("change", DAO.handleAppStateChange);
        }
        if (!DAO.databaseInstance) {
            // Open DB
            let DATABASE:SQLite.DatabaseParams = {
                name: "epilepsy.db",
                location: "default",
                createFromLocation: 1
            };
            // Otherwise, create a new instance
            let db = await SQLite.openDatabase(DATABASE);
        
            // Perform any database initialization or updates, if needed
            await DatabaseInitialization.updateDatabaseTables(db);
            DAO.databaseInstance = db;
        }
        
        return DAO.databaseInstance;
    }
  
    // Close the connection to the database
    private static async close(): Promise<void> {
        if (DAO.databaseInstance === undefined) {
            // No need to close DB again - it's already closed
            return;
        }
        let status = await DAO.databaseInstance.close();
        DAO.databaseInstance = undefined;
    }

  
    // Handle the app going from foreground to background, and vice versa.
    private static handleAppStateChange(nextAppState: AppStateStatus) {
        if (DAO.appState === "active" && nextAppState.match(/inactive|background/)) {
            // App has moved from the foreground into the background (or become inactive)
            DAO.close().then(() => console.log("Finished closing"));
        }
        DAO.appState = nextAppState;
    }
}
