CREATE TABLE seizure_log (
    seizure_id INTEGER PRIMARY KEY,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    notes TEXT NOT NULL
);