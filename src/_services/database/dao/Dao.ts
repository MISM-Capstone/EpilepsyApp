// This looks like it has potential to be a good tutorial.
// https://brucelefebvre.com/blog/2020/05/03/react-native-offline-first-db-with-sqlite-hooks/
// 
// Documentation
// https://github.com/andpor/react-native-sqlite-storage

import { AppState, AppStateStatus } from "react-native";
import SQLite from 'react-native-sqlite-storage';
import {DatabaseInitialization} from "../DatabaseInitialization";
import {DATABASE} from "../constants";

export default abstract class DAO {
    private static databaseInstance: SQLite.SQLiteDatabase | undefined;
    // Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
    private static appState = "active";
    private static didRegisterEventListener = false;
    
    protected static async getDatabase(): Promise<SQLite.SQLiteDatabase>{
        let db:SQLite.SQLiteDatabase;
        if (DAO.databaseInstance !== undefined) {
            db = DAO.databaseInstance
        } else {
            db = await this.open()
        }
        return db;
    }

    // Open a connection to the database
    private static async open(): Promise<SQLite.SQLiteDatabase> {
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
        
        if (!DAO.didRegisterEventListener) {
            console.log("[db] Adding listener to handle app state changes");
            AppState.removeEventListener("change", DAO.handleAppStateChange);
            AppState.addEventListener("change", DAO.handleAppStateChange);
        }
  
        if (DAO.databaseInstance) {
            console.log("[db] Database is already open: returning the existing instance");
        } else {
            // Otherwise, create a new instance
            const db = await SQLite.openDatabase(DATABASE);
            console.log("[db] Database open!");
        
            // Perform any database initialization or updates, if needed
            await DatabaseInitialization.updateDatabaseTables(db);
        
            DAO.databaseInstance = db;
        }
        
        return DAO.databaseInstance;
    }
  
    // Close the connection to the database
    private static async close(): Promise<void> {
        if (DAO.databaseInstance === undefined) {
            console.log("[db] No need to close DB again - it's already closed");
            return;
        }
        const status = await DAO.databaseInstance.close();
        console.log("[db] Database closed.");
        DAO.databaseInstance = undefined;
    }

  
    // Handle the app going from foreground to background, and vice versa.
    private static handleAppStateChange(nextAppState: AppStateStatus) {
        if (DAO.appState === "active" && nextAppState.match(/inactive|background/)) {
            // App has moved from the foreground into the background (or become inactive)
            console.log("[db] App has gone to the background - closing DB connection.");
            DAO.close();
        }
        DAO.appState = nextAppState;
    }
}
