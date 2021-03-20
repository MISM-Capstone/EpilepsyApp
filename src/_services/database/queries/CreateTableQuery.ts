export default class CreateTableQuery {
    static user = `
        CREATE TABLE IF NOT EXISTS "user" (
            "id"	INTEGER NOT NULL UNIQUE,
            "first_name"	TEXT NOT NULL,
            "last_name"	TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static epilepsy_type = `
        CREATE TABLE IF NOT EXISTS "epilepsy_type" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL,
            "description"	TEXT,
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static epilepsy_type_user = `
        CREATE TABLE IF NOT EXISTS "epilepsy_type_user" (
            "id"	INTEGER NOT NULL UNIQUE,
            "user_id"	INTEGER NOT NULL,
            "epilepsy_type_id"	INTEGER NOT NULL,
            FOREIGN KEY("user_id") REFERENCES "user"("id"),
            FOREIGN KEY("epilepsy_type_id") REFERENCES "epilepsy_type"("id"),
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static location = `
        CREATE TABLE IF NOT EXISTS "location" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL,
            "description"	TEXT,
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static seizure_log = `
        CREATE TABLE IF NOT EXISTS "seizure_log" (
            "id"	INTEGER NOT NULL UNIQUE,
            "date_recorded"	TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "date_modified"	DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "date"	DATE NOT NULL,
            "time"	TEXT NOT NULL,
            "details"	TEXT NOT NULL,
            "notes"	TEXT,
            "location_id"	INTEGER NOT NULL,
            "user_id"	INTEGER NOT NULL,
            FOREIGN KEY("location_id") REFERENCES "location"("id"),
            FOREIGN KEY("user_id") REFERENCES "user"("id"),
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static survey = `
        CREATE TABLE IF NOT EXISTS "survey" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL,
            "description"	TEXT,
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static survey_field = `
        CREATE TABLE IF NOT EXISTS "survey_field" (
            "id"	INTEGER NOT NULL UNIQUE,
            "question"	TEXT NOT NULL,
            "field_type"	TEXT NOT NULL,
            "survey_id"	INTEGER NOT NULL,
            FOREIGN KEY("survey_id") REFERENCES "survey"("id"),
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static survey_log = `
        CREATE TABLE IF NOT EXISTS "survey_log" (
            "id"	INTEGER NOT NULL UNIQUE,
            "date_recorded"	TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "date_modified"	DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "date"	DATE NOT NULL,
            "survey_id"	INTEGER NOT NULL,
            "user_id"	INTEGER NOT NULL,
            FOREIGN KEY("survey_id") REFERENCES "survey"("id"),
            FOREIGN KEY("user_id") REFERENCES "user"("id"),
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static survey_answer = `
        CREATE TABLE IF NOT EXISTS "survey_answer" (
            "id"	INTEGER NOT NULL UNIQUE,
            "answer"	TEXT NOT NULL,
            "survey_log_id"	INTEGER NOT NULL,
            "survey_field_id"	INTEGER NOT NULL,
            FOREIGN KEY("survey_field_id") REFERENCES "survey_field"("id"),
            FOREIGN KEY("survey_log_id") REFERENCES "survey_log"("id"),
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static dosage_unit = `
        CREATE TABLE IF NOT EXISTS "dosage_unit" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL,
            "description"	TEXT,
            "is_default"	BOOLEAN NOT NULL DEFAULT 0 CHECK(is_default IN (0, 1)),
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static medication = `
        CREATE TABLE IF NOT EXISTS "medication" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL,
            "description"	TEXT,
            "dosage"	INTEGER NOT NULL,
            "dosage_unit_id"	INTEGER NOT NULL,
            FOREIGN KEY("dosage_unit_id") REFERENCES "dosage_unit"("id"),
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
    static medication_log = `
        CREATE TABLE IF NOT EXISTS "medication_log" (
            "id"	INTEGER NOT NULL UNIQUE,
            "date_recorded"	TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "date_modified"	DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "date"	DATE NOT NULL,
            "dosage" INTEGER NOT NULL,
            "dosage_unit_id"	INTEGER NOT NULL,
            "medication_id" INTEGER NOT NULL,
            "user_id"	INTEGER NOT NULL,
            FOREIGN KEY("dosage_unit_id") REFERENCES "dosage_unit"("id"),
            FOREIGN KEY("medication_id") REFERENCES "medication"("id"),
            FOREIGN KEY("user_id") REFERENCES "user"("id"),
            PRIMARY KEY("id" AUTOINCREMENT)
        );
    `;
}