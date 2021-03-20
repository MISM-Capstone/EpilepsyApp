import SQLite from 'react-native-sqlite-storage';
import CreateTableQuery from './queries/CreateTableQuery';


export class DatabaseInitialization {
    // Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
    // This should be called each time the database is opened.
    public static async updateDatabaseTables(database: SQLite.SQLiteDatabase) {
        let dbVersion: number = 0;
        console.log("Beginning database updates...");
  
        // First: create tables if they do not already exist
        await database.transaction(this.createTables)
        let version = await this.getDatabaseVersion(database);
        dbVersion = version;
        console.log("Current database version is: " + dbVersion);
        // Perform DB updates based on this version
        // This is included as an example of how you make database schema changes once the app has been shipped
        if (dbVersion < 1) {
            // Uncomment the next line, and the referenced function below, to enable this
            // return database.transaction(this.preVersion1Inserts);
        }
        if (dbVersion < 2) {
            // Uncomment the next line, and the referenced function below, to enable this
            // return database.transaction(this.preVersion2Inserts);
        }
    }
  
    // Perform initial setup of the database tables
    private static createTables(transaction: SQLite.Transaction) {
        // DANGER! For dev only
        const dropOldTables = true;
        if (dropOldTables) {
            transaction.executeSql("DROP TABLE IF EXISTS seizure_log;");
            transaction.executeSql("DROP TABLE IF EXISTS survey_log;");
            transaction.executeSql("DROP TABLE IF EXISTS medication_log;");
        }
        const dropAllTables = false;
        if (dropAllTables) {
            transaction.executeSql("DROP TABLE IF EXISTS seizure_log;");
            transaction.executeSql("DROP TABLE IF EXISTS survey_log;");
            transaction.executeSql("DROP TABLE IF EXISTS medication_log;");
            transaction.executeSql("DROP TABLE IF EXISTS Version;");
        }
      
        // Tables
        transaction.executeSql(CreateTableQuery.user);
        transaction.executeSql(CreateTableQuery.epilepsy_type);
        transaction.executeSql(CreateTableQuery.epilepsy_type_user);
        transaction.executeSql(CreateTableQuery.location);
        transaction.executeSql(CreateTableQuery.seizure_log);
        transaction.executeSql(CreateTableQuery.survey);
        transaction.executeSql(CreateTableQuery.survey_field);
        transaction.executeSql(CreateTableQuery.survey_log);
        transaction.executeSql(CreateTableQuery.survey_answer);
        transaction.executeSql(CreateTableQuery.dosage_unit);


        // Version table
        transaction.executeSql(`
            CREATE TABLE IF NOT EXISTS Version(
                version_id INTEGER PRIMARY KEY NOT NULL,
                version INTEGER
            );
        `);
    }
  
    // Get the version of the database, as specified in the Version table
    private static async getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
        // Select the highest version number from the version table
        
        return (
            database
            .executeSql(`
                SELECT version
                FROM Version
                ORDER BY version DESC
                LIMIT 1;
            `)
            .then(([results]) => {
                if (results.rows && results.rows.length > 0) {
                    const version = results.rows.item(0).version;
                    return version;
                } else {
                    return 0;
                }
            })
            .catch((error) => {
                console.log(`No version set. Returning 0. Details: ${error}`);
                return 0;
            })
        );
    }
  
    // Once the app has shipped, use the following functions as a template for updating the database:
    /*
      // This function should be called when the version of the db is < 1
      private preVersion1Inserts(transaction: SQLite.Transaction) {
          console.log("Running pre-version 1 DB inserts");
          // Make schema changes
          transaction.executeSql("ALTER TABLE ...");
          // Lastly, update the database version
          transaction.executeSql("INSERT INTO Version (version) VALUES (1);");
      }
      // This function should be called when the version of the db is < 2
      private preVersion2Inserts(transaction: SQLite.Transaction) {
          console.log("Running pre-version 2 DB inserts");
          
          // Make schema changes
          transaction.executeSql("ALTER TABLE ...");
          // Lastly, update the database version
          transaction.executeSql("INSERT INTO Version (version) VALUES (2);");
      }
      */
  }