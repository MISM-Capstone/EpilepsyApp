CREATE TABLE seizure_log (
    seizure_id INTEGER PRIMARY KEY,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    notes TEXT NOT NULL
);

CREATE TABLE medication_log (
    medication_id INTEGER PRIMARY KEY,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    medication TEXT NOT NULL,
    dosage TEXT NOT NULL,
    notes TEXT NOT NULL
);

CREATE TABLE survey_log(
    survey_entry_id INTEGER PRIMARY KEY NOT NULL,
    date DATE NOT NULL,
    sleep_start_date DATE NOT NULL,
    sleep_end_date DATE NOT NULL,
    stress_level INTEGER NOT NULL,
    illness BOOLEAN NOT NULL,
    fever BOOLEAN NOT NULL,
    miss_meal BOOLEAN NOT NULL,
    medication BOOLEAN NOT NULL
);