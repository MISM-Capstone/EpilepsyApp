import SQLite from 'react-native-sqlite-storage';
import CreateTableQuery from './queries/CreateTableQuery';


export class DatabaseInitialization {
    // Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
    // This should be called each time the database is opened.
    public static async updateDatabaseTables(database: SQLite.SQLiteDatabase) {
        let dbVersion: number = 0;
        console.info("Beginning database updates...");
  
        // First: create tables if they do not already exist
        await database.transaction(this.createTables)
        let version = await this.getDatabaseVersion(database);
        dbVersion = version;
        console.info("Current database version is: " + dbVersion);
        // Perform DB updates based on this version
        // This is included as an example of how you make database schema changes once the app has been shipped
        if (dbVersion < 1) {
            await database.transaction(this.preVersion1Inserts);
        }
        if (dbVersion < 2) {
            // Uncomment the next line, and the referenced function below, to enable this
            // return database.transaction(this.preVersion2Inserts);
        }
    }
  
    // Perform initial setup of the database tables
    private static createTables(transaction: SQLite.Transaction) {
        // DANGER! For dev only
        const dropOldTables = false;
        if (dropOldTables) {
            transaction.executeSql("DROP TABLE IF EXISTS seizure_log;");
            transaction.executeSql("DROP TABLE IF EXISTS survey_log;");
            transaction.executeSql("DROP TABLE IF EXISTS medication_log;");
        }
        const dropAllTables = false;
        if (dropAllTables) {
            transaction.executeSql("DROP TABLE IF EXISTS medication_log;");
            transaction.executeSql("DROP TABLE IF EXISTS medication;");
            transaction.executeSql("DROP TABLE IF EXISTS dosage_unit;");
            transaction.executeSql("DROP TABLE IF EXISTS survey_answer;");
            transaction.executeSql("DROP TABLE IF EXISTS survey_log;");
            transaction.executeSql("DROP TABLE IF EXISTS survey_field;");
            transaction.executeSql("DROP TABLE IF EXISTS survey;");
            transaction.executeSql("DROP TABLE IF EXISTS seizure_log;");
            transaction.executeSql("DROP TABLE IF EXISTS location;");
            transaction.executeSql("DROP TABLE IF EXISTS epilepsy_type_user;");
            transaction.executeSql("DROP TABLE IF EXISTS epilepsy_type;");
            transaction.executeSql("DROP TABLE IF EXISTS user;");
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
        transaction.executeSql(CreateTableQuery.medication);
        transaction.executeSql(CreateTableQuery.medication_log);


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
                console.info(`No version set. Returning 0. Details: ${error}`);
                return 0;
            })
        );
    }
  
    // Once the app has shipped, use the following functions as a template for updating the database:
      // This function should be called when the version of the db is < 1
      private static async preVersion1Inserts(transaction: SQLite.Transaction) {
            console.info("Running pre-version 1 DB inserts");
            // Make schema changes
            transaction.executeSql(`
                INSERT INTO epilepsy_type
                    (name, description)
                VALUES
                    ('Focal Epilepsy, Type Unknown', ''),
                    ('Focal Seizure with Loss of Awareness', ''),
                    ('Generalized Epilepsy, Type Unknown', ''),
                    ('Absence', 'Blank Staring, Spacing Out'),
                    ('Atonic', 'Drop Attacks'),
                    ('Myoclonic', 'Brief Muscle Jerking'),
                    ('Tonic Clonic', 'Convulsion or Grande Mal'),
                    ('Rare Epilepsy Subtype', ''),
                    ('No Specific Diagnosis', ''),
                    ('Not Sure', '');
            `);
            transaction.executeSql(`
                INSERT INTO dosage_unit
                    (name, description, is_default)
                VALUES
                    ('pill', '', false),
                    ('tsp', 'Teaspoon', false),
                    ('mg', 'Milligram', true),
                    ('ml', 'Milliliter', false);
            `);
            transaction.executeSql(`
                INSERT INTO survey
                    (name, description)
                VALUES
                    ('Daily Survey', 'A survey for you to take each day'),
                    ('Monthly Survey', 'A survey for you to take each month');
            `);
            transaction.executeSql(`
                INSERT INTO survey_field
                    (question, field_type, survey_id)
                VALUES
                    ('What time did you go to sleep last night?', 'Date', 1),
                    ('What time did you wake up today?', 'Date', 1),
                    ('Have you felt sick today?', 'boolean', 1),
                    ('Have you had a fever?', 'boolean', 1),
                    ('Have you missed any meals?', 'boolean', 1),
                    ('Have you taken proper medications?', 'boolean', 1);
            `);
            transaction.executeSql(`
                INSERT INTO survey_field
                    (question, field_type, survey_id)
                VALUES
                    ('In the last month, how often have you felt that you were unable to control the important things in your life?', 'integer', 2),
                    ('In the last month, how often have you felt confident about your ability to handle your personal problems?', 'integer', 2),
                    ('In the last month, how often have you felt that things were going your way?', 'integer', 2),
                    ('In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?', 'integer', 2);
            `);
            // Lastly, update the database version
            transaction.executeSql("INSERT INTO Version (version) VALUES (1);");
      }
      // This function should be called when the version of the db is < 2
      private static async preVersion2Inserts(transaction: SQLite.Transaction) {
          console.info("Running pre-version 2 DB inserts");
          
          // Make schema changes
          transaction.executeSql("ALTER TABLE ...");
          // Lastly, update the database version
          transaction.executeSql("INSERT INTO Version (version) VALUES (2);");
      }
  }