import SQLite from 'react-native-sqlite-storage';

export const DATABASE:SQLite.DatabaseParams = {
    name: "epilepsy.db",
    location: "default",
    createFromLocation: 1
};