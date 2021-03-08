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